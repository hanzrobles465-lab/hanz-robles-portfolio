  const langButtons = document.querySelectorAll(".lang-btn");
  const translatableElements = document.querySelectorAll("[data-ja][data-es]");

  function changeLanguage(lang) {
    translatableElements.forEach((element) => {
      if (lang === "ja") {
        element.textContent = element.dataset.ja;
      } else {
        element.textContent = element.dataset.es;
      }
    });

    langButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      changeLanguage(button.dataset.lang);
    });
  });

  changeLanguage("ja");