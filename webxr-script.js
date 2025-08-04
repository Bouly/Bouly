// BurgerVision WebXR - Script principal
let currentSession = null;
let isWebXRSupported = false;

// Vérification du support WebXR
async function checkWebXRSupport() {
    if ('xr' in navigator) {
        try {
            isWebXRSupported = await navigator.xr.isSessionSupported('immersive-ar');
            console.log('WebXR AR supporté:', isWebXRSupported);
            
            if (!isWebXRSupported) {
                // Fallback vers mode inline
                console.log('Fallback vers mode inline WebXR');
                isWebXRSupported = await navigator.xr.isSessionSupported('inline');
            }
        } catch (e) {
            console.warn('WebXR non disponible:', e);
            isWebXRSupported = false;
        }
    }
    return isWebXRSupported;
}

// Démarrage WebXR
async function startWebXR(burgerType) {
    // Vérifier le support
    const supported = await checkWebXRSupport();
    
    if (!supported) {
        // Fallback vers mode 3D normal
        showBurger3D(burgerType);
        return;
    }

    try {
        // Cacher le menu
        document.getElementById('menu-container').style.display = 'none';
        
        // Afficher la scène WebXR
        const scene = document.getElementById('webxr-scene');
        scene.style.display = 'block';
        
        // Afficher l'overlay
        document.getElementById('overlay').style.display = 'block';
        
        // Initialiser la session WebXR
        const sessionInit = {
            requiredFeatures: ['local-floor'],
            optionalFeatures: ['hit-test', 'dom-overlay'],
            domOverlay: { root: document.getElementById('overlay') }
        };

        // Démarrer la session AR ou inline
        const sessionMode = isWebXRSupported ? 'immersive-ar' : 'inline';
        currentSession = await navigator.xr.requestSession(sessionMode, sessionInit);
        
        // Afficher le burger sélectionné
        showWebXRBurger(burgerType);
        
        // Gestion de la fin de session
        currentSession.addEventListener('end', () => {
            exitWebXR();
        });

        console.log('Session WebXR démarrée avec succès');
        
    } catch (error) {
        console.error('Erreur WebXR:', error);
        // Fallback vers mode 3D
        showBurger3D(burgerType);
    }
}

// Affichage du burger en WebXR
function showWebXRBurger(burgerType) {
    // Cacher tous les burgers
    hideAllWebXRBurgers();
    
    // Afficher le burger sélectionné
    const burger = document.getElementById(`webxr-burger-${burgerType}`);
    if (burger) {
        burger.setAttribute('visible', 'true');
        
        // Animation d'apparition
        burger.setAttribute('animation__appear', {
            property: 'scale',
            from: '0 0 0',
            to: '1 1 1',
            dur: 1500,
            easing: 'easeOutElastic'
        });
    }
}

// Cacher tous les burgers WebXR
function hideAllWebXRBurgers() {
    const burgers = ['classic', 'cheese', 'bacon', 'spicy', 'veggie'];
    burgers.forEach(type => {
        const element = document.getElementById(`webxr-burger-${type}`);
        if (element) {
            element.setAttribute('visible', 'false');
        }
    });
}

// Mode 3D fallback (si WebXR non supporté)
function showBurger3D(burgerType) {
    console.log('Mode fallback 3D pour:', burgerType);
    
    // Cacher le menu
    document.getElementById('menu-container').style.display = 'none';
    
    // Afficher la scène en mode normal
    const scene = document.getElementById('webxr-scene');
    scene.style.display = 'block';
    scene.style.position = 'fixed';
    scene.style.top = '0';
    scene.style.left = '0';
    scene.style.width = '100%';
    scene.style.height = '100%';
    scene.style.zIndex = '1000';
    
    // Afficher l'overlay
    document.getElementById('overlay').style.display = 'block';
    
    // Afficher le burger
    showWebXRBurger(burgerType);
    
    // Message d'info
    showNotification('Mode 3D - WebXR non supporté sur cet appareil');
}

// Quitter WebXR
function exitWebXR() {
    // Terminer la session WebXR
    if (currentSession) {
        currentSession.end();
        currentSession = null;
    }
    
    // Cacher la scène
    document.getElementById('webxr-scene').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    
    // Afficher le menu
    document.getElementById('menu-container').style.display = 'block';
    
    // Cacher tous les burgers
    hideAllWebXRBurgers();
}

// Notification utilisateur
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 16px;
        z-index: 2000;
        animation: fadeInOut 3s ease-in-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Gestion des interactions tactiles
let lastTap = 0;
document.addEventListener('touchend', function(event) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 500 && tapLength > 0) {
        // Double tap détecté
        if (currentSession) {
            // Animation d'interaction
            const scene = document.getElementById('webxr-scene');
            if (scene) {
                const burgers = scene.querySelectorAll('[id^="webxr-burger-"]');
                burgers.forEach(burger => {
                    if (burger.getAttribute('visible') === 'true') {
                        burger.setAttribute('animation__bounce', {
                            property: 'position',
                            from: burger.getAttribute('position'),
                            to: '0 1 -2',
                            dur: 300,
                            dir: 'alternate',
                            easing: 'easeOutQuad'
                        });
                    }
                });
            }
        }
    }
    lastTap = currentTime;
});

// Initialisation
window.addEventListener('load', async function() {
    console.log('BurgerVision WebXR - Initialisation...');
    
    // Vérifier le support WebXR
    await checkWebXRSupport();
    
    if (isWebXRSupported) {
        console.log('✅ WebXR supporté - Mode AR disponible');
        showNotification('🚀 WebXR supporté - Prêt pour la réalité augmentée !');
    } else {
        console.log('⚠️ WebXR non supporté - Mode 3D fallback disponible');
        showNotification('📱 Mode 3D disponible - WebXR non supporté');
    }
    
    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            50% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
});

// Gestion des erreurs
window.addEventListener('error', function(e) {
    console.error('Erreur WebXR:', e.error);
    showNotification('Erreur: ' + e.error.message);
});

// Export des fonctions pour utilisation globale
window.startWebXR = startWebXR;
window.exitWebXR = exitWebXR;
