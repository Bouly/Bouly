// Configuration 8th Wall pour BurgerVision AR Pro
// Remplacez 'YOUR_APP_KEY' par votre vraie clé 8th Wall

window.EIGHTH_WALL_CONFIG = {
    // Clé d'application 8th Wall (à obtenir sur console.8thwall.com)
    appKey: 'YOUR_8TH_WALL_APP_KEY_HERE',
    
    // Configuration du tracking
    tracking: {
        // Type de tracking: 'world' pour world tracking, 'image' pour image targets
        type: 'world',
        
        // Options de world tracking
        worldTracking: {
            // Détection automatique de surfaces
            autoDetectSurfaces: true,
            
            // Type de surfaces à détecter
            surfaceTypes: ['horizontal', 'vertical'],
            
            // Sensibilité de détection (0.1 à 1.0)
            sensitivity: 0.7,
            
            // Distance minimale pour placer un objet (en mètres)
            minPlacementDistance: 0.3,
            
            // Distance maximale (en mètres)
            maxPlacementDistance: 5.0
        }
    },
    
    // Configuration du rendu
    rendering: {
        // Qualité du rendu
        quality: 'high', // 'low', 'medium', 'high'
        
        // Anti-aliasing
        antialias: true,
        
        // Ombres
        shadows: true,
        
        // Occlusion (objets cachés par la réalité)
        occlusion: true,
        
        // Frame rate cible
        targetFrameRate: 60
    },
    
    // Configuration de l'interface
    ui: {
        // Afficher les instructions de placement
        showPlacementInstructions: true,
        
        // Afficher l'indicateur de tracking
        showTrackingIndicator: true,
        
        // Couleur du réticule de placement
        placementReticleColor: '#FF6B35'
    },
    
    // Configuration des assets
    assets: {
        // Préchargement des modèles 3D
        preloadModels: true,
        
        // Compression des textures
        compressTextures: true,
        
        // Format de modèles préféré
        preferredModelFormat: 'glb'
    },
    
    // Configuration des performances
    performance: {
        // Optimisation automatique
        autoOptimize: true,
        
        // Limitation du nombre d'objets simultanés
        maxSimultaneousObjects: 1,
        
        // LOD (Level of Detail) automatique
        autoLOD: true
    },
    
    // Configuration de debug (à désactiver en production)
    debug: {
        enabled: false,
        showFPS: false,
        showTrackingInfo: false,
        verboseLogging: false
    }
};

// Fonction d'initialisation 8th Wall
window.initializeEighthWall = function() {
    // Vérifier que 8th Wall est chargé
    if (typeof XR8 === 'undefined') {
        console.error('8th Wall SDK non chargé');
        return false;
    }
    
    // Configuration des modules
    const config = window.EIGHTH_WALL_CONFIG;
    
    // Module de rendu
    XR8.addCameraPipelineModules([
        // Module de base pour le rendu
        XR8.GlTextureRenderer.pipelineModule(),
        
        // Module Three.js
        XR8.Threejs.pipelineModule(),
        
        // Module de contrôle XR
        XR8.XrController.pipelineModule(),
        
        // Module de tracking du monde
        XR8.XrController.pipelineModule({
            enableWorldTracking: config.tracking.type === 'world'
        }),
        
        // Module d'interface utilisateur
        {
            name: 'burgervision-ui',
            onStart: ({canvas, canvasWidth, canvasHeight}) => {
                console.log('BurgerVision AR Pro initialisé');
            },
            onUpdate: ({processCpuResult}) => {
                // Mise à jour du tracking
                if (processCpuResult.reality && processCpuResult.reality.trackingStatus) {
                    const status = processCpuResult.reality.trackingStatus;
                    updateTrackingStatus(status);
                }
            }
        }
    ]);
    
    return true;
};

// Fonction de mise à jour du statut de tracking
function updateTrackingStatus(status) {
    const instructions = document.getElementById('ar-instructions');
    if (!instructions) return;
    
    switch (status) {
        case 'NORMAL':
            instructions.innerHTML = '<p>✅ Tracking actif - Touchez pour placer</p>';
            break;
        case 'LIMITED':
            instructions.innerHTML = '<p>⚠️ Tracking limité - Bougez lentement</p>';
            break;
        case 'NOT_AVAILABLE':
            instructions.innerHTML = '<p>❌ Tracking indisponible - Éclairez mieux</p>';
            break;
        default:
            instructions.innerHTML = '<p>🔍 Initialisation du tracking...</p>';
    }
}

// Export pour utilisation dans le script principal
window.EighthWallConfig = window.EIGHTH_WALL_CONFIG;
