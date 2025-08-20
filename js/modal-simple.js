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
 * Configure Three.js avec le modèle 3D du plat
 * @param {Object} dish - Objet contenant les informations du plat
 */
function setupModelViewer(dish) {
    console.log('🎮 Configuration Three.js pour:', dish.name);
    
    // Variables Three.js globales (à initialiser une seule fois)
    if (!window.threeJSSetup) {
        initThreeJS();
        window.threeJSSetup = true;
    }
    
    // Charger le nouveau modèle
    loadThreeJSModel(dish.model3d || './models/KFC.glb');
}

/**
 * Initialise Three.js
 */
function initThreeJS() {
    const container = document.getElementById('foodModel');
    if (!container) return;
    
    // Nettoyer le contenu existant
    container.innerHTML = '';
    
    // Créer le canvas Three.js
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    // Configuration Three.js
    window.threeScene = new THREE.Scene();
    window.threeCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    window.threeRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    
    window.threeRenderer.setSize(container.clientWidth, container.clientHeight);
    window.threeRenderer.setPixelRatio(window.devicePixelRatio);
    window.threeScene.background = new THREE.Color(0xf0f0f0);
    
    // Lumières
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    window.threeScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    window.threeScene.add(directionalLight);
    
    // Contrôles
    window.threeControls = new THREE.OrbitControls(window.threeCamera, canvas);
    window.threeControls.enableDamping = true;
    window.threeControls.dampingFactor = 0.1;
    
    // Position de la caméra
    window.threeCamera.position.set(0, 0, 5);
    
    // Boucle de rendu
    function animate() {
        requestAnimationFrame(animate);
        window.threeControls.update();
        window.threeRenderer.render(window.threeScene, window.threeCamera);
    }
    animate();
    
    console.log('✅ Three.js initialisé');
}

/**
 * Charge un modèle 3D avec Three.js
 */
function loadThreeJSModel(modelPath) {
    if (!window.threeScene) return;
    
    // Supprimer le modèle précédent
    if (window.currentThreeModel) {
        window.threeScene.remove(window.currentThreeModel);
    }
    
    // Loader GLTF
    const loader = new THREE.GLTFLoader();
    
    loader.load(
        modelPath,
        (gltf) => {
            window.currentThreeModel = gltf.scene;
            
            // Centrer le modèle
            const box = new THREE.Box3().setFromObject(window.currentThreeModel);
            const center = box.getCenter(new THREE.Vector3());
            window.currentThreeModel.position.sub(center);
            
            // Redimensionner si nécessaire
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            window.currentThreeModel.scale.setScalar(scale);
            
            window.threeScene.add(window.currentThreeModel);
            console.log('✅ Modèle chargé:', modelPath);
        },
        (progress) => {
            console.log('⏳ Chargement:', Math.round((progress.loaded / progress.total) * 100) + '%');
        },
        (error) => {
            console.error('❌ Erreur de chargement:', error);
        }
    );
            
            console.log('✅ Annotations ajoutées après chargement, nombre de hotspots:', modelViewer.querySelectorAll('.hotspot').length);
            
            // Ajuster la caméra pour mieux centrer le modèle
            setTimeout(() => {
                modelViewer.cameraTarget = '0m 0.1m 0m';
                modelViewer.cameraOrbit = '0deg 45deg 10.5m';
                console.log('📷 Caméra ajustée pour centrer le modèle');
            }, 500);
            
            // Retirer l'event listener pour éviter les doublons
            modelViewer.removeEventListener('load', addHotspotsOnLoad);
        }, { once: true });
    } else {
        console.log('❌ Pas une pizza:', dish.name, 'catégorie:', dish.category);
        
        // Pour les autres plats, centrer quand même la caméra
        modelViewer.addEventListener('load', function() {
            setTimeout(() => {
                modelViewer.cameraTarget = '0m 0.05m 0m';
                modelViewer.cameraOrbit = '0deg 30deg 3.0m';
                console.log('📷 Caméra ajustée pour modèle non-pizza');
            }, 500);
        }, { once: true });
    }
    
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
