const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_FILE = path.join(__dirname, '..', 'docs-tree.json');

/**
 * Convierte un nombre de archivo/directorio en un título legible.
 * Ej: 'getting-started' -> 'Getting Started'
 * Ej: 'android_app_development.md' -> 'Android App Development'
 * @param {string} name
 * @returns {string}
 */
function formatTitle(name) {
  return name
    .replace('.md', '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function scanDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const children = [];
  let meta = {};

  // Cargar metadatos si existen
  const metaPath = path.join(dirPath, '_meta.json');
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch (e) {
      console.warn(`⚠️  Error al parsear _meta.json en ${dirPath}`);
    }
  }

  items.forEach(item => {
    // Ignorar archivos/carpetas que empiezan con _ o .
    if (item.name.startsWith('_') || item.name.startsWith('.')) return;

    const itemPath = path.join(dirPath, item.name);
    const slug = path.join(relativePath, item.name).replace(/\\/g, '/');

    if (item.isDirectory()) {
      const subNode = scanDirectory(itemPath, slug);
      // Solo agregar si tiene contenido
      if (subNode.children.length > 0) {
        children.push(subNode);
      }
    } else if (item.isFile() && item.name.endsWith('.md')) {
      children.push({
        name: item.name,
        title: formatTitle(item.name),
        slug: slug,
        type: 'file'
      });
    }
  });

  // Ordenar hijos: por 'order' de meta, luego alfabéticamente
  children.sort((a, b) => {
    const orderA = meta.order?.[a.name] ?? (a.meta?.order ?? Infinity);
    const orderB = meta.order?.[b.name] ?? (b.meta?.order ?? Infinity);
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  });

  const node = {
    name: path.basename(dirPath),
    title: meta.title || formatTitle(path.basename(relativePath || 'docs')),
    slug: relativePath,
    type: 'directory',
    children: children,
    ...(meta.order && { meta: { order: meta.order } })
  };

  return node;
}

try {
  const tree = scanDirectory(DOCS_DIR);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tree, null, 2));
  console.log(`✅ Estructura generada en: ${OUTPUT_FILE}`);
  console.log(`📊 Archivos encontrados: ${countFiles(tree)}`);
  console.log(`📁 Directorios: ${countDirs(tree)}`);
} catch (error) {
  console.error('❌ Error generando estructura:', error.message);
  process.exit(1);
}

function countFiles(node) {
  return node.children.reduce((acc, child) => {
    return acc + (child.type === 'file' ? 1 : countFiles(child));
  }, 0);
}

function countDirs(node) {
  return node.children.reduce((acc, child) => {
    return acc + (child.type === 'directory' ? 1 + countDirs(child) : 0);
  }, 0);
}
