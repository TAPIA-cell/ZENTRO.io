// Obtener usuarios desde localStorage
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Guardar usuarios en localStorage
function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Mostrar usuarios en la tabla
function mostrarUsuarios() {
  const usuarios = obtenerUsuarios();
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = "";

  usuarios.forEach((u, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.id}</td>
      <td><input type="text" class="form-control" value="${u.nombre}" id="nombre-${index}"></td>
      <td><input type="email" class="form-control" value="${u.email}" id="email-${index}"></td>
      <td>
        <select class="form-select" id="rol-${index}">
          <option value="Cliente" ${u.rol === "Cliente" ? "selected" : ""}>Cliente</option>
          <option value="Admin" ${u.rol === "Admin" ? "selected" : ""}>Admin</option>
        </select>
      </td>
      <td>
        <input type="text" class="form-control" 
          value="${u.rol === "Admin" ? u.password : "******"}" 
          id="pass-${index}" ${u.rol !== "Admin" ? "readonly" : ""}>
      </td>
      <td>
        <button class="btn btn-success btn-sm me-1" onclick="guardarUsuario(${index})">💾 Guardar</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">🗑️ Borrar</button>
      </td>
    `;
    tabla.appendChild(tr);
  });
}

// Guardar cambios de un usuario
function guardarUsuario(index) {
  const usuarios = obtenerUsuarios();

  const nombre = document.getElementById(`nombre-${index}`).value;
  const email = document.getElementById(`email-${index}`).value;
  const rol = document.getElementById(`rol-${index}`).value;
  let password = document.getElementById(`pass-${index}`).value;

  // Mantener contraseña si no es Admin y no se cambia
  if (password === "******" && usuarios[index].rol !== "Admin") {
    password = usuarios[index].password;
  }

  usuarios[index] = { ...usuarios[index], nombre, email, rol, password };
  guardarUsuarios(usuarios);
  mostrarUsuarios();
  alert("✅ Usuario actualizado correctamente.");
}

// Eliminar usuario
function eliminarUsuario(index) {
  const usuarios = obtenerUsuarios();
  if (confirm("¿Seguro que deseas eliminar este usuario?")) {
    usuarios.splice(index, 1);
    guardarUsuarios(usuarios);
    mostrarUsuarios();
  }
}

// Inicializar tabla al cargar la página
document.addEventListener("DOMContentLoaded", mostrarUsuarios);
