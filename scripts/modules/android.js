/**
 * Android WebView integration module
 * Handles Android app detection, interface communication, and environment setup
 */

const androidFlagKey = 'gorba:android-info';

/**
 * Marks the current environment as running inside Android WebView
 * Communicates with AndroidInterface to retrieve device and app info
 */
export function markAndroidEnvironment() {
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

/**
 * Initializes Android detection on page load and window focus
 * Uses localStorage to cache Android environment state
 */
export function initializeAndroidDetection() {
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
