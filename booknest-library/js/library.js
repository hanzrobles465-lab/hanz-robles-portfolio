const session = requireAuth("user");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const bookGrid = document.getElementById("bookGrid");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const borrowedCount = document.getElementById("borrowedCount");
const myBooksList = document.getElementById("myBooksList");
const bookCounter = document.getElementById("bookCounter");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");
const confirmRentBtn = document.getElementById("confirmRentBtn");

let currentSearch = "";
let currentCategory = "all";
let rentCart = [];

if (session) userName.textContent = `${session.name} / ${t("user")}`;
logoutBtn.addEventListener("click", logout);

function getCurrentUser(){ return getUsers().find(user => user.id === session.id); }

function renderCategories() {
  const selected = categoryFilter.value || "all";
  const categories = [...new Set(getBooks().map(book => book.category))];
  categoryFilter.innerHTML = `<option value="all">${t("allCategories")}</option>` + categories.map(category => `<option value="${category}">${category}</option>`).join("");
  categoryFilter.value = selected;
}

function renderBooks() {
  const filteredBooks = getBooks().filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(currentSearch) || book.author.toLowerCase().includes(currentSearch);
    const matchesCategory = currentCategory === "all" || book.category === currentCategory;
    return matchesSearch && matchesCategory;
  });

  bookCounter.textContent = `${filteredBooks.length} ${t("booksFound")}`;

  if (filteredBooks.length === 0) {
    bookGrid.innerHTML = `<div class="empty-state">${t("noBooks")}</div>`;
    return;
  }

  bookGrid.innerHTML = filteredBooks.map(book => `
    <article class="book-card">
      <div class="book-card__cover">
        <img src="${book.image}" alt="${book.title}">
        <span class="stock-badge ${book.stock <= 0 ? "out" : ""}">
          ${book.stock > 0 ? `${t("stock")}: ${book.stock}` : t("noStock")}
        </span>
        <span class="price-badge">${formatYen(book.price)}</span>
      </div>
      <div class="book-card__body">
        <span class="category-pill">${book.category}</span>
        <h4>${book.title}</h4>
        <p>${book.author}</p>
        <p><strong>${t("stock")}:</strong> ${book.stock} / <strong>${t("price")}:</strong> ${formatYen(book.price)}</p>
        <button class="primary-btn borrow-btn" data-id="${book.id}" ${book.stock <= 0 ? "disabled" : ""}>
          ${book.stock > 0 ? t("addToCart") : t("noStock")}
        </button>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  const subtotal = rentCart.reduce((sum, item) => sum + item.price, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  cartCount.textContent = rentCart.length;
  subtotalEl.textContent = formatYen(subtotal);
  taxEl.textContent = formatYen(tax);
  totalEl.textContent = formatYen(total);
  confirmRentBtn.disabled = rentCart.length === 0;

  if (rentCart.length === 0) {
    cartItems.innerHTML = `<div class="empty-state">${t("emptyCart")}</div>`;
    return;
  }

  cartItems.innerHTML = rentCart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.title}</strong>
        <span>${item.category} / ${formatYen(item.price)}</span>
      </div>
      <button class="small-btn" data-remove-id="${item.id}">${t("remove")}</button>
    </div>
  `).join("");
}

function renderMyBooks() {
  const user = getCurrentUser();
  if (!user || !user.borrowedBooks.length) {
    borrowedCount.textContent = "0";
    myBooksList.innerHTML = `<div class="empty-state">${t("noBorrowed")}</div>`;
    return;
  }

  borrowedCount.textContent = user.borrowedBooks.length;
  myBooksList.innerHTML = user.borrowedBooks.map(item => `
    <div class="rent-item">
      <div>
        <strong>${item.title}</strong>
        <span>${t("rentDate")}: ${item.date}</span>
      </div>
      <span>${item.category} / ${formatYen(item.price)}</span>
    </div>
  `).join("");
}

function addToCart(bookId) {
  const book = getBooks().find(item => item.id === bookId);
  if (!book || book.stock <= 0) return;

  if (rentCart.some(item => item.id === bookId)) {
    showToast("alreadyInCart");
    return;
  }

  rentCart.push({ ...book });
  renderCart();
  showToast("addedToCart");
}

function confirmRent() {
  const books = getBooks();
  const users = getUsers();
  const user = users.find(item => item.id === session.id);

  const hasNoStock = rentCart.some(cartBook => {
    const book = books.find(item => item.id === cartBook.id);
    return !book || book.stock <= 0;
  });

  if (hasNoStock) {
    showToast("cartNoStock");
    renderBooks();
    return;
  }

  rentCart.forEach(cartBook => {
    const book = books.find(item => item.id === cartBook.id);
    book.stock -= 1;
    user.borrowedBooks.push({
      bookId: book.id,
      title: book.title,
      category: book.category,
      price: book.price,
      date: new Date().toLocaleDateString("ja-JP")
    });
  });

  saveBooks(books);
  saveUsers(users);
  rentCart = [];

  renderCategories();
  renderBooks();
  renderCart();
  renderMyBooks();
  showToast("confirmedRent");
}

bookGrid.addEventListener("click", event => {
  const button = event.target.closest(".borrow-btn");
  if (button) addToCart(button.dataset.id);
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-remove-id]");
  if (!button) return;
  rentCart = rentCart.filter(item => item.id !== button.dataset.removeId);
  renderCart();
});

confirmRentBtn.addEventListener("click", confirmRent);
searchInput.addEventListener("input", event => { currentSearch = event.target.value.trim().toLowerCase(); renderBooks(); });
categoryFilter.addEventListener("change", event => { currentCategory = event.target.value; renderBooks(); });
document.addEventListener("languageChanged", () => {
  if (session) userName.textContent = `${session.name} / ${t("user")}`;
  renderCategories();
  renderBooks();
  renderCart();
  renderMyBooks();
});

renderCategories();
renderBooks();
renderCart();
renderMyBooks();
