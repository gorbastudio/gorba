// Script para cargar componentes compartidos (header, hero, footer)

async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading component ' + componentPath + ':', error);
  }
}

// Función para cargar todos los componentes
async function loadAllComponents() {
  // Cargar header
  await loadComponent('header-placeholder', 'components/header.html');
  
  // Cargar hero solo si el placeholder existe
  if (document.getElementById('hero-placeholder')) {
    await loadComponent('hero-placeholder', 'components/hero.html');
  }
  
  // Cargar footer
  await loadComponent('footer-placeholder', 'components/footer.html');
  
  // Después de cargar los componentes, inicializar scripts
  if (typeof initializeCollapsibleNav === 'function') {
    initializeCollapsibleNav();
  }
  
  if (typeof initializeCurrentYear === 'function') {
    initializeCurrentYear();
  }
}

// Cargar componentes cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
  loadAllComponents();
}