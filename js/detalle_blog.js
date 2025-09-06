// detalle_blog.js
// Lista de blogs
// blogs.js
const blogs = [
 {
  id: "BL001",
  titulo: "Top 5 Juegos de Mesa para Gamers",
  fecha: "2025-09-05",
  autor: "Level-UP Team",
  imagen: "/img/juegos_de_mesa.png",
  descripcion: "Descubre los juegos de mesa más entretenidos para pasar horas de diversión con amigos.",
  contenido: `
Los juegos de mesa siguen siendo una excelente forma de socializar y disfrutar de la estrategia y la competencia. 
En este blog te mostramos los 5 mejores juegos de mesa que cualquier gamer debería probar:

1️⃣ **Catan**: Estrategia y comercio en la isla de Catan. Ideal para 3-4 jugadores.  
2️⃣ **Carcassonne**: Coloca losetas y construye un paisaje medieval mientras bloqueas a tus rivales.  
3️⃣ **Ticket to Ride**: Crea rutas de tren a lo largo del mapa y gana puntos completando trayectos.  
4️⃣ **Azul**: Juego de mosaicos, combinación de colores y patrones que pondrá a prueba tu planificación.  
5️⃣ **Pandemic**: Cooperativo, salva al mundo de epidemias mientras trabajas en equipo.

Estos juegos no solo son divertidos, sino que también fomentan la estrategia, la comunicación y la toma de decisiones. ¡Prepárate para horas de diversión asegurada!`
},
{
  id: "BL002",
  titulo: "Cómo elegir el mejor periférico para tu PC Gamer",
  fecha: "2025-09-05",
  autor: "Level-UP Team",
  imagen: "/img/perifericos.png",
  descripcion: "Guía rápida para escoger el teclado, mouse y auriculares ideales para tu setup gamer.",
  contenido: `
Elegir periféricos adecuados es fundamental para mejorar tu experiencia de juego. 
En este artículo revisamos los aspectos más importantes:

🎮 **Teclados**: Busca mecánicos, con switches adecuados a tu estilo de juego y retroiluminación RGB.  
🖱️ **Mouse**: Sensor de alta precisión, DPI ajustable y botones personalizables para juegos competitivos.  
🎧 **Auriculares**: Comodidad y sonido envolvente, con micrófono de calidad para comunicación clara.  
🛋️ **Ergonomía**: Asegúrate de que los periféricos sean cómodos para sesiones largas de juego.  
💡 **Extras**: RGB personalizable, macros y software de configuración pueden marcar la diferencia.

Con estos consejos, podrás elegir periféricos que no solo luzcan bien, sino que mejoren tu desempeño en cualquier juego. ¡Lleva tu setup gamer al siguiente nivel!`
}

];


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
    <a href="Blogs.html" class="btn btn-secondary mt-3">← Volver a Blogs</a>
  `;
} else {
  contenedor.innerHTML = `<p class="text-danger">Blog no encontrado.</p>`;
}
