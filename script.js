function saludar() {
    const nombre = document.getElementById('nombre').value;
    if (nombre.trim() !== "") {
      alert(`¡Hola, ${nombre}! Gracias por visitar mi página.`);
    } else {
      alert("Por favor, escribe tu nombre.");
    }
  }
  