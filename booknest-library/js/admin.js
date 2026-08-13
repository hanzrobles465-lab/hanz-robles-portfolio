const session = requireAuth("admin");
const adminName = document.getElementById("adminName");
const logoutBtn = document.getElementById("logoutBtn");
const bookForm = document.getElementById("bookForm");
const adminUserForm = document.getElementById("adminUserForm");
const adminBookList = document.getElementById("adminBookList");
const usersTable = document.getElementById("usersTable");
const totalBooks = document.getElementById("totalBooks");
const totalUsers = document.getElementById("totalUsers");
const bookCover = document.getElementById("bookCover");
const coverPreview = document.getElementById("coverPreview");
let selectedCoverImage = "";

if (session) adminName.textContent = `${session.name} / Admin`;
logoutBtn.addEventListener("click", logout);


bookCover.addEventListener("change", event => {
  const file = event.target.files[0];

  if (!file) {
    selectedCoverImage = "";
    coverPreview.innerHTML = `<span>${t("coverPreview")}</span>`;
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    selectedCoverImage = reader.result;
    coverPreview.innerHTML = `<img src="${selectedCoverImage}" alt="Book cover preview">`;
  };

  reader.readAsDataURL(file);
});

function renderAdminStats(){ totalBooks.textContent = getBooks().length; totalUsers.textContent = getUsers().length; }

function renderAdminBooks() {
  const books = getBooks();
  if (!books.length) { adminBookList.innerHTML = `<div class="empty-state">${t("noBooks")}</div>`; return; }

  adminBookList.innerHTML = books.map(book => `
    <article class="admin-book-item">
      <img src="${book.image}" alt="${book.title}">
      <div>
        <h4>${book.title}</h4>
        <p>${book.author}</p>
        <p>${book.category} / ${t("stock")}: <strong>${book.stock}</strong> / ${t("price")}: <strong>${formatYen(book.price)}</strong></p>
      </div>
      <div class="admin-actions">
        <input class="inline-price" type="number" value="${book.price}" min="100" step="10" data-price-id="${book.id}">
        <button class="small-btn" data-action="save-price" data-id="${book.id}">${t("savePrice")}</button>
        <button class="small-btn" data-action="decrease" data-id="${book.id}">${t("decreaseStock")}</button>
        <button class="small-btn" data-action="increase" data-id="${book.id}">${t("increaseStock")}</button>
        <button class="danger-btn" data-action="delete" data-id="${book.id}">${t("delete")}</button>
      </div>
    </article>
  `).join("");
}

function renderUsers() {
  const users = getUsers();
  usersTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>${t("name")}</th>
          <th>${t("email")}</th>
          <th>${t("role")}</th>
          <th>${t("borrowed")}</th>
          <th>${t("action")}</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="role-pill ${user.role === "admin" ? "admin" : ""}">${user.role === "admin" ? t("administrator") : t("normalUser")}</span></td>
            <td>${user.borrowedBooks ? user.borrowedBooks.length : 0}</td>
            <td><button class="danger-btn" data-action="delete-user" data-id="${user.id}">${t("delete")}</button></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function refreshAdmin(){ renderAdminStats(); renderAdminBooks(); renderUsers(); }

bookForm.addEventListener("submit", event => {
  event.preventDefault();
  const books = getBooks();

  if (!selectedCoverImage) {
    showToast("chooseCover");
    return;
  }

  books.push({
    id:createId("b"),
    title:document.getElementById("bookTitle").value.trim(),
    author:document.getElementById("bookAuthor").value.trim(),
    category:document.getElementById("bookCategory").value.trim(),
    price:Number(document.getElementById("bookPrice").value),
    stock:Number(document.getElementById("bookStock").value),
    image:selectedCoverImage
  });
  saveBooks(books);
  bookForm.reset();
  document.getElementById("bookStock").value = 1;
  document.getElementById("bookPrice").value = 300;
  selectedCoverImage = "";
  coverPreview.innerHTML = `<span>${t("coverPreview")}</span>`;
  refreshAdmin();
  showToast("bookAdded");
});

adminUserForm.addEventListener("submit", event => {
  event.preventDefault();
  const users = getUsers();
  const email = document.getElementById("newUserEmail").value.trim().toLowerCase();

  if (users.some(user => user.email.toLowerCase() === email)) {
    showToast("emailExists");
    return;
  }

  users.push({
    id:createId("u"),
    name:document.getElementById("newUserName").value.trim(),
    email,
    password:document.getElementById("newUserPassword").value,
    role:document.getElementById("newUserRole").value,
    borrowedBooks:[]
  });

  saveUsers(users);
  adminUserForm.reset();
  refreshAdmin();
  showToast("accountCreated");
});

adminBookList.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const bookId = button.dataset.id;
  let books = getBooks();
  const book = books.find(item => item.id === bookId);
  if (!book) return;

  if (action === "increase") { book.stock += 1; showToast("stockIncreased"); }
  if (action === "decrease") { book.stock = Math.max(0, book.stock - 1); showToast("stockReduced"); }
  if (action === "save-price") {
    const input = document.querySelector(`[data-price-id="${bookId}"]`);
    book.price = Math.max(0, Number(input.value));
    showToast("savePrice");
  }
  if (action === "delete") {
    if (!confirm(`¿Eliminar "${book.title}"?`)) return;
    books = books.filter(item => item.id !== bookId);
    showToast("bookDeleted");
  }

  saveBooks(books);
  refreshAdmin();
});

usersTable.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button || button.dataset.action !== "delete-user") return;

  const userId = button.dataset.id;
  let users = getUsers();
  const user = users.find(item => item.id === userId);
  if (!user) return;

  const admins = users.filter(item => item.role === "admin");

  if (user.id === session.id) {
    if (!confirm("Estás eliminando tu propia cuenta. Se cerrará la sesión. ¿Continuar?")) return;
    users = users.filter(item => item.id !== userId);
    saveUsers(users);
    clearSession();
    window.location.href = "index.html";
    return;
  }

  if (user.role === "admin" && admins.length <= 1) {
    showToast("cannotDeleteLastAdmin");
    return;
  }

  if (!confirm(`¿Eliminar la cuenta de ${user.name}?`)) return;
  users = users.filter(item => item.id !== userId);
  saveUsers(users);
  refreshAdmin();
  showToast("accountDeleted");
});

document.addEventListener("languageChanged", () => {
  if (session) adminName.textContent = `${session.name} / Admin`;
  if (!selectedCoverImage) coverPreview.innerHTML = `<span>${t("coverPreview")}</span>`;
  refreshAdmin();
});

refreshAdmin();
