// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto (o aumentar cantidad)
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id == id);
  if (!producto) return;

  const item = carrito.find(p => p.id == id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
}


// Disminuir cantidad
function disminuirCantidad(id) {
  const item = carrito.find(p => p.id == id);
  if (!item) return;

  item.cantidad--;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id != id);
  }

  guardarCarrito();
  mostrarCarrito();
}

// Eliminar producto
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id != id);
  guardarCarrito();
  mostrarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

// Calcular total
function calcularTotal() {
  return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

// Mostrar carrito en el DOM
const contenedorCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total");

function mostrarCarrito() {
  if (!contenedorCarrito) return;

  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p class='text-center'>🛒 El carrito está vacío</p>";
    totalCarrito.textContent = "0";
    return;
  }

  carrito.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "card mb-3 p-3 d-flex flex-column flex-md-row justify-content-between align-items-center carrito-item";

    itemDiv.innerHTML = `
      <div class="d-flex align-items-center mb-2 mb-md-0">
        <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid me-3 carrito-img">
        <div>
          <h6 class="mb-1">${item.nombre}</h6>
          <p class="mb-0">Precio: $${item.precio.toLocaleString('es-CL')} CLP</p>
          <p class="mb-0">Subtotal: $${(item.precio * item.cantidad).toLocaleString('es-CL')} CLP</p>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary btn-disminuir">➖</button>
        <span class="cantidad">${item.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary btn-aumentar">➕</button>
        <button class="btn btn-sm btn-danger ms-3 btn-eliminar">🗑️</button>
      </div>
    `;

    // Agregar eventos a los botones
    itemDiv.querySelector(".btn-disminuir").addEventListener("click", () => disminuirCantidad(item.id));
    itemDiv.querySelector(".btn-aumentar").addEventListener("click", () => agregarAlCarrito(item.id));
    itemDiv.querySelector(".btn-eliminar").addEventListener("click", () => eliminarProducto(item.id));

    contenedorCarrito.appendChild(itemDiv);
  });

  totalCarrito.textContent = calcularTotal().toLocaleString('es-CL');
}

// Botón pagar
const btnPagar = document.getElementById("btn-pagar");

if (btnPagar) {
  btnPagar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("🛒 Tu carrito está vacío. Agrega productos antes de pagar.");
      return;
    }

    const total = calcularTotal().toLocaleString('es-CL');

    // Simulación de pago
    const confirmar = confirm(`El total a pagar es $${total} CLP. ¿Deseas confirmar el pago?`);

    if (confirmar) {
      alert("✅ ¡Pago realizado con éxito! Gracias por tu compra.");
      vaciarCarrito();
    }
  });
}



// Inicializar visualización
if (contenedorCarrito) {
  mostrarCarrito();
}

