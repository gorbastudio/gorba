const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const OUTPUT_FILE = path.join(__dirname, '..', 'docs-tree.json');

function scanDirectory(dirPath, relativePath = '', isRoot = true) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const node = {
    name: path.basename(relativePath) || 'docs',
    path: relativePath && !isRoot ? `${relativePath}/` : '',
    files: [],
    directories: []
  };

  items.forEach(item => {
    // Ignorar archivos/carpetas que empiezan con _ o .
    if (item.name.startsWith('_') || item.name.startsWith('.')) return;

    const itemPath = path.join(dirPath, item.name);
    const itemRelative = relativePath ? `${relativePath}/${item.name}` : item.name;

    if (item.isDirectory()) {
      const subNode = scanDirectory(itemPath, itemRelative, false);
      // Solo agregar si tiene contenido
      if (subNode.files.length > 0 || subNode.directories.length > 0) {
        node.directories.push(subNode);
      }
    } else if (item.isFile() && item.name.endsWith('.md')) {
      node.files.push({
        name: item.name,
        path: itemRelative
      });
    }
  });

  return node;
}

try {
  const tree = scanDirectory(DOCS_DIR, '', true);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tree, null, 2));
  console.log(`✅ Estructura generada en: ${OUTPUT_FILE}`);
  console.log(`📊 Archivos encontrados: ${countFiles(tree)}`);
  console.log(`📁 Directorios: ${countDirs(tree)}`);
} catch (error) {
  console.error('❌ Error generando estructura:', error.message);
  process.exit(1);
}

function countFiles(node) {
  let count = node.files.length;
  node.directories.forEach(d => count += countFiles(d));
  return count;
}

function countDirs(node) {
  let count = node.directories.length;
  node.directories.forEach(d => count += countDirs(d));
  return count;
}
