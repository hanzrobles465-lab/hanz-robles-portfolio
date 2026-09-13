const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

registerForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const users = getUsers();

  if (users.some(user => user.email.toLowerCase() === email)) {
    registerError.textContent = t("emailExists");
    return;
  }

  const newUser = { id:createId("u"), name, email, password, role:"user", borrowedBooks:[] };
  users.push(newUser);
  saveUsers(users);
  setSession(newUser);
  window.location.href = "library.html";
});
