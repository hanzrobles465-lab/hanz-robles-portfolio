// ===============================
// Hanz Robles Portfolio JS
// - Mobile menu
// - Japanese / Spanish language switch
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const langButtons = document.querySelectorAll(".lang-btn");
const translatableElements = document.querySelectorAll("[data-ja][data-es]");

function setLanguage(lang) {
  document.documentElement.lang = lang;

  translatableElements.forEach((element) => {
    const text = element.dataset[lang];

    if (text) {
      element.textContent = text;
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  localStorage.setItem("portfolioLanguage", lang);
}

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("is-open");

  const isOpen = mobileNav.classList.contains("is-open");
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

const savedLanguage = localStorage.getItem("portfolioLanguage") || "ja";
setLanguage(savedLanguage);
