document.addEventListener("DOMContentLoaded", function () {
    const accessToggle = document.querySelector(".accessibility-toggle");
    const accessPanel = document.querySelector(".accessibility-panel");
    const closePanel = document.querySelector(".close-panel");
    const increaseText = document.getElementById("increase-text");
    const decreaseText = document.getElementById("decrease-text");
    const grayscale = document.getElementById("grayscale");
    const highContrast = document.getElementById("high-contrast");
    const negativeContrast = document.getElementById("negative-contrast");
    const lightBackground = document.getElementById("light-background");

    let isPanelOpen = false;

    function togglePanel() {
        isPanelOpen = !isPanelOpen;
        accessPanel.classList.toggle("open", isPanelOpen);
        accessToggle.setAttribute("aria-expanded", isPanelOpen);
        accessPanel.setAttribute("aria-hidden", !isPanelOpen);

        if (isPanelOpen) {
            increaseText.focus();
        } else {
            accessToggle.focus();
        }
    }

    function increaseFontSize() {
        if (document.body.classList.contains("font-size-larger")) {
            return;
        } else if (document.body.classList.contains("font-size-large")) {
            document.body.classList.remove("font-size-large");
            document.body.classList.add("font-size-larger");
        } else {
            document.body.classList.add("font-size-large");
        }
        localStorage.setItem("fontSizePreference", document.body.className);
    }

    function decreaseFontSize() {
        if (document.body.classList.contains("font-size-larger")) {
            document.body.classList.remove("font-size-larger");
            document.body.classList.add("font-size-large");
        } else if (document.body.classList.contains("font-size-large")) {
            document.body.classList.remove("font-size-large");
        }
        localStorage.setItem("fontSizePreference", document.body.className);
    }

    function toggleGrayscale() {
        document.documentElement.classList.toggle("grayscale");

        document.documentElement.classList.remove("negative-contrast");
        document.body.classList.remove("high-contrast", "light-background");

        localStorage.setItem(
            "grayscaleMode",
            document.documentElement.classList.contains("grayscale")
        );
        localStorage.removeItem("negativeContrastMode");
        localStorage.removeItem("highContrastMode");
        localStorage.removeItem("lightBackgroundMode");
    }

    function toggleHighContrast() {
        document.body.classList.toggle("high-contrast");

        document.documentElement.classList.remove(
            "grayscale",
            "negative-contrast"
        );
        document.body.classList.remove("light-background");

        localStorage.setItem(
            "highContrastMode",
            document.body.classList.contains("high-contrast")
        );
        localStorage.removeItem("grayscaleMode");
        localStorage.removeItem("negativeContrastMode");
        localStorage.removeItem("lightBackgroundMode");
    }

    function toggleNegativeContrast() {
        document.documentElement.classList.toggle("negative-contrast");

        document.documentElement.classList.remove("grayscale");
        document.body.classList.remove("high-contrast", "light-background");

        localStorage.setItem(
            "negativeContrastMode",
            document.documentElement.classList.contains("negative-contrast")
        );
        localStorage.removeItem("grayscaleMode");
        localStorage.removeItem("highContrastMode");
        localStorage.removeItem("lightBackgroundMode");
    }

    function toggleLightBackground() {
        document.body.classList.toggle("light-background");

        document.documentElement.classList.remove(
            "grayscale",
            "negative-contrast"
        );
        document.body.classList.remove("high-contrast");

        localStorage.setItem(
            "lightBackgroundMode",
            document.body.classList.contains("light-background")
        );
        localStorage.removeItem("grayscaleMode");
        localStorage.removeItem("negativeContrastMode");
        localStorage.removeItem("highContrastMode");
    }

    function restorePreferences() {
        const fontSizePreference = localStorage.getItem("fontSizePreference");
        if (fontSizePreference) {
            document.body.className = fontSizePreference;
        }

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

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isPanelOpen) {
            togglePanel();
        }
    });

    restorePreferences();
});
