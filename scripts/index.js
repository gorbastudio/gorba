/**
 * Main application entry point
 * Orchestrates module initialization and app startup
 */

import { initializeAndroidDetection } from './modules/android.js';
import { initializeCollapsibleNav } from './modules/navigation.js';
import { initializeCurrentYear } from './modules/utils.js';

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
