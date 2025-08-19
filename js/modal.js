// ==========================================
// 🎭 GESTION DES MODAUX AR - 6AVENUES
// ==========================================

// Variables pour la gestion des modaux
let currentDish = null;
let scrollPosition = 0;

// ==========================================
// 📱 FONCTIONS DE GESTION DES MODAUX AR
// ==========================================

/**
 * Ouvre le modal AR pour un plat spécifique
 * @param {number} dishId - ID du plat à afficher
 */
function openARModal(dishId) {
    // Sauvegarder la position de scroll actuelle
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    currentDish = DISHES_DATA.find(dish => dish.id === dishId);
    if (!currentDish) return;

    // Remplir les informations du modal
    updateModalContent(currentDish);
    
    // Configurer le model-viewer
    setupModelViewer(currentDish);

    // Bloquer le scroll de la page en arrière-plan sans affecter la position
    lockBodyScroll();
    
    // Afficher le modal
    showModal();
}

/**
 * Ferme le modal AR et restaure l'état précédent
 */
function closeARModal() {
    // Débloquer le scroll de la page
    unlockBodyScroll();
    
    // Masquer le modal
    hideModal();
    
    // Nettoyer le model-viewer
    clearModelViewer();
    
    // Restaurer la position de scroll précédente
    restoreScrollPosition();
}

/**
 * Met à jour le contenu textuel du modal
 * @param {Object} dish - Objet contenant les informations du plat
 */
function updateModalContent(dish) {
    const elements = {
        title: document.getElementById('modalTitle'),
        description: document.getElementById('modalDescription'),
        price: document.getElementById('modalPrice')
    };

    if (elements.title) elements.title.textContent = dish.name;
    if (elements.description) elements.description.textContent = dish.description;
    if (elements.price) elements.price.textContent = dish.price;
}

/**
 * Configure le model-viewer avec le modèle 3D du plat
 * @param {Object} dish - Objet contenant les informations du plat
 */
function setupModelViewer(dish) {
    const modelViewer = document.getElementById('foodModel');
    if (!modelViewer) return;

    // Configuration du modèle 3D
    modelViewer.src = dish.model3d || './models/KFC.glb';
    modelViewer.scale = dish.scale || '1.0 1.0 1.0';
    
    // 🌟 Les attributs d'éclairage optimaux sont déjà définis dans le HTML
    // avec les valeurs par défaut recommandées par la documentation :
    // - shadow-intensity="1" (valeur par défaut)
    // - shadow-softness="1" (valeur par défaut) 
    // - tone-mapping="neutral" (défaut depuis v4.0, idéal e-commerce)
    // - exposure="1" (valeur par défaut)
    // - xr-environment (éclairage estimé pour AR)
}

/**
 * Nettoie le model-viewer
 */
function clearModelViewer() {
    const modelViewer = document.getElementById('foodModel');
    if (modelViewer) {
        modelViewer.src = '';
    }
}

/**
 * Bloque le scroll du body en préservant la position
 */
function lockBodyScroll() {
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add('modal-open');
}

/**
 * Débloque le scroll du body
 */
function unlockBodyScroll() {
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
}

/**
 * Affiche le modal AR
 */
function showModal() {
    const modal = document.getElementById('arModal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Masque le modal AR
 */
function hideModal() {
    const modal = document.getElementById('arModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Restaure la position de scroll précédente
 */
function restoreScrollPosition() {
    window.scrollTo({
        top: scrollPosition,
        behavior: 'instant' // Instantané pour éviter l'animation
    });
}

/**
 * Démarre le mini-jeu AR (fonctionnalité future)
 */
function startARGame() {
    alert('Mini-jeu AR bientôt disponible !');
}

// ==========================================
// 🎮 INITIALISATION DES EVENT LISTENERS
// ==========================================

/**
 * Configure les event listeners pour les modaux
 */
function setupModalEventListeners() {
    const modal = document.getElementById('arModal');
    if (!modal) return;

    // Fermer le modal en cliquant sur l'overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeARModal();
        }
    });

    // Fermer le modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeARModal();
        }
    });
}

// ==========================================
// 🔧 EXPORT DES FONCTIONS PUBLIQUES
// ==========================================

// Rendre les fonctions accessibles globalement pour la compatibilité
if (typeof window !== 'undefined') {
    window.openARModal = openARModal;
    window.closeARModal = closeARModal;
    window.startARGame = startARGame;
    window.setupModalEventListeners = setupModalEventListeners;
}
