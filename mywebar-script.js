// BurgerVision MyWebAR - Script principal
let currentBurger = null;
let isMyWebARActive = false;
let scene = null;

// Initialisation MyWebAR
function initMyWebAR() {
    scene = document.querySelector('#mywebaar-scene');
    
    if (scene) {
        // Événements de la scène
        scene.addEventListener('loaded', () => {
            console.log('MyWebAR scene loaded');
            updateStatus('✅ Caméra prête - Pointez vers une surface');
        });

        scene.addEventListener('arjs-video-loaded', () => {
            console.log('Camera stream started');
            updateStatus('📹 Caméra activée - Recherche de surface...');
        });

        // Gestion des erreurs
        scene.addEventListener('arjs-nft-init-data', () => {
            console.log('AR tracking initialized');
        });
    }
}

// Démarrage MyWebAR
function startMyWebAR(burgerType) {
    if (isMyWebARActive) return;

    console.log('Starting MyWebAR for:', burgerType);
    
    // Cacher le menu avec animation
    const menuContainer = document.getElementById('menu-container');
    menuContainer.style.transform = 'scale(0.9)';
    menuContainer.style.opacity = '0';
    
    setTimeout(() => {
        menuContainer.style.display = 'none';
        
        // Afficher la scène AR
        const arScene = document.getElementById('mywebaar-scene');
        arScene.style.display = 'block';
        
        // Afficher les contrôles
        document.getElementById('myweb-controls').style.display = 'block';
        
        isMyWebARActive = true;
        currentBurger = burgerType;
        
        // Attendre un peu puis afficher le burger
        setTimeout(() => {
            showMyWebBurger(burgerType);
        }, 2000);
        
        updateStatus('🔍 Recherche de surface... Bougez lentement votre téléphone');
        
    }, 300);
}

// Affichage du burger MyWebAR
function showMyWebBurger(burgerType) {
    console.log('Showing burger:', burgerType);
    
    // Cacher tous les burgers
    hideAllMyWebBurgers();
    
    // Afficher le burger sélectionné
    const burger = document.getElementById(`myweb-burger-${burgerType}`);
    if (burger) {
        burger.setAttribute('visible', 'true');
        
        // Animation d'apparition dramatique
        burger.setAttribute('animation__spawn', {
            property: 'scale',
            from: '0 0 0',
            to: '0.8 0.8 0.8',
            dur: 1500,
            easing: 'easeOutElastic'
        });
        
        // Animation de flottement
        burger.setAttribute('animation__float', {
            property: 'position',
            from: '0 -0.5 -3',
            to: '0 0 -3',
            dur: 1000,
            easing: 'easeOutQuad'
        });
        
        updateStatus(`🍔 ${getBurgerName(burgerType)} placé ! Touchez pour interagir`);
        
        // Vibration de confirmation
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }
}

// Noms des burgers
function getBurgerName(type) {
    const names = {
        'classic': 'Classic Burger',
        'cheese': 'Cheese Deluxe',
        'bacon': 'Bacon Supreme',
        'spicy': 'Spicy Chicken',
        'veggie': 'Veggie Burger'
    };
    return names[type] || 'Burger';
}

// Cacher tous les burgers
function hideAllMyWebBurgers() {
    const burgers = ['classic', 'cheese', 'bacon', 'spicy', 'veggie'];
    burgers.forEach(type => {
        const element = document.getElementById(`myweb-burger-${type}`);
        if (element) {
            element.setAttribute('visible', 'false');
        }
    });
}

// Reset position du burger
function resetBurgerPosition() {
    if (currentBurger) {
        const burger = document.getElementById(`myweb-burger-${currentBurger}`);
        if (burger) {
            // Reset position et scale
            burger.setAttribute('position', '0 0 -3');
            burger.setAttribute('scale', '0.8 0.8 0.8');
            burger.setAttribute('rotation', '0 0 0');
            
            // Animation de reset
            burger.setAttribute('animation__reset', {
                property: 'rotation',
                to: '0 360 0',
                dur: 1000,
                easing: 'easeInOutQuad'
            });
            
            updateStatus('🔄 Position réinitialisée');
        }
    }
}

// Quitter MyWebAR
function exitMyWebAR() {
    if (!isMyWebARActive) return;

    console.log('Exiting MyWebAR');
    
    isMyWebARActive = false;
    
    // Cacher la scène AR
    document.getElementById('mywebaar-scene').style.display = 'none';
    document.getElementById('myweb-controls').style.display = 'none';
    
    // Afficher le menu avec animation
    const menuContainer = document.getElementById('menu-container');
    menuContainer.style.display = 'block';
    menuContainer.style.transform = 'scale(1)';
    menuContainer.style.opacity = '1';
    
    // Cacher tous les burgers
    hideAllMyWebBurgers();
    currentBurger = null;
}

// Mise à jour du statut
function updateStatus(message) {
    const statusElement = document.getElementById('myweb-status');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

// Gestion des interactions gestuelles avancées
function setupGestureHandlers() {
    // Double tap pour rotation rapide
    let lastTap = 0;
    document.addEventListener('touchend', function(event) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0 && currentBurger) {
            // Double tap détecté
            const burger = document.getElementById(`myweb-burger-${currentBurger}`);
            if (burger && burger.getAttribute('visible') === 'true') {
                // Rotation rapide
                burger.setAttribute('animation__doubletap', {
                    property: 'rotation',
                    to: '0 720 0',
                    dur: 2000,
                    easing: 'easeOutQuad'
                });
                
                updateStatus('🌟 Double tap ! Rotation rapide');
                
                if ('vibrate' in navigator) {
                    navigator.vibrate([50, 100, 50]);
                }
            }
        }
        lastTap = currentTime;
    });
}

// Détection de mouvement pour améliorer le tracking
function setupMotionDetection() {
    if ('DeviceOrientationEvent' in window) {
        let lastOrientation = { alpha: 0, beta: 0, gamma: 0 };
        
        window.addEventListener('deviceorientation', function(event) {
            if (isMyWebARActive) {
                const movement = Math.abs(event.alpha - lastOrientation.alpha) +
                               Math.abs(event.beta - lastOrientation.beta) +
                               Math.abs(event.gamma - lastOrientation.gamma);
                
                if (movement > 10) {
                    updateStatus('📱 Bon mouvement ! Continuez...');
                } else if (movement < 2) {
                    updateStatus('⚠️ Bougez lentement pour améliorer le tracking');
                }
                
                lastOrientation = { alpha: event.alpha, beta: event.beta, gamma: event.gamma };
            }
        });
    }
}

// Optimisation des performances
function optimizePerformance() {
    if (scene) {
        // Réduire la résolution de rendu sur mobiles moins puissants
        const renderer = scene.renderer;
        if (renderer && window.innerWidth < 768) {
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }
        
        // Désactiver le debug en production
        scene.setAttribute('stats', false);
        scene.setAttribute('inspector', false);
    }
}

// Gestion de la compatibilité
function checkMyWebARCompatibility() {
    // Vérifier la caméra
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        updateStatus('❌ Caméra non supportée par ce navigateur');
        return false;
    }
    
    // Vérifier WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        updateStatus('❌ WebGL non supporté');
        return false;
    }
    
    return true;
}

// Initialisation au chargement
window.addEventListener('load', function() {
    console.log('BurgerVision MyWebAR - Initialisation...');
    
    // Vérifier la compatibilité
    if (!checkMyWebARCompatibility()) {
        console.error('MyWebAR non compatible avec cet appareil');
        return;
    }
    
    // Initialiser MyWebAR
    initMyWebAR();
    
    // Configurer les gestionnaires
    setupGestureHandlers();
    setupMotionDetection();
    optimizePerformance();
    
    console.log('✅ MyWebAR prêt !');
});

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur MyWebAR:', e.error);
    updateStatus('❌ Erreur: ' + e.error.message);
});

// Gestion de la perte de focus (optimisation batterie)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && isMyWebARActive) {
        // Mettre en pause les animations
        if (currentBurger) {
            const burger = document.getElementById(`myweb-burger-${currentBurger}`);
            if (burger) {
                burger.removeAttribute('animation__rotation');
            }
        }
    } else if (!document.hidden && isMyWebARActive) {
        // Reprendre les animations
        if (currentBurger) {
            const burger = document.getElementById(`myweb-burger-${currentBurger}`);
            if (burger) {
                burger.setAttribute('animation__rotation', {
                    property: 'rotation',
                    to: '0 360 0',
                    dur: 20000,
                    loop: true,
                    easing: 'linear'
                });
            }
        }
    }
});

// Export des fonctions globales
window.startMyWebAR = startMyWebAR;
window.exitMyWebAR = exitMyWebAR;
window.resetBurgerPosition = resetBurgerPosition;
