/**
 * Main application entry point
 * Orchestrates module initialization and app startup
 */

import { initializeAndroidDetection } from './modules/android.js';
import { initializeCollapsibleNav } from './modules/navigation.js';
import { initializeCurrentYear } from './modules/utils.js';
import { initializeContactForm } from './modules/contact.js';

initializeAndroidDetection();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeCollapsibleNav();
    initializeCurrentYear();
    initializeContactForm();
  });
} else {
  initializeCollapsibleNav();
  initializeCurrentYear();
  initializeContactForm();
}