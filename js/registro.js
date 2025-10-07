// Escuchar el evento submit del formulario de registro
document.getElementById("formRegistro").addEventListener("submit", function(e) {
  e.preventDefault(); // Evitar recarga de página al enviar el formulario

  // Obtener los valores ingresados por el usuario
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Cargar lista de usuarios desde localStorage o un array vacío si no existe
  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si el email ya está registrado
  if (listaUsuarios.some(u => u.email === email)) {
    alert("⚠️ Este correo ya está registrado.");
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
