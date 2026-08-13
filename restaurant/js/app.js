const products = [
  {
    id: 1,
    name: "Salmon Nigiri",
    nameJp: "サーモンにぎり",
    category: "sushi",
    price: 280,
    image: "images/salmon-nigiri.webp",
    label: "人気",
    description: "Nigiri de salmón fresco con arroz sazonado y un toque de wasabi.",
    descriptionJp: "新鮮なサーモンと酢飯を使った人気のにぎり寿司です。"
  },
  {
    id: 2,
    name: "Tuna Roll",
    nameJp: "まぐろロール",
    category: "sushi",
    price: 360,
    image: "images/tuna-roll.webp",
    label: "Sushi",
    description: "Roll de atún con alga nori, arroz japonés y salsa especial.",
    descriptionJp: "まぐろ、海苔、酢飯を使ったシンプルでおいしいロールです。"
  },
  {
    id: 3,
    name: "Tonkotsu Ramen",
    nameJp: "豚骨ラーメン",
    category: "ramen",
    price: 890,
    image: "images/tonkotsu-ramen.webp",
    label: "おすすめ",
    description: "Ramen con caldo cremoso de cerdo, chashu, huevo y cebolla verde.",
    descriptionJp: "濃厚な豚骨スープ、チャーシュー、卵、ネギ入りのラーメンです。"
  },
  {
    id: 4,
    name: "Spicy Miso Ramen",
    nameJp: "辛味噌ラーメン",
    category: "ramen",
    price: 940,
    image: "images/spicy-miso-ramen.webp",
    label: "辛い",
    description: "Ramen de miso picante con verduras, carne y caldo profundo.",
    descriptionJp: "辛味噌スープに野菜と肉を合わせたコクのあるラーメンです。"
  },
  {
    id: 5,
    name: "Gyudon",
    nameJp: "牛丼",
    category: "donburi",
    price: 680,
    image: "images/gyudon.webp",
    label: "Donburi",
    description: "Tazón de arroz japonés cubierto con carne de res suave y cebolla.",
    descriptionJp: "ご飯の上にやわらかい牛肉と玉ねぎをのせた丼です。"
  },
  {
    id: 6,
    name: "Katsudon",
    nameJp: "カツ丼",
    category: "donburi",
    price: 780,
    image: "images/katsudon.webp",
    label: "満腹",
    description: "Cerdo empanizado con huevo sobre arroz, estilo casero japonés.",
    descriptionJp: "とんかつと卵をご飯にのせたボリュームのある丼です。"
  },
  {
    id: 7,
    name: "Matcha Latte",
    nameJp: "抹茶ラテ",
    category: "drinks",
    price: 420,
    image: "images/matcha-latte.webp",
    label: "Drink",
    description: "Bebida cremosa de matcha con leche, suave y aromática.",
    descriptionJp: "抹茶とミルクを合わせた、まろやかな香りのドリンクです。"
  },
  {
    id: 8,
    name: "Ramune",
    nameJp: "ラムネ",
    category: "drinks",
    price: 260,
    image: "images/ramune.webp",
    label: "冷たい",
    description: "Gaseosa japonesa clásica, refrescante y perfecta para acompañar sushi.",
    descriptionJp: "寿司にも合う、さっぱりした日本の定番炭酸飲料です。"
  },
  {
    id: 9,
    name: "Mochi Ice Cream",
    nameJp: "もちアイス",
    category: "dessert",
    price: 380,
    image: "images/mochi-ice.webp",
    label: "甘い",
    description: "Postre de mochi suave relleno con helado dulce.",
    descriptionJp: "やわらかいもちの中に甘いアイスが入ったデザートです。"
  }
];

const translations = {
  es: {
    heroTag: "Menú digital interactivo",
    heroTitle: "Elige tu plato japonés favorito",
    heroText: "Explora categorías, agrega productos al pedido y revisa el total como en una tablet de restaurante.",
    popular: "Popular",
    menuTitle: "Menú",
    menuSubtitle: "Selecciona los productos para tu pedido",
    table: "Mesa 05",
    order: "Tu pedido",
    emptyCart: "Aún no agregaste productos.",
    subtotal: "Subtotal",
    tax: "Impuesto 10%",
    confirmOrder: "Confirmar pedido",
    details: "Detalle",
    add: "Agregar",
    remove: "Quitar",
    confirmed: "Pedido confirmado. Gracias.",
    footerCopy: "© 2026 Sakura Menu Project. Todos los derechos reservados.",
    footerCredit: "Diseñado y desarrollado por Hanz Robles."
  },

  jp: {
    heroTag: "デジタルメニュー",
    heroTitle: "好きな日本料理を選んでください",
    heroText: "カテゴリーを選び、商品を注文に追加し、合計金額を確認できます。",
    popular: "人気",
    menuTitle: "メニュー",
    menuSubtitle: "注文したい商品を選んでください",
    table: "テーブル 05",
    order: "ご注文",
    emptyCart: "まだ商品が追加されていません。",
    subtotal: "小計",
    tax: "消費税 10%",
    confirmOrder: "注文を確定する",
    details: "詳細",
    add: "追加",
    remove: "削除",
    confirmed: "注文が確定しました。ありがとうございます。",
    footerCopy: "© 2026 Sakura Menu Project. 無断転載を禁じます。",
    footerCredit: "デザイン・開発：Hanz Robles"
  }
};

let currentCategory = "all";
let currentLang = "es";
let cart = [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
const toast = document.getElementById("toast");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalAddBtn = document.getElementById("modalAddBtn");

function formatYen(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0
  }).format(value);
}

function getProductName(product) {
  return currentLang === "jp" ? product.nameJp : product.name;
}

function getProductDescription(product) {
  return currentLang === "jp" ? product.descriptionJp : product.description;
}

function renderProducts() {
  const filteredProducts = currentCategory === "all"
    ? products
    : products.filter(product => product.category === currentCategory);

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-card__image">
        <img src="${product.image}" alt="${getProductName(product)}" />
        <span class="product-card__label">${product.label}</span>
      </div>

      <div class="product-card__body">
        <h4>${getProductName(product)}</h4>
        <p>${getProductDescription(product)}</p>

        <div class="product-card__footer">
          <span class="product-card__price">${formatYen(product.price)}</span>

          <div class="product-card__actions">
            <button class="details-btn" data-id="${product.id}">
              ${translations[currentLang].details}
            </button>
            <button class="add-btn" data-id="${product.id}">
              ${translations[currentLang].add}
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function decreaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);

  if (!cartItem) return;

  if (cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  } else {
    cart = cart.filter(item => item.id !== productId);
  }

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  cartCount.textContent = totalQuantity;
  subtotalEl.textContent = formatYen(subtotal);
  taxEl.textContent = formatYen(tax);
  totalEl.textContent = formatYen(total);
  checkoutBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart__empty">${translations[currentLang].emptyCart}</p>`;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${getProductName(item)}" />

      <div>
        <h4>${getProductName(item)}</h4>
        <p>${formatYen(item.price)} × ${item.quantity}</p>

        <div class="cart-item__controls">
          <div class="qty-controls">
            <button data-action="decrease" data-id="${item.id}">−</button>
            <strong>${item.quantity}</strong>
            <button data-action="increase" data-id="${item.id}">+</button>
          </div>

          <button class="remove-btn" data-action="remove" data-id="${item.id}">
            ${translations[currentLang].remove}
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function updateTexts() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (translations[currentLang][key]) {
      element.textContent = translations[currentLang][key];
    }
  });

  renderProducts();
  renderCart();
}

function openModal(productId) {
  const product = products.find(item => item.id === productId);

  modalImage.src = product.image;
  modalImage.alt = getProductName(product);
  modalCategory.textContent = product.category;
  modalTitle.textContent = getProductName(product);
  modalDescription.textContent = getProductDescription(product);
  modalPrice.textContent = formatYen(product.price);
  modalAddBtn.dataset.id = product.id;
  modalAddBtn.textContent = translations[currentLang].add;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".category-btn.active").classList.remove("active");
    button.classList.add("active");
    currentCategory = button.dataset.category;
    renderProducts();
  });
});

document.querySelectorAll(".language-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".language-btn.active").classList.remove("active");
    button.classList.add("active");
    currentLang = button.dataset.lang;
    updateTexts();
  });
});

productGrid.addEventListener("click", event => {
  const addButton = event.target.closest(".add-btn");
  const detailsButton = event.target.closest(".details-btn");

  if (addButton) {
    addToCart(Number(addButton.dataset.id));
  }

  if (detailsButton) {
    openModal(Number(detailsButton.dataset.id));
  }
});

cartItems.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  const productId = Number(button.dataset.id);

  if (button.dataset.action === "increase") addToCart(productId);
  if (button.dataset.action === "decrease") decreaseQuantity(productId);
  if (button.dataset.action === "remove") removeFromCart(productId);
});

modalAddBtn.addEventListener("click", () => {
  addToCart(Number(modalAddBtn.dataset.id));
  closeModal();
});

document.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", closeModal);
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  cart = [];
  renderCart();
  showToast(translations[currentLang].confirmed);
});

renderProducts();
renderCart();
