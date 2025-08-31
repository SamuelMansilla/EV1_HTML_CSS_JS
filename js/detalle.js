// obtener el id desde la URL
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

// buscar el producto en el arreglo
const producto = productos.find(p => p.id === idProducto);

const contenedor = document.getElementById("detalle-producto");

if (producto) {
  contenedor.innerHTML = `
    <div class="col-md-6">
      <img src="${producto.imagen}" class="img-fluid rounded shadow" alt="${producto.nombre}">
    </div>
    <div class="col-md-6">
      <h2>${producto.nombre}</h2>
      <p class="lead">$${producto.precio}</p>
      <p>${producto.descripcion || "Sin descripción disponible"}</p>
      <button class="btn btn-success btn-lg" onclick="agregarAlCarrito('${producto.id}')">
        Añadir al carrito
      </button>
    </div>
  `;
} else {
  contenedor.innerHTML = `<p class="text-danger">❌ Producto no encontrado</p>`;
}
