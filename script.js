// Configuration des plats
const dishes = [
    {
        id: 1,
        name: "Burger Classic",
        description: "Pain artisanal, steak de bœuf grillé, salade fraîche, tomate, oignons",
        price: "12.90€",
        category: "burgers",
        image: "./img/burger-300x233.png",
        model3d: "./models/burger3.glb",
        scale: "0.1 0.1 0.1"
    },
    {
        id: 2,
        name: "Pizza Margherita",
        description: "Sauce tomate artisanale, mozzarella di bufala, basilic frais",
        price: "14.50€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest2.glb",
        scale: "0.08 0.08 0.08"
    },
    {
        id: 3,
        name: "Bo Bun",
        description: "Vermicelles de riz, bœuf grillé, légumes frais, nems, sauce nuoc-mam",
        price: "16.90€",
        category: "asiatique",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.12 0.12 0.12"
    },
    {
        id: 4,
        name: "Pizza Rimini",
        description: "Sauce tomate, mozzarella, jambon de Parme, roquette, parmesan",
        price: "18.50€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.08 0.08 0.08"
    },
    {
        id: 5,
        name: "Pizza Chèvre",
        description: "Crème fraîche, mozzarella, fromage de chèvre, miel, noix",
        price: "17.90€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.08 0.08 0.08"
    },
    {
        id: 6,
        name: "Sandwich Lee",
        description: "Pain de mie grillé, poulet mariné, crudités, sauce spéciale",
        price: "11.90€",
        category: "sandwichs",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.1 0.1 0.1"
    },
    {
        id: 7,
        name: "Pad Thaï",
        description: "Nouilles de riz sautées, crevettes fraîches, légumes croquants, cacahuètes",
        price: "16.90€",
        category: "asiatique",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.12 0.12 0.12"
    },
    {
        id: 8,
        name: "Tiramisu Maison",
        description: "Mascarpone, café espresso, cacao pur, biscuits cuillère",
        price: "7.50€",
        category: "desserts",
        image: "./img/burger-300x233.png",
        model3d: "./models/burgertest.glb",
        scale: "0.08 0.08 0.08"
    }
];

let currentDish = null;

document.addEventListener('DOMContentLoaded', function() {
    // Vérification WebGL pour le debug
    checkWebGLSupport();
    
    renderRestaurants('all');
    setupCategoryFilters();
    
    // Header scroll effect (retardé pour accès au bouton)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 400) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Gestion du clic sur l'overlay du modal pour le fermer
    const modal = document.getElementById('arModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeARModal();
        }
    });
    
    // Gestion de la touche Escape pour fermer le modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeARModal();
        }
    });

    // Attendre que model-viewer soit complètement chargé
    const modelViewer = document.getElementById('foodModel');
    if (modelViewer) {
        modelViewer.addEventListener('model-viewer-ready', () => {
            console.log('🎯 Model-viewer est prêt!');
        });
    }
    
    // Loading screen
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 1000);
});

// Fonction pour vérifier le support WebGL
function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
            console.log('✅ WebGL supporté!');
            console.log('Renderer:', gl.getParameter(gl.RENDERER));
            console.log('Vendor:', gl.getParameter(gl.VENDOR));
        } else {
            console.error('❌ WebGL non supporté - cela peut expliquer pourquoi les modèles 3D ne s\'affichent pas');
            // Afficher un message d'erreur à l'utilisateur
            showWebGLError();
        }
    } catch (e) {
        console.error('❌ Erreur lors de la vérification WebGL:', e);
        showWebGLError();
    }
}

// Fonction pour afficher un message d'erreur WebGL
// Fonction pour afficher un message d'erreur WebGL
function showWebGLError() {
    // Vous pouvez personnaliser ce message
    console.warn('💡 Solutions possibles:');
    console.warn('1. Utilisez Chrome, Firefox ou Edge récent');
    console.warn('2. Activez l\'accélération matérielle dans votre navigateur');
    console.warn('3. Mettez à jour vos pilotes graphiques');
    console.warn('4. Servez les fichiers via un serveur HTTP (pas file://)');
}

function renderRestaurants(category) {
    const grid = document.getElementById('restaurantsGrid');
    const filteredDishes = category === 'all' ? dishes : dishes.filter(dish => dish.category === category);
    
    grid.innerHTML = filteredDishes.map((dish, index) => {
        // Séparer le nom du plat en deux parties pour l'affichage
        const nameParts = dish.name.split(' ');
        const firstWord = nameParts[0];
        const restOfName = nameParts.slice(1).join(' ');
        
        return `
        <div class="simple-burger-card scroll-reveal" style="animation-delay: ${index * 0.1}s">
            <div class="PG-product-content">
                <div class="simple-burger-title">
                    <div class="burger-text">${firstWord}</div>
                    <div class="chili-text">${restOfName}</div>
                </div>
                <img src="${dish.image}" alt="${dish.name}" class="simple-burger-img">
            </div>
            <div class="PG-product-info">
                <div class="simple-burger-title">
                    <div class="burger-text">${firstWord}</div>
                    <div class="chili-text">${restOfName}</div>
                </div>
                <div class="PG-product-ingredients">Prix: ${dish.price}</div>
                <div class="PG-product-description">${dish.description}</div>
                <button class="ar-btn" onclick="openARModal(${dish.id})">Voir en AR</button>
            </div>
        </div>
    `;
    }).join('');
    
    // Trigger scroll reveal animation
    setTimeout(() => {
        const reveals = document.querySelectorAll('.scroll-reveal');
        reveals.forEach(reveal => reveal.classList.add('revealed'));
    }, 100);
}

function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter restaurants
            const category = btn.dataset.category;
            renderRestaurants(category);
        });
    });
}

function openARModal(dishId) {
    currentDish = dishes.find(dish => dish.id === dishId);
    if (!currentDish) return;

    document.getElementById('modalTitle').textContent = currentDish.name;
    document.getElementById('modalDescription').textContent = currentDish.description;
    document.getElementById('modalPrice').textContent = currentDish.price;

    const modelViewer = document.getElementById('foodModel');
    
    // Debug: Vérifier si model-viewer est chargé
    console.log('Model-viewer element:', modelViewer);
    console.log('Model path:', currentDish.model3d);
    
    // Attendre que model-viewer soit prêt avant de charger le modèle
    if (modelViewer) {
        // Vider d'abord le modèle précédent
        modelViewer.src = '';
        
        // Petite pause puis charger le nouveau modèle
        setTimeout(() => {
            modelViewer.src = currentDish.model3d || './models/burger3.glb';
            modelViewer.setAttribute('scale', currentDish.scale || '0.1 0.1 0.1');
            
            // Debug: Events pour surveiller le chargement
            modelViewer.addEventListener('load', () => {
                console.log('✅ Modèle 3D chargé avec succès!');
            });
            
            modelViewer.addEventListener('error', (event) => {
                console.error('❌ Erreur de chargement du modèle:', event);
                console.log('Tentative avec modèle de fallback...');
                modelViewer.src = './models/burgertest2.glb';
            });
            
        }, 100);
        
        // Initialiser les contrôles d'éclairage
        setupLightingControls(modelViewer);
    }

    // Bloquer le scroll de la page en arrière-plan
    document.body.classList.add('modal-open');
    document.getElementById('arModal').classList.add('active');
}

// Fonction pour configurer les contrôles d'éclairage
function setupLightingControls(modelViewer) {
    // Contrôle de l'intensité des ombres
    const shadowIntensitySlider = document.getElementById('shadowIntensity');
    const shadowIntensityDisplay = shadowIntensitySlider.nextElementSibling;
    
    shadowIntensitySlider.addEventListener('input', (e) => {
        const value = e.target.value;
        modelViewer.setAttribute('shadow-intensity', value);
        shadowIntensityDisplay.textContent = value;
    });
    
    // Contrôle de l'exposition
    const exposureSlider = document.getElementById('exposure');
    const exposureDisplay = exposureSlider.nextElementSibling;
    
    exposureSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        modelViewer.setAttribute('exposure', value);
        exposureDisplay.textContent = value;
    });
    
    // Contrôle de la douceur des ombres
    const shadowSoftnessSlider = document.getElementById('shadowSoftness');
    const shadowSoftnessDisplay = shadowSoftnessSlider.nextElementSibling;
    
    shadowSoftnessSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        modelViewer.setAttribute('shadow-softness', value);
        shadowSoftnessDisplay.textContent = value;
    });
    
    // Contrôle de l'environnement
    const environmentSelect = document.getElementById('environmentImage');
    environmentSelect.addEventListener('change', (e) => {
        modelViewer.setAttribute('environment-image', e.target.value);
    });
    
    // Contrôle du tone mapping
    const toneMappingSelect = document.getElementById('toneMapping');
    toneMappingSelect.addEventListener('change', (e) => {
        modelViewer.setAttribute('tone-mapping', e.target.value);
    });
}

function closeARModal() {
    // Débloquer le scroll de la page
    document.body.classList.remove('modal-open');
    document.getElementById('arModal').classList.remove('active');
    document.getElementById('foodModel').src = '';
}

function startARGame() {
    alert('Mini-jeu AR bientôt disponible !');
}