// ==========================================
// 🎨 SYSTÈME DE THÈMES - 6AVENUES
// ==========================================

// ==========================================
// 🎯 GESTION DES THÈMES DYNAMIQUES
// ==========================================

/**
 * Change le thème de l'application
 * @param {string} themeName - Nom du thème à appliquer
 */
function changeTheme(themeName) {
    const themeData = THEMES_DATA[themeName];
    if (!themeData) {
        console.warn(`Thème "${themeName}" non trouvé`);
        return;
    }

    const root = document.documentElement;
    const dropdown = document.querySelector('.custom-dropdown');
    
    // Animation de feedback
    if (dropdown) {
        dropdown.classList.add('changing');
    }
    
    // Appliquer toutes les variables CSS du thème
    Object.entries(themeData.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Sauvegarder le thème choisi
    localStorage.setItem('selectedTheme', themeName);
    
    // Mettre à jour le texte sélectionné
    updateSelectedThemeDisplay(themeName, themeData.name);
    
    // Mettre à jour les options sélectionnées
    updateDropdownSelection(themeName);
    
    // Fermer le dropdown
    closeDropdown();
    
    // Retirer l'animation après un délai
    if (dropdown) {
        setTimeout(() => {
            dropdown.classList.remove('changing');
        }, 400);
    }
}

/**
 * Met à jour l'affichage du thème sélectionné
 * @param {string} themeName - Nom technique du thème
 * @param {string} displayName - Nom d'affichage du thème
 */
function updateSelectedThemeDisplay(themeName, displayName) {
    const selectedThemeElement = document.getElementById('selectedTheme');
    if (selectedThemeElement) {
        selectedThemeElement.textContent = displayName;
    }
}

/**
 * Met à jour la sélection dans le dropdown
 * @param {string} themeName - Nom du thème sélectionné
 */
function updateDropdownSelection(themeName) {
    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.theme === themeName) {
            option.classList.add('selected');
        }
    });
}

// ==========================================
// 🔽 GESTION DU DROPDOWN
// ==========================================

/**
 * Bascule l'état du dropdown (ouvert/fermé)
 */
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    if (menu && menu.classList.contains('active')) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

/**
 * Ouvre le dropdown
 */
function openDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    if (menu) menu.classList.add('active');
    if (selected) selected.classList.add('active');
    
    // Fermer le dropdown si on clique ailleurs
    setTimeout(() => {
        document.addEventListener('click', closeDropdownOnClickOutside);
    }, 10);
}

/**
 * Ferme le dropdown
 */
function closeDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const selected = document.querySelector('.dropdown-selected');
    
    if (menu) menu.classList.remove('active');
    if (selected) selected.classList.remove('active');
    
    document.removeEventListener('click', closeDropdownOnClickOutside);
}

/**
 * Ferme le dropdown si on clique à l'extérieur
 * @param {Event} event - Événement de clic
 */
function closeDropdownOnClickOutside(event) {
    const dropdown = document.querySelector('.custom-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        closeDropdown();
    }
}

// ==========================================
// 💾 SAUVEGARDE ET CHARGEMENT
// ==========================================

/**
 * Charge le thème sauvegardé au démarrage
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'custom-green';
    changeTheme(savedTheme);
}

/**
 * Configure les event listeners pour les options de thème
 */
function setupThemeEventListeners() {
    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', function() {
            const themeName = this.dataset.theme;
            if (themeName) {
                changeTheme(themeName);
            }
        });
    });
}

/**
 * Initialise le système de thèmes
 */
function initializeThemeSystem() {
    loadSavedTheme();
    setupThemeEventListeners();
}

// ==========================================
// 🔧 EXPORT DES FONCTIONS PUBLIQUES
// ==========================================

// Rendre les fonctions accessibles globalement
if (typeof window !== 'undefined') {
    window.changeTheme = changeTheme;
    window.toggleDropdown = toggleDropdown;
    window.openDropdown = openDropdown;
    window.closeDropdown = closeDropdown;
    window.loadSavedTheme = loadSavedTheme;
    window.initializeThemeSystem = initializeThemeSystem;
}
