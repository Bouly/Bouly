// BurgerVision Pro - Model-Viewer AR Script
// Qualité professionnelle avec Google Model-Viewer

let currentModel = null;
let autoRotateEnabled = true;
let environmentIndex = 0;

// URLs des modèles 3D avec de vrais burgers réalistes
const burgerModels = {
    classic: {
        src: './models/burgertest.glb', // Votre modèle 3D local
        title: '🍔 Classic Burger',
        description: 'Pain artisanal, steak grillé, salade fraîche - 8.90€',
        poster: 'https://via.placeholder.com/400x400/8B4513/white?text=🍔',
        scale: '0.01 0.01 0.01',
        cameraOrbit: '0deg 65deg 2m',
        fieldOfView: '60deg'
    },
    cheese: {
        src: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb', // Remplacer par burger fromage
        title: '🧀 Cheese Deluxe', 
        description: 'Pain brioche, steak, fromage fondu - 9.90€',
        poster: 'https://via.placeholder.com/400x400/FFD700/black?text=🧀',
        scale: '0.9 0.9 0.9',
        cameraOrbit: '15deg 70deg 1.3m',
        fieldOfView: '28deg'
    },
    bacon: {
        src: 'https://cdn.glitch.com/324a5290-5aa7-4efc-92d6-ae0736433b12/burger.glb?v=1558446851981', // Burger avec bacon
        title: '🥓 Bacon Supreme',
        description: 'Pain aux graines, steak, bacon croustillant - 11.90€', 
        poster: 'https://via.placeholder.com/400x400/FF6B35/white?text=🥓',
        scale: '1.0 1.0 1.0',
        cameraOrbit: '-10deg 75deg 1.4m',
        fieldOfView: '30deg'
    },
    spicy: {
        src: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb', // Remplacer par burger épicé
        title: '🌶️ Spicy Chicken',
        description: 'Pain, poulet épicé, salade, mayo épicée - 10.90€',
        poster: 'https://via.placeholder.com/400x400/FF0000/white?text=🌶️',
        scale: '0.85 0.85 0.85',
        cameraOrbit: '20deg 68deg 1.25m',
        fieldOfView: '26deg'
    },
    veggie: {
        src: 'https://threejs.org/examples/models/gltf/Flamingo.glb', // Remplacer par burger veggie
        title: '🥬 Veggie Burger', 
        description: 'Pain, steak végétal, avocat, légumes - 9.50€',
        poster: 'https://via.placeholder.com/400x400/228B22/white?text=🥬',
        scale: '0.75 0.75 0.75',
        cameraOrbit: '5deg 72deg 1.15m',
        fieldOfView: '24deg'
    }
};

// Environnements HDR pour éclairage réaliste
const environments = [
    'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr',
    'https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr',
    'https://modelviewer.dev/shared-assets/environments/whipple_creek_regional_park_04_1k.hdr',
    'https://modelviewer.dev/shared-assets/environments/music_hall_01_1k.hdr'
];

const environmentNames = [
    '🌅 Lever de soleil',
    '🏭 Atelier',
    '🌲 Forêt',
    '🎭 Salle de concert'
];

// Affichage du modèle sélectionné avec configuration réaliste
function showModel(burgerType) {
    console.log(`🚀 Affichage du modèle: ${burgerType}`);
    
    currentModel = burgerType;
    const modelData = burgerModels[burgerType];
    
    if (!modelData) {
        console.error('Modèle non trouvé:', burgerType);
        return;
    }

    // Masquer le menu
    document.getElementById('menu-container').style.display = 'none';
    
    // Afficher le container du modèle
    document.getElementById('model-container').style.display = 'block';
    
    // Mettre à jour les informations
    document.getElementById('model-title').textContent = modelData.title;
    document.getElementById('model-description').textContent = modelData.description;
    
    // Configurer le model-viewer avec paramètres réalistes
    const modelViewer = document.getElementById('burger-model');
    
    // Configuration du modèle
    modelViewer.src = modelData.src;
    modelViewer.poster = modelData.poster;
    
    // Configuration réaliste de la caméra et du placement
    modelViewer.cameraOrbit = modelData.cameraOrbit;
    modelViewer.fieldOfView = modelData.fieldOfView;
    modelViewer.scale = modelData.scale;
    
    // Configuration AR ultra-stable
    modelViewer.setAttribute('ar-scale', 'fixed');
    modelViewer.setAttribute('ar-placement', 'floor');
    modelViewer.setAttribute('shadow-intensity', '2');
    modelViewer.setAttribute('shadow-softness', '0.3');
    modelViewer.setAttribute('tone-mapping', 'aces');
    modelViewer.setAttribute('exposure', '1.2');
    
    // Limites de caméra adaptées pour chaque burger
    const minOrbit = `auto 10deg ${parseFloat(modelData.cameraOrbit.split(' ')[2]) * 0.6}`;
    const maxOrbit = `auto 160deg ${parseFloat(modelData.cameraOrbit.split(' ')[2]) * 2}`;
    modelViewer.setAttribute('min-camera-orbit', minOrbit);
    modelViewer.setAttribute('max-camera-orbit', maxOrbit);
    
    // Réinitialiser la rotation automatique avec vitesse réaliste
    autoRotateEnabled = true;
    modelViewer.autoRotate = true;
    modelViewer.setAttribute('rotation-per-second', '15deg');
    document.getElementById('rotate-btn').textContent = '⏸️ Pause';
    
    // Réinitialiser l'environnement
    environmentIndex = 0;
    modelViewer.environmentImage = environments[0];
    
    // Effet de fondu d'entrée
    modelViewer.style.opacity = '0';
    setTimeout(() => {
        modelViewer.style.transition = 'opacity 0.5s ease';
        modelViewer.style.opacity = '1';
    }, 100);
    
    // Ajouter les événements
    setupModelEvents(modelViewer);
    
    // Configuration spécifique AR pour placement réaliste
    setupRealisticAR(modelViewer, modelData);
    
    console.log('✅ Modèle configuré avec placement réaliste');
}

// Configuration AR réaliste pour placement stable
function setupRealisticAR(modelViewer, modelData) {
    // Gestion de la session AR
    modelViewer.addEventListener('ar-status', (event) => {
        if (event.detail.status === 'session-started') {
            console.log('🎯 Session AR démarrée - Placement au sol activé');
            
            // Optimisations pour AR réaliste
            modelViewer.setAttribute('interaction-prompt', 'none');
            modelViewer.setAttribute('auto-rotate', 'false');
            
            // Feedback utilisateur
            showToast('🎯 Posez le burger sur une surface plane');
            
        } else if (event.detail.status === 'not-presenting') {
            console.log('🔚 Session AR terminée');
            
            // Restaurer les paramètres normaux
            modelViewer.setAttribute('interaction-prompt', 'auto');
            if (autoRotateEnabled) {
                modelViewer.setAttribute('auto-rotate', 'true');
            }
        }
    });
    
    // Gestion du placement AR
    modelViewer.addEventListener('ar-tracking', (event) => {
        if (event.detail.status === 'tracking') {
            console.log('📍 Tracking AR stable');
        } else if (event.detail.status === 'not-tracking') {
            console.log('⚠️ Perte de tracking AR');
            showToast('⚠️ Déplacez lentement pour retrouver le tracking');
        }
    });
    
    // Optimisation de performance en AR
    modelViewer.addEventListener('model-visibility', (event) => {
        if (event.detail.visible) {
            console.log('👁️ Modèle visible en AR');
        } else {
            console.log('🙈 Modèle caché en AR');
        }
    });
}

// Configuration des événements du model-viewer
function setupModelEvents(modelViewer) {
    // Événement de chargement
    modelViewer.addEventListener('load', () => {
        console.log('📦 Modèle chargé avec succès');
        
        // Animation d'entrée
        modelViewer.style.transform = 'scale(0.8)';
        setTimeout(() => {
            modelViewer.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            modelViewer.style.transform = 'scale(1)';
        }, 100);
    });
    
    // Événement de progression
    modelViewer.addEventListener('progress', (event) => {
        const progressBar = modelViewer.querySelector('.progress-bar');
        if (progressBar) {
            const progress = event.detail.totalProgress;
            progressBar.style.width = `${progress * 100}%`;
            
            if (progress === 1) {
                setTimeout(() => {
                    progressBar.classList.add('hide');
                }, 500);
            }
        }
    });
    
    // Événement d'erreur
    modelViewer.addEventListener('error', (event) => {
        console.error('❌ Erreur de chargement du modèle:', event.detail);
        alert('Erreur lors du chargement du modèle 3D. Veuillez réessayer.');
    });
    
    // Événement AR
    modelViewer.addEventListener('ar-status', (event) => {
        if (event.detail.status === 'session-started') {
            console.log('🎯 Session AR démarrée');
        } else if (event.detail.status === 'not-presenting') {
            console.log('🔚 Session AR terminée');
        }
    });
    
    // Gestion du clic sur le modèle
    modelViewer.addEventListener('click', (event) => {
        // Effet de vibration sur mobile
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
        
        // Effet visuel de clic
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 107, 53, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = event.clientX - 25 + 'px';
        ripple.style.top = event.clientY - 25 + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.pointerEvents = 'none';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            document.body.removeChild(ripple);
        }, 600);
    });
}

// Reset du modèle avec paramètres réalistes
function resetModel() {
    const modelViewer = document.getElementById('burger-model');
    const modelData = burgerModels[currentModel];
    
    if (!modelData) return;
    
    // Animation de reset
    modelViewer.style.transform = 'scale(0.9) rotateY(180deg)';
    
    setTimeout(() => {
        // Réinitialiser avec les paramètres spécifiques au burger
        modelViewer.cameraOrbit = modelData.cameraOrbit;
        modelViewer.fieldOfView = modelData.fieldOfView;
        modelViewer.scale = modelData.scale;
        
        // Animation de retour
        modelViewer.style.transition = 'transform 0.8s ease';
        modelViewer.style.transform = 'scale(1) rotateY(0deg)';
        
        console.log('🔄 Modèle réinitialisé avec paramètres réalistes');
        showToast('🔄 Position réinitialisée');
    }, 300);
}

// Fonction pour ajuster la vue de manière réaliste
function adjustRealisticView() {
    const modelViewer = document.getElementById('burger-model');
    const modelData = burgerModels[currentModel];
    
    if (!modelData) return;
    
    // Angles de vue optimaux pour chaque burger
    const viewPresets = {
        classic: { orbit: '0deg 65deg 2m', fov: '60deg' },
        cheese: { orbit: '45deg 70deg 1.3m', fov: '28deg' },
        bacon: { orbit: '-30deg 75deg 1.4m', fov: '30deg' },
        spicy: { orbit: '60deg 68deg 1.25m', fov: '26deg' },
        veggie: { orbit: '15deg 72deg 1.15m', fov: '24deg' }
    };
    
    const preset = viewPresets[currentModel] || viewPresets.classic;
    
    // Transition fluide vers la nouvelle vue
    modelViewer.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    modelViewer.cameraOrbit = preset.orbit;
    modelViewer.fieldOfView = preset.fov;
    
    showToast(`🎯 Vue optimisée pour ${modelData.title}`);
}

// Fonction pour activer le mode table réaliste
function enableTableMode() {
    const modelViewer = document.getElementById('burger-model');
    
    // Configuration pour simulation de table
    modelViewer.setAttribute('ar-placement', 'floor');
    modelViewer.setAttribute('shadow-intensity', '3');
    modelViewer.setAttribute('shadow-softness', '0.2');
    
    // Angle de vue de table réaliste
    const tableOrbit = '0deg 45deg 1.0m';
    modelViewer.cameraOrbit = tableOrbit;
    modelViewer.fieldOfView = '35deg';
    
    // Désactiver la rotation auto pour vue stable
    modelViewer.autoRotate = false;
    autoRotateEnabled = false;
    document.getElementById('rotate-btn').textContent = '▶️ Play';
    
    showToast('🍽️ Mode table activé - Vue réaliste');
}

// Toggle rotation automatique
function toggleAutoRotate() {
    const modelViewer = document.getElementById('burger-model');
    const btn = document.getElementById('rotate-btn');
    
    autoRotateEnabled = !autoRotateEnabled;
    modelViewer.autoRotate = autoRotateEnabled;
    
    btn.textContent = autoRotateEnabled ? '⏸️ Pause' : '▶️ Play';
    
    // Feedback visuel
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 150);
    
    console.log('🔄 Rotation automatique:', autoRotateEnabled ? 'activée' : 'désactivée');
}

// Changer l'environnement d'éclairage
function changeEnvironment() {
    const modelViewer = document.getElementById('burger-model');
    
    environmentIndex = (environmentIndex + 1) % environments.length;
    modelViewer.environmentImage = environments[environmentIndex];
    
    // Feedback utilisateur
    const envName = environmentNames[environmentIndex];
    console.log('🌅 Environnement changé:', envName);
    
    // Toast notification
    showToast(`Éclairage: ${envName}`);
}

// Retour au menu
function goBack() {
    // Animation de sortie
    const modelContainer = document.getElementById('model-container');
    modelContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    modelContainer.style.opacity = '0';
    modelContainer.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        // Masquer le modèle
        modelContainer.style.display = 'none';
        
        // Afficher le menu
        const menuContainer = document.getElementById('menu-container');
        menuContainer.style.display = 'block';
        
        // Réinitialiser les styles
        modelContainer.style.opacity = '1';
        modelContainer.style.transform = 'scale(1)';
        modelContainer.style.transition = '';
        
        // Nettoyer le model-viewer
        const modelViewer = document.getElementById('burger-model');
        modelViewer.src = '';
        
        currentModel = null;
        console.log('🔙 Retour au menu');
    }, 300);
}

// Notification toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(45deg, #FF6B35, #FFD700);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animation d'entrée
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Animation de sortie
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    console.error('❌ Erreur globale:', event.error);
    
    if (event.message.includes('model-viewer')) {
        showToast('❌ Erreur de chargement du modèle 3D');
    }
});

// Vérification du support AR
function checkARSupport() {
    if ('xr' in navigator) {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            if (supported) {
                console.log('✅ WebXR AR supporté');
            } else {
                console.log('⚠️ WebXR AR non supporté, fallback vers Quick Look/Scene Viewer');
            }
        });
    } else {
        console.log('⚠️ WebXR non supporté, utilisation des AR viewers natifs');
    }
}

// CSS pour les animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .progress-bar {
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .progress-bar.hide {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    model-viewer {
        transition: opacity 0.5s ease, transform 0.3s ease;
    }
    
    .control-btn {
        transition: transform 0.15s ease, box-shadow 0.3s ease;
    }
    
    .control-btn:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 BurgerVision Pro - Model-Viewer initialisé');
    checkARSupport();
    
    // Préchargement des modèles (optionnel)
    // Object.values(burgerModels).forEach(model => {
    //     const link = document.createElement('link');
    //     link.rel = 'preload';
    //     link.href = model.src;
    //     link.as = 'fetch';
    //     link.crossOrigin = 'anonymous';
    //     document.head.appendChild(link);
    // });
});

console.log('📦 Script Model-Viewer chargé avec succès !');
