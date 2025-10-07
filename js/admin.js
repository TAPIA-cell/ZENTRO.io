let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
let imagenesBase64 = []; // Array para múltiples imágenes

// ======================
// MOSTRAR PRODUCTOS
// ======================
function mostrarProductosAdmin(){
  const tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";

  listaProductos.forEach((p,index)=>{
    const tr = document.createElement("tr");
    const imgs = p.imagenes.map(img => `<img src="${img}" width="50" class="me-1 mb-1">`).join('');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio}</td>
      <td>${imgs}</td>
      <td>${p.descripcion}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">🗑️</button>
      </td>
    `;
    tabla.appendChild(tr);
  });

  localStorage.setItem("productos", JSON.stringify(listaProductos));
}

// ======================
// GUARDAR PRODUCTO
// ======================
document.getElementById("formProducto").addEventListener("submit",function(e){
  e.preventDefault();

  const id = document.getElementById("productoId").value;
  const nombre = document.getElementById("nombre").value;
  const precio = parseInt(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value;
  const imagenes = imagenesBase64.length ? imagenesBase64 : ["../img/default.jpg"];

  if(id){
    const index = listaProductos.findIndex(p=>p.id==id);
    listaProductos[index] = { id:parseInt(id), nombre, precio, descripcion, imagenes };
  } else {
    const nuevoId = listaProductos.length>0 ? Math.max(...listaProductos.map(p=>p.id))+1 : 1;
    listaProductos.push({ id:nuevoId, nombre, precio, descripcion, imagenes });
  }

  mostrarProductosAdmin();
  limpiarFormulario();
});

// ======================
// EDITAR PRODUCTO
// ======================
function editarProducto(index){
  const p = listaProductos[index];
  document.getElementById("productoId").value = p.id;
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("precio").value = p.precio;
  document.getElementById("descripcion").value = p.descripcion;

  imagenesBase64 = [...p.imagenes];
  mostrarPreview();
}

// ======================
// ELIMINAR PRODUCTO
// ======================
function eliminarProducto(index){
  if(confirm("¿Seguro que deseas eliminar este producto?")){
    listaProductos.splice(index,1);
    mostrarProductosAdmin();
  }
}

// ======================
// LIMPIAR FORMULARIO
// ======================
function limpiarFormulario(){
  document.getElementById("formProducto").reset();
  document.getElementById("productoId").value = "";
  imagenesBase64 = [];
  document.getElementById("preview").innerHTML = "";
}

// ======================
// DRAG & DROP + FILE INPUT
// ======================
function handleDragOver(e){
  e.preventDefault();
  e.currentTarget.classList.add("bg-secondary","text-white");
}
function handleDrop(e){
  e.preventDefault();
  e.currentTarget.classList.remove("bg-secondary","text-white");
  handleFiles(e.dataTransfer.files);
}
function handleFiles(files){
  for(const file of files){
    const reader = new FileReader();
    reader.onload = function(e){
      imagenesBase64.push(e.target.result);
      mostrarPreview();
    }
    reader.readAsDataURL(file);
  }
}
function mostrarPreview(){
  const preview = document.getElementById("preview");
  preview.innerHTML = "";
  imagenesBase64.forEach(img=>{
    const imgElem = document.createElement("img");
    imgElem.src = img;
    imgElem.className = "img-thumbnail";
    imgElem.width = 100;
    preview.appendChild(imgElem);
  });
}

// ======================
// INICIALIZAR
// ======================
window.onload = mostrarProductosAdmin;
