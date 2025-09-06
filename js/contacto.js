document.getElementById("form-contacto").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const comentario = document.getElementById("comentario").value.trim();
  const mensaje = document.getElementById("mensaje-formulario");

  const correoValido = /@duoc\.cl$|@profesor\.duoc\.cl$|@gmail\.com$/;

  let errores = [];

  if (!nombre || nombre.length > 100) {
    errores.push("⚠️ El nombre es obligatorio y debe tener máximo 100 caracteres.");
  }

  if (!correo || correo.length > 100 || !correoValido.test(correo)) {
    errores.push("⚠️ El correo debe tener máximo 100 caracteres y ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
  }

  if (!comentario || comentario.length > 500) {
    errores.push("⚠️ El comentario es obligatorio y debe tener máximo 500 caracteres.");
  }

  if (errores.length > 0) {
    mensaje.innerHTML = `<div class="alert alert-danger">${errores.join("<br>")}</div>`;
    return;
  }

  mensaje.innerHTML = `<div class="alert alert-success">✅ Formulario enviado correctamente. ¡Gracias por contactarnos!</div>`;
  this.reset();
});
