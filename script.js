// ==========================================
// 🚀 MENU AR - 6AVENUES - SCRIPT PRINCIPAL
// ==========================================

// Utilisation des données externes
const dishes = DISHES_DATA;
const themes = Object.fromEntries(
    Object.entries(THEMES_DATA).map(([key, theme]) => [key, theme.colors])
);

// ==========================================
// 🎯 INITIALISATION PRINCIPALE
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    renderRestaurants('all');
    setupCategoryFilters();
    setupBackToTop(); // Ajout du bouton retour en haut
    setupModalEventListeners(); // Configuration des modaux AR
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 400) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Loading screen
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 1000);
});

// === SYSTÈME DE CHANGEMENT DE THÈMES DYNAMIQUE ===

function changeTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    const root = document.documentElement;
    const dropdown = document.querySelector('.custom-dropdown');
    
    // Animation de feedback
    dropdown.classList.add('changing');
    
    // Appliquer toutes les variables CSS du thème avec une transition fluide
    Object.entries(theme).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Sauvegarder le thème choisi
    localStorage.setItem('selectedTheme', themeName);
    
    // Mettre à jour le texte sélectionné avec les noms depuis data.js
    const selectedThemeName = THEMES_DATA[themeName]?.name || '� Vert Nature';
    document.getElementById('selectedTheme').textContent = selectedThemeName;
    
    // Mettre à jour les options sélectionnées
    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.theme === themeName) {
            option.classList.add('selected');
        }
    });
    
    // Fermer le dropdown
    closeDropdown();
    
    // Retirer l'animation après un délai
    setTimeout(() => {
        dropdown.classList.remove('changing');
    }, 400);
}

// Fonctions pour gérer le dropdown personnalisé
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    if (menu.classList.contains('active')) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

function openDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    menu.classList.add('active');
    selected.classList.add('active');
    
    // Fermer le dropdown si on clique ailleurs
    setTimeout(() => {
        document.addEventListener('click', closeDropdownOnClickOutside);
    }, 10);
}

function closeDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    menu.classList.remove('active');
    selected.classList.remove('active');
    
    document.removeEventListener('click', closeDropdownOnClickOutside);
}

function closeDropdownOnClickOutside(event) {
    const dropdown = document.querySelector('.custom-dropdown');
    if (!dropdown.contains(event.target)) {
        closeDropdown();
    }
}

// Charger le thème sauvegardé au démarrage
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'custom-green';
    changeTheme(savedTheme);
}

// Charger le thème au démarrage de la page
document.addEventListener('DOMContentLoaded', function() {
    loadSavedTheme();
    
    // Ajouter les event listeners pour les options
    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', function() {
            const themeName = this.dataset.theme;
            changeTheme(themeName);
        });
    });
});