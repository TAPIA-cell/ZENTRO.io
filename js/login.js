document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = listaUsuarios.find(u => u.email === email && u.password === password);

  if (!usuario) {
    alert("❌ Usuario o contraseña incorrectos");
    return;
  }

  // Guardar sesión activa
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  alert("Bienvenido " + usuario.nombre + " ✅");

  // Redirigir según rol
  if (usuario.rol === "Admin") {
    window.location.href = "../admin/admin-home.html";  
  } else {
    window.location.href = "index.html";
  }
});
