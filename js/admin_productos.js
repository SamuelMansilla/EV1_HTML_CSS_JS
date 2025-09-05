// Nombre de la clave en localStorage
const STORAGE_KEY = "productos_levelup";

// Lista inicial de productos
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

// Obtener productos de localStorage o usar iniciales
let productos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || productosIniciales;

// Referencias al DOM
const tablaProductos = document.getElementById("tabla-productos");
const formProducto = document.getElementById("form-producto");

// Guardar productos en localStorage
function guardarProductos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

// Función para renderizar la tabla
function renderTabla() {
  tablaProductos.innerHTML = "";

  productos.forEach(prod => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td>$${prod.precio.toLocaleString('es-CL')}</td>
      <td><img src="${prod.imagen}" alt="${prod.nombre}" width="50"></td>
      <td>
        <button class="btn btn-success btn-sm editar">Editar</button>
        <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
      </td>
    `;

    // Botón eliminar
    row.querySelector(".eliminar").addEventListener("click", () => {
      if (confirm(`¿Eliminar el producto "${prod.nombre}"?`)) {
        productos = productos.filter(p => p.id !== prod.id);
        guardarProductos();
        renderTabla();
      }
    });

    // Botón editar
    row.querySelector(".editar").addEventListener("click", () => {
      document.getElementById("id").value = prod.id;
      document.getElementById("nombre").value = prod.nombre;
      document.getElementById("precio").value = prod.precio;
      document.getElementById("imagen").value = prod.imagen;
      document.getElementById("descripcion").value = prod.descripcion;

      // Cambiar botón de agregar a actualizar temporalmente
      const btn = formProducto.querySelector("button[type='submit']");
      btn.textContent = "Actualizar Producto";

      // Evento temporal para actualizar
      const actualizar = (e) => {
        e.preventDefault();
        prod.id = document.getElementById("id").value.trim();
        prod.nombre = document.getElementById("nombre").value.trim();
        prod.precio = Number(document.getElementById("precio").value);
        prod.imagen = document.getElementById("imagen").value.trim() || "/img/nuevo.png";
        prod.descripcion = document.getElementById("descripcion").value.trim();

        guardarProductos();
        renderTabla();
        formProducto.reset();
        btn.textContent = "Agregar Producto";

        // Quitar el listener temporal
        formProducto.removeEventListener("submit", actualizar);
      };

      formProducto.addEventListener("submit", actualizar);
    });

    tablaProductos.appendChild(row);
  });
}

// Manejo del formulario para agregar producto nuevo
formProducto.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoProducto = {
    id: document.getElementById("id").value.trim(),
    nombre: document.getElementById("nombre").value.trim(),
    precio: Number(document.getElementById("precio").value),
    imagen: document.getElementById("imagen").value.trim() || "/img/nuevo.png",
    descripcion: document.getElementById("descripcion").value.trim()
  };

  // Verificar si el ID ya existe
  if (productos.some(p => p.id === nuevoProducto.id)) {
    alert("¡El ID del producto ya existe!");
    return;
  }

  productos.push(nuevoProducto);
  guardarProductos();
  renderTabla();
  formProducto.reset();
});

// Render inicial
renderTabla();
