// ==========================================
// 🎭 GESTION DES MODAUX AR - 6AVENUES (THREE.JS VERSION)
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
    
    // Configurer Three.js au lieu de model-viewer
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
    
    // Nettoyer Three.js
    clearModelViewer();
    
    // Restaurer la position de scroll précédente
    restoreScrollPosition();
    
    currentDish = null;
}

// ==========================================
// 🔄 FONCTIONS UTILITAIRES DE SCROLL
// ==========================================

/**
 * Bloque le scroll de la page en conservant la position
 */
function lockBodyScroll() {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll';
}

/**
 * Débloque le scroll de la page
 */
function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflowY = '';
}

/**
 * Restaure la position de scroll précédente
 */
function restoreScrollPosition() {
    window.scrollTo(0, scrollPosition);
}

// ==========================================
// 🎨 FONCTIONS D'INTERFACE
// ==========================================

/**
 * Met à jour le contenu du modal avec les informations du plat
 * @param {Object} dish - Objet plat contenant les informations
 */
function updateModalContent(dish) {
    const modal = document.getElementById('arModal');
    if (!modal) return;

    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalPrice = modal.querySelector('.modal-price');

    if (modalTitle) modalTitle.textContent = dish.name;
    if (modalDescription) modalDescription.textContent = dish.description;
    if (modalPrice) modalPrice.textContent = dish.price;
}

/**
 * Affiche le modal avec animation d'ouverture fluide
 */
function showModal() {
    const modal = document.getElementById('arModal');
    if (!modal) return;
    
    modal.style.display = 'flex';
    modal.classList.add('active');
    
    // Animation d'ouverture avec CSS
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0) scale(1)';
    });
}

/**
 * Masque le modal avec animation de fermeture fluide
 */
function hideModal() {
    const modal = document.getElementById('arModal');
    if (!modal) return;
    
    // Animation de fermeture
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(-20px) scale(0.95)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }, 300);
}

// ==========================================
// 🎮 THREE.JS REMPLACE MODEL-VIEWER
// ==========================================

/**
 * Configure Three.js avec le modèle 3D du plat
 * @param {Object} dish - Objet contenant les informations du plat
 */
function setupModelViewer(dish) {
    console.log('🎮 Configuration Three.js pour:', dish.name);
    console.log('🔍 Modèle à charger:', dish.model3d);
    
    // Vérifier que le conteneur existe
    const container = document.getElementById('foodModel');
    if (!container) {
        console.error('❌ Container #foodModel non trouvé !');
        return;
    }
    
    console.log('📏 Taille du conteneur:', container.clientWidth, 'x', container.clientHeight);
    
    // Variables Three.js globales (à initialiser une seule fois)
    if (!window.threeJSSetup) {
        initThreeJS();
        window.threeJSSetup = true;
        
        // Forcer un redimensionnement après l'initialisation
        setTimeout(() => {
            if (window.threeRenderer && window.threeCamera) {
                const newWidth = container.clientWidth;
                const newHeight = container.clientHeight;
                
                if (newWidth > 0 && newHeight > 0) {
                    window.threeCamera.aspect = newWidth / newHeight;
                    window.threeCamera.updateProjectionMatrix();
                    window.threeRenderer.setSize(newWidth, newHeight);
                    console.log('🔧 Redimensionnement forcé:', newWidth, 'x', newHeight);
                }
            }
        }, 200);
    }
    
    // Charger le nouveau modèle
    loadThreeJSModel(dish.model3d || './models/KFC.glb');
}

/**
 * Initialise Three.js
 */
function initThreeJS() {
    const container = document.getElementById('foodModel');
    if (!container) {
        console.error('❌ Container #foodModel introuvable !');
        return;
    }
    
    console.log('🎬 Initialisation Three.js...');
    
    // Forcer une taille appropriée du conteneur
    if (container.clientWidth === 0 || container.clientHeight === 0) {
        container.style.width = '100%';
        container.style.height = '300px';
        container.style.maxHeight = '60vh';
        console.log('⚙️ Taille du conteneur ajustée');
    }
    
    // Nettoyer le contenu existant
    container.innerHTML = '';
    
    // Configuration Three.js
    window.threeScene = new THREE.Scene();
    window.threeScene.background = null; // Fond très clair comme model-viewer
    
    // Dimensions du conteneur
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 300;
    
    // Caméra
    window.threeCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    window.threeCamera.position.set(0, 2.5, 3); // Plus haute qu'avant (était 0, 1, 3)
    
    // Renderer
    window.threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    window.threeRenderer.setSize(width, height);
    window.threeRenderer.setPixelRatio(window.devicePixelRatio);
    window.threeRenderer.shadowMap.enabled = true;
    window.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Style du canvas pour qu'il s'adapte parfaitement
    window.threeRenderer.domElement.style.width = '100%';
    window.threeRenderer.domElement.style.height = '100%';
    window.threeRenderer.domElement.style.display = 'block';
    
    container.appendChild(window.threeRenderer.domElement);
    
    console.log('📏 Renderer initialisé avec:', width, 'x', height);
    
    // Fonction de redimensionnement
    function resizeRenderer() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        if (newWidth > 0 && newHeight > 0) {
            window.threeCamera.aspect = newWidth / newHeight;
            window.threeCamera.updateProjectionMatrix();
            window.threeRenderer.setSize(newWidth, newHeight);
            console.log('🔄 Canvas redimensionné:', newWidth, 'x', newHeight);
        }
    }
    
    // Observer le redimensionnement du conteneur
    if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(resizeRenderer);
        resizeObserver.observe(container);
    }
    
    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    window.threeScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    window.threeScene.add(directionalLight);
    
    // Contrôles
    window.threeControls = new THREE.OrbitControls(window.threeCamera, window.threeRenderer.domElement);
    window.threeControls.enableDamping = true;
    window.threeControls.dampingFactor = 0.1;
    window.threeControls.autoRotate = true;
    window.threeControls.autoRotateSpeed = 2.0;
    
    // Désactiver le pan pour garder le modèle centré
    window.threeControls.enablePan = false;
    
    // Limiter l'angle de vue pour ne pas voir en dessous du modèle
    window.threeControls.maxPolarAngle = Math.PI * 0.48; // Limite à ~86° (ne pas aller en dessous)
    window.threeControls.minPolarAngle = 0; // Vue du dessus autorisée
    
    // Démarrer la boucle de rendu
    startRenderLoop();
    
    console.log('✅ Three.js initialisé avec succès');
}

/**
 * Boucle de rendu Three.js
 */
function startRenderLoop() {
    function animate() {
        if (window.threeRenderer && window.threeScene && window.threeCamera) {
            requestAnimationFrame(animate);
            
            if (window.threeControls) {
                window.threeControls.update();
            }
            
            window.threeRenderer.render(window.threeScene, window.threeCamera);
        }
    }
    animate();
}

/**
 * Charge un modèle 3D avec Three.js
 */
function loadThreeJSModel(modelPath) {
    if (!window.threeScene) {
        console.error('❌ Scene Three.js non initialisée');
        return;
    }
    
    console.log('🔄 Chargement du modèle:', modelPath);
    
    // Supprimer le modèle précédent
    if (window.currentThreeModel) {
        window.threeScene.remove(window.currentThreeModel);
        console.log('🗑️ Ancien modèle supprimé');
    }
    
    // Configuration du DRACOLoader
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    
    // Configuration du GLTFLoader avec DRACO
    const loader = new THREE.GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    
    loader.load(
        modelPath,
        (gltf) => {
            console.log('📦 Modèle GLTF chargé avec succès');
            
            window.currentThreeModel = gltf.scene;
            
            // Calculer la boîte englobante du modèle
            const box = new THREE.Box3().setFromObject(window.currentThreeModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Centrer le modèle à l'origine
            window.currentThreeModel.position.sub(center);
            
            // Calculer la taille optimale et redimensionner
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 3 / maxDim; // Modèle un peu plus grand
            window.currentThreeModel.scale.setScalar(scale);
            
            // Repositionner la caméra pour bien voir le modèle
            const distance = maxDim * scale * 1.0; // Plus proche qu'avant (était 1.5)
            window.threeCamera.position.set(distance * 0.6, distance * 0.8, distance * 0.8); // Y plus haut
            window.threeCamera.lookAt(0, 0, 0);
            
            // Configurer les contrôles pour le nouveau modèle
            window.threeControls.target.set(0, 0, 0);
            window.threeControls.update();
            
            // Activer les ombres si disponible
            window.currentThreeModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            window.threeScene.add(window.currentThreeModel);
            console.log('✅ Modèle centré et ajouté à la scène');
        },
        (progress) => {
            console.log('📈 Progression du chargement:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
            console.error('❌ Erreur de chargement du modèle:', error);
            console.error('🔍 Chemin du modèle:', modelPath);
            
            // Créer un cube de test si le modèle ne charge pas
            createTestCube();
        }
    );
}

/**
 * Crée un cube de test si le modèle ne charge pas
 */
function createTestCube() {
    console.log('🎲 Création d\'un cube de test...');
    
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshLambertMaterial({ color: 0xff6b6b });
    const cube = new THREE.Mesh(geometry, material);
    
    cube.castShadow = true;
    cube.receiveShadow = true;
    
    window.currentThreeModel = cube;
    window.threeScene.add(cube);
    
    console.log('✅ Cube de test ajouté');
}

/**
 * Nettoie Three.js
 */
function clearModelViewer() {
    if (window.currentThreeModel && window.threeScene) {
        window.threeScene.remove(window.currentThreeModel);
        window.currentThreeModel = null;
    }
}

// ==========================================
// 🚀 INITIALISATION DES ÉVÉNEMENTS
// ==========================================

/**
 * Initialise les événements du modal
 */
function setupModalEventListeners() {
    // Bouton de fermeture
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = closeARModal;
    }

    // Fermeture en cliquant à l'extérieur du modal
    const modal = document.getElementById('arModal');
    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeARModal();
            }
        };
    }

    // Fermeture avec la touche Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display !== 'none') {
            closeARModal();
        }
    });
    
    console.log('✅ Modal event listeners configurés (Three.js version)');
}

// ==========================================
// 🎮 FONCTIONS HYBRIDES AR + THREE.JS
// ==========================================

/**
 * Lance l'AR en utilisant le model-viewer caché
 */
function launchAR() {
    const hiddenModel = document.getElementById('hiddenARModel');
    
    if (hiddenModel && currentDish) {
        // Configurer le model-viewer caché avec le modèle actuel
        hiddenModel.src = currentDish.model3d;
        hiddenModel.alt = currentDish.name;
        
        console.log('🚀 Lancement AR pour:', currentDish.name);
        console.log('📱 Modèle AR:', currentDish.model3d);
        
        // Déclencher l'AR
        try {
            hiddenModel.activateAR();
        } catch (error) {
            console.warn('⚠️ AR non disponible:', error);
            alert('La réalité augmentée n\'est pas disponible sur cet appareil.');
        }
    } else {
        console.error('❌ Model-viewer caché ou plat non trouvé');
    }
}

/**
 * Reset la vue Three.js à la position initiale
 */
function resetThreeView() {
    if (window.threeControls && window.threeCamera) {
        console.log('🔄 Reset de la vue Three.js');
        
        // Réinitialiser la position de la caméra
        window.threeCamera.position.set(0, 5, 10);
        window.threeCamera.lookAt(0, 0, 0);
        
        // Reset des contrôles
        window.threeControls.reset();
        
        // Réactiver l'auto-rotation si elle était désactivée
        window.threeControls.autoRotate = true;
    } else {
        console.warn('⚠️ Contrôles Three.js non initialisés');
    }
}

/**
 * Fonction globale pour tester l'AR (debug)
 */
function testAR() {
    console.log('🧪 Test AR - Plat actuel:', currentDish);
    if (currentDish) {
        launchAR();
    } else {
        console.error('❌ Aucun plat sélectionné pour l\'AR');
    }
}

// ==========================================
// 🎯 AR PRO AVEC 8TH WALL
// ==========================================

/**
 * Lance l'AR Pro avec 8th Wall (fonctionne iPhone + Android)
 */
function launchARPro() {
    if (!currentDish) {
        console.error('❌ Aucun plat sélectionné pour l\'AR Pro');
        return;
    }
    
    console.log('🎯 Lancement AR Pro 8th Wall pour:', currentDish.name);
    
    // Vérifier si 8th Wall est chargé
    if (typeof XR8 === 'undefined') {
        alert('8th Wall n\'est pas chargé. Vérifiez votre connexion internet.');
        return;
    }
    
    try {
        // Configuration 8th Wall
        XR8.XrController.configure({
            enableLighting: true,
            enableWorldPoints: false,
        });
        
        // Pipeline 8th Wall avec Three.js
        XR8.addCameraPipelineModules([
            XR8.GlTextureRenderer.pipelineModule(),
            XR8.Threejs.pipelineModule(),
            XR8.XrController.pipelineModule(),
            createARProPipeline()
        ]);
        
        // Démarrer l'AR
        XR8.run({ canvas: document.createElement('canvas') });
        
        console.log('✅ AR Pro 8th Wall démarré');
        
    } catch (error) {
        console.error('❌ Erreur AR Pro:', error);
        alert('Impossible de lancer AR Pro : ' + error.message);
    }
}

/**
 * Crée le pipeline 8th Wall personnalisé
 */
function createARProPipeline() {
    let arModel = null;
    
    return {
        name: 'ar-food-model',
        
        onStart: ({ scene, camera }) => {
            console.log('🎬 Pipeline AR Pro démarré');
            
            // Ajouter lumières AR
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(1, 1, 1);
            scene.add(directionalLight);
            
            // Charger le modèle pour l'AR
            if (window.currentThreeModel) {
                arModel = window.currentThreeModel.clone();
                arModel.scale.setScalar(0.3); // Taille AR
                arModel.position.set(0, 0, 0);
                scene.add(arModel);
                console.log('📦 Modèle ajouté à la scène AR Pro');
            }
        },
        
        onUpdate: () => {
            // Animation du modèle en AR
            if (arModel) {
                arModel.rotation.y += 0.01;
            }
        },
        
        onAttach: () => {
            console.log('📱 Surface détectée - modèle placé');
        },
        
        onDetach: () => {
            console.log('📱 Surface perdue');
        }
    };
}

// ==========================================
// 🚀 AR BETA AVEC WEBXR NATIF
// ==========================================

/**
 * Lance l'AR Beta avec WebXR natif (plus moderne)
 */
async function launchARBeta() {
    if (!currentDish) {
        console.error('❌ Aucun plat sélectionné pour l\'AR Beta');
        return;
    }
    
    console.log('🚀 Lancement AR Beta WebXR pour:', currentDish.name);
    
    // Détecter iPhone/iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
        alert('AR Beta (WebXR) n\'est pas encore supporté sur iPhone.\n\nUtilisez le bouton "Voir en AR" qui fonctionne avec ARKit ! 📱');
        return;
    }
    
    // Vérifier le support WebXR
    if (!navigator.xr) {
        alert('WebXR n\'est pas supporté sur cet appareil/navigateur.\n\nEssayez sur Android avec Chrome ou un casque VR/AR.');
        return;
    }
    
    try {
        // Vérifier le support de l'AR
        const isARSupported = await navigator.xr.isSessionSupported('immersive-ar');
        
        if (!isARSupported) {
            alert('La réalité augmentée n\'est pas supportée sur cet appareil.');
            return;
        }
        
        // Créer une session AR WebXR
        const session = await navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['local', 'hit-test'],
            optionalFeatures: ['dom-overlay'],
            domOverlay: { root: document.body }
        });
        
        console.log('✅ Session AR WebXR créée');
        
        // Configurer Three.js pour WebXR
        setupWebXRScene(session);
        
    } catch (error) {
        console.error('❌ Erreur AR Beta:', error);
        alert('Impossible de lancer l\'AR Beta : ' + error.message);
    }
}

/**
 * Configure Three.js pour WebXR
 */
function setupWebXRScene(session) {
    // Créer une nouvelle scène pour l'AR
    const arScene = new THREE.Scene();
    
    // Caméra AR
    const arCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    
    // Renderer WebXR
    const arRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    arRenderer.setPixelRatio(window.devicePixelRatio);
    arRenderer.setSize(window.innerWidth, window.innerHeight);
    arRenderer.xr.enabled = true;
    arRenderer.xr.setSession(session);
    
    // Ajouter le modèle à la scène AR
    if (window.currentThreeModel) {
        const modelClone = window.currentThreeModel.clone();
        modelClone.scale.setScalar(0.5); // Plus petit pour l'AR
        modelClone.position.set(0, 0, -1); // Devant l'utilisateur
        arScene.add(modelClone);
    }
    
    // Lumières pour l'AR
    const arLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    arScene.add(arLight);
    
    // Boucle de rendu AR
    arRenderer.setAnimationLoop(() => {
        arRenderer.render(arScene, arCamera);
    });
    
    // Gestion de la fin de session
    session.addEventListener('end', () => {
        console.log('🔚 Session AR Beta terminée');
        arRenderer.setAnimationLoop(null);
    });
    
    console.log('✅ Scène WebXR configurée');
}
