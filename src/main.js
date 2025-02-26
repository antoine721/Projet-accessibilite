document.addEventListener("DOMContentLoaded", function () {
  // Éléments
  const accessToggle = document.querySelector(".accessibility-toggle");
  const accessPanel = document.querySelector(".accessibility-panel");
  const closePanel = document.querySelector(".close-panel");
  const increaseText = document.getElementById("increase-text");
  const decreaseText = document.getElementById("decrease-text");
  const grayscale = document.getElementById("grayscale");
  const highContrast = document.getElementById("high-contrast");
  const negativeContrast = document.getElementById("negative-contrast");
  const lightBackground = document.getElementById("light-background");

  // Variable qui garde la trace de l'état du panneau
  let isPanelOpen = false;

  // Fonctions
  function togglePanel() {
    isPanelOpen = !isPanelOpen;
    accessPanel.classList.toggle("open", isPanelOpen);
    accessToggle.setAttribute("aria-expanded", isPanelOpen);
    accessPanel.setAttribute("aria-hidden", !isPanelOpen);

    // Focus management
    if (isPanelOpen) {
      // Mettre le focus sur le premier bouton du panneau quand il s'ouvre
      increaseText.focus();
    } else {
      // Remettre le focus sur le bouton d'accessibilité quand le panneau se ferme
      accessToggle.focus();
    }
  }

  // Fonction pour augmenter la taille du texte
  function increaseFontSize() {
    if (document.body.classList.contains("font-size-larger")) {
      return; // Déjà à la taille maximale
    } else if (document.body.classList.contains("font-size-large")) {
      document.body.classList.remove("font-size-large");
      document.body.classList.add("font-size-larger");
    } else {
      document.body.classList.add("font-size-large");
    }
    // Sauvegarder la préférence
    localStorage.setItem("fontSizePreference", document.body.className);
  }

  // Fonction pour diminuer la taille du texte
  function decreaseFontSize() {
    if (document.body.classList.contains("font-size-larger")) {
      document.body.classList.remove("font-size-larger");
      document.body.classList.add("font-size-large");
    } else if (document.body.classList.contains("font-size-large")) {
      document.body.classList.remove("font-size-large");
    }
    // Sauvegarder la préférence
    localStorage.setItem("fontSizePreference", document.body.className);
  }

  // Fonction pour activer/désactiver le mode niveaux de gris
  function toggleGrayscale() {
    // Appliquer le filtre à l'élément html plutôt qu'au body pour éviter le décalage
    document.documentElement.classList.toggle("grayscale");

    // Désactiver les autres modes si actifs
    document.documentElement.classList.remove("negative-contrast");
    document.body.classList.remove("high-contrast", "light-background");

    // Sauvegarder la préférence
    localStorage.setItem(
      "grayscaleMode",
      document.documentElement.classList.contains("grayscale")
    );
    localStorage.removeItem("negativeContrastMode");
    localStorage.removeItem("highContrastMode");
    localStorage.removeItem("lightBackgroundMode");
  }

  // Fonction pour activer/désactiver le mode haut contraste
  function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");

    // Désactiver les autres modes si actifs
    document.documentElement.classList.remove("grayscale", "negative-contrast");
    document.body.classList.remove("light-background");

    // Sauvegarder la préférence
    localStorage.setItem(
      "highContrastMode",
      document.body.classList.contains("high-contrast")
    );
    localStorage.removeItem("grayscaleMode");
    localStorage.removeItem("negativeContrastMode");
    localStorage.removeItem("lightBackgroundMode");
  }

  // Fonction pour activer/désactiver le mode contraste négatif
  function toggleNegativeContrast() {
    // Appliquer le filtre à l'élément html plutôt qu'au body pour éviter le décalage
    document.documentElement.classList.toggle("negative-contrast");

    // Désactiver les autres modes si actifs
    document.documentElement.classList.remove("grayscale");
    document.body.classList.remove("high-contrast", "light-background");

    // Sauvegarder la préférence
    localStorage.setItem(
      "negativeContrastMode",
      document.documentElement.classList.contains("negative-contrast")
    );
    localStorage.removeItem("grayscaleMode");
    localStorage.removeItem("highContrastMode");
    localStorage.removeItem("lightBackgroundMode");
  }

  // Fonction pour activer/désactiver le mode arrière-plan clair
  function toggleLightBackground() {
    document.body.classList.toggle("light-background");

    // Désactiver les autres modes si actifs
    document.documentElement.classList.remove("grayscale", "negative-contrast");
    document.body.classList.remove("high-contrast");

    // Sauvegarder la préférence
    localStorage.setItem(
      "lightBackgroundMode",
      document.body.classList.contains("light-background")
    );
    localStorage.removeItem("grayscaleMode");
    localStorage.removeItem("negativeContrastMode");
    localStorage.removeItem("highContrastMode");
  }

  // Restaurer les préférences d'accessibilité au chargement
  function restorePreferences() {
    // Restauration de la taille de police
    const fontSizePreference = localStorage.getItem("fontSizePreference");
    if (fontSizePreference) {
      document.body.className = fontSizePreference;
    }

    // Restauration des modes visuels
    if (localStorage.getItem("grayscaleMode") === "true") {
      document.documentElement.classList.add("grayscale");
    }

    if (localStorage.getItem("highContrastMode") === "true") {
      document.body.classList.add("high-contrast");
    }

    if (localStorage.getItem("negativeContrastMode") === "true") {
      document.documentElement.classList.add("negative-contrast");
    }

    if (localStorage.getItem("lightBackgroundMode") === "true") {
      document.body.classList.add("light-background");
    }
  }

  // Event Listeners
  accessToggle.addEventListener("click", togglePanel);
  accessToggle.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePanel();
    }
  });

  closePanel.addEventListener("click", togglePanel);

  increaseText.addEventListener("click", increaseFontSize);
  decreaseText.addEventListener("click", decreaseFontSize);
  grayscale.addEventListener("click", toggleGrayscale);
  highContrast.addEventListener("click", toggleHighContrast);
  negativeContrast.addEventListener("click", toggleNegativeContrast);
  lightBackground.addEventListener("click", toggleLightBackground);

  // Gestion de la fermeture avec la touche Échap
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isPanelOpen) {
      togglePanel();
    }
  });

  // Restaurer les préférences au chargement
  restorePreferences();
});
