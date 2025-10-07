// ======================
// FUNCIONES AUXILIARES
// ======================

// Truncar texto largo
function truncarTexto(texto, maxCaracteres = 80) {
  if (texto.length <= maxCaracteres) return texto;
  return texto.substring(0, maxCaracteres) + "...";
}

// ======================
// CARRITO
// ======================
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("carrito-items");
  const totalElement = document.getElementById("carrito-total");
  const vacio = document.getElementById("carrito-vacio");
  const contenido = document.getElementById("carrito-contenido");

  if (!contenedor || !totalElement) return; // si no es carrito.html, salir

  contenedor.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    vacio.classList.remove("d-none");
    contenido.classList.add("d-none");
    return;
  }

  vacio.classList.add("d-none");
  contenido.classList.remove("d-none");

  carrito.forEach((item, index) => {
    total += item.precio * item.cantidad;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${item.imagenes[0]}" width="60" style="object-fit:contain;"></td>
      <td style="max-width: 200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
        ${truncarTexto(item.nombre, 30)}
      </td>
      <td>$${item.precio}</td>
      <td>
        <input type="number" min="1" value="${item.cantidad}" class="form-control w-50 mx-auto"
               onchange="cambiarCantidad(${index}, this.value)">
      </td>
      <td>$${item.precio * item.cantidad}</td>
      <td><button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">❌</button></td>
    `;
    contenedor.appendChild(tr);
  });

  totalElement.textContent = total;
}

function agregarAlCarrito(id) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find(p => p.id === id);

  const existe = carrito.find(item => item.id === id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  alert("Producto añadido al carrito ✅");
}

function eliminarDelCarrito(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
  actualizarContadorCarrito();
}

function cambiarCantidad(index, nuevaCantidad) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito[index].cantidad = parseInt(nuevaCantidad);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  cargarCarrito();
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contadorCarrito");
  if (contador) contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

// ======================
// FINALIZAR COMPRA / ADMIN VENTAS
// ======================
function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo")) || { nombre: "Invitado" };

  if (carrito.length === 0) {
    alert("El carrito está vacío ⚠️");
    return;
  }

  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  const nuevaVenta = {
    id: ventas.length > 0 ? Math.max(...ventas.map(v => v.id)) + 1 : 1,
    usuario: usuarioActivo.nombre,
    items: carrito,
    total: carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0),
    fecha: new Date().toLocaleString()
  };

  ventas.push(nuevaVenta);
  localStorage.setItem("ventas", JSON.stringify(ventas));

  alert("Compra realizada ✅");
  vaciarCarrito();
}

// ======================
// ADMIN VENTAS
// ======================
function mostrarVentasAdmin() {
  const contenedor = document.getElementById("tablaVentas");
  if (!contenedor) return;

  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  contenedor.innerHTML = "";

  ventas.forEach(v => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.id}</td>
      <td>${v.usuario}</td>
      <td>${v.items.map(i => i.nombre + " x" + i.cantidad).join(", ")}</td>
      <td>$${v.total}</td>
      <td>${v.fecha}</td>
    `;
    contenedor.appendChild(tr);
  });
}

// ======================
// LISTADO DE PRODUCTOS
// ======================
function mostrarProductos(lista) {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;

  let productos = JSON.parse(localStorage.getItem("productos")) || [];
  const productosAMostrar = lista || productos;

  contenedor.innerHTML = "";
  productosAMostrar.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("col-md-3");
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.imagenes[0]}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">${truncarTexto(p.descripcion, 80)}</p>
          <h6 class="text-success mb-3">$${p.precio}</h6>
          <div class="mt-auto">
            <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Añadir</button>
            <a href="detalleProducto.html?id=${p.id}" class="btn btn-outline-secondary">Ver</a>
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

// ======================
// FILTROS Y ORDEN
// ======================
const inputBuscar = document.getElementById("buscar");
if (inputBuscar) {
  inputBuscar.addEventListener("keyup", () => {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(inputBuscar.value.toLowerCase()));
    mostrarProductos(filtrados);
  });
}

const selectOrdenar = document.getElementById("ordenar");
if (selectOrdenar) {
  selectOrdenar.addEventListener("change", () => {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let listaOrdenada = [...productos];
    if (selectOrdenar.value === "precioAsc") listaOrdenada.sort((a, b) => a.precio - b.precio);
    else if (selectOrdenar.value === "precioDesc") listaOrdenada.sort((a, b) => b.precio - a.precio);
    mostrarProductos(listaOrdenada);
  });
}

// ======================
// DETALLE DE PRODUCTO
// ======================
function mostrarDetalleProducto() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const producto = productos.find(p => p.id === id);

  const contenedor = document.getElementById("detalle");
  if (!contenedor) return;

  if (!producto) {
    contenedor.innerHTML = `<div class="alert alert-danger">Producto no encontrado</div>`;
    return;
  }

  // carrusel con las imágenes
  const itemsCarousel = producto.imagenes.map((img, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img src="${img}" class="detalle-img" alt="${producto.nombre}">
    </div>
  `).join('');

  contenedor.innerHTML = `
    <div class="col-md-6">
      <div id="carouselProducto" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${itemsCarousel}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselProducto" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselProducto" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
    </div>
    <div class="col-md-6">
      <h2>${producto.nombre}</h2>
      <p>${producto.descripcion}</p>
      <h4 class="text-success">$${producto.precio.toLocaleString('es-CL')}</h4>
      <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
    </div>
  `;

  // productos relacionados
  const relatedContainer = document.getElementById("relatedProducts");
  relatedContainer.innerHTML = productos
    .filter(p => p.id !== producto.id)
    .map(rel => `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${rel.imagenes[0]}" class="card-img-top" alt="${rel.nombre}">
          <div class="card-body text-center">
            <h5 class="card-title">${rel.nombre}</h5>
            <h6 class="text-success">$${rel.precio.toLocaleString('es-CL')}</h6>
            <a href="detalleProducto.html?id=${rel.id}" class="btn btn-outline-primary btn-sm">Ver detalle</a>
          </div>
        </div>
      </div>
    `).join('');
}



// ======================
// INICIALIZAR
// ======================
window.onload = function () {
  actualizarContadorCarrito();
  if (document.getElementById("lista-productos")) mostrarProductos();
  if (document.getElementById("detalle")) mostrarDetalleProducto();
  if (document.getElementById("carrito-items")) cargarCarrito();
  if (document.getElementById("tablaVentas")) mostrarVentasAdmin();
};
