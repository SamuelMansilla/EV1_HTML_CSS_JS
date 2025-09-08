document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm form");
  const registerForm = document.querySelector("#registerFormElement");

  // Alternar entre login y registro
  window.toggleForms = function () {
    const loginBox = document.getElementById("loginForm");
    const registerBox = document.getElementById("registerForm");

    loginBox.style.display = loginBox.style.display === "none" ? "block" : "none";
    registerBox.style.display = registerBox.style.display === "none" ? "block" : "none";
  };

  // Mostrar y limpiar errores
  function showError(input, message) {
    let error = input.parentNode.querySelector(".error");
    if (!error) {
      error = document.createElement("span");
      error.className = "error";
      input.parentNode.appendChild(error);
    }
    error.textContent = message;
    error.style.color = "red";
    error.style.fontSize = "13px";
  }

  function clearError(input) {
    const error = input.parentNode.querySelector(".error");
    if (error) error.textContent = "";
  }

  // Validadores
  function validateRun(run) {
    const runRegex = /^[0-9]{7,8}[0-9Kk]$/;
    return runRegex.test(run);
  }

  function validateEmail(email) {
    if (!email.trim()) return false;
    if (email.length > 100) return false;
    const emailRegex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return emailRegex.test(email);
  }

  function validateLength(value, max) {
    return value.trim().length > 0 && value.trim().length <= max;
  }

  function validateAge(fechaNac) {
    if (!fechaNac) return true;
    const nacimiento = new Date(fechaNac);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad >= 16;
  }

  // Validaciones en tiempo real
  document.getElementById("registerRun").addEventListener("input", (e) => {
    validateRun(e.target.value)
      ? clearError(e.target)
      : showError(e.target, "RUN inválido. Ej: 19011022K (7-9 caracteres sin puntos ni guión)");
  });

  document.getElementById("registerNombre").addEventListener("input", (e) => {
    validateLength(e.target.value, 50)
      ? clearError(e.target)
      : showError(e.target, "El nombre es obligatorio (máx 50 caracteres)");
  });

  document.getElementById("registerApellidos").addEventListener("input", (e) => {
    validateLength(e.target.value, 100)
      ? clearError(e.target)
      : showError(e.target, "Los apellidos son obligatorios (máx 100 caracteres)");
  });

  document.getElementById("registerEmail").addEventListener("input", (e) => {
    validateEmail(e.target.value)
      ? clearError(e.target)
      : showError(e.target, "Correo inválido o no permitido");
  });

  document.getElementById("registerPassword").addEventListener("input", (e) => {
    e.target.value.trim()
      ? clearError(e.target)
      : showError(e.target, "La contraseña es obligatoria");
  });

  document.getElementById("registerFechaNac").addEventListener("change", (e) => {
    validateAge(e.target.value)
      ? clearError(e.target)
      : showError(e.target, "Debes tener al menos 16 años");
  });

  document.getElementById("registerRole").addEventListener("change", (e) => {
    e.target.value
      ? clearError(e.target)
      : showError(e.target, "Debes seleccionar un rol");
  });

  const regionSelect = document.getElementById("regionSelect");
  const comunaSelect = document.getElementById("comunaSelect");

  regionSelect.addEventListener("change", () => {
    clearError(regionSelect);
    comunaSelect.innerHTML = '<option value="">Selecciona Comuna</option>';
    if (regionSelect.value) {
      regiones[regionSelect.value].forEach((comuna) => {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
      });
    }
  });

  comunaSelect.addEventListener("change", () => {
    comunaSelect.value
      ? clearError(comunaSelect)
      : showError(comunaSelect, "Debes seleccionar una comuna");
  });

  // Registro
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const run = document.getElementById("registerRun");
    const nombre = document.getElementById("registerNombre");
    const apellidos = document.getElementById("registerApellidos");
    const email = document.getElementById("registerEmail");
    const password = document.getElementById("registerPassword");
    const fechaNac = document.getElementById("registerFechaNac").value;
    const role = document.getElementById("registerRole");
    const region = document.getElementById("regionSelect");
    const comuna = document.getElementById("comunaSelect");

    let valid = true;

    if (!validateRun(run.value)) {
      showError(run, "RUN inválido. Ej: 19011022K (7-9 caracteres sin puntos ni guión)");
      valid = false;
    }
    if (!validateLength(nombre.value, 50)) {
      showError(nombre, "El nombre es obligatorio (máx 50 caracteres)");
      valid = false;
    }
    if (!validateLength(apellidos.value, 100)) {
      showError(apellidos, "Los apellidos son obligatorios (máx 100 caracteres)");
      valid = false;
    }
    if (!validateEmail(email.value)) {
       showError(email, "Correo inválido. Solo se permiten @duoc.cl, @profesor.duoc.cl o @gmail.com");
       valid = false;
    }
    if (!password.value.trim()) {
      showError(password, "La contraseña es obligatoria");
      valid = false;
    }
    if (!validateAge(fechaNac)) {
      showError(document.getElementById("registerFechaNac"), "Debes tener al menos 16 años");
      valid = false;
    }
    if (!role.value) {
      showError(role, "Debes seleccionar un rol");
      valid = false;
    }
    if (!region.value) {
      showError(region, "Debes seleccionar una región");
      valid = false;
    }
    if (!comuna.value) {
      showError(comuna, "Debes seleccionar una comuna");
      valid = false;
    }

    if (!valid) return;

    // --- Crear usuario con nivel, puntos y descuento ---
    const user = {
      run: run.value.trim(),
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      email: email.value.trim(),
      password: password.value,
      fechaNac,
      role: role.value,
      region: region.value,
      comuna: comuna.value,
      points: 0,            // Inicializa puntos
      level: 1,             // Inicializa nivel
      hasDuocDiscount: email.value.includes("duoc") || email.value.includes("@duocuc.cl") // Descuento activo si es correo DUOC
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("currentUser", JSON.stringify(user)); // Para la sección de perfil
    updateUserInterface(); // Actualiza interfaz si estás en la página principal

    alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
    toggleForms();
  });

  // Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("currentUser", JSON.stringify(user)); // Guarda usuario actual
      updateUserInterface(); // Actualiza perfil en la interfaz
      alert(`Bienvenido ${user.nombre}`);
      window.location.href = user.role === "admin" ? "/admin/index.html" : "/index.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });

  // --- Sección de perfil ---
  function updateUserInterface() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userProfile = document.getElementById("userProfile");
    if (!userProfile) return;

    if (currentUser) {
      document.getElementById("userLevel").textContent = currentUser.level || 1;
      document.getElementById("userPoints").textContent = currentUser.points || 0;
      const discountEl = document.getElementById("userDiscount");
      if (discountEl) discountEl.classList.toggle("hidden", !currentUser.hasDuocDiscount);
    }
  }

  // Regiones y comunas
  const regiones = {
  "Arica y Parinacota": ["Arica", "Putre", "Camarones", "General Lagos"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"],
  "Antofagasta": ["Antofagasta", "Calama", "Mejillones", "Tocopilla"],
  "Atacama": ["Copiapó", "Caldera", "Vallenar", "Chañaral"],
  "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "San Antonio", "Quilpué"],
  "Metropolitana de Santiago": ["Santiago", "Puente Alto", "Maipú", "Las Condes"],
  "O’Higgins": ["Rancagua", "San Fernando", "Santa Cruz", "Rengo"],
  "Maule": ["Talca", "Curicó", "Linares", "Cauquenes"],
  "Ñuble": ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"],
  "La Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Angol"],
  "Los Ríos": ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"],
  "Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud"],
  "Aysén": ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane"],
  "Magallanes y la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"]
};
  Object.keys(regiones).forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });
});
