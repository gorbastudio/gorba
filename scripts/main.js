const androidFlagKey = 'gorba:android-info';

function markAndroidEnvironment() {
  if (typeof AndroidInterface === 'undefined') {
    return;
  }

  document.documentElement.classList.add('in-android-app');
  document.body.classList.add('in-android-app');

  try {
    const infoRaw = AndroidInterface.getDeviceInfo?.();
    if (infoRaw) {
      localStorage.setItem(androidFlagKey, infoRaw);
    }
  } catch (error) {
    console.error('AndroidInterface.getDeviceInfo falló', error);
  }

  try {
    const appInfoRaw = AndroidInterface.getAppInfo?.();
    if (appInfoRaw) {
      localStorage.setItem(`${androidFlagKey}:app`, appInfoRaw);
    }
  } catch (error) {
    console.error('AndroidInterface.getAppInfo falló', error);
  }

  const themeColor = getComputedStyle(document.body).backgroundColor;
  if (AndroidInterface.setThemeColor) {
    try {
      AndroidInterface.setThemeColor(themeColor);
    } catch (error) {
      console.error('AndroidInterface.setThemeColor falló', error);
    }
  }

  window.dispatchEvent(new CustomEvent('gorba:android-ready'));
}

function initializeAndroidDetection() {
  markAndroidEnvironment();

  document.addEventListener('DOMContentLoaded', () => {
    if (document.documentElement.classList.contains('in-android-app')) {
      return;
    }

    const cached = localStorage.getItem(androidFlagKey);
    if (cached) {
      document.documentElement.classList.add('in-android-app');
      document.body.classList.add('in-android-app');
      try {
        window.dispatchEvent(
          new CustomEvent('gorba:android-ready', { detail: JSON.parse(cached) })
        );
      } catch (error) {
        console.error('No se pudo parsear caché de Android', error);
      }
    }
  });

  window.addEventListener('focus', () => {
    try {
      markAndroidEnvironment();
    } catch (error) {
      console.error('Error revalidando AndroidInterface', error);
    }
  });
}

function initializeCollapsibleNav() {
  const html = document.documentElement;
  const body = document.body;
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navPanel = document.querySelector('[data-nav]');
  const navBackdrop = document.querySelector('[data-nav-backdrop]');

  if (!navToggle || !navPanel) {
    return;
  }

  const NAV_COLLAPSIBLE_CLASS = 'nav-collapsible';
  const NAV_OPEN_CLASS = 'nav-open';
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
    const collapse = html.classList.contains('in-android-app') || portraitQuery.matches;
    html.classList.toggle(NAV_COLLAPSIBLE_CLASS, collapse);

    if (!collapse) {
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

function initializeCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

initializeAndroidDetection();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeCollapsibleNav();
    initializeCurrentYear();
  });
} else {
  initializeCollapsibleNav();
  initializeCurrentYear();
}
