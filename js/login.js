document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm form");
    const registerForm = document.querySelector("#registerFormElement");

    // Cambiar entre login y registro
    window.toggleForms = function() {
        document.getElementById("loginForm").style.display =
            document.getElementById("loginForm").style.display === "none" ? "block" : "none";
        document.getElementById("registerForm").style.display =
            document.getElementById("registerForm").style.display === "block" ? "none" : "block";
    };

    // Registro con rol
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

        // Guardar usuario simulado en localStorage
        const user = { username, email, password, role };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
        toggleForms();
    });

    // Login con redirección según rol
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === email && user.password === password) {
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
