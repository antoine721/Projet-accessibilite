document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const images = document.querySelectorAll(".slider img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const pauseBtn = document.querySelector(".pause");
    const slideStatus = document.getElementById("slide-status");

    let index = 0;
    const totalImages = images.length;
    let isPaused = false;
    let autoSlide;

    function updateSlider() {
        images.forEach((img, i) => {
            img.style.opacity = i === index ? 1 : 0;
        });

        slideStatus.textContent = `Image ${index + 1} sur ${totalImages}`;
    }

    function nextSlide() {
        index++;
        if (index >= totalImages) {
            index = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        index--;
        if (index < 0) {
            index = totalImages - 1;
        }
        updateSlider();
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
    });

    prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
    });

    pauseBtn.addEventListener("click", () => {
        if (isPaused) {
            startAutoSlide();
            pauseBtn.textContent = "⏸";
        } else {
            stopAutoSlide();
            pauseBtn.textContent = "▶";
        }
        isPaused = !isPaused;
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            stopAutoSlide();
            nextSlide();
        } else if (event.key === "ArrowLeft") {
            stopAutoSlide();
            prevSlide();
        } else if (event.key === " ") {
            event.preventDefault();
            pauseBtn.click();
        }
    });

    startAutoSlide();
});
