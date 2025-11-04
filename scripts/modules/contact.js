/**
 * Contact form module
 * Handles contact form submission and validation
 */

import { sendContactEmail } from './email.js';

/**
 * Initializes contact form functionality
 */
export function initializeContactForm() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactForm);
  } else {
    setupContactForm();
  }
}

/**
 * Sets up the contact form event listeners and functionality
 */
function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) {
    console.warn('Contact form not found on this page');
    return;
  }
  
  // Add submit event listener
  contactForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Handles form submission
 * @param {Event} event - Submit event
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';
  
  try {
    // Create FormData object
    const formData = new FormData(form);
    
    // Send email
    const response = await sendContactEmail(formData);
    
    if (response.success) {
      // Show success message
      showFormMessage(form, '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
      form.reset();
    } else {
      // Show error message
      showFormMessage(form, 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    showFormMessage(form, 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
  } finally {
    // Restore button state
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

/**
 * Shows a message in the form
 * @param {HTMLElement} form - Form element
 * @param {string} message - Message to display
 * @param {string} type - Type of message (success or error)
 */
function showFormMessage(form, message, type) {
  // Remove any existing messages
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message form-message--${type}`;
  messageElement.textContent = message;
  
  // Add message to form (before the note)
  const formNote = form.querySelector('.form-note');
  if (formNote) {
    form.insertBefore(messageElement, formNote);
  } else {
    form.appendChild(messageElement);
  }
  
  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.remove();
    }
  }, 5000);
}