// Nombre de la clave en localStorage
const STORAGE_KEY = "productos_levelup";

// Productos iniciales (solo se usan si no hay nada en localStorage)
const productosIniciales = [
  { id: "JM001", nombre: "Catan", precio: 29990, imagen: "/img/catan.png", descripcion: "Un clásico juego de estrategia..." },
  { id: "JM002", nombre: "Carcassonne", precio: 24990, imagen: "/img/carcassone.webp", descripcion: "Un juego de colocación de fichas..." },
  { id: "AC001", nombre: "Controlador Inalámbrico Xbox Series X", precio: 59990, imagen: "/img/mando xbox.png", descripcion: "Ofrece una experiencia de juego cómoda..." },
  { id: "AC002", nombre: "Auriculares Gamer HyperX Cloud II", precio: 79990, imagen: "/img/audifonos hyperx.webp", descripcion: "Proporcionan un sonido envolvente..." },
  { id: "CO001", nombre: "PlayStation 5", precio: 549990, imagen: "/img/ps5.webp", descripcion: "La consola de última generación..." },
  { id: "CG001", nombre: "PC Gamer ASUS ROG Strix", precio: 1299990, imagen: "/img/pc gamer.png", descripcion: "Un potente equipo diseñado para gamers..." },
  { id: "SG001", nombre: "Silla Gamer Secretlab Titan", precio: 349990, imagen: "/img/silla gamer.webp", descripcion: "Diseñada para el máximo confort..." },
  { id: "MS001", nombre: "Mouse Gamer Logitech G502 HERO", precio: 49990, imagen: "/img/mouse.webp", descripcion: "Con sensor de alta precisión..." },
  { id: "MP001", nombre: "Mousepad Razer Goliathus Extended Chroma", precio: 29990, imagen: "/img/mousepad.png", descripcion: "Área de juego amplia con iluminación RGB..." },
  { id: "PP001", nombre: "Polera Gamer Personalizada 'Level-Up'", precio: 14990, imagen: "/img/polera.webp", descripcion: "Camiseta cómoda y estilizada..." }
];

// Obtener productos de localStorage o iniciales
let productos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || productosIniciales;

// Si no hay productos en localStorage, guardarlos
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

// Contenedor de productos
const contenedorProductos = document.getElementById("lista-productos");

if (contenedorProductos) {
  productos.forEach(prod => {
    const card = document.createElement("div");
    card.className = "card p-3 mb-3";

    card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="img-fluid mb-2">
      <h6>${prod.nombre}</h6>
      <p class="descripcion">${prod.descripcion || "Sin descripción disponible"}</p>
      <p class="precio">$${prod.precio.toLocaleString('es-CL')} CLP</p>
      <a href="detalle.html?id=${prod.id}" class="btn btn-primary mt-2">Ver detalle</a>
      <button class="btn btn-success mt-2 agregar-carrito">Añadir al carrito</button>
    `;

    // Botón añadir al carrito
    const boton = card.querySelector(".agregar-carrito");
    boton.addEventListener("click", () => agregarAlCarrito(prod.id));

    contenedorProductos.appendChild(card);
  });
}

// Función ejemplo de agregar al carrito
function agregarAlCarrito(id) {
  alert(`Producto ${id} añadido al carrito (simulación)`);
}
