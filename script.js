// Configuration des plats
const dishes = [
    {
        id: 1,
        name: "Burger Classic",
        description: "Pain artisanal, steak de bœuf grillé, salade fraîche, tomate, oignons",
        price: "12.90€",
        category: "burgers",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest2.glb",
        scale: "0.1 0.1 0.1"
    },
    {
        id: 2,
        name: "Pizza Margherita",
        description: "Sauce tomate artisanale, mozzarella di bufala, basilic frais",
        price: "14.50€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.08 0.08 0.08"
    },
    {
        id: 3,
        name: "Bo Bun",
        description: "Vermicelles de riz, bœuf grillé, légumes frais, nems, sauce nuoc-mam",
        price: "16.90€",
        category: "asiatique",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.12 0.12 0.12"
    },
    {
        id: 4,
        name: "Pizza Rimini",
        description: "Sauce tomate, mozzarella, jambon de Parme, roquette, parmesan",
        price: "18.50€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.08 0.08 0.08"
    },
    {
        id: 5,
        name: "Pizza Chèvre",
        description: "Crème fraîche, mozzarella, fromage de chèvre, miel, noix",
        price: "17.90€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.08 0.08 0.08"
    },
    {
        id: 6,
        name: "Sandwich Lee",
        description: "Pain de mie grillé, poulet mariné, crudités, sauce spéciale",
        price: "11.90€",
        category: "sandwichs",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.1 0.1 0.1"
    },
    {
        id: 7,
        name: "Pad Thaï",
        description: "Nouilles de riz sautées, crevettes fraîches, légumes croquants, cacahuètes",
        price: "16.90€",
        category: "asiatique",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.12 0.12 0.12"
    },
    {
        id: 8,
        name: "Tiramisu Maison",
        description: "Mascarpone, café espresso, cacao pur, biscuits cuillère",
        price: "7.50€",
        category: "desserts",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.08 0.08 0.08"
    }
];

let currentDish = null;

document.addEventListener('DOMContentLoaded', function() {
    renderRestaurants('all');
    setupCategoryFilters();
    
    // Header scroll effect (retardé pour accès au bouton)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 400) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Loading screen
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 1000);
});

function renderRestaurants(category) {
    const grid = document.getElementById('restaurantsGrid');
    const filteredDishes = category === 'all' ? dishes : dishes.filter(dish => dish.category === category);
    
    grid.innerHTML = filteredDishes.map((dish, index) => {
        // Séparer le nom du plat en deux parties pour l'affichage
        const nameParts = dish.name.split(' ');
        const firstWord = nameParts[0];
        const restOfName = nameParts.slice(1).join(' ');
        
        return `
        <div class="simple-burger-card scroll-reveal" style="animation-delay: ${index * 0.1}s">
            <div class="PG-product-content">
                <div class="simple-burger-title">
                    <div class="burger-text">${firstWord}</div>
                    <div class="chili-text">${restOfName}</div>
                </div>
                <img src="${dish.image}" alt="${dish.name}" class="simple-burger-img">
            </div>
            <div class="PG-product-info">
                <div class="simple-burger-title">
                    <div class="burger-text">${firstWord}</div>
                    <div class="chili-text">${restOfName}</div>
                </div>
                <div class="PG-product-ingredients">Prix: ${dish.price}</div>
                <div class="PG-product-description">${dish.description}</div>
                <button class="ar-btn" onclick="openARModal(${dish.id})">Voir en AR</button>
            </div>
        </div>
    `;
    }).join('');
    
    // Trigger scroll reveal animation
    setTimeout(() => {
        const reveals = document.querySelectorAll('.scroll-reveal');
        reveals.forEach(reveal => reveal.classList.add('revealed'));
    }, 100);
}

function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter restaurants
            const category = btn.dataset.category;
            renderRestaurants(category);
        });
    });
}

function openARModal(dishId) {
    currentDish = dishes.find(dish => dish.id === dishId);
    if (!currentDish) return;

    document.getElementById('modalTitle').textContent = currentDish.name;
    document.getElementById('modalDescription').textContent = currentDish.description;
    document.getElementById('modalPrice').textContent = currentDish.price;

    const modelViewer = document.getElementById('foodModel');
    modelViewer.src = currentDish.model3d || './models/burgertest2.glb';
    modelViewer.scale = currentDish.scale || '0.1 0.1 0.1';

    document.getElementById('arModal').classList.add('active');
}

function closeARModal() {
    document.getElementById('arModal').classList.remove('active');
    document.getElementById('foodModel').src = '';
}

function startARGame() {
    alert('Mini-jeu AR bientôt disponible !');
}