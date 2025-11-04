/**
 * Navigation module
 * Handles collapsible navigation, mobile menu, and responsive behavior
 */

const NAV_COLLAPSIBLE_CLASS = 'nav-collapsible';
const NAV_OPEN_CLASS = 'nav-open';
const NAV_COLLAPSE_BREAKPOINT = 1200;

const html = document.documentElement;
const body = document.body;

let portraitQuery = null;
let navElements = null;
let cleanupNavListeners = () => {};
let globalListenersAttached = false;
let mutationObserver = null;
let bodyOverflowCache = '';

const cacheNavElements = () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navPanel = document.querySelector('[data-nav]');
  const navBackdrop = document.querySelector('[data-nav-backdrop]');

  if (!navToggle || !navPanel) {
    return null;
  }

  return { navToggle, navPanel, navBackdrop };
};

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

  navElements?.navToggle?.setAttribute('aria-expanded', 'false');
  navElements?.navBackdrop?.setAttribute('hidden', 'true');

  if (wasOpen) {
    body.style.overflow = bodyOverflowCache;
  }
};

const openNav = () => {
  if (html.classList.contains(NAV_OPEN_CLASS) || !navElements?.navToggle) {
    return;
  }

  bodyOverflowCache = body.style.overflow || '';
  html.classList.add(NAV_OPEN_CLASS);
  navElements.navToggle.setAttribute('aria-expanded', 'true');
  navElements.navBackdrop?.removeAttribute('hidden');
  body.style.overflow = 'hidden';
};

const updateCollapsibleState = () => {
  if (!portraitQuery) {
    return;
  }

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

const bindNavListeners = () => {
  cleanupNavListeners();

  if (!navElements) {
    cleanupNavListeners = () => {};
    return;
  }

  const { navToggle, navPanel, navBackdrop } = navElements;

  const toggleHandler = () => {
    if (html.classList.contains(NAV_OPEN_CLASS)) {
      closeNav();
    } else {
      openNav();
    }
  };

  const panelHandler = (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest('a')) {
      closeNav();
    }
  };

  const backdropHandler = () => closeNav();

  navToggle.addEventListener('click', toggleHandler);
  navPanel.addEventListener('click', panelHandler);
  navBackdrop?.addEventListener('click', backdropHandler);

  cleanupNavListeners = () => {
    navToggle.removeEventListener('click', toggleHandler);
    navPanel.removeEventListener('click', panelHandler);
    navBackdrop?.removeEventListener('click', backdropHandler);
  };
};

const attachGlobalListeners = () => {
  if (globalListenersAttached || !portraitQuery) {
    return;
  }

  globalListenersAttached = true;

  window.addEventListener('gorba:android-ready', updateCollapsibleState);
  window.addEventListener('resize', handleResize, { passive: true });

  if (typeof portraitQuery.addEventListener === 'function') {
    portraitQuery.addEventListener('change', updateCollapsibleState);
  } else if (typeof portraitQuery.addListener === 'function') {
    portraitQuery.addListener(updateCollapsibleState);
  }
};

const attemptSetup = () => {
  const elements = cacheNavElements();

  if (!elements) {
    if (navElements) {
      closeNav();
      cleanupNavListeners();
      navElements = null;
    }
    return false;
  }

  if (
    navElements &&
    navElements.navToggle === elements.navToggle &&
    navElements.navPanel === elements.navPanel &&
    navElements.navBackdrop === elements.navBackdrop
  ) {
    syncNavPanelOffset();
    updateCollapsibleState();
    return true;
  }

  navElements = elements;
  bindNavListeners();
  closeNav();
  syncNavPanelOffset();
  updateCollapsibleState();

  return true;
};

const observeNavigation = () => {
  if (mutationObserver) {
    return;
  }

  const headerPlaceholder =
    document.getElementById('header-placeholder') ?? document.body;

  if (!headerPlaceholder) {
    return;
  }

  mutationObserver = new MutationObserver(() => {
    attemptSetup();
  });

  mutationObserver.observe(headerPlaceholder, {
    childList: true,
    subtree: true,
  });
};

/**
 * Initializes collapsible navigation for mobile and portrait orientations
 * Manages menu toggle, backdrop, and overflow behavior
 */
export function initializeCollapsibleNav() {
  if (!portraitQuery) {
    portraitQuery = window.matchMedia('(orientation: portrait)');
  }

  attachGlobalListeners();
  observeNavigation();
  attemptSetup();
}
