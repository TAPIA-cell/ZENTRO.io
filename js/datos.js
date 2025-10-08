// ======================
// PRODUCTOS BASE
// ======================
const productosBase = [
  { 
    id: 1, 
    nombre: "One Piece RORONOA ZORO THREE SWORDS set (Wado Ichimonji, Sandai Kitetsu, Enma) 1/1 PROPLICA", 
    precio: 679990, 
    imagenes: ["../img/roronoa2.webp", "../img/roronoa3.webp", "../img/roronoa.webp"], 
    descripcion: "Personaje: THREE SWORDS set Fabricante: Bandai – Tamashii Nations.Linea: PROPLICA Tamaño: 95 centímetros de largo" 
  },
  { 
    id: 2, 
    nombre: "One Piece Soul of Chogokin General Franky GX-63 Bandai ", 
    precio: 820000, 
    imagenes: ["../img/frank.webp", "../img/frank2.webp", "../img/frank3.webp"], 
    descripcion: "El set incluye: cuerpo Shogun, espada Franky, piezas de black rhinoceros,Cabina Burakiotanku, Burakiotanku para Chopper, pedestal." 
  },
  { 
    id: 3, 
    nombre: "T-51 Nuka Cola Power Armor THREE ZERO", 
    precio: 350000, 
    imagenes: ["../img/nuka.webp", "../img/nuka2.webp", "../img/nuka3.webp"], 
    descripcion: "Personaje: T-51 Nuka Cola Power Armor Fabricante: Three Zero. Linea: Fallout. Tamaño: 30 centímetros de alto." 
  },
  { 
    id: 4, 
    nombre: "Malenia Blade of Miquella Figura de acción de 1/6 escala", 
    precio: 450000, 
    imagenes: ["../img/malenia.webp", "../img/malenia2.webp", "../img/malenia3.webp"], 
    descripcion: "Chaqueta impermeable y abrigada." 
  },
  { 
    id: 5, 
    nombre: "Figura Erotica Rubia", 
    precio: 800000000, 
    imagenes: ["../img/aa3-3.jpg", "../img/aa2-3.jpg", "../img/aa4-3.jpg"], 
    descripcion: "Figura erótica de mujer rubia." 
  },
  { 
    id: 6, 
    nombre: "Fullmetal Alchemist: Brotherhood Edward and Alphonse", 
    precio: 180000, 
    imagenes: ["../img/fmab.webp", "../img/fmab2.webp", "../img/fmab3.webp"], 
    descripcion: "Figura de los hermanos Elric de Fullmetal Alchemist." 
  },
  { 
    id: 7, 
    nombre: "Vestido estilo gotico", 
    precio: 18000, 
    imagenes: ["../img/cariñosa1.webp", "../img/cariñosa2.webp", "../img/cariñosa3.webp"], 
    descripcion: "vestido estilo gotico con encaje y lazo." 
  },
  { 
    id: 8, 
    nombre: "Katanas", 
    precio: 50000, 
    imagenes: ["../img/espada.png", "../img/espada2.png", "../img/Tengoku No Raito.png"], 
    descripcion: "Katanas de colección, réplicas de anime." 
  }
];

// ======================
// USUARIOS BASE
// ======================
const usuariosBase = [
  { 
    id: 1, 
    nombre: "Administrador", 
    email: "admin@tienda.cl", 
    password: "admin123", 
    rol: "Admin" 
  }
];

// ======================
// BLOGS BASE
// ======================
const blogsBase = [
  {
    id: 1,
    titulo: "Mi primer blog",
    autor: "Jose Tapia",
    fecha: "2025-09-23",
    imagen: "../img/Comercio.jpg",
    contenido: "Este es el contenido de prueba de mi primer blog."
  }
];

// ======================
// CARGA EN LOCALSTORAGE
// ======================

// Productos
if (!localStorage.getItem("productos")) {
  localStorage.setItem("productos", JSON.stringify(productosBase));
}

// Usuarios
if (!localStorage.getItem("usuarios")) {
  localStorage.setItem("usuarios", JSON.stringify(usuariosBase));
}

// Blogs
if (!localStorage.getItem("blogs")) {
  localStorage.setItem("blogs", JSON.stringify(blogsBase));
}

// ======================
// VARIABLES GLOBALES
// ======================
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
