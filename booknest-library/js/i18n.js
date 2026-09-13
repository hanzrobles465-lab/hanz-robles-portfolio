const translations = {
  es: {
    appType:"Sistema de biblioteca", loginHeroTitle:"Administra libros, usuarios y alquileres desde una sola app.", loginHeroText:"Proyecto frontend con login, roles, stock, alquiler de libros y panel administrativo usando JavaScript.",
    loginTitle:"Iniciar sesión", loginText:"Entra como usuario normal o administrador.", email:"Email", password:"Contraseña", loginButton:"Entrar", noAccount:"¿No tienes cuenta?", createAccount:"Crear cuenta",
    registerHeroTitle:"Crea una cuenta y empieza a alquilar libros.", registerHeroText:"Los usuarios normales pueden alquilar libros. Los administradores gestionan libros, stock y cuentas.", registerText:"Las cuentas creadas aquí serán usuarios normales.", name:"Nombre", alreadyAccount:"¿Ya tienes cuenta?",
    library:"Biblioteca", logout:"Salir", userDashboard:"Panel de usuario", libraryHeroTitle:"Explora y alquila libros disponibles", libraryHeroText:"Agrega libros al carrito, revisa el total y confirma el alquiler. El stock baja cuando confirmas.", borrowedBooks:"Libros alquilados", allCategories:"Todas las categorías", bookCatalog:"Catálogo de libros", rentCart:"Carrito de alquiler", cart:"Carrito", subtotal:"Subtotal", tax:"Impuesto 10%", confirmRent:"Confirmar alquiler", myBorrowedBooks:"Mis libros alquilados", savedHistory:"Historial guardado en tu cuenta.", addToCart:"Agregar", noStock:"Sin stock", stock:"Stock", price:"Precio", remove:"Quitar", emptyCart:"Tu carrito está vacío.", booksFound:"libros encontrados", noBooks:"No se encontraron libros.", noBorrowed:"Aún no alquilaste libros.", rentDate:"Fecha de alquiler", addedToCart:"Libro agregado al carrito.", alreadyInCart:"Este libro ya está en el carrito.", confirmedRent:"Alquiler confirmado correctamente.", cartNoStock:"Uno de los libros ya no tiene stock.",
    adminPanel:"Panel de administración", adminHeroText:"Administra libros, precios, stock y cuentas de usuarios normales o administradores.", books:"Libros", accounts:"Cuentas", addBook:"Agregar libro", addBookText:"Crea un nuevo libro para el catálogo.", title:"Título", author:"Autor", category:"Categoría", rentalPrice:"Precio de alquiler", image:"Imagen", coverImage:"Portada del libro", coverPreview:"Vista previa de la portada", chooseCover:"Selecciona una imagen para la portada.", createUserFromAdmin:"Crear cuenta desde admin", createUserFromAdminText:"Puedes crear usuarios normales o administradores.", role:"Rol", normalUser:"Usuario normal", administrator:"Administrador", bookManagement:"Gestión de libros", bookManagementText:"Aumenta o baja stock, cambia precios y elimina libros.", accountManagement:"Gestión de cuentas", accountManagementText:"El administrador puede eliminar usuarios normales y otros administradores.", delete:"Eliminar", increaseStock:"+ Stock", decreaseStock:"− Stock", savePrice:"Guardar precio", borrowed:"Alquilados", action:"Acción", user:"Usuario", accountCreated:"Cuenta creada correctamente.", bookAdded:"Libro agregado correctamente.", stockIncreased:"Stock aumentado.", stockReduced:"Stock reducido.", bookDeleted:"Libro eliminado.", accountDeleted:"Cuenta eliminada.", emailExists:"Ese email ya está registrado.", wrongLogin:"Email o contraseña incorrectos.", cannotDeleteLastAdmin:"No puedes eliminar el último administrador.",footerCopy: "© 2026 BookNest Library. Todos los derechos reservados.",
footerCredit: "Diseñado y desarrollado por Hanz Robles."
  },
  jp: {
    appType:"図書館管理アプリ", loginHeroTitle:"本・ユーザー・レンタルを一つのアプリで管理できます。", loginHeroText:"ログイン、権限、在庫、レンタル、管理画面をJavaScriptで実装したフロントエンド作品です。",
    loginTitle:"ログイン", loginText:"一般ユーザーまたは管理者としてログインできます。", email:"メール", password:"パスワード", loginButton:"入る", noAccount:"アカウントがありませんか？", createAccount:"アカウント作成",
    registerHeroTitle:"アカウントを作成して本をレンタルしましょう。", registerHeroText:"一般ユーザーは本をレンタルできます。管理者は本・在庫・アカウントを管理できます。", registerText:"ここで作成するアカウントは一般ユーザーになります。", name:"名前", alreadyAccount:"すでにアカウントがありますか？",
    library:"図書館", logout:"ログアウト", userDashboard:"ユーザー画面", libraryHeroTitle:"利用できる本を探してレンタル", libraryHeroText:"本をカートに追加し、合計金額を確認してレンタルを確定できます。確定すると在庫が減ります。", borrowedBooks:"レンタル済み", allCategories:"すべてのカテゴリー", bookCatalog:"本のカタログ", rentCart:"レンタルカート", cart:"カート", subtotal:"小計", tax:"消費税 10%", confirmRent:"レンタル確定", myBorrowedBooks:"レンタルした本", savedHistory:"アカウントに保存された履歴です。", addToCart:"追加", noStock:"在庫なし", stock:"在庫", price:"料金", remove:"削除", emptyCart:"カートは空です。", booksFound:"冊見つかりました", noBooks:"本が見つかりませんでした。", noBorrowed:"まだ本をレンタルしていません。", rentDate:"レンタル日", addedToCart:"カートに追加しました。", alreadyInCart:"この本はすでにカートに入っています。", confirmedRent:"レンタルが確定しました。", cartNoStock:"在庫がない本があります。",
    adminPanel:"管理画面", adminHeroText:"本、料金、在庫、一般ユーザーと管理者アカウントを管理できます。", books:"本", accounts:"アカウント", addBook:"本を追加", addBookText:"カタログに新しい本を追加します。", title:"タイトル", author:"著者", category:"カテゴリー", rentalPrice:"レンタル料金", image:"画像", coverImage:"本の表紙画像", coverPreview:"表紙プレビュー", chooseCover:"表紙画像を選択してください。", createUserFromAdmin:"管理者からアカウント作成", createUserFromAdminText:"一般ユーザーまたは管理者を作成できます。", role:"権限", normalUser:"一般ユーザー", administrator:"管理者", bookManagement:"本の管理", bookManagementText:"在庫を増減し、料金を変更し、本を削除できます。", accountManagement:"アカウント管理", accountManagementText:"管理者は一般ユーザーと他の管理者を削除できます。", delete:"削除", increaseStock:"+ 在庫", decreaseStock:"− 在庫", savePrice:"料金保存", borrowed:"レンタル数", action:"操作", user:"ユーザー", accountCreated:"アカウントを作成しました。", bookAdded:"本を追加しました。", stockIncreased:"在庫を増やしました。", stockReduced:"在庫を減らしました。", bookDeleted:"本を削除しました。", accountDeleted:"アカウントを削除しました。", emailExists:"このメールはすでに登録されています。", wrongLogin:"メールまたはパスワードが違います。", cannotDeleteLastAdmin:"最後の管理者は削除できません。",footerCopy: "© 2026 BookNest Library. 無断転載を禁じます。",
footerCredit: "デザイン・開発：Hanz Robles"
  }
};

let currentLang = localStorage.getItem(STORAGE_KEYS.lang) || "es";

function t(key){ return translations[currentLang]?.[key] || key; }

function applyLanguage() {
  document.documentElement.lang = currentLang === "jp" ? "ja" : "es";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLang][key]) el.textContent = translations[currentLang][key];
  });
  document.querySelectorAll("[data-placeholder-es]").forEach(el => {
    el.placeholder = currentLang === "jp" ? el.dataset.placeholderJp : el.dataset.placeholderEs;
  });
  document.querySelectorAll(".language-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
  document.dispatchEvent(new CustomEvent("languageChanged"));
}

document.addEventListener("click", event => {
  const btn = event.target.closest(".language-btn");
  if (!btn) return;
  currentLang = btn.dataset.lang;
  localStorage.setItem(STORAGE_KEYS.lang, currentLang);
  applyLanguage();
});

document.addEventListener("DOMContentLoaded", applyLanguage);
