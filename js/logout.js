// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo"); // Eliminar usuario activo del localStorage
  alert("Sesión cerrada correctamente 👋"); // Mensaje de confirmación
  window.location.href = "login.html"; // Redirigir a la página de login
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtener el usuario activo desde localStorage
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  // Obtener referencias a los elementos del navbar
  const navLogin = document.getElementById("navLogin");
  const navRegistro = document.getElementById("navRegistro");
  const navLogout = document.getElementById("navLogout");
  const navAdmin = document.getElementById("navAdmin");
  const bienvenida = document.getElementById("usuarioBienvenida");

  if (usuarioActivo) {
    // Si hay usuario activo, mostrar su nombre y ajustar visibilidad de botones
    if (bienvenida) bienvenida.textContent = "👤 " + usuarioActivo.nombre;
    if (navLogin) navLogin.classList.add("d-none"); // Ocultar login
    if (navRegistro) navRegistro.classList.add("d-none"); // Ocultar registro
    if (navLogout) navLogout.classList.remove("d-none"); // Mostrar botón logout

    // Mostrar botón Admin si el usuario tiene rol Admin
    if (usuarioActivo.rol === "Admin" && navAdmin) {
      navAdmin.classList.remove("d-none");
    }
  } else {
    // Si no hay usuario activo, mostrar login/registro y ocultar logout/Admin
    if (bienvenida) bienvenida.textContent = "";
    if (navLogin) navLogin.classList.remove("d-none");
    if (navRegistro) navRegistro.classList.remove("d-none");
    if (navLogout) navLogout.classList.add("d-none");
    if (navAdmin) navAdmin.classList.add("d-none");
  }
});
