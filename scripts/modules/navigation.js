/**
 * Navigation module
 * Handles collapsible navigation, mobile menu, and responsive behavior
 */

const NAV_COLLAPSIBLE_CLASS = 'nav-collapsible';
const NAV_OPEN_CLASS = 'nav-open';
const NAV_COLLAPSE_BREAKPOINT = 1200;

/**
 * Initializes collapsible navigation for mobile and portrait orientations
 * Manages menu toggle, backdrop, and overflow behavior
 */
export function initializeCollapsibleNav() {
  const html = document.documentElement;
  const body = document.body;
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navPanel = document.querySelector('[data-nav]');
  const navBackdrop = document.querySelector('[data-nav-backdrop]');

  if (!navToggle || !navPanel) {
    return;
  }

  const portraitQuery = window.matchMedia('(orientation: portrait)');
  let bodyOverflowCache = '';

  const syncNavPanelOffset = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) {
      return;
    }

    const height = navbar.getBoundingClientRect().height;
    html.style.setProperty('--navbar-height', `${height}px`);
  };

  const closeNav = () => {
    const wasOpen = html.classList.contains(NAV_OPEN_CLASS);
    html.classList.remove(NAV_OPEN_CLASS);
    navToggle.setAttribute('aria-expanded', 'false');
    navBackdrop?.setAttribute('hidden', 'true');

    if (wasOpen) {
      body.style.overflow = bodyOverflowCache;
    }
  };

  const openNav = () => {
    if (html.classList.contains(NAV_OPEN_CLASS)) {
      return;
    }

    bodyOverflowCache = body.style.overflow || '';
    html.classList.add(NAV_OPEN_CLASS);
    navToggle.setAttribute('aria-expanded', 'true');
    navBackdrop?.removeAttribute('hidden');
    body.style.overflow = 'hidden';
  };

  const updateCollapsibleState = () => {
    const collapseByEnvironment =
      html.classList.contains('in-android-app') || portraitQuery.matches;
    const collapseByWidth = window.innerWidth <= NAV_COLLAPSE_BREAKPOINT;
    const shouldCollapse = collapseByEnvironment || collapseByWidth;

    html.classList.toggle(NAV_COLLAPSIBLE_CLASS, shouldCollapse);

    if (!shouldCollapse) {
      closeNav();
    }
  };

  const handleResize = () => {
    syncNavPanelOffset();
    updateCollapsibleState();
  };

  navToggle.addEventListener('click', () => {
    if (html.classList.contains(NAV_OPEN_CLASS)) {
      closeNav();
    } else {
      openNav();
    }
  });

  navBackdrop?.addEventListener('click', () => closeNav());

  navPanel.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest('a')) {
      closeNav();
    }
  });

  window.addEventListener('gorba:android-ready', updateCollapsibleState);
  window.addEventListener('resize', handleResize, { passive: true });

  if (portraitQuery.addEventListener) {
    portraitQuery.addEventListener('change', updateCollapsibleState);
  } else if (portraitQuery.addListener) {
    portraitQuery.addListener(updateCollapsibleState);
  }

  syncNavPanelOffset();
  updateCollapsibleState();
}
