// Guardar correos localmente con localStorage
document.getElementById("newsletterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const emailInput = document.getElementById("emailInput");
  const message = document.getElementById("message");
  const email = emailInput.value.trim();

  if (!email) {
    message.textContent = "Por favor, escribe un correo válido.";
    return;
  }

  // Obtener lista existente de suscripciones
  const saved = JSON.parse(localStorage.getItem("suscriptores")) || [];

  if (saved.includes(email)) {
    message.textContent = "Ya estás suscrito al boletín ✅";
  } else {
    saved.push(email);
    localStorage.setItem("suscriptores", JSON.stringify(saved));
    message.textContent = "¡Gracias por suscribirte! 🎉";
  }

  emailInput.value = "";
});
