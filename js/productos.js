// Lista de productos
const productos = [
  { id: "JM001", nombre: "Catan", precio: 29990, imagen: "/img/catan.png", descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos" },
  { id: "JM002", nombre: "Carcassonne", precio: 24990, imagen: "/img/carcassone.webp", descripcion: "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender" },
  { id: "AC001", nombre: "Controlador Inalámbrico Xbox Series X", precio: 59990, imagen: "/img/mando xbox.png", descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC" },
  { id: "AC002", nombre: "Auriculares Gamer HyperX Cloud II", precio: 79990, imagen: "/img/audifonos hyperx.webp", descripcion: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego" },
  { id: "CO001", nombre: "PlayStation 5", precio: 549990, imagen: "/img/ps5.webp", descripcion: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva" },
  { id: "CG001", nombre: "PC Gamer ASUS ROG Strix", precio: 1299990, imagen: "/img/pc gamer.png", descripcion: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego" },
  { id: "SG001", nombre: "Silla Gamer Secretlab Titan", precio: 349990, imagen: "/img/silla gamer.webp", descripcion: "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas." },
  { id: "MS001", nombre: "Mouse Gamer Logitech G502 HERO", precio: 49990, imagen: "/img/mouse.webp", descripcion: "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización" },
  { id: "MP001", nombre: "Mousepad Razer Goliathus Extended Chroma", precio: 29990, imagen: "/img/mousepad.png", descripcion: "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse" },
  { id: "PP001", nombre: "Polera Gamer Personalizada 'Level-Up'", precio: 14990, imagen: "/img/polera.webp", descripcion: "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito." }
];

// Contenedor donde se muestran los productos
const contenedorProductos = document.getElementById("lista-productos");

if (contenedorProductos) {
  productos.forEach(prod => {
    // Crear tarjeta del producto
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

    // Agregar evento al botón de añadir al carrito
    const boton = card.querySelector(".agregar-carrito");
    boton.addEventListener("click", () => agregarAlCarrito(prod.id));

    // Agregar tarjeta al contenedor
    contenedorProductos.appendChild(card);
  });
}
