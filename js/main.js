// ===============================
// Hanz Robles Portfolio JS
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const langButtons = document.querySelectorAll(".lang-btn");
const translatableElements = document.querySelectorAll("[data-ja][data-en]");
const themeToggle = document.querySelector(".theme-toggle");

// ===============================
// Theme (light / dark)
// ===============================
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portfolioTheme", theme);

  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
    const lang = document.documentElement.lang === "ja" ? "ja" : "en";
    themeToggle.setAttribute(
      "aria-label",
      lang === "ja" ? themeToggle.dataset.jaLabel : themeToggle.dataset.enLabel
    );
  }
}

const savedTheme =
  localStorage.getItem("portfolioTheme") ||
  (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

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

  if (menuToggle) {
    menuToggle.setAttribute(
      "aria-label",
      lang === "ja" ? "メニューを開く" : "Open menu"
    );
  }

  localStorage.setItem("portfolioLanguage", lang);
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("is-open");

    const isOpen = mobileNav.classList.contains("is-open");
    const lang = document.documentElement.lang;
    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? lang === "ja" ? "メニューを閉じる" : "Close menu"
        : lang === "ja" ? "メニューを開く" : "Open menu"
    );
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      menuToggle.setAttribute(
        "aria-label",
        document.documentElement.lang === "ja" ? "メニューを開く" : "Open menu"
      );
    });
  });
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

setLanguage(localStorage.getItem("portfolioLanguage") || "ja");

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 800);
});
