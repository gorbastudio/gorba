/**
 * Interacciones para la página de documentación.
 */
(() => {
  let currentDoc = 'bienvenida.md';

  const sidebar = document.getElementById('sidebar');
  const navAccordion = document.getElementById('nav-accordion');
  const menuToggleButton = document.querySelector('.menu-toggle');
  const contentContainer = document.getElementById('content');
  const mobileQuery = window.matchMedia('(max-width: 768px)');

  function isMobileViewport() {
    return mobileQuery.matches;
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('open');
    }
  }

  function toggleSidebar() {
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  }

  window.toggleSidebar = toggleSidebar;

  document.addEventListener('click', handleOutsidePointer);
  document.addEventListener('touchstart', handleOutsidePointer);

  async function loadDocsTree() {
    const cacheBuster = `v=${new Date().getTime()}`;
    const candidates = [
      `../docs/docs-tree.json?${cacheBuster}`,
      `../docs-tree.json?${cacheBuster}`,
      `./docs-tree.json?${cacheBuster}`,
      `docs-tree.json?${cacheBuster}`
    ];

    for (const url of candidates) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          continue;
        }
        const tree = await response.json();
        console.info(`Docs tree cargado desde: ${url}`);
        return tree;
      } catch (error) {
        console.warn(`No se pudo cargar ${url}:`, error);
      }
    }

    console.error('No se pudo cargar ningún docs-tree.json');
    return null;
  }

  function buildNavNodes(nodes, level = 0) {
    const fragment = document.createDocumentFragment();

    nodes.forEach(node => {
      if (node.type === 'directory') {
        const section = document.createElement('section');
        section.className = 'accordion-item';

        const button = document.createElement('button');
        button.className = 'accordion-trigger';
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = `
            <span class="label">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.7;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              ${node.title}
            </span>
            <span class="chevron">▼</span>
          `;

        const panel = document.createElement('div');
        panel.className = 'accordion-panel';
        panel.dataset.path = node.slug;

        if (node.children && node.children.length > 0) {
          panel.appendChild(buildNavNodes(node.children, level + 1));
        }

        button.addEventListener('click', () => {
          const isOpen = button.classList.toggle('open');
          button.setAttribute('aria-expanded', isOpen);
          panel.classList.toggle('open', isOpen);
        });

        section.append(button, panel);
        fragment.appendChild(section);
      } else {
        const link = document.createElement('a');
        link.className = 'doc-link';
        link.href = `#${node.slug}`;
        link.textContent = node.title;
        link.dataset.path = node.slug;
        link.dataset.depth = level;

        fragment.appendChild(link);
      }
    });

    return fragment;
  }

  function buildNavAccordion(tree) {
    if (!navAccordion) {
      return;
    }

    if (!tree?.children) {
      navAccordion.innerHTML = '<p class="loading-message">No se pudo construir la navegación.</p>';
      return;
    }

    navAccordion.innerHTML = '';
    const navFragment = buildNavNodes(tree.children, 0);
    navAccordion.appendChild(navFragment);
  }

  function setActiveLink(path) {
    document.querySelectorAll('.doc-link').forEach(link => {
      const isActive = link.dataset.path === path;
      link.classList.toggle('active', isActive);

      if (isActive) {
        let parentPanel = link.closest('.accordion-panel');
        while (parentPanel) {
          const trigger = parentPanel.previousElementSibling;
          if (trigger && trigger.classList.contains('accordion-trigger')) {
            trigger.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
            parentPanel.classList.add('open');
          }
          parentPanel = parentPanel.parentElement.closest('.accordion-panel');
        }
      }
    });
  }

  async function fetchDocContent(path) {
    const cacheBuster = `v=${Date.now()}`;
    const candidates = [
      `../docs/${path}`,
      `./docs/${path}`,
      `docs/${path}`,
      `../${path}`,
      `${path}`
    ];

    for (const baseUrl of candidates) {
      try {
        const urlWithBuster = baseUrl.includes('?') ? `${baseUrl}&${cacheBuster}` : `${baseUrl}?${cacheBuster}`;
        const response = await fetch(urlWithBuster, { cache: 'no-store' });
        if (!response.ok) {
          continue;
        }

        const markdown = await response.text();
        return { markdown, sourceUrl: baseUrl };
      } catch (error) {
        console.warn(`No se pudo cargar ${baseUrl}:`, error);
      }
    }

    throw new Error('No se pudo cargar el documento desde las rutas conocidas.');
  }

  async function loadDoc(path) {
    if (!path || !contentContainer) {
      return;
    }

    path = path.replace(/^#/, '').trim();
    currentDoc = path;
    setActiveLink(path);
    window.location.hash = path;

    try {
      const { markdown, sourceUrl } = await fetchDocContent(path);
      console.info(`Documento cargado desde: ${sourceUrl}`);

      const html = renderMarkdown(markdown);

      contentContainer.innerHTML = html;

      contentContainer.querySelectorAll('pre code').forEach(block => {
        if (typeof hljs !== 'undefined' && hljs.highlightElement) {
          try {
            hljs.highlightElement(block);
          } catch (e) {
            console.warn('Error al resaltar código:', e);
          }
        } else {
          console.warn('highlight.js no está disponible');
        }
      });

      if (typeof renderMathInElement === 'function') {
        renderMathInElement(contentContainer, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ]
        });
      } else {
        console.warn('renderMathInElement no está disponible');
      }
    } catch (error) {
      console.error('Error loading document:', path, error);
      contentContainer.innerHTML = `
          <div style="text-align: center; color: var(--color-accent); padding: 2rem;">
            <h2>Error al cargar el documento</h2>
            <p>${error.message}</p>
            <p><small>Verifica que el archivo <code>${path}</code> exista en la carpeta docs/</small></p>
            <p><small>URL intentada: <code>./docs/${path}</code></small></p>
          </div>`;
    } finally {
      if (isMobileViewport()) {
        closeSidebar();
      }
    }
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderMarkdown(markdown) {
    if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
      return marked.parse(markdown);
    }

    console.warn('marked no está disponible, usando renderer básico');
    const escaped = escapeHtml(markdown);
    return `<pre style="white-space: pre-wrap;">${escaped}</pre>`;
  }

  function handleNavClick(event) {
    const link = event.target.closest('.doc-link');
    if (!link) {
      return;
    }

    event.preventDefault();
    const path = link.dataset.path;
    loadDoc(path);
  }

  function handleOutsidePointer(event) {
    if (!sidebar || !isMobileViewport()) {
      return;
    }

    if (!sidebar.classList.contains('open')) {
      return;
    }

    if (sidebar.contains(event.target)) {
      return;
    }

    if (menuToggleButton && menuToggleButton.contains(event.target)) {
      return;
    }

    closeSidebar();
  }

  if (navAccordion) {
    navAccordion.addEventListener('click', handleNavClick);
  }

  async function initializeApp() {
    const docsTree = await loadDocsTree();

    if (!docsTree || !docsTree.children || docsTree.children.length === 0) {
      console.error('No hay documentos para mostrar.');
      if (contentContainer) {
        contentContainer.innerHTML = `
          <div style="text-align: center; color: var(--color-accent); padding: 2rem;">
            <h2>No se encontraron documentos</h2>
            <p>Verifica que <code>docs-tree.json</code> se genere correctamente.</p>
          </div>`;
      }
      return;
    }

    buildNavAccordion(docsTree);

    const hash = window.location.hash.substring(1);
    const initialPath = hash || 'bienvenida.md';
    loadDoc(initialPath);
  }

  window.addEventListener('load', () => {
    initializeApp();
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      loadDoc(hash);
    }
  });

  if (typeof marked !== 'undefined' && typeof marked.setOptions === 'function') {
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false
    });
  }
})();
