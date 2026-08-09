// ===============================
// Hanz Robles Portfolio JS
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const langButtons = document.querySelectorAll(".lang-btn");
const translatableElements = document.querySelectorAll("[data-ja][data-en]");

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
