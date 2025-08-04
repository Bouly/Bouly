// Configuration 8th Wall
const APP_KEY = 'YOUR_8TH_WALL_APP_KEY'; // À remplacer par votre clé

// Variables globales
let currentBurger = null;
let isARActive = false;

// Initialisation 8th Wall
const onxrloaded = () => {
  XR8.addCameraPipelineModules([
    XR8.GlTextureRenderer.pipelineModule(),
    XR8.Threejs.pipelineModule(),
    XR8.XrController.pipelineModule(),
    window.LandingPage.pipelineModule(),
    window.RuntimeError.pipelineModule(),
  ]);

  // Configuration de la scène
  const sceneEl = document.querySelector('a-scene');
  if (sceneEl) {
    sceneEl.addEventListener('loaded', () => {
      console.log('8th Wall scene loaded');
    });
  }
};

// Gestion de l'affichage AR améliorée
function showAR(burgerType) {
    if (isARActive) return;
    
    const menuContainer = document.getElementById('menu-container');
    const arContainer = document.getElementById('ar-container');
    
    // Animation de transition fluide
    menuContainer.style.transform = 'scale(0.9)';
    menuContainer.style.opacity = '0';
    
    setTimeout(() => {
        menuContainer.style.display = 'none';
        arContainer.style.display = 'block';
        isARActive = true;
        
        // Mise à jour des instructions
        updateARInstructions('Recherche de surface...');
        
        // Cacher tous les burgers
        hideAllBurgers();
        
        // Attendre que 8th Wall détecte une surface
        setTimeout(() => {
            showBurgerWithEffect(burgerType);
            updateARInstructions('Burger placé ! Bougez autour pour l\'explorer');
        }, 2000);
    }, 300);
}

function showBurgerWithEffect(burgerType) {
    const burgerElement = document.getElementById(`burger-${burgerType}`);
    if (burgerElement) {
        // Positionnement intelligent sur surface détectée
        burgerElement.setAttribute('visible', 'true');
        burgerElement.emit('showBurger');
        currentBurger = burgerType;
        
        // Effet sonore (optionnel)
        playPlacementSound();
    }
}

function closeAR() {
    if (!isARActive) return;
    
    isARActive = false;
    hideAllBurgers();
    
    const menuContainer = document.getElementById('menu-container');
    const arContainer = document.getElementById('ar-container');
    
    arContainer.style.display = 'none';
    menuContainer.style.display = 'block';
    menuContainer.style.transform = 'scale(1)';
    menuContainer.style.opacity = '1';
    
    currentBurger = null;
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

function updateARInstructions(message) {
    const instructions = document.getElementById('ar-instructions');
    if (instructions) {
        instructions.innerHTML = `<p>📱 ${message}</p>`;
    }
}

function playPlacementSound() {
    // Son de placement (optionnel)
    if ('vibrate' in navigator) {
        navigator.vibrate(100);
    }
}

// Détection de surface 8th Wall
const initSurfaceTracking = () => {
    const scene = document.getElementById('ar-scene');
    if (scene) {
        scene.addEventListener('xrweb-surface-found', (event) => {
            updateARInstructions('Surface détectée ! Touchez pour placer votre burger');
        });
        
        scene.addEventListener('xrweb-surface-lost', (event) => {
            updateARInstructions('Surface perdue... Recherche en cours');
        });
    }
};

// Gestion des erreurs et compatibilité
window.addEventListener('load', function() {
    // Vérifier la compatibilité 8th Wall
    if (typeof XR8 === 'undefined') {
        console.warn('8th Wall non disponible - fallback vers mode démo');
        // Fallback vers AR.js ou mode démo
    }
    
    // Initialiser le tracking
    initSurfaceTracking();
    
    // Optimisations performances
    const scene = document.getElementById('ar-scene');
    if (scene) {
        scene.setAttribute('stats', false);
        scene.setAttribute('antialias', true);
        scene.setAttribute('logarithmicDepthBuffer', true);
    }
});

// Gestion des gestes tactiles
let touchStartTime = 0;
let touchStartPos = { x: 0, y: 0 };

document.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    touchStartPos.x = e.touches[0].clientX;
    touchStartPos.y = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchDuration = Date.now() - touchStartTime;
    const touchEndPos = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
    };
    
    const distance = Math.sqrt(
        Math.pow(touchEndPos.x - touchStartPos.x, 2) + 
        Math.pow(touchEndPos.y - touchStartPos.y, 2)
    );
    
    // Tap détecté
    if (touchDuration < 300 && distance < 30 && isARActive && currentBurger) {
        // Animation d'interaction
        const burger = document.getElementById(`burger-${currentBurger}`);
        if (burger) {
            burger.emit('tap-animation');
        }
    }
});

// Chargement différé de 8th Wall
if (window.XR8) {
    onxrloaded();
} else {
    window.addEventListener('xrloaded', onxrloaded);
}