let listaBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
let imagenBlogBase64 = "";

// ======================
// MOSTRAR BLOGS
// ======================
function mostrarBlogsAdmin(){
  const tabla = document.getElementById("tablaBlogs");
  tabla.innerHTML = "";

  listaBlogs.forEach((b,index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${b.id}</td>
      <td>${b.titulo}</td>
      <td>${b.autor}</td>
      <td>${b.fecha}</td>
      <td><img src="${b.imagen}" width="100"></td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editarBlog(${index})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="eliminarBlog(${index})">🗑️</button>
      </td>
    `;
    tabla.appendChild(tr);
  });

  localStorage.setItem("blogs", JSON.stringify(listaBlogs));
}

// ======================
// GUARDAR BLOG
// ======================
document.getElementById("formBlog").addEventListener("submit",function(e){
  e.preventDefault();

  const id = document.getElementById("blogId").value;
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const fecha = document.getElementById("fecha").value;
  const contenido = document.getElementById("contenido").value;
  const imagen = imagenBlogBase64 || "../img/default.jpg";

  if(id){
    const index = listaBlogs.findIndex(b=>b.id==id);
    listaBlogs[index] = { id:parseInt(id), titulo, autor, fecha, contenido, imagen };
  } else {
    const nuevoId = listaBlogs.length>0 ? Math.max(...listaBlogs.map(b=>b.id))+1 : 1;
    listaBlogs.push({ id:nuevoId, titulo, autor, fecha, contenido, imagen });
  }

  mostrarBlogsAdmin();
  limpiarFormularioBlog();
});

// ======================
// EDITAR BLOG
// ======================
function editarBlog(index){
  const b = listaBlogs[index];
  document.getElementById("blogId").value = b.id;
  document.getElementById("titulo").value = b.titulo;
  document.getElementById("autor").value = b.autor;
  document.getElementById("fecha").value = b.fecha;
  document.getElementById("contenido").value = b.contenido;
  imagenBlogBase64 = b.imagen;
  document.getElementById("previewBlog").innerHTML = `<img src="${b.imagen}" class="img-thumbnail" width="100">`;
}

// ======================
// ELIMINAR BLOG
// ======================
function eliminarBlog(index){
  if(confirm("¿Seguro que deseas eliminar este blog?")){
    listaBlogs.splice(index,1);
    mostrarBlogsAdmin();
  }
}

// ======================
// LIMPIAR FORMULARIO
// ======================
function limpiarFormularioBlog(){
  document.getElementById("formBlog").reset();
  document.getElementById("blogId").value = "";
  imagenBlogBase64 = "";
  document.getElementById("previewBlog").innerHTML = "";
}

// ======================
// DRAG & DROP IMAGEN
// ======================
function handleDragOverBlog(e){
  e.preventDefault();
  e.currentTarget.classList.add("bg-secondary","text-white");
}
function handleDropBlog(e){
  e.preventDefault();
  e.currentTarget.classList.remove("bg-secondary","text-white");
  handleFileBlog(e.dataTransfer.files);
}
function handleFileBlog(files){
  const file = files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(e){
      imagenBlogBase64 = e.target.result;
      document.getElementById("previewBlog").innerHTML = `<img src="${imagenBlogBase64}"  width="100">`;
    };
    reader.readAsDataURL(file);
  }
}

// ======================
// INICIALIZAR
// ======================
window.onload = mostrarBlogsAdmin;
