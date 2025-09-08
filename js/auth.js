document.addEventListener("DOMContentLoaded", () => {
    const authArea = document.getElementById("authArea");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        // Mostrar saludo y botón salir
        authArea.innerHTML = `
            <a href="carrito.html"><span class="material-icons">shopping_cart</span></a>
            <span style="color:#39FF14; margin-left:10px;">¡Hola, ${user.nombre}!</span>
            <button id="logoutBtn" class="btn btn-sm btn-danger" style="margin-left:10px;">Salir</button>
        `;

        // Acción de salir
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    } else {
        // Si no hay sesión, mostrar login normal
        authArea.innerHTML = `
            <a href="carrito.html"><span class="material-icons">shopping_cart</span></a>
            <a href="login.html"><span class="material-icons">person</span></a>
        `;
    }
});