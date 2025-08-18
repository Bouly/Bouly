// Configuration des plats
const dishes = [
    {
        id: 1,
        name: "Burger Classic",
        description: "Pain artisanal, steak de bœuf grillé, salade fraîche, tomate, oignons",
        price: "12.90€",
        category: "burgers",
        image: "./img/burger-300x233.png",
        model3d: "./models/KFC.glb",
        scale: "0.1 0.1 0.1"
    },
    {
        id: 2,
        name: "Pizza Margherita",
        description: "Sauce tomate artisanale, mozzarella di bufala, basilic frais",
        price: "14.50€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/VietnameseFood.glb",
        scale: "0.08 0.08 0.08"
    },
    {
        id: 3,
        name: "Bo Bun",
        description: "Vermicelles de riz, bœuf grillé, légumes frais, nems, sauce nuoc-mam",
        price: "16.90€",
        category: "asiatique",
        image: "./img/burger-300x233.png",
        model3d: "./models/Bread.glb",
        scale: "0.12 0.12 0.12"
    },
    {
        id: 4,
        name: "Pizza Rimini",
        description: "Sauce tomate, mozzarella, jambon de Parme, roquette, parmesan",
        price: "18.50€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/Sister.glb",
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
        model3d: "./models/caca.glb",
        scale: "0.1 0.1 0.1"
    },
    {
        id: 7,
        name: "Pad Thaï",
        description: "Nouilles de riz sautées, crevettes fraîches, légumes croquants, cacahuètes",
        price: "16.90€",
        category: "asiatique",
        image: "./img/burger-300x233.png",
        model3d: "./models/caca.glb",
        scale: "0.12 0.12 0.12"
    },
    {
        id: 8,
        name: "Tiramisu Maison",
        description: "Mascarpone, café espresso, cacao pur, biscuits cuillère",
        price: "7.50€",
        category: "desserts",
        image: "./img/burger-300x233.png",
        model3d: "./models/caca.glb",
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
    
    // Gestion du clic sur l'overlay du modal pour le fermer
    const modal = document.getElementById('arModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeARModal();
        }
    });
    
    // Gestion de la touche Escape pour fermer le modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeARModal();
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
    modelViewer.src = currentDish.model3d || './models/KFC.glb';
    modelViewer.scale = currentDish.scale || '0.1 0.1 0.1';

    // Bloquer le scroll de la page en arrière-plan
    document.body.classList.add('modal-open');
    document.getElementById('arModal').classList.add('active');
}

function closeARModal() {
    // Débloquer le scroll de la page
    document.body.classList.remove('modal-open');
    document.getElementById('arModal').classList.remove('active');
    document.getElementById('foodModel').src = '';
}

function startARGame() {
    alert('Mini-jeu AR bientôt disponible !');
}

// === SYSTÈME DE PANIER AR ===

// Panier AR global
let cartAR = [];

// Ajouter un plat au panier AR
function addToCartAR() {
    if (!currentDish) return;
    
    // Vérifier si le plat est déjà dans le panier
    const existingItem = cartAR.find(item => item.id === currentDish.id);
    if (existingItem) {
        alert('Ce plat est déjà dans votre panier AR !');
        return;
    }
    
    // Ajouter le plat au panier
    cartAR.push({
        id: currentDish.id,
        name: currentDish.name,
        description: currentDish.description,
        price: currentDish.price,
        model3d: currentDish.model3d,
        scale: currentDish.scale
    });
    
    // Mettre à jour l'interface
    updateCartUI();
    
    // Animation de feedback
    const button = event.target.closest('.control-btn');
    button.style.transform = 'scale(0.95)';
    button.style.background = '#10B981';
    setTimeout(() => {
        button.style.transform = '';
        button.style.background = '';
    }, 200);
    
    // Notification
    showNotification(`${currentDish.name} ajouté au panier AR !`, 'success');
}

// Supprimer un plat du panier
function removeFromCartAR(dishId) {
    cartAR = cartAR.filter(item => item.id !== dishId);
    updateCartUI();
    updateCartModal();
    showNotification('Plat supprimé du panier AR', 'info');
}

// Vider tout le panier
function clearCart() {
    if (cartAR.length === 0) return;
    
    if (confirm('Voulez-vous vraiment vider votre panier AR ?')) {
        cartAR = [];
        updateCartUI();
        updateCartModal();
        showNotification('Panier AR vidé', 'info');
    }
}

// Mettre à jour l'interface du panier
function updateCartUI() {
    const cartCount = document.getElementById('cartItemCount');
    cartCount.textContent = cartAR.length;
    
    // Sauvegarder le panier dans localStorage
    localStorage.setItem('cartAR', JSON.stringify(cartAR));
}

// Ouvrir le modal du panier AR
function viewCartAR() {
    updateCartModal();
    document.body.classList.add('modal-open');
    document.getElementById('cartARModal').classList.add('active');
}

// Fermer le modal du panier AR
function closeCartARModal() {
    document.body.classList.remove('modal-open');
    document.getElementById('cartARModal').classList.remove('active');
    document.getElementById('cartModel').src = '';
}

// Mettre à jour le contenu du modal panier
function updateCartModal() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    const cartModel = document.getElementById('cartModel');
    
    // Calculer le total
    const total = cartAR.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
        return sum + price;
    }, 0);
    
    cartTotal.textContent = total.toFixed(2) + '€';
    
    if (cartAR.length === 0) {
        cartItemsList.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier AR est vide</p>
                <p>Ajoutez des plats depuis le menu !</p>
            </div>
        `;
        cartModel.src = '';
    } else {
        // Afficher la liste des plats
        cartItemsList.innerHTML = cartAR.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCartAR(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Pour l'instant, afficher le premier modèle (plus tard on combinera tous)
        if (cartAR.length > 0) {
            cartModel.src = cartAR[0].model3d;
            cartModel.scale = cartAR[0].scale;
        }
    }
}

// Afficher une notification
function showNotification(message, type = 'info') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Charger le panier sauvegardé au démarrage
function loadSavedCart() {
    const savedCart = localStorage.getItem('cartAR');
    if (savedCart) {
        cartAR = JSON.parse(savedCart);
        updateCartUI();
    }
}

// === SYSTÈME DE CHANGEMENT DE THÈMES DYNAMIQUE ===

const themes = {
    'custom-green': {
        '--primary-color': '#A9C5A0',
        '--secondary-color': '#758173',
        '--accent-color': '#C6DEC6',
        '--bg-primary': '#C5EFCB',
        '--bg-secondary': '#020402',
        '--bg-card': '#C6DEC6',
        '--bg-card-gradient-start': '#C6DEC6',
        '--bg-card-gradient-end': '#A9C5A0',
        '--bg-modal': '#C5EFCB',
        '--bg-loading': '#C5EFCB',
        '--text-primary': '#2D3748',
        '--text-secondary': '#4A5568',
        '--text-dark': '#1A202C',
        '--text-card-title': '#FFFFFF',
        '--text-card-subtitle': '#2D3748',
        '--text-footer': '#A0AEC0',
        '--btn-primary-bg': '#A9C5A0',
        '--btn-primary-text': '#FFFFFF',
        '--btn-primary-hover': '#758173',
        '--btn-secondary-bg': '#C6DEC6',
        '--btn-secondary-text': '#2D3748',
        '--ar-btn-bg': 'rgba(169, 197, 160, 0.9)',
        '--ar-btn-text': '#FFFFFF',
        '--ar-btn-border': '#758173'
    },
    'mcdonalds': {
        '--primary-color': '#DA020E',
        '--secondary-color': '#FFC72C',
        '--accent-color': '#FFD700',
        '--bg-primary': '#FFF8E1',
        '--bg-secondary': '#27251F',
        '--bg-card': '#FFECB3',
        '--bg-card-gradient-start': '#FFECB3',
        '--bg-card-gradient-end': '#FFC72C',
        '--bg-modal': '#FFFFFF',
        '--bg-loading': '#FFF8E1',
        '--text-primary': '#27251F',
        '--text-secondary': '#DA020E',
        '--text-dark': '#27251F',
        '--text-card-title': '#DA020E',
        '--text-card-subtitle': '#27251F',
        '--text-footer': '#DA020E',
        '--btn-primary-bg': '#DA020E',
        '--btn-primary-text': '#FFFFFF',
        '--btn-primary-hover': '#B8000C',
        '--btn-secondary-bg': '#FFC72C',
        '--btn-secondary-text': '#27251F',
        '--ar-btn-bg': 'rgba(218, 2, 14, 0.9)',
        '--ar-btn-text': '#FFFFFF',
        '--ar-btn-border': '#DA020E'
    },
    'burger-king': {
        '--primary-color': '#D62300',
        '--secondary-color': '#FFAA00',
        '--accent-color': '#0066CC',
        '--bg-primary': '#FFF3E0',
        '--bg-secondary': '#1A1A1A',
        '--bg-card': '#FFE0B2',
        '--bg-card-gradient-start': '#FFE0B2',
        '--bg-card-gradient-end': '#FFAA00',
        '--bg-modal': '#FFFFFF',
        '--bg-loading': '#FFF3E0',
        '--text-primary': '#1A1A1A',
        '--text-secondary': '#D62300',
        '--text-dark': '#1A1A1A',
        '--text-card-title': '#D62300',
        '--text-card-subtitle': '#1A1A1A',
        '--text-footer': '#0066CC',
        '--btn-primary-bg': '#D62300',
        '--btn-primary-text': '#FFFFFF',
        '--btn-primary-hover': '#B51D00',
        '--btn-secondary-bg': '#FFAA00',
        '--btn-secondary-text': '#1A1A1A',
        '--ar-btn-bg': 'rgba(214, 35, 0, 0.9)',
        '--ar-btn-text': '#FFFFFF',
        '--ar-btn-border': '#D62300'
    },
    'taco-bell': {
        '--primary-color': '#662D91',
        '--secondary-color': '#FF6B35',
        '--accent-color': '#FFF200',
        '--bg-primary': '#F8F5FF',
        '--bg-secondary': '#1A1A1A',
        '--bg-card': '#E8D5FF',
        '--bg-card-gradient-start': '#E8D5FF',
        '--bg-card-gradient-end': '#662D91',
        '--bg-modal': '#FFFFFF',
        '--bg-loading': '#F8F5FF',
        '--text-primary': '#1A1A1A',
        '--text-secondary': '#662D91',
        '--text-dark': '#000000',
        '--text-card-title': '#FFF200',
        '--text-card-subtitle': '#1A1A1A',
        '--text-footer': '#FF6B35',
        '--btn-primary-bg': '#662D91',
        '--btn-primary-text': '#FFF200',
        '--btn-primary-hover': '#4F1F70',
        '--btn-secondary-bg': '#FF6B35',
        '--btn-secondary-text': '#FFFFFF',
        '--ar-btn-bg': 'rgba(102, 45, 145, 0.9)',
        '--ar-btn-text': '#FFF200',
        '--ar-btn-border': '#662D91'
    },
    'subway': {
        '--primary-color': '#00A651',
        '--secondary-color': '#FFD320',
        '--accent-color': '#7CB518',
        '--bg-primary': '#F1F8E9',
        '--bg-secondary': '#1B4332',
        '--bg-card': '#C8E6C9',
        '--bg-card-gradient-start': '#C8E6C9',
        '--bg-card-gradient-end': '#00A651',
        '--bg-modal': '#FFFFFF',
        '--bg-loading': '#F1F8E9',
        '--text-primary': '#1B4332',
        '--text-secondary': '#00A651',
        '--text-dark': '#000000',
        '--text-card-title': '#FFD320',
        '--text-card-subtitle': '#1B4332',
        '--text-footer': '#00A651',
        '--btn-primary-bg': '#00A651',
        '--btn-primary-text': '#FFFFFF',
        '--btn-primary-hover': '#007A3D',
        '--btn-secondary-bg': '#FFD320',
        '--btn-secondary-text': '#1B4332',
        '--ar-btn-bg': 'rgba(0, 166, 81, 0.9)',
        '--ar-btn-text': '#FFFFFF',
        '--ar-btn-border': '#00A651'
    },
    'eleven-madison': {
        '--primary-color': '#1A1A1A',
        '--secondary-color': '#8B8680',
        '--accent-color': '#D4AF37',
        '--bg-primary': '#F8F8F8',
        '--bg-secondary': '#000000',
        '--bg-card': '#EDEDED',
        '--bg-card-gradient-start': '#EDEDED',
        '--bg-card-gradient-end': '#8B8680',
        '--bg-modal': '#FFFFFF',
        '--bg-loading': '#F8F8F8',
        '--text-primary': '#1A1A1A',
        '--text-secondary': '#8B8680',
        '--text-dark': '#000000',
        '--text-card-title': '#D4AF37',
        '--text-card-subtitle': '#1A1A1A',
        '--text-footer': '#8B8680',
        '--btn-primary-bg': '#1A1A1A',
        '--btn-primary-text': '#F8F8F8',
        '--btn-primary-hover': '#000000',
        '--btn-secondary-bg': '#D4AF37',
        '--btn-secondary-text': '#1A1A1A',
        '--ar-btn-bg': 'rgba(26, 26, 26, 0.9)',
        '--ar-btn-text': '#F8F8F8',
        '--ar-btn-border': '#D4AF37'
    },
    'daniel-nyc': {
        '--primary-color': '#722F37',
        '--secondary-color': '#B8860B',
        '--accent-color': '#F5F5DC',
        '--bg-primary': '#FDF9F0',
        '--bg-secondary': '#2F2F2F',
        '--bg-card': '#FAF0E6',
        '--bg-card-gradient-start': '#FAF0E6',
        '--bg-card-gradient-end': '#B8860B',
        '--bg-modal': '#FFFFFF',
        '--bg-loading': '#FDF9F0',
        '--text-primary': '#2F2F2F',
        '--text-secondary': '#722F37',
        '--text-dark': '#2F2F2F',
        '--text-card-title': '#722F37',
        '--text-card-subtitle': '#2F2F2F',
        '--text-footer': '#B8860B',
        '--btn-primary-bg': '#722F37',
        '--btn-primary-text': '#F5F5DC',
        '--btn-primary-hover': '#5A242A',
        '--btn-secondary-bg': '#B8860B',
        '--btn-secondary-text': '#2F2F2F',
        '--ar-btn-bg': 'rgba(114, 47, 55, 0.9)',
        '--ar-btn-text': '#F5F5DC',
        '--ar-btn-border': '#722F37'
    }
};

function changeTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    const dropdown = document.querySelector('.custom-dropdown');
    
    // Animation de feedback
    dropdown.classList.add('changing');
    
    // Appliquer toutes les variables CSS du thème avec une transition fluide
    Object.entries(theme).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Sauvegarder le thème choisi
    localStorage.setItem('selectedTheme', themeName);
    
    // Mettre à jour le texte sélectionné
    const themeNames = {
        'custom-green': '🌿 Vert Nature',
        'original': '🟡 Original 6AVENUES',
        'red-premium': '� Bleu Océan',
        'blue-tech': '💙 Bleu Tech',
        'dark-luxury': '🌑 Noir Luxe',
        'violet-modern': '🍇 Violet Moderne',
        'cyan-aqua': '🌊 Cyan Aqua'
    };
    
    document.getElementById('selectedTheme').textContent = themeNames[themeName];
    
    // Mettre à jour les options sélectionnées
    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.theme === themeName) {
            option.classList.add('selected');
        }
    });
    
    // Fermer le dropdown
    closeDropdown();
    
    // Retirer l'animation après un délai
    setTimeout(() => {
        dropdown.classList.remove('changing');
    }, 400);
}

// Fonctions pour gérer le dropdown personnalisé
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    if (menu.classList.contains('active')) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

function openDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    menu.classList.add('active');
    selected.classList.add('active');
    
    // Fermer le dropdown si on clique ailleurs
    setTimeout(() => {
        document.addEventListener('click', closeDropdownOnClickOutside);
    }, 10);
}

function closeDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    menu.classList.remove('active');
    selected.classList.remove('active');
    
    document.removeEventListener('click', closeDropdownOnClickOutside);
}

function closeDropdownOnClickOutside(event) {
    const dropdown = document.querySelector('.custom-dropdown');
    if (!dropdown.contains(event.target)) {
        closeDropdown();
    }
}

// Charger le thème sauvegardé au démarrage
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'custom-green';
    changeTheme(savedTheme);
}

// Charger le thème au démarrage de la page
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTheme();
    loadSavedCart(); // Charger le panier sauvegardé
    
    // Ajouter les event listeners pour les options
    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', function() {
            const themeName = this.dataset.theme;
            changeTheme(themeName);
        });
    });
});