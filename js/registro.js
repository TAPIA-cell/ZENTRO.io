// Escuchar el evento submit del formulario de registro
document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault(); // Evitar recarga de página al enviar el formulario

  // Primero, ejecutar las validaciones desde validaciones.js
  if (!validarFormularioRegistro()) {
    return; // Si la validación falla, detener el proceso de registro
  }

  // Obtener los valores ingresados por el usuario (después de la validación)
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("correo").value; // Usar 'correo' para coincidir con registro.html
  const password = document.getElementById("password").value;

  // Cargar lista de usuarios desde localStorage o un array vacío si no existe
  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si el email ya está registrado (esta validación se mantiene aquí ya que es parte de la lógica de negocio del registro)
  if (listaUsuarios.some(u => u.email === email)) {
    document.getElementById("mensajeError").textContent = "⚠️ Este correo ya está registrado.";
    return; // Salir si el correo ya existe
  }

  // Calcular nuevo ID para el usuario
  const nuevoId = listaUsuarios.length > 0 ? Math.max(...listaUsuarios.map(u => u.id)) + 1 : 1;

  // Crear nuevo objeto usuario
  const nuevoUsuario = {
    id: nuevoId,
    nombre,
    email,
    password,
    rol: "Cliente" // Todos los registros nuevos son clientes
  };

  // Agregar el nuevo usuario a la lista y guardar en localStorage
  listaUsuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

  alert("Usuario registrado correctamente ✅"); // Mensaje de confirmación
  document.getElementById("formRegistro").reset(); // Limpiar formulario
  window.location.href = "login.html"; // Redirigir a login
});
