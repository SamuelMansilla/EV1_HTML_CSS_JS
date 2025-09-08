// productos.js (versión robusta para categorías)

// Clave en localStorage usada por admin
const STORAGE_KEY = "productos_levelup";

// Productos por defecto (se usan si localStorage está vacío)
const defaultProducts = [
    { code: "JM001", category: "Juegos de Mesa", name: "Catan", price: 29990, image: "/img/catan.png", description: "Un clásico juego de estrategia...", rating: 4.5, reviews: 128 },
    { code: "JM002", category: "Juegos de Mesa", name: "Carcassonne", price: 24990, image: "/img/carcassone.webp", description: "Un juego de colocación de fichas...", rating: 4.3, reviews: 95 },
    { code: "AC001", category: "Accesorios", name: "Controlador Inalámbrico Xbox Series X", price: 59990, image: "/img/mando xbox.png", description: "Ofrece una experiencia de juego cómoda...", rating: 4.7, reviews: 203 },
    { code: "AC002", category: "Accesorios", name: "Auriculares Gamer HyperX Cloud II", price: 79990, image: "/img/audifonos hyperx.webp", description: "Proporcionan un sonido envolvente...", rating: 4.8, reviews: 156 },
    { code: "CO001", category: "Consolas", name: "PlayStation 5", price: 549990, image: "/img/ps5.webp", description: "La consola de última generación...", rating: 4.9, reviews: 312 },
    { code: "CG001", category: "Computadores Gamers", name: "PC Gamer ASUS ROG Strix", price: 1299990, image: "/img/pc gamer.png", description: "Un potente equipo diseñado para gamers...", rating: 4.6, reviews: 87 },
    { code: "SG001", category: "Sillas Gamers", name: "Silla Gamer Secretlab Titan", price: 349990, image: "/img/silla gamer.webp", description: "Diseñada para el máximo confort...", rating: 4.4, reviews: 221 },
    { code: "MS001", category: "Mouse", name: "Mouse Gamer Logitech G502 HERO", price: 49990, image: "/img/mouse.webp", description: "Con sensor de alta precisión...", rating: 4.7, reviews: 189 },
    { code: "MP001", category: "Mousepad", name: "Mousepad Razer Goliathus Extended Chroma", price: 29990, image: "/img/mousepad.png", description: "Área de juego amplia con iluminación RGB...", rating: 4.5, reviews: 143 },
    { code: "PP001", category: "Poleras Personalizadas", name: "Polera Gamer Personalizada 'Level-Up'", price: 14990, image: "/img/polera.webp", description: "Camiseta cómoda y estilizada...", rating: 4.2, reviews: 76 }
];

// Normaliza texto de categoría: quita tildes, trim, lowercase, colapsar espacios
function normalizeCategory(str) {
    if (!str && str !== "") return "otros";
    return String(str)
        .normalize('NFD')                   // separa caracteres + diacríticos
        .replace(/[\u0300-\u036f]/g, '')    // quita diacríticos (tildes)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
}

// Intenta detectar categoría a partir del código (fallback si admin no puso categoría)
function detectCategoryFromCode(code) {
    if (!code) return null;
    const prefix = String(code).substring(0, 2).toUpperCase();
    switch (prefix) {
        case 'JM': return 'Juegos de Mesa';
        case 'AC': return 'Accesorios';
        case 'CO': return 'Consolas';
        case 'CG': return 'Computadores Gamers';
        case 'SG': return 'Sillas Gamers';
        case 'MS': return 'Mouse';
        case 'MP': return 'Mousepad';
        case 'PP': return 'Poleras Personalizadas';
        default: return null;
    }
}

// Cargar del storage o fallback
const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
const rawProducts = Array.isArray(stored) && stored.length ? stored : defaultProducts;

// Mapear a la estructura usada por esta vista (agregando categoryNormalized)
let products = rawProducts.map(p => {
    const code = p.id || p.code || '';
    const rawCategory = p.categoria || p.category || detectCategoryFromCode(code) || 'Otros';
    const categoryNormalized = normalizeCategory(rawCategory);
    return {
        code: code,
        category: rawCategory,           // categoría "legible"
        categoryNormalized: categoryNormalized, // categoría normalizada para comparar
        name: p.nombre || p.name || '',
        price: Number(p.precio || p.price || 0),
        image: p.imagen || p.image || '/img/nuevo.png',
        description: p.descripcion || p.description || '',
        rating: p.rating || 4.0,
        reviews: p.reviews || 0
    };
});

// Variables globales
let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem('carrito')) || []; // Cambia 'cart' por 'carrito'

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('carrito', JSON.stringify(cart)); // Cambia 'cart' por 'carrito'
}

// Agregar al carrito
function addToCart(productCode) {
    const product = products.find(p => p.code === productCode);
    if (!product) return;

    const item = cart.find(p => p.code === productCode);
    if (item) item.quantity++;
    else cart.push({ ...product, quantity: 1 });

    saveCart();
    alert(`Producto "${product.name}" agregado al carrito`);
}

// Renderizar productos
function loadProducts() {
    const grid = document.getElementById('lista-productos');
    if (!grid) return;

    grid.innerHTML = '';

    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        // ponemos la categoría normalizada en el data attribute
        card.dataset.category = p.categoryNormalized;
        card.dataset.name = p.name.toLowerCase();
        card.dataset.price = p.price;

        const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));
        const shortDescription = p.description.length > 100 ? p.description.substring(0, 100) + '...' : p.description;

        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}" class="product-image">
            <h3 class="product-title">${p.name}</h3>
            <div class="product-price">$${p.price.toLocaleString('es-CL')}</div>
            <div class="rating">
                <span class="stars">${stars}</span>
                <span>(${p.reviews} reseñas)</span>
            </div>
            <p class="product-description">${shortDescription}</p>
            <div class="product-actions">
                ${!isHomePage ? `<button class="btn btn-primary mb-2" data-code="${p.code}"><i class="fas fa-cart-plus"></i> Agregar al Carrito</button>` : ''}
                <a href="detalle.html?code=${p.code}" class="btn btn-outline-light">Ver detalle</a>
            </div>
        `;

        grid.appendChild(card);
    });

    // Eventos de botones "Agregar al carrito"
    document.querySelectorAll('.product-actions button').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.getAttribute('data-code');
            addToCart(code);
        });
    });
}

// Filtrar productos
function filterProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceValue = document.getElementById('priceFilter')?.value || '';
    const cards = document.querySelectorAll('.card');

    // normalizamos la categoría seleccionada para comparar con dataset
    const normCurrent = currentCategory === 'all' ? 'all' : normalizeCategory(currentCategory);

    cards.forEach(card => {
        const cat = card.dataset.category; // ya está normalizada en loadProducts
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price, 10) || 0;

        const matchesCategory = normCurrent === 'all' || cat === normCurrent;
        const matchesSearch = name.includes(searchTerm);

        let matchesPrice = true;
        if (priceValue) {
            const [min, max] = priceValue.split('-');
            if (!max) matchesPrice = price >= parseInt(min.replace('+',''), 10);
            else matchesPrice = price >= parseInt(min, 10) && price <= parseInt(max, 10);
        }

        card.style.display = matchesCategory && matchesSearch && matchesPrice ? '' : 'none';
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    // Asignar eventos a las tarjetas de categoría
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            // guardamos el valor tal como está en el data-category del HTML
            currentCategory = this.dataset.category || 'all';
            filterProducts();
        });
    });

    document.getElementById('searchInput')?.addEventListener('input', filterProducts);
    document.getElementById('priceFilter')?.addEventListener('change', filterProducts);

    const defaultCard = document.querySelector('.category-card[data-category="all"]');
    if (defaultCard) defaultCard.classList.add('active');

    filterProducts();
});
