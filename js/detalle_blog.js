// detalle_blog.js
const contenedor = document.getElementById("detalle-blog");

// Obtener ID del query string
const params = new URLSearchParams(window.location.search);
const blogId = params.get("id");

if (!contenedor) throw new Error("Contenedor de detalle no encontrado");

const blog = blogs.find(b => b.id === blogId);

if (blog) {
  contenedor.innerHTML = `
    <h1 class="mb-3">${blog.titulo}</h1>
    <p class="text-muted">Por ${blog.autor} - ${blog.fecha}</p>
    <img src="${blog.imagen}" class="img-fluid mb-4" alt="${blog.titulo}">
    <p>${blog.contenido}</p>
    <a href="blogs.html" class="btn btn-secondary mt-3">← Volver a Blogs</a>
  `;
} else {
  contenedor.innerHTML = `<p class="text-danger">Blog no encontrado.</p>`;
}
