// ======================
// VALIDACIÓN DE CORREO
// ======================

// Función para validar que el correo sea permitido
function validarCorreo(correo) {
  // Solo se permiten dominios: duoc.cl, profesor.duoc.cl y gmail.com
  const permitido = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return permitido.test(correo); // Devuelve true si cumple patrón
}

// ======================
// REGISTRO
// ======================
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
  formRegistro.addEventListener("submit", e => {
    e.preventDefault(); // Evitar recarga de página

    const correo = document.getElementById("correo").value;
    const pass = document.getElementById("password").value;

    if (!validarCorreo(correo)) {
      // Mostrar mensaje de error si correo no es válido
      document.getElementById("mensajeError").textContent =
        "Correo no válido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com";
    } else if (pass.length < 4 || pass.length > 10) {
      // Validar longitud de contraseña
      document.getElementById("mensajeError").textContent =
        "La contraseña debe tener entre 4 y 10 caracteres.";
    } else {
      // Registro exitoso
      alert("Registro exitoso ✅");
      formRegistro.reset(); // Limpiar formulario
    }
  });
}

// ======================
// LOGIN
// ======================
const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", e => {
    e.preventDefault(); // Evitar recarga de página

    const correo = document.getElementById("loginCorreo").value;
    const pass = document.getElementById("loginPassword").value;

    if (!validarCorreo(correo)) {
      // Mostrar mensaje si correo no válido
      document.getElementById("loginError").textContent = "Correo inválido.";
    } else if (pass.length < 4 || pass.length > 10) {
      // Validar longitud de contraseña
      document.getElementById("loginError").textContent =
        "Contraseña fuera de rango (4-10 caracteres).";
    } else {
      // Login exitoso
      alert("Login correcto ✅");
      formLogin.reset(); // Limpiar formulario
    }
  });
}

// ======================
// CONTACTO
// ======================
const formContacto = document.getElementById("formContacto");
if (formContacto) {
  formContacto.addEventListener("submit", e => {
    e.preventDefault(); // Evitar recarga de página

    const correo = document.getElementById("contactoCorreo").value;
    const comentario = document.getElementById("contactoComentario").value;

    if (!validarCorreo(correo)) {
      // Mostrar error si correo no válido
      document.getElementById("contactoError").textContent = "Correo inválido.";
    } else if (comentario.length > 500) {
      // Validar longitud del comentario
      document.getElementById("contactoError").textContent =
        "El comentario no puede superar 500 caracteres.";
    } else {
      // Mensaje enviado correctamente
      alert("Mensaje enviado ✅");
      formContacto.reset(); // Limpiar formulario
    }
  });
}
