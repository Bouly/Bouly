// AR Pro Gratuit - Script d'interactions avancées
// Qualité commerciale avec AR.js optimisé

let currentBurger = null;
let animationsEnabled = true;
let gestureMultiplier = 1.2;

// Initialisation des textures procédurales
function initProTextures() {
    // Texture pain
    const bunCanvas = document.getElementById('bun-texture');
    const bunCtx = bunCanvas.getContext('2d');
    
    // Gradient pain artisanal
    const bunGradient = bunCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
    bunGradient.addColorStop(0, '#F4E4BC');
    bunGradient.addColorStop(0.6, '#E6D2A6');
    bunGradient.addColorStop(1, '#D4B896');
    
    bunCtx.fillStyle = bunGradient;
    bunCtx.fillRect(0, 0, 512, 512);
    
    // Ajout de texture granuleuse
    for (let i = 0; i < 300; i++) {
        bunCtx.fillStyle = `rgba(${139 + Math.random() * 40}, ${69 + Math.random() * 40}, ${19 + Math.random() * 30}, ${0.1 + Math.random() * 0.3})`;
        bunCtx.fillRect(Math.random() * 512, Math.random() * 512, 2 + Math.random() * 3, 2 + Math.random() * 3);
    }
    
    // Texture viande grillée
    const meatCanvas = document.getElementById('meat-texture');
    const meatCtx = meatCanvas.getContext('2d');
    
    const meatGradient = meatCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
    meatGradient.addColorStop(0, '#8B4513');
    meatGradient.addColorStop(0.5, '#A0522D');
    meatGradient.addColorStop(1, '#654321');
    
    meatCtx.fillStyle = meatGradient;
    meatCtx.fillRect(0, 0, 512, 512);
    
    // Marques de grill procédurales
    for (let i = 0; i < 8; i++) {
        const y = (i * 60) + Math.random() * 20;
        meatCtx.strokeStyle = 'rgba(60, 30, 15, 0.8)';
        meatCtx.lineWidth = 4 + Math.random() * 2;
        meatCtx.beginPath();
        meatCtx.moveTo(0, y);
        meatCtx.lineTo(512, y + Math.random() * 10 - 5);
        meatCtx.stroke();
    }
    
    // Texture fromage
    const cheeseCanvas = document.getElementById('cheese-texture');
    const cheeseCtx = cheeseCanvas.getContext('2d');
    
    const cheeseGradient = cheeseCtx.createLinearGradient(0, 0, 512, 512);
    cheeseGradient.addColorStop(0, '#FFD700');
    cheeseGradient.addColorStop(0.5, '#FFA500');
    cheeseGradient.addColorStop(1, '#FF8C00');
    
    cheeseCtx.fillStyle = cheeseGradient;
    cheeseCtx.fillRect(0, 0, 512, 512);
    
    // Effet brillant fromage fondu
    for (let i = 0; i < 50; i++) {
        cheeseCtx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.3})`;
        cheeseCtx.beginPath();
        cheeseCtx.arc(Math.random() * 512, Math.random() * 512, 5 + Math.random() * 15, 0, Math.PI * 2);
        cheeseCtx.fill();
    }
}

// Démarrage AR Pro optimisé
function startProAR(burgerType) {
    console.log(`🚀 Démarrage AR Pro pour: ${burgerType}`);
    
    // Masquer le menu
    document.getElementById('menu-container').style.display = 'none';
    
    // Afficher la scène AR
    const scene = document.getElementById('ar-pro-scene');
    scene.style.display = 'block';
    
    // Initialiser les textures
    setTimeout(initProTextures, 100);
    
    // Afficher les contrôles
    document.getElementById('ar-controls-pro').style.display = 'block';
    
    // Sélectionner et afficher le burger
    currentBurger = burgerType;
    
    setTimeout(() => {
        showBurgerPro(burgerType);
        initAdvancedInteractions();
    }, 500);
}

// Affichage du burger avec effets cinématographiques
function showBurgerPro(type) {
    const burger = document.getElementById('pro-burger-classic');
    
    if (burger) {
        burger.setAttribute('visible', 'true');
        
        // Déclencher l'animation d'entrée
        burger.emit('spawn');
        
        // Effet de particules
        setTimeout(() => {
            addSparkleEffect(burger);
        }, 1000);
        
        // Son d'activation (optionnel)
        playActivationSound();
        
        // Mise à jour du statut
        document.getElementById('ar-status-pro').innerHTML = `🍔 ${getBurgerName(type)} chargé - Qualité Pro !`;
    }
}

// Interactions gestuelles avancées
function initAdvancedInteractions() {
    const scene = document.getElementById('ar-pro-scene');
    
    // Gestion des gestes multi-touch
    let touchStartScale = 1;
    let touchStartRotation = 0;
    let lastTouchDistance = 0;
    let lastTouchAngle = 0;
    
    // Touch start
    scene.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            // Pinch to scale - calculer distance initiale
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            lastTouchDistance = Math.sqrt(
                Math.pow(touch2.pageX - touch1.pageX, 2) +
                Math.pow(touch2.pageY - touch1.pageY, 2)
            );
            
            // Rotation - calculer angle initial
            lastTouchAngle = Math.atan2(
                touch2.pageY - touch1.pageY,
                touch2.pageX - touch1.pageX
            );
            
            const burger = document.getElementById('pro-burger-classic');
            if (burger) {
                const currentScale = burger.getAttribute('scale');
                touchStartScale = currentScale.x;
                
                const currentRotation = burger.getAttribute('rotation');
                touchStartRotation = currentRotation.y;
            }
        }
    });
    
    // Touch move
    scene.addEventListener('touchmove', function(e) {
        e.preventDefault();
        
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            
            // Nouveau scale basé sur pinch
            const newDistance = Math.sqrt(
                Math.pow(touch2.pageX - touch1.pageX, 2) +
                Math.pow(touch2.pageY - touch1.pageY, 2)
            );
            
            const scaleChange = newDistance / lastTouchDistance;
            let newScale = touchStartScale * scaleChange * gestureMultiplier;
            
            // Limites de scale
            newScale = Math.max(0.3, Math.min(4, newScale));
            
            // Nouvelle rotation basée sur twist
            const newAngle = Math.atan2(
                touch2.pageY - touch1.pageY,
                touch2.pageX - touch1.pageX
            );
            
            const angleChange = (newAngle - lastTouchAngle) * (180 / Math.PI) * gestureMultiplier;
            const newRotationY = touchStartRotation + angleChange;
            
            // Appliquer les transformations
            const burger = document.getElementById('pro-burger-classic');
            if (burger) {
                burger.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
                burger.setAttribute('rotation', `0 ${newRotationY} 0`);
                
                // Feedback visuel
                updateInteractionFeedback(newScale, newRotationY);
            }
        }
    });
    
    // Double tap pour reset
    let lastTap = 0;
    scene.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            // Double tap détecté
            resetBurgerPro();
            vibrateFeedback();
        }
        
        lastTap = currentTime;
    });
    
    // Gestion clavier pour desktop
    document.addEventListener('keydown', function(e) {
        const burger = document.getElementById('pro-burger-classic');
        if (!burger || !burger.getAttribute('visible')) return;
        
        const currentRotation = burger.getAttribute('rotation');
        let newRotationY = currentRotation.y;
        
        switch(e.key) {
            case 'ArrowLeft':
                newRotationY -= 15;
                break;
            case 'ArrowRight':
                newRotationY += 15;
                break;
            case 'ArrowUp':
                scaleBurger(1.1);
                break;
            case 'ArrowDown':
                scaleBurger(0.9);
                break;
            case ' ':
                e.preventDefault();
                resetBurgerPro();
                break;
        }
        
        burger.setAttribute('rotation', `0 ${newRotationY} 0`);
    });
}

// Mise à l'échelle du burger
function scaleBurger(factor) {
    const burger = document.getElementById('pro-burger-classic');
    if (burger) {
        const currentScale = burger.getAttribute('scale');
        let newScale = currentScale.x * factor;
        newScale = Math.max(0.3, Math.min(4, newScale));
        burger.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
    }
}

// Feedback d'interaction
function updateInteractionFeedback(scale, rotation) {
    const status = document.getElementById('ar-status-pro');
    const scalePercent = Math.round(scale * 100);
    const rotationDegrees = Math.round(rotation) % 360;
    
    status.innerHTML = `🎯 Échelle: ${scalePercent}% | Rotation: ${rotationDegrees}° | 🤏 Pincez • 🔄 Tournez`;
}

// Reset du burger
function resetBurgerPro() {
    const burger = document.getElementById('pro-burger-classic');
    if (burger) {
        burger.setAttribute('scale', '0.8 0.8 0.8');
        burger.setAttribute('rotation', '0 0 0');
        burger.setAttribute('position', '0 0 -4');
        
        // Animation de reset
        burger.setAttribute('animation__reset', 'property: scale; from: 0 0 0; to: 0.8 0.8 0.8; dur: 800; easing: easeOutBounce');
        
        document.getElementById('ar-status-pro').innerHTML = '🔄 Position réinitialisée !';
        
        setTimeout(() => {
            document.getElementById('ar-status-pro').innerHTML = '🎯 AR Pro activé - Interagissez avec votre burger !';
        }, 2000);
    }
}

// Toggle des animations
function toggleAnimations() {
    animationsEnabled = !animationsEnabled;
    
    const burger = document.getElementById('pro-burger-classic');
    if (burger) {
        if (animationsEnabled) {
            burger.setAttribute('animation__rotation', 'property: rotation; to: 0 360 0; dur: 25000; loop: true; easing: linear');
            burger.setAttribute('animation__float', 'property: position; dir: alternate; dur: 4000; loop: true; easing: easeInOutSine');
        } else {
            burger.removeAttribute('animation__rotation');
            burger.removeAttribute('animation__float');
        }
    }
    
    document.getElementById('ar-status-pro').innerHTML = animationsEnabled ? 
        '▶️ Animations activées' : '⏸️ Animations désactivées';
}

// Effet de particules
function addSparkleEffect(entity) {
    const sparkles = document.createElement('a-entity');
    sparkles.setAttribute('position', '0 0.8 0');
    sparkles.setAttribute('particle-system', {
        preset: 'snow',
        particleCount: 200,
        color: '#FFD700,#FF6B35,#FFFFFF',
        size: 0.5,
        maxAge: 4,
        velocityValue: '0 2 0',
        velocitySpread: '2 1 2',
        accelerationValue: '0 -1 0'
    });
    
    entity.appendChild(sparkles);
    
    // Nettoyer après 5 secondes
    setTimeout(() => {
        if (sparkles.parentNode) {
            sparkles.parentNode.removeChild(sparkles);
        }
    }, 5000);
}

// Son d'activation
function playActivationSound() {
    try {
        // Synthèse audio simple pour feedback
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        console.log('Audio non disponible');
    }
}

// Vibration tactile
function vibrateFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate([50, 50, 100]);
    }
}

// Noms des burgers
function getBurgerName(type) {
    const names = {
        'classic': 'Classic Burger',
        'cheese': 'Cheese Deluxe',
        'bacon': 'Bacon Supreme'
    };
    return names[type] || 'Burger Mystère';
}

// Sortie de l'AR
function exitProAR() {
    document.getElementById('ar-pro-scene').style.display = 'none';
    document.getElementById('ar-controls-pro').style.display = 'none';
    document.getElementById('menu-container').style.display = 'block';
    
    // Nettoyer la scène
    const burger = document.getElementById('pro-burger-classic');
    if (burger) {
        burger.setAttribute('visible', 'false');
        burger.setAttribute('scale', '0.8 0.8 0.8');
        burger.setAttribute('rotation', '0 0 0');
    }
    
    currentBurger = null;
}

// Gestion des erreurs AR
window.addEventListener('error', function(e) {
    console.warn('Erreur AR interceptée:', e.message);
    
    if (e.message.includes('camera') || e.message.includes('getUserMedia')) {
        document.getElementById('ar-status-pro').innerHTML = '📷 Veuillez autoriser l\'accès à la caméra';
    }
});

// Optimisations performances
document.addEventListener('DOMContentLoaded', function() {
    // Préchargement des ressources
    const scene = document.getElementById('ar-pro-scene');
    
    scene.addEventListener('renderstart', function() {
        console.log('🎬 Rendu AR démarré');
    });
    
    // Gestion de la mise en veille
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && currentBurger) {
            // Pause des animations pour économiser la batterie
            toggleAnimations();
        }
    });
});

// CSS pour les boutons de contrôle
const style = document.createElement('style');
style.textContent = `
    .control-btn-pro {
        background: linear-gradient(45deg, #667eea, #764ba2);
        border: none;
        padding: 12px 16px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .control-btn-pro:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
    
    .control-btn-pro:active {
        transform: scale(0.98);
    }
    
    @media (max-width: 768px) {
        .control-btn-pro {
            padding: 15px 12px;
            font-size: 0.9em;
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 AR Pro Gratuit - Script chargé et optimisé !');
