document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm form");
    const registerForm = document.querySelector("#registerFormElement");

    // Alternar entre login y registro
    window.toggleForms = function () {
        const loginBox = document.getElementById("loginForm");
        const registerBox = document.getElementById("registerForm");

        if (loginBox.style.display === "none") {
            loginBox.style.display = "block";
            registerBox.style.display = "none";
        } else {
            loginBox.style.display = "none";
            registerBox.style.display = "block";
        }
    };

    // Registro con rol y guardado en localStorage
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("registerUsername").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const role = document.getElementById("registerRole").value;

        if (!role) {
            alert("Por favor selecciona un rol.");
            return;
        }

        const user = { username, email, password, role };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
        toggleForms();
    });

    // Login con validación y redirección por rol
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === email && user.password === password) {
            alert(`Bienvenido ${user.username}`);

            if (user.role === "admin") {
                window.location.href = "/admin/index.html";
            } else {
                window.location.href = "/index.html";
            }
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
});
