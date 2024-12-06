document.addEventListener("DOMContentLoaded", () => {
  const noticeEl = document.querySelector(".notice");
  const stepperEls = document.querySelectorAll(".stepper");
  const burgerEl = document.querySelector(".burger");
  const headerListEl = document.querySelector(".header__list");
  const filtersBtnEl = document.querySelector(".catalog__mobile-btn");
  const slides = document.querySelectorAll(".products__item--slider");
  const sliderList = document.querySelector(".products__list--slider");
  const sliderTabs = document.querySelectorAll(".slider-tab");
  let currentIndex = 0; // Начальный индекс слайда
  const totalSlides = slides.length;

  function updateSlider() {
    sliderList.style.transform = `translateX(-${currentIndex * 30}%)`;

    slides.forEach((slide, index) => {
      slide.classList.remove("active");
      if (index === currentIndex) {
        slide.classList.add("active");
      }
    });

    sliderTabs.forEach((tab, index) => {
      tab.classList.remove("active");
      if (index === currentIndex) {
        tab.classList.add("active");
      }
    });
  }

  sliderTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Автоматическая прокрутка через 3 секунды
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 3000);

  if (filtersBtnEl) {
    const filtersEl = document.querySelector(".filters");
    filtersBtnEl.addEventListener("click", () => {
      filtersBtnEl.classList.toggle("catalog__mobile-btn--active");
      filtersEl.classList.toggle("filters--active");
    });
  }

  if (headerListEl) {
    new TransferElements({
      sourceElement: headerListEl,
      breakpoints: {
        767.98: {
          targetElement: document.querySelector(".header__bottom"),
          targetPosition: 1,
        },
      },
    });
  }

  if (burgerEl) {
    const body = document.body;
    const menuEl = document.querySelector(".header__bottom");
    burgerEl.addEventListener("click", () => {
      burgerEl.classList.toggle("burger--active");
      menuEl.classList.toggle("header__bottom--active");
      body.classList.toggle("stop-scroll");
    });
  }

  if (noticeEl) {
    const noticeCloseEl = noticeEl.querySelector(".notice__close");
    noticeCloseEl.addEventListener("click", () => {
      noticeEl.classList.add("notice--hidden");
    });
  }

  if (stepperEls) {
    stepperEls.forEach((stepperEl) => {
      const stepperInputEl = stepperEl.querySelector(".stepper__input");
      const stepperBtnMinusEl = stepperEl.querySelector(".stepper__btn--minus");
      const stepperBtnPlusEl = stepperEl.querySelector(".stepper__btn--plus");
      const stepperMin = Number(stepperInputEl.getAttribute("min"));
      const stepperMax = Number(stepperInputEl.getAttribute("max"));

      let count = Number(stepperInputEl.value);

      stepperInputEl.addEventListener("change", () => {
        stepperBtnMinusEl.disabled = false;
        stepperBtnPlusEl.disabled = false;

        if (stepperInputEl.value < stepperMin) {
          stepperInputEl.value = stepperMin;
          stepperBtnMinusEl.disabled = true;
        }

        if (stepperInputEl.value > stepperMax) {
          stepperInputEl.value = stepperMax;
          stepperBtnPlusEl.disabled = true;
        }
      });

      stepperBtnPlusEl.addEventListener("click", () => {
        count = Number(stepperInputEl.value);
        if (count < stepperMax) {
          stepperBtnMinusEl.disabled = false;
          stepperBtnPlusEl.disabled = false;

          count++;
          stepperInputEl.value = count;
        }

        if (count === stepperMax) {
          stepperBtnPlusEl.disabled = true;
        }
      });

      stepperBtnMinusEl.addEventListener("click", () => {
        count = Number(stepperInputEl.value);
        if (count > stepperMin) {
          stepperBtnMinusEl.disabled = false;
          stepperBtnPlusEl.disabled = false;

          count--;
          stepperInputEl.value = count;
        }

        if (count === stepperMin) {
          stepperBtnMinusEl.disabled = true;
        }
      });
    });
  }
});
