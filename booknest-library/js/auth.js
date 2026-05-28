const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const user = getUsers().find(item => item.email.toLowerCase() === email && item.password === password);

  if (!user) {
    loginError.textContent = t("wrongLogin");
    return;
  }

  setSession(user);
  window.location.href = user.role === "admin" ? "admin.html" : "library.html";
});
