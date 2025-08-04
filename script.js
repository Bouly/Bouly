// Gestion de l'affichage AR
function showAR(burgerType) {
    // Cacher le menu principal
    document.getElementById('menu-container').style.display = 'none';
    
    // Afficher le conteneur AR
    document.getElementById('ar-container').style.display = 'block';
    
    // Cacher tous les burgers
    hideAllBurgers();
    
    // Attendre que la scène soit prête puis afficher le burger
    setTimeout(() => {
        const burgerElement = document.getElementById(`burger-${burgerType}`);
        if (burgerElement) {
            burgerElement.setAttribute('visible', 'true');
        }
    }, 1000);
}

function closeAR() {
    // Cacher le conteneur AR
    document.getElementById('ar-container').style.display = 'none';
    
    // Afficher le menu principal
    document.getElementById('menu-container').style.display = 'block';
    
    // Cacher tous les burgers
    hideAllBurgers();
}

function hideAllBurgers() {
    const burgers = ['classic', 'cheese', 'bacon', 'spicy', 'veggie'];
    burgers.forEach(burger => {
        const element = document.getElementById(`burger-${burger}`);
        if (element) {
            element.setAttribute('visible', 'false');
        }
    });
}

// Gestion des erreurs et de la compatibilité
window.addEventListener('load', function() {
    // Vérifier la compatibilité WebXR
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Votre navigateur ne supporte pas pleinement la réalité augmentée.');
    }
    
    // Améliorer les performances
    const scene = document.getElementById('ar-scene');
    if (scene) {
        scene.setAttribute('stats', false);
        scene.setAttribute('inspector', false);
    }
});

// Gestion du retour en arrière (bouton retour du navigateur)
window.addEventListener('popstate', function() {
    closeAR();
});