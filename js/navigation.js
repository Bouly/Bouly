// ==========================================
// 🧭 NAVIGATION ET FILTRES - 6AVENUES
// ==========================================

// ==========================================
// 🍽️ RENDU DES RESTAURANTS/PLATS
// ==========================================

/**
 * Affiche les plats selon la catégorie sélectionnée
 * @param {string} category - Catégorie à afficher ('all' ou nom de catégorie)
 */
function renderRestaurants(category) {
    const grid = document.getElementById('restaurantsGrid');
    if (!grid) return;

    const filteredDishes = category === 'all' ? DISHES_DATA : DISHES_DATA.filter(dish => dish.category === category);
    
    grid.innerHTML = filteredDishes.map((dish, index) => {
        // Séparer le nom du plat en deux parties pour l'affichage
        const nameParts = dish.name.split(' ');
        const firstWord = nameParts[0];
        const restOfName = nameParts.slice(1).join(' ');
        
        return createDishCardHTML(dish, firstWord, restOfName, index);
    }).join('');
    
    // Déclencher l'animation de révélation
    triggerScrollRevealAnimation();
}

/**
 * Génère le HTML pour une carte de plat
 * @param {Object} dish - Données du plat
 * @param {string} firstWord - Premier mot du nom
 * @param {string} restOfName - Reste du nom
 * @param {number} index - Index pour l'animation
 * @returns {string} HTML de la carte
 */
function createDishCardHTML(dish, firstWord, restOfName, index) {
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
}

/**
 * Déclenche l'animation de révélation des cartes
 */
function triggerScrollRevealAnimation() {
    setTimeout(() => {
        const reveals = document.querySelectorAll('.scroll-reveal');
        reveals.forEach(reveal => reveal.classList.add('revealed'));
    }, 100);
}

// ==========================================
// 🏷️ GESTION DES FILTRES DE CATÉGORIES
// ==========================================

/**
 * Configure les event listeners pour les boutons de catégorie
 */
function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleCategoryClick(btn, categoryBtns);
        });
    });
}

/**
 * Gère le clic sur un bouton de catégorie
 * @param {HTMLElement} clickedBtn - Bouton cliqué
 * @param {NodeList} allBtns - Tous les boutons de catégorie
 */
function handleCategoryClick(clickedBtn, allBtns) {
    // Retirer la classe active de tous les boutons
    allBtns.forEach(b => b.classList.remove('active'));
    
    // Ajouter la classe active au bouton cliqué
    clickedBtn.classList.add('active');
    
    // Animation tactile du bouton
    animateButtonPress(clickedBtn);
    
    // Filtrer les restaurants
    const category = clickedBtn.dataset.category;
    renderRestaurants(category);
    
    // Scroll fluide vers la section menu
    scrollToMenu();
}

/**
 * Anime l'appui sur un bouton
 * @param {HTMLElement} button - Bouton à animer
 */
function animateButtonPress(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// ==========================================
// 📜 GESTION DU SCROLL FLUIDE
// ==========================================

/**
 * Effectue un scroll fluide vers la section menu
 */
function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (!menuSection) return;

    // Calcul de la position avec offset pour l'header
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const targetPosition = menuSection.offsetTop - headerHeight - 20;
    
    // Scroll fluide
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
    
    // Animation visuelle de la section
    animateMenuSection(menuSection);
}

/**
 * Anime la section menu lors du scroll
 * @param {HTMLElement} section - Section à animer
 */
function animateMenuSection(section) {
    section.style.transform = 'scale(0.98)';
    section.style.opacity = '0.7';
    
    setTimeout(() => {
        section.style.transform = 'scale(1)';
        section.style.opacity = '1';
    }, 300);
}

// ==========================================
// ⬆️ BOUTON RETOUR EN HAUT
// ==========================================

/**
 * Configure le bouton retour en haut
 */
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Afficher/masquer le bouton selon le scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }
}

/**
 * Fait défiler la page vers le haut
 */
function scrollToTop() {
    // Animation de retour en haut
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Feedback visuel
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            backToTopBtn.style.transform = 'scale(1)';
        }, 150);
    }
}

// ==========================================
// 🔧 EXPORT DES FONCTIONS PUBLIQUES
// ==========================================

// Rendre les fonctions accessibles globalement
if (typeof window !== 'undefined') {
    window.renderRestaurants = renderRestaurants;
    window.setupCategoryFilters = setupCategoryFilters;
    window.setupBackToTop = setupBackToTop;
    window.scrollToTop = scrollToTop;
    window.scrollToMenu = scrollToMenu;
}
