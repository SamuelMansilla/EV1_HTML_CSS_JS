// Clave en localStorage
const STORAGE_KEY = "usuarios_levelup";

// Usuarios iniciales
let usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: "U001", nombre: "Juan Pérez", email: "juan@example.com", rol: "cliente" },
  { id: "U002", nombre: "María López", email: "maria@example.com", rol: "vendedor" },
  { id: "U003", nombre: "Admin", email: "admin@example.com", rol: "administrador" }
];

// Guardar iniciales si no hay nada
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

// Función para renderizar la tabla de usuarios
function renderUsuarios() {
  const tabla = document.getElementById("tabla-usuarios");
  tabla.innerHTML = "";

  usuarios.forEach(user => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nombre}</td>
      <td>${user.email}</td>
      <td>${user.rol}</td>
      <td>
        <button class="btn btn-danger btn-sm eliminar" data-id="${user.id}">Eliminar</button>
      </td>
    `;

    // Botón eliminar
    tr.querySelector(".eliminar").addEventListener("click", () => {
      eliminarUsuario(user.id);
    });

    tabla.appendChild(tr);
  });
}

// Agregar nuevo usuario
const formUsuario = document.getElementById("form-usuario");
formUsuario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevo = {
    id: document.getElementById("id").value.trim(),
    nombre: document.getElementById("nombre").value.trim(),
    email: document.getElementById("email").value.trim(),
    rol: document.getElementById("rol").value
  };

  usuarios.push(nuevo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
  renderUsuarios();
  formUsuario.reset();
});

// Eliminar usuario
function eliminarUsuario(id) {
  usuarios = usuarios.filter(u => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
  renderUsuarios();
}

// Inicializar tabla
renderUsuarios();
