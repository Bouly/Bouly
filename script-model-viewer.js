// BurgerVision Pro - Model-Viewer AR Script
// Qualité professionnelle avec Google Model-Viewer

let currentModel = null;
let autoRotateEnabled = true;
let environmentIndex = 0;

// URLs des modèles 3D (exemple avec modèles de démonstration)
const burgerModels = {
    classic: {
        src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', // Remplacer par vos modèles
        title: '🍔 Classic Burger',
        description: 'Pain artisanal, steak grillé, salade fraîche - 8.90€',
        poster: 'https://via.placeholder.com/400x400/8B4513/white?text=🍔'
    },
    cheese: {
        src: 'https://modelviewer.dev/shared-assets/models/shishkebab.glb',
        title: '🧀 Cheese Deluxe', 
        description: 'Pain brioche, steak, fromage fondu - 9.90€',
        poster: 'https://via.placeholder.com/400x400/FFD700/black?text=🧀'
    },
    bacon: {
        src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        title: '🥓 Bacon Supreme',
        description: 'Pain aux graines, steak, bacon croustillant - 11.90€', 
        poster: 'https://via.placeholder.com/400x400/FF6B35/white?text=🥓'
    },
    spicy: {
        src: 'https://modelviewer.dev/shared-assets/models/shishkebab.glb',
        title: '🌶️ Spicy Chicken',
        description: 'Pain, poulet épicé, salade, mayo épicée - 10.90€',
        poster: 'https://via.placeholder.com/400x400/FF0000/white?text=🌶️'
    },
    veggie: {
        src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        title: '🥬 Veggie Burger', 
        description: 'Pain, steak végétal, avocat, légumes - 9.50€',
        poster: 'https://via.placeholder.com/400x400/228B22/white?text=🥬'
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

// Affichage du modèle sélectionné
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
    
    // Configurer le model-viewer
    const modelViewer = document.getElementById('burger-model');
    
    // Réinitialiser les propriétés
    modelViewer.src = modelData.src;
    modelViewer.poster = modelData.poster;
    
    // Réinitialiser la rotation automatique
    autoRotateEnabled = true;
    modelViewer.autoRotate = true;
    document.getElementById('rotate-btn').textContent = '⏸️ Pause';
    
    // Réinitialiser l'environnement
    environmentIndex = 0;
    modelViewer.environmentImage = environments[0];
    
    // Réinitialiser la caméra
    modelViewer.cameraOrbit = '0deg 90deg 2.5m';
    
    // Effet de fondu d'entrée
    modelViewer.style.opacity = '0';
    setTimeout(() => {
        modelViewer.style.transition = 'opacity 0.5s ease';
        modelViewer.style.opacity = '1';
    }, 100);
    
    // Ajouter les événements
    setupModelEvents(modelViewer);
    
    console.log('✅ Modèle configuré avec succès');
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

// Reset du modèle
function resetModel() {
    const modelViewer = document.getElementById('burger-model');
    
    // Animation de reset
    modelViewer.style.transform = 'scale(0.9) rotateY(180deg)';
    
    setTimeout(() => {
        // Réinitialiser la position de la caméra
        modelViewer.cameraOrbit = '0deg 90deg 2.5m';
        modelViewer.fieldOfView = 'auto';
        
        // Animation de retour
        modelViewer.style.transition = 'transform 0.8s ease';
        modelViewer.style.transform = 'scale(1) rotateY(0deg)';
        
        console.log('🔄 Modèle réinitialisé');
    }, 300);
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
