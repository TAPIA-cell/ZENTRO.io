window.onload = function () { 
  // Se ejecuta cuando la página termina de cargar

  // Obtener la lista de productos desde localStorage, o un array vacío si no existe
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  // Obtener la lista de usuarios desde localStorage, o un array vacío si no existe
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Obtener la lista de ventas desde localStorage, o un array vacío si no existe
  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  // Actualiza el contenido del elemento con id "totalProductos" con la cantidad de productos
  document.getElementById("totalProductos").textContent = productos.length;

  // Actualiza el contenido del elemento con id "totalUsuarios" con la cantidad de usuarios
  document.getElementById("totalUsuarios").textContent = usuarios.length;

  // Actualiza el contenido del elemento con id "totalVentas" con la cantidad de ventas
  document.getElementById("totalVentas").textContent = ventas.length;

  document.getElementById("totalBlogs").textContent = blogs.length;
};
document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuarioActivo || usuarioActivo.rol !== "Admin") {
    // Si no hay sesión activa o no es admin, redirigir al login
    window.location.href = "../tienda/login.html";
  } else {
    // Mostrar nombre y rol en el sidebar
    document.getElementById("usuarioSidebar").textContent = usuarioActivo.nombre + " (" + usuarioActivo.rol + ")";
  }
});

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "../tienda/login.html";
}
