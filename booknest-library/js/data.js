const STORAGE_KEYS = {
  users: "booknest_v2_users",
  books: "booknest_v2_books",
  session: "booknest_v2_session",
  lang: "booknest_v2_lang"
};

const defaultUsers = [
  { id: "u-admin-1", name: "Administrador", email: "admin@booknest.com", password: "admin123", role: "admin", borrowedBooks: [] },
  { id: "u-user-1", name: "Usuario Demo", email: "user@booknest.com", password: "user123", role: "user", borrowedBooks: [] }
];

const defaultBooks = [
  { id: "b-1", title: "Kokoro", author: "Natsume Soseki", category: "Novela japonesa", stock: 4, price: 320, image: "images/books/book-1.webp" },
  { id: "b-2", title: "Clean Code", author: "Robert C. Martin", category: "Programación", stock: 3, price: 500, image: "images/books/book-2.webp" },
  { id: "b-3", title: "Minna no Nihongo", author: "3A Network", category: "Japonés", stock: 6, price: 450, image: "images/books/book-3.webp" },
  { id: "b-4", title: "Design Basics", author: "Creative Studio", category: "Diseño", stock: 2, price: 380, image: "images/books/book-4.webp" },
  { id: "b-5", title: "JavaScript Guide", author: "Frontend Lab", category: "Programación", stock: 5, price: 420, image: "images/books/book-5.webp" },
  { id: "b-6", title: "日本の昔話", author: "Japanese Folktales", category: "Cultura japonesa", stock: 1, price: 280, image: "images/books/book-6.webp" }
];

function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.users)) localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(defaultUsers));
  if (!localStorage.getItem(STORAGE_KEYS.books)) localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(defaultBooks));
  const books = JSON.parse(localStorage.getItem(STORAGE_KEYS.books)) || [];
  const fixedBooks = books.map(book => ({ ...book, price: book.price || 300 }));
  localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(fixedBooks));
}

function getUsers(){ initializeStorage(); return JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || []; }
function saveUsers(users){ localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users)); }
function getBooks(){ initializeStorage(); return JSON.parse(localStorage.getItem(STORAGE_KEYS.books)) || []; }
function saveBooks(books){ localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(books)); }
function getSession(){ return JSON.parse(localStorage.getItem(STORAGE_KEYS.session)); }
function setSession(user){ localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ id:user.id, name:user.name, email:user.email, role:user.role })); }
function clearSession(){ localStorage.removeItem(STORAGE_KEYS.session); }
function createId(prefix){ return `${prefix}-${Date.now()}-${Math.floor(Math.random()*1000)}`; }
function formatYen(value){ return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(value); }

function showToast(messageKeyOrText) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  const message = translations?.[currentLang]?.[messageKeyOrText] || messageKeyOrText;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function logout(){ clearSession(); window.location.href = "index.html"; }

function requireAuth(role) {
  const session = getSession();
  if (!session) { window.location.href = "index.html"; return null; }
  if (role && session.role !== role) {
    window.location.href = session.role === "admin" ? "admin.html" : "library.html";
    return null;
  }
  return session;
}

initializeStorage();
