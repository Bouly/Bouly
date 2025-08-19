// ==========================================
// 📊 DONNÉES DU MENU AR - 6AVENUES
// ==========================================

// Configuration des plats du restaurant
const DISHES_DATA = [
    {
        id: 1,
        name: "Burger Classic",
        description: "Pain artisanal, steak de bœuf grillé, salade fraîche, tomate, oignons",
        price: "12.90€",
        category: "burgers",
        image: "./img/burger-300x233.png",
        model3d: "./models/KFC.glb",
        scale: "1.0 1.0 1.0"
    },
    {
        id: 2,
        name: "Pizza Margherita",
        description: "Sauce tomate artisanale, mozzarella di bufala, basilic frais",
        price: "14.50€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/pizza.glb",
        scale: "1.0 1.0 1.0"
    },
    {
        id: 3,
        name: "Bo Bun",
        description: "Vermicelles de riz, bœuf grillé, légumes frais, nems, sauce nuoc-mam",
        price: "16.90€",
        category: "asiatique",
        image: "./img/burger-300x233.png",
        model3d: "./models/Bread.glb",
        scale: "0.3 0.3 0.3"
    },
    {
        id: 4,
        name: "Non opti test",
        description: "Sauce tomate, mozzarella, jambon de Parme, roquette, parmesan",
        price: "18.50€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/Yakinikudonn.glb",
        scale: "0.1 0.1 0.1"
    },
    {
        id: 5,
        name: "Opti Test",
        description: "Crème fraîche, mozzarella, fromage de chèvre, miel, noix",
        price: "17.90€",
        category: "pizzas",
        image: "./img/burger-300x233.png",
        model3d: "./models/yakinikudonn-opt.glb",
        scale: "1.0 1.0 1.0"
    },
    {
        id: 6,
        name: "Sandwich Lee",
        description: "Pain de mie grillé, poulet mariné, crudités, sauce spéciale",
        price: "11.90€",
        category: "sandwichs",
        image: "./img/burger-300x233.png",
        model3d: "./models/caca.glb",
        scale: "1.0 1.0 1.0"
    },
    {
        id: 7,
        name: "Pad Thaï",
        description: "Nouilles de riz sautées, crevettes fraîches, légumes croquants, cacahuètes",
        price: "16.90€",
        category: "asiatique",
        image: "./img/burger-300x233.png",
        model3d: "./models/caca.glb",
        scale: "1.0 1.0 1.0"
    },
    {
        id: 8,
        name: "Tiramisu Maison",
        description: "Mascarpone, café espresso, cacao pur, biscuits cuillère",
        price: "7.50€",
        category: "desserts",
        image: "./img/burger-300x233.png",
        model3d: "./models/caca.glb",
        scale: "0.08 0.08 0.08"
    }
];

// Configuration des thèmes de restaurant
const THEMES_DATA = {
    'custom-green': {
        name: '🌿 Vert Nature',
        colors: {
            '--primary-color': '#A9C5A0',
            '--secondary-color': '#758173',
            '--accent-color': '#C6DEC6',
            '--bg-primary': '#C5EFCB',
            '--bg-secondary': '#020402',
            '--bg-card': '#C6DEC6',
            '--bg-card-gradient-start': '#C6DEC6',
            '--bg-card-gradient-end': '#A9C5A0',
            '--bg-modal': '#C5EFCB',
            '--bg-loading': '#C5EFCB',
            '--text-primary': '#2D3748',
            '--text-secondary': '#4A5568',
            '--text-dark': '#1A202C',
            '--text-card-title': '#FFFFFF',
            '--text-card-subtitle': '#2D3748',
            '--text-footer': '#A0AEC0',
            '--btn-primary-bg': '#A9C5A0',
            '--btn-primary-text': '#FFFFFF',
            '--btn-primary-hover': '#758173',
            '--btn-secondary-bg': '#C6DEC6',
            '--btn-secondary-text': '#2D3748',
            '--ar-btn-bg': 'rgba(169, 197, 160, 0.9)',
            '--ar-btn-text': '#FFFFFF',
            '--ar-btn-border': '#758173'
        }
    },
    'mcdonalds': {
        name: '🍟 McDonald\'s',
        colors: {
            '--primary-color': '#DA020E',
            '--secondary-color': '#FFC72C',
            '--accent-color': '#FFD700',
            '--bg-primary': '#FFF8E1',
            '--bg-secondary': '#27251F',
            '--bg-card': '#FFECB3',
            '--bg-card-gradient-start': '#FFECB3',
            '--bg-card-gradient-end': '#FFC72C',
            '--bg-modal': '#FFFFFF',
            '--bg-loading': '#FFF8E1',
            '--text-primary': '#27251F',
            '--text-secondary': '#DA020E',
            '--text-dark': '#27251F',
            '--text-card-title': '#DA020E',
            '--text-card-subtitle': '#27251F',
            '--text-footer': '#DA020E',
            '--btn-primary-bg': '#DA020E',
            '--btn-primary-text': '#FFFFFF',
            '--btn-primary-hover': '#B8000C',
            '--btn-secondary-bg': '#FFC72C',
            '--btn-secondary-text': '#27251F',
            '--ar-btn-bg': 'rgba(218, 2, 14, 0.9)',
            '--ar-btn-text': '#FFFFFF',
            '--ar-btn-border': '#DA020E'
        }
    },
    'burger-king': {
        name: '👑 Burger King',
        colors: {
            '--primary-color': '#D62300',
            '--secondary-color': '#FFAA00',
            '--accent-color': '#0066CC',
            '--bg-primary': '#FFF3E0',
            '--bg-secondary': '#1A1A1A',
            '--bg-card': '#FFE0B2',
            '--bg-card-gradient-start': '#FFE0B2',
            '--bg-card-gradient-end': '#FFAA00',
            '--bg-modal': '#FFFFFF',
            '--bg-loading': '#FFF3E0',
            '--text-primary': '#1A1A1A',
            '--text-secondary': '#D62300',
            '--text-dark': '#1A1A1A',
            '--text-card-title': '#D62300',
            '--text-card-subtitle': '#1A1A1A',
            '--text-footer': '#0066CC',
            '--btn-primary-bg': '#D62300',
            '--btn-primary-text': '#FFFFFF',
            '--btn-primary-hover': '#B51D00',
            '--btn-secondary-bg': '#FFAA00',
            '--btn-secondary-text': '#1A1A1A',
            '--ar-btn-bg': 'rgba(214, 35, 0, 0.9)',
            '--ar-btn-text': '#FFFFFF',
            '--ar-btn-border': '#D62300'
        }
    },
    'taco-bell': {
        name: '🌮 Taco Bell',
        colors: {
            '--primary-color': '#662D91',
            '--secondary-color': '#FF6B35',
            '--accent-color': '#FFF200',
            '--bg-primary': '#F8F5FF',
            '--bg-secondary': '#1A1A1A',
            '--bg-card': '#E8D5FF',
            '--bg-card-gradient-start': '#E8D5FF',
            '--bg-card-gradient-end': '#662D91',
            '--bg-modal': '#FFFFFF',
            '--bg-loading': '#F8F5FF',
            '--text-primary': '#1A1A1A',
            '--text-secondary': '#662D91',
            '--text-dark': '#000000',
            '--text-card-title': '#FFF200',
            '--text-card-subtitle': '#1A1A1A',
            '--text-footer': '#FF6B35',
            '--btn-primary-bg': '#662D91',
            '--btn-primary-text': '#FFF200',
            '--btn-primary-hover': '#4F1F70',
            '--btn-secondary-bg': '#FF6B35',
            '--btn-secondary-text': '#FFFFFF',
            '--ar-btn-bg': 'rgba(102, 45, 145, 0.9)',
            '--ar-btn-text': '#FFF200',
            '--ar-btn-border': '#662D91'
        }
    },
    'subway': {
        name: '🥪 Subway',
        colors: {
            '--primary-color': '#00A651',
            '--secondary-color': '#FFD320',
            '--accent-color': '#7CB518',
            '--bg-primary': '#F1F8E9',
            '--bg-secondary': '#1B4332',
            '--bg-card': '#C8E6C9',
            '--bg-card-gradient-start': '#C8E6C9',
            '--bg-card-gradient-end': '#00A651',
            '--bg-modal': '#FFFFFF',
            '--bg-loading': '#F1F8E9',
            '--text-primary': '#1B4332',
            '--text-secondary': '#00A651',
            '--text-dark': '#000000',
            '--text-card-title': '#FFD320',
            '--text-card-subtitle': '#1B4332',
            '--text-footer': '#00A651',
            '--btn-primary-bg': '#00A651',
            '--btn-primary-text': '#FFFFFF',
            '--btn-primary-hover': '#007A3D',
            '--btn-secondary-bg': '#FFD320',
            '--btn-secondary-text': '#1B4332',
            '--ar-btn-bg': 'rgba(0, 166, 81, 0.9)',
            '--ar-btn-text': '#FFFFFF',
            '--ar-btn-border': '#00A651'
        }
    },
    'eleven-madison': {
        name: '⭐ Eleven Madison Park',
        colors: {
            '--primary-color': '#1A1A1A',
            '--secondary-color': '#8B8680',
            '--accent-color': '#D4AF37',
            '--bg-primary': '#F8F8F8',
            '--bg-secondary': '#000000',
            '--bg-card': '#EDEDED',
            '--bg-card-gradient-start': '#EDEDED',
            '--bg-card-gradient-end': '#8B8680',
            '--bg-modal': '#FFFFFF',
            '--bg-loading': '#F8F8F8',
            '--text-primary': '#1A1A1A',
            '--text-secondary': '#8B8680',
            '--text-dark': '#000000',
            '--text-card-title': '#D4AF37',
            '--text-card-subtitle': '#1A1A1A',
            '--text-footer': '#8B8680',
            '--btn-primary-bg': '#1A1A1A',
            '--btn-primary-text': '#F8F8F8',
            '--btn-primary-hover': '#000000',
            '--btn-secondary-bg': '#D4AF37',
            '--btn-secondary-text': '#1A1A1A',
            '--ar-btn-bg': 'rgba(26, 26, 26, 0.9)',
            '--ar-btn-text': '#F8F8F8',
            '--ar-btn-border': '#D4AF37'
        }
    },
    'daniel-nyc': {
        name: '🍷 Daniel NYC',
        colors: {
            '--primary-color': '#722F37',
            '--secondary-color': '#B8860B',
            '--accent-color': '#F5F5DC',
            '--bg-primary': '#FDF9F0',
            '--bg-secondary': '#2F2F2F',
            '--bg-card': '#FAF0E6',
            '--bg-card-gradient-start': '#FAF0E6',
            '--bg-card-gradient-end': '#B8860B',
            '--bg-modal': '#FFFFFF',
            '--bg-loading': '#FDF9F0',
            '--text-primary': '#2F2F2F',
            '--text-secondary': '#722F37',
            '--text-dark': '#2F2F2F',
            '--text-card-title': '#722F37',
            '--text-card-subtitle': '#2F2F2F',
            '--text-footer': '#B8860B',
            '--btn-primary-bg': '#722F37',
            '--btn-primary-text': '#F5F5DC',
            '--btn-primary-hover': '#5A242A',
            '--btn-secondary-bg': '#B8860B',
            '--btn-secondary-text': '#2F2F2F',
            '--ar-btn-bg': 'rgba(114, 47, 55, 0.9)',
            '--ar-btn-text': '#F5F5DC',
            '--ar-btn-border': '#722F37'
        }
    }
};

// Export des données pour utilisation dans d'autres fichiers
// (Compatible avec les anciens navigateurs)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DISHES_DATA, THEMES_DATA };
}
