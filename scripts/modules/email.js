/**
 * Email module
 * Handles email sending through SendGrid API via Cloudflare Worker
 */

/**
 * Sends contact form data through Cloudflare Worker -> SendGrid
 * @param {FormData} formData - Form data from contact form
 * @returns {Promise<Object>} API response
 */
export async function sendContactEmail(formData) {
  try {
    // Enviar datos al Cloudflare Worker
    const response = await fetch('https://sendgrid-email-handler.YOUR_SUBDOMAIN.workers.dev', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Error al enviar el mensaje');
    }
    
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error.message || 'Error de conexión. Por favor, inténtalo más tarde.'
    };
  }
}

// Función placeholder para mantener compatibilidad
export async function sendEmail(emailData) {
  // Esta función no se usa directamente en el formulario de contacto
  // pero se mantiene por compatibilidad
  console.warn('sendEmail function is deprecated for contact form. Use sendContactEmail instead.');
  return {
    success: false,
    message: 'Función no implementada para uso directo'
  };
}