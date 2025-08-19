// ==========================================
// 🚀 POINT D'ENTRÉE PRINCIPAL - 6AVENUES AR
// ==========================================

// ==========================================
// 🎯 INITIALISATION DE L'APPLICATION
// ==========================================

/**
 * Initialise tous les composants de l'application
 */
function initializeApp() {
    console.log('🍽️ Initialisation du Menu AR - 6AVENUES...');
    
    // Rendu initial des plats
    renderRestaurants('all');
    
    // Configuration des composants
    setupCategoryFilters();
    setupBackToTop();
    setupModalEventListeners();
    initializeThemeSystem();
    
    // Configuration des effets du header
    setupHeaderScrollEffect();
    
    // Masquer l'écran de chargement
    setupLoadingScreen();
    
    console.log('✅ Menu AR - 6AVENUES initialisé avec succès !');
}

/**
 * Configure l'effet de scroll du header
 */
function setupHeaderScrollEffect() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 400) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

/**
 * Configure l'écran de chargement
 */
function setupLoadingScreen() {
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 1000);
}

// ==========================================
// 🎬 DÉMARRAGE DE L'APPLICATION
// ==========================================

// Initialiser l'application quand le DOM est prêt
document.addEventListener('DOMContentLoaded', initializeApp);

// Démarrage alternatif si DOMContentLoaded a déjà été déclenché
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
