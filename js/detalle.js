// detalle.js

// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

// Buscar el producto en el arreglo productos
const producto = productos.find(p => p.id === idProducto);

// Contenedor donde se mostrará el detalle
const contenedor = document.getElementById("detalle-producto");

// Inicializar carrito desde localStorage
let carrito = [];

// Cargar carrito guardado
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar al carrito según cantidad
function agregarAlCarrito(id) {
  const cantidadInput = document.getElementById("cantidad-producto");
  const cantidad = parseInt(cantidadInput.value) || 1;

  const item = carrito.find(p => p.id === id);
  const productoEncontrado = productos.find(p => p.id === id);
  if (!productoEncontrado) return;

  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ ...productoEncontrado, cantidad });
  }

  guardarCarrito();
  alert(`✅ ${productoEncontrado.nombre} x${cantidad} agregado(s) al carrito`);
}

// Mostrar detalle del producto
if (producto && contenedor) {
  const detalleDiv = document.createElement("div");
  detalleDiv.className = "card-detalle row";

  detalleDiv.innerHTML = `
    <div class="col-md-6 img-container">
      <img src="${producto.imagen}" alt="${producto.nombre}">
    </div>
    <div class="col-md-6 info">
      <h2>${producto.nombre}</h2>
      <p class="lead">$${producto.precio.toLocaleString('es-CL')} CLP</p>
      <p class="descripcion">${producto.descripcion || "Sin descripción disponible"}</p>
      <div class="mb-3 d-flex align-items-center gap-2">
        <label for="cantidad-producto" class="me-2">Cantidad:</label>
        <input type="number" id="cantidad-producto" min="1" value="1" class="form-control" style="width:80px;">
      </div>
      <button class="btn btn-success btn-lg" id="btn-agregar">Añadir al carrito</button>
    </div>
  `;

  contenedor.appendChild(detalleDiv);

  // Evento botón
  const boton = document.getElementById("btn-agregar");
  boton.addEventListener("click", () => agregarAlCarrito(producto.id));

} else if (contenedor) {
  contenedor.innerHTML = `<p class="text-danger">❌ Producto no encontrado</p>`;
}

// Inicializar carrito
cargarCarrito();
