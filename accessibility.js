document.addEventListener("DOMContentLoaded", function () {
    const accessToggle = document.querySelector(".accessibility-toggle");
    const accessPanel = document.querySelector(".accessibility-panel");
    const closePanel = document.querySelector(".close-panel");
    const increaseText = document.getElementById("increase-text");
    const decreaseText = document.getElementById("decrease-text");

    accessToggle.addEventListener("click", function () {
        accessPanel.classList.toggle("open");
        const isExpanded = accessPanel.classList.contains("open");
        accessToggle.setAttribute("aria-expanded", isExpanded);
        accessPanel.setAttribute("aria-hidden", !isExpanded);
    });

    closePanel.addEventListener("click", function () {
        accessPanel.classList.remove("open");
        accessToggle.setAttribute("aria-expanded", "false");
        accessPanel.setAttribute("aria-hidden", "true");
        accessToggle.focus();
    });

    increaseText.addEventListener("click", function () {
        if (document.body.classList.contains("font-size-large")) {
            document.body.classList.remove("font-size-large");
            document.body.classList.add("font-size-larger");
        } else if (!document.body.classList.contains("font-size-larger")) {
            document.body.classList.add("font-size-large");
        }
    });

    decreaseText.addEventListener("click", function () {
        if (document.body.classList.contains("font-size-larger")) {
            document.body.classList.remove("font-size-larger");
            document.body.classList.add("font-size-large");
        } else if (document.body.classList.contains("font-size-large")) {
            document.body.classList.remove("font-size-large");
        }
    });
});
