// ======================
// VERIFICAR ACCESO ADMIN
// ======================
function soloAdmin() {
  // Obtener el usuario activo desde localStorage
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  // Si no hay usuario activo, redirigir al login
  if (!usuarioActivo) {
    alert("⚠️ Debes iniciar sesión para acceder."); // Mensaje de advertencia
    window.location.href = "login.html"; // Redirigir a página de login
    return; // Detener ejecución
  }

  // Si el usuario activo no es Admin, impedir acceso
  if (usuarioActivo.rol !== "Admin") {
    alert("⛔ No tienes permisos para acceder a esta sección."); // Mensaje de acceso denegado
    window.location.href = "index.html"; // Redirigir a la página principal
    return; // Detener ejecución
  }
}
