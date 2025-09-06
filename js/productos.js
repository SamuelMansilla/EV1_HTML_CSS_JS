// Productos
const products = [
    {
        code: "JM001",
        category: "Juegos de Mesa",
        name: "Catan",
        price: 29990,
        image: "/img/catan.png",
        description: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
        rating: 4.5,
        reviews: 128
    },
    {
        code: "JM002",
        category: "Juegos de Mesa",
        name: "Carcassonne",
        price: 24990,
        image: "/img/carcassone.webp",
        description: "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.",
        rating: 4.3,
        reviews: 95
    },
    {
        code: "AC001",
        category: "Accesorios",
        name: "Controlador Inalámbrico Xbox Series X",
        price: 59990,
        image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
        rating: 4.7,
        reviews: 203
    },
    {
        code: "AC002",
        category: "Accesorios",
        name: "Auriculares Gamer HyperX Cloud II",
        price: 79990,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
        rating: 4.8,
        reviews: 156
    },
    {
        code: "CO001",
        category: "Consolas",
        name: "PlayStation 5",
        price: 549990,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
        rating: 4.9,
        reviews: 312
    },
    {
        code: "CG001",
        category: "Computadores Gamers",
        name: "PC Gamer ASUS ROG Strix",
        price: 1299990,
        image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
        rating: 4.6,
        reviews: 87
    },
    {
        code: "SG001",
        category: "Sillas Gamers",
        name: "Silla Gamer Secretlab Titan",
        price: 349990,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
        rating: 4.4,
        reviews: 221
    },
    {
        code: "MS001",
        category: "Mouse",
        name: "Mouse Gamer Logitech G502 HERO",
        price: 49990,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
        rating: 4.7,
        reviews: 189
    },
    {
        code: "MP001",
        category: "Mousepad",
        name: "Mousepad Razer Goliathus Extended Chroma",
        price: 29990,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
        rating: 4.5,
        reviews: 143
    },
    {
        code: "PP001",
        category: "Poleras Personalizadas",
        name: "Polera Gamer Personalizada 'Level-Up'",
        price: 14990,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        description: "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.",
        rating: 4.2,
        reviews: 76
    }
];

// Variables globales
let currentCategory = 'all';
let cart = [];
let currentUser = null;
let userPoints = 0;
let userLevel = 1;

// Renderizar productos
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = p.category.toLowerCase();
        card.dataset.name = p.name.toLowerCase();
        card.dataset.price = p.price;

        const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));

        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}" class="product-image">
            <h3 class="product-title">${p.name}</h3>
            <div class="product-price">$${p.price.toLocaleString('es-CL')}</div>
            <div class="rating">
                <span class="stars">${stars}</span>
                <span>(${p.reviews} reseñas)</span>
            </div>
            <p class="product-description">${p.description}</p>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart('${p.code}')">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Filtrar productos
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const priceValue = document.getElementById('priceFilter').value;
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const cat = card.dataset.category;
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price);

        const matchesCategory = currentCategory === 'all' || cat === currentCategory.toLowerCase();
        const matchesSearch = name.includes(searchTerm);

        let matchesPrice = true;
        if (priceValue) {
            const [min, max] = priceValue.split('-');
            if (!max) {
                matchesPrice = price >= parseInt(min.replace('+',''));
            } else {
                matchesPrice = price >= parseInt(min) && price <= parseInt(max);
            }
        }

        card.style.display = matchesCategory && matchesSearch && matchesPrice ? 'block' : 'none';
    });
}

// Evento click en categorías
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            filterProducts();
        });
    });

    document.getElementById('searchInput').addEventListener('input', filterProducts);
    document.getElementById('priceFilter').addEventListener('change', filterProducts);

    // Activar "Todos" por defecto
    const defaultCard = document.querySelector('.category-card[data-category="all"]');
    if (defaultCard) defaultCard.classList.add('active');

    filterProducts();
});

// Función básica de agregar al carrito
function addToCart(productCode) {
    const product = products.find(p => p.code === productCode);
    const existing = cart.find(item => item.code === productCode);
    if (existing) existing.quantity++;
    else cart.push({...product, quantity:1});
    alert(`Producto "${product.name}" agregado al carrito`);
}
