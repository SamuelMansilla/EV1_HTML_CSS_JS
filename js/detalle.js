// detalle.js

// Obtener el code del producto desde la URL
const params = new URLSearchParams(window.location.search);
const codeProducto = params.get("code");

// Buscar el producto en el arreglo products
const producto = products.find(p => p.code === codeProducto);

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
function agregarAlCarrito(code) {
  const cantidadInput = document.getElementById("cantidad-producto");
  const cantidad = parseInt(cantidadInput.value) || 1;

  const item = carrito.find(p => p.code === code);
  const productoEncontrado = products.find(p => p.code === code);
  if (!productoEncontrado) return;

  if (item) {
    item.quantity += cantidad;
  } else {
    carrito.push({ ...productoEncontrado, quantity: cantidad });
  }

  guardarCarrito();
  alert(`✅ ${productoEncontrado.name} x${cantidad} agregado(s) al carrito`);
}

// Mostrar detalle del producto
if (producto && contenedor) {
  const detalleDiv = document.createElement("div");
  detalleDiv.className = "card-detalle row";

  detalleDiv.innerHTML = `
    <div class="col-md-6 img-container">
      <img src="${producto.image}" alt="${producto.name}" class="img-fluid">
    </div>
    <div class="col-md-6 info">
      <h2>${producto.name}</h2>
      <p class="lead">$${producto.price.toLocaleString('es-CL')} CLP</p>
      <p class="descripcion">${producto.description || "Sin descripción disponible"}</p>
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
  boton.addEventListener("click", () => agregarAlCarrito(producto.code));

} else if (contenedor) {
  contenedor.innerHTML = `<p class="text-danger">❌ Producto no encontrado</p>`;
}

// Inicializar carrito
cargarCarrito();
