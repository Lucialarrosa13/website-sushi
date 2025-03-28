// Elementos DOM
const pages = document.querySelectorAll(".page")
const navLinks = document.querySelectorAll(".main-navigation a")
const categoryItems = document.querySelectorAll(".category-item")
const menuCategories = document.querySelectorAll(".menu-category")
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
const clearCartButton = document.getElementById("clear-cart")
const checkoutButton = document.getElementById("checkout")
const backToHomeButton = document.getElementById("back-to-home")
const subtotalAmount = document.getElementById("subtotal-amount")
const taxAmount = document.getElementById("tax-amount")
const totalAmount = document.getElementById("total-amount")
const orderTotalAmount = document.getElementById("order-total-amount")
const orderItems = document.getElementById("order-items")
const orderNumber = document.getElementById("order-number")

// Estado de la aplicación
let cart = []
const TAX_RATE = 0.1 // 10% de impuesto

// Datos de ejemplo para los productos
const products = [
  { id: 1, name: "Edamame", price: 5.99, image: "images/edamame.jpg", category: "aperitivos" },
  { id: 2, name: "Gyoza", price: 7.99, image: "images/gyoza.jpg", category: "aperitivos" },
  { id: 3, name: "Tempura", price: 8.99, image: "images/tempura.jpg", category: "aperitivos" },
  { id: 4, name: "California Roll", price: 9.99, image: "images/california-roll.jpg", category: "rolls" },
  { id: 5, name: "Philadelphia Roll", price: 10.99, image: "images/philadelphia-roll.jpg", category: "rolls" },
  { id: 6, name: "Spicy Tuna", price: 11.99, image: "images/spicy-tuna.jpg", category: "rolls" },
  { id: 7, name: "Sake", price: 12.99, image: "images/sake.jpg", category: "bebidas" },
  { id: 8, name: "Té Verde", price: 3.99, image: "images/green-tea.jpg", category: "bebidas" },
  { id: 9, name: "Ramune", price: 4.99, image: "images/ramune.jpg", category: "bebidas" },
]

// Funciones
function navigateTo(pageId) {
  // Ocultar todas las páginas
  pages.forEach((page) => page.classList.remove("active"))

  // Mostrar la página seleccionada
  const selectedPage = document.getElementById(pageId)
  if (selectedPage) {
    selectedPage.classList.add("active")
  }

  // Actualizar navegación
  navLinks.forEach((link) => {
    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Si es la página del carrito, actualizar el contenido
  if (pageId === "cart") {
    renderCart()
    updateCartTotals()
  }
}

function showMenuCategory(categoryId) {
  // Ocultar todas las categorías
  menuCategories.forEach((category) => category.classList.remove("active"))

  // Mostrar la categoría seleccionada
  const selectedCategory = document.getElementById(categoryId)
  if (selectedCategory) {
    selectedCategory.classList.add("active")
  }
}

function saveCart() {
  localStorage.setItem("sushiCart", JSON.stringify(cart))
}

function loadCart() {
  const savedCart = localStorage.getItem("sushiCart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Cargar carrito guardado
  loadCart()

  // Navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const pageId = link.getAttribute("data-page")
      navigateTo(pageId)
    })
  })

  // Categorías en la página de inicio
  categoryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const categoryId = item.getAttribute("data-category")
      navigateTo("menu")
      showMenuCategory(categoryId)
    })
  })

  // Botones de añadir al carrito
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const menuItem = e.target.closest(".menu-item")
      const productName = menuItem.querySelector("h4").textContent
      const product = products.find((p) => p.name === productName)
      if (product) {
        addToCart(product.id)
      }
    })
  })

  // Botones del carrito
  clearCartButton.addEventListener("click", clearCart)
  checkoutButton.addEventListener("click", checkout)

  // Botón de volver al inicio
  backToHomeButton.addEventListener("click", () => {
    navigateTo("home")
  })

  // Iniciar en la página de inicio
  navigateTo("home")
})

// Variables globales
//let cart = []; // Removed duplicate declaration
//const TAX_RATE = 0.1; // 10% de impuesto // Removed duplicate declaration

// DOM Elements
const sections = document.querySelectorAll(".section")
const navButtons = document.querySelectorAll(".nav-btn")
const desktopNavLinks = document.querySelectorAll(".desktop-nav a")
const categoryCards = document.querySelectorAll(".category-card")
const tabButtons = document.querySelectorAll(".tab-btn")
const menuContents = document.querySelectorAll(".menu-content")
const addButtons = document.querySelectorAll(".add-btn")
const menuToggle = document.querySelector(".menu-toggle")
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
const closeMenuButton = document.querySelector(".close-menu")
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")
const notification = document.getElementById("notification")
const notificationMessage = document.getElementById("notification-message")
const notificationClose = document.querySelector(".notification-close")
const cartItemsContainer = document.getElementById("cart-items")
const cartEmptyContainer = document.getElementById("cart-empty")
const cartSummaryContainer = document.getElementById("cart-summary")
const subtotalElement = document.getElementById("subtotal")
const taxElement = document.getElementById("tax")
const totalElement = document.getElementById("total")
const headerCartCount = document.getElementById("header-cart-count")
const mobileCartCount = document.getElementById("mobile-cart-count")
const orderItemsContainer = document.getElementById("order-items")
const orderTotalElement = document.getElementById("order-total")
const orderNumberElement = document.getElementById("order-number")

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Cargar carrito desde localStorage
  loadCart()

  // Event Listeners
  setupEventListeners()

  // Actualizar contador del carrito
  updateCartCount()
})

// Configurar Event Listeners
function setupEventListeners() {
  // Navegación
  desktopNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const sectionId = link.getAttribute("data-section")
      showSection(sectionId)
    })
  })

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.getAttribute("data-section")
      showSection(sectionId)
    })
  })

  // Categorías
  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const categoryId = card.getAttribute("data-category")
      showSection("menu")
      showTab(categoryId)
    })
  })

  // Tabs del menú
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")
      showTab(tabId)
    })
  })

  // Botones de añadir al carrito
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.getAttribute("data-product")
      const price = Number.parseFloat(button.getAttribute("data-price"))
      const image = button.getAttribute("data-image")
      addToCart2(product, price, image)
    })
  })

  // Botones de acción
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action")

      switch (action) {
        case "show-menu":
          showSection("menu")
          break
        case "add-promo":
          addPromoToCart()
          break
        case "clear-cart":
          clearCart()
          break
        case "checkout":
          checkout()
          break
        case "go-home":
          showSection("home")
          break
      }
    })
  })

  // Menú móvil
  menuToggle.addEventListener("click", toggleMobileMenu)
  closeMenuButton.addEventListener("click", closeMobileMenu)
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const sectionId = link.getAttribute("data-section")
      showSection(sectionId)
      closeMobileMenu()
    })
  })

  // Cerrar notificación
  notificationClose.addEventListener("click", closeNotification)
}

// Función para mostrar una sección
function showSection(sectionId) {
  // Ocultar todas las secciones
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Mostrar la sección seleccionada
  const selectedSection = document.getElementById(sectionId)
  if (selectedSection) {
    selectedSection.classList.add("active")
  }

  // Actualizar navegación
  updateNavigation(sectionId)

  // Si es la sección del carrito, actualizar la visualización
  if (sectionId === "cart") {
    updateCartDisplay()
  }

  // Scroll al inicio
  window.scrollTo(0, 0)
}

// Función para actualizar la navegación
function updateNavigation(sectionId) {
  // Actualizar navegación móvil
  navButtons.forEach((button) => {
    if (button.getAttribute("data-section") === sectionId) {
      button.classList.add("active")
    } else {
      button.classList.remove("active")
    }
  })

  // Actualizar navegación desktop
  desktopNavLinks.forEach((link) => {
    if (link.getAttribute("data-section") === sectionId) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

// Función para mostrar una pestaña del menú
function showTab(tabId) {
  // Ocultar todos los contenidos
  menuContents.forEach((content) => {
    content.classList.remove("active")
  })

  // Mostrar el contenido seleccionado
  const selectedContent = document.getElementById(tabId)
  if (selectedContent) {
    selectedContent.classList.add("active")
  }

  // Actualizar pestañas
  tabButtons.forEach((button) => {
    if (button.getAttribute("data-tab") === tabId) {
      button.classList.add("active")
    } else {
      button.classList.remove("active")
    }
  })
}

// Función para añadir un producto al carrito
function addToCart2(name, price, image) {
  // Buscar si el producto ya está en el carrito
  const existingItemIndex = cart.findIndex((item) => item.name === name)

  if (existingItemIndex !== -1) {
    // Si ya existe, aumentar la cantidad
    cart[existingItemIndex].quantity += 1
  } else {
    // Si no existe, añadirlo al carrito
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      image: image,
    })
  }

  // Guardar carrito en localStorage
  saveCart()

  // Actualizar contador del carrito
  updateCartCount()

  // Mostrar notificación
  showNotification(`${name} añadido al carrito`)
}

// Función para añadir la promoción al carrito
function addPromoToCart() {
  addToCart2("Combo Promoción Especial", 49.99, "images/promo.jpg")
}

// Función para actualizar el contador del carrito
function updateCartCount() {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)

  headerCartCount.textContent = itemCount
  mobileCartCount.textContent = itemCount

  // Mostrar u ocultar el contador
  if (itemCount > 0) {
    headerCartCount.style.display = "flex"
    mobileCartCount.style.display = "flex"
  } else {
    headerCartCount.style.display = "none"
    mobileCartCount.style.display = "none"
  }
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
  // Si el carrito está vacío
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = ""
    cartEmptyContainer.style.display = "block"
    cartSummaryContainer.style.display = "none"
    return
  }

  // Mostrar el resumen y ocultar el mensaje de carrito vacío
  cartEmptyContainer.style.display = "none"
  cartSummaryContainer.style.display = "block"

  // Limpiar el contenedor
  cartItemsContainer.innerHTML = ""

  // Añadir cada item al carrito
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-index="${index}" aria-label="Disminuir cantidad">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}" aria-label="Aumentar cantidad">+</button>
                </div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" data-index="${index}" aria-label="Eliminar del carrito">×</button>
        `

    cartItemsContainer.appendChild(cartItem)
  })

  // Añadir event listeners a los botones
  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateQuantity2(Number.parseInt(btn.getAttribute("data-index")), -1)
    })
  })

  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateQuantity2(Number.parseInt(btn.getAttribute("data-index")), 1)
    })
  })

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number.parseInt(btn.getAttribute("data-index")))
    })
  })

  // Actualizar totales
  updateCartTotals2()
}

// Función para actualizar los totales del carrito
function updateCartTotals2() {
  // Calcular subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calcular impuesto y total
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  // Actualizar los elementos
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`
  taxElement.textContent = `$${tax.toFixed(2)}`
  totalElement.textContent = `$${total.toFixed(2)}`
}

// Función para actualizar la cantidad de un producto
function updateQuantity2(index, change) {
  // Verificar que el índice sea válido
  if (index >= 0 && index < cart.length) {
    cart[index].quantity += change

    // Si la cantidad es 0 o menos, eliminar el producto
    if (cart[index].quantity <= 0) {
      removeFromCart(index)
      return
    }

    // Guardar carrito en localStorage
    saveCart()

    // Actualizar visualización del carrito
    updateCartDisplay()

    // Actualizar contador del carrito
    updateCartCount()
  }
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
  // Verificar que el índice sea válido
  if (index >= 0 && index < cart.length) {
    const itemName = cart[index].name
    cart.splice(index, 1)

    // Guardar carrito en localStorage
    saveCart()

    // Actualizar visualización del carrito
    updateCartDisplay()

    // Actualizar contador del carrito
    updateCartCount()

    // Mostrar notificación
    showNotification(`${itemName} eliminado del carrito`)
  }
}

// Función para limpiar el carrito
function clearCart() {
  cart = []

  // Guardar carrito en localStorage
  saveCart()

  // Actualizar visualización del carrito
  updateCartDisplay()

  // Actualizar contador del carrito
  updateCartCount()

  // Mostrar notificación
  showNotification("Carrito vaciado")
}

// Función para finalizar la compra
function checkout() {
  // Verificar que el carrito no esté vacío
  if (cart.length === 0) {
    showNotification("Tu carrito está vacío")
    return
  }

  // Generar número de orden aleatorio
  const orderNumber = Math.floor(100000 + Math.random() * 900000)
  orderNumberElement.textContent = orderNumber

  // Calcular total
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  // Actualizar total en la página de confirmación
  orderTotalElement.textContent = `$${total.toFixed(2)}`

  // Generar resumen de la orden
  orderItemsContainer.innerHTML = ""

  cart.forEach((item) => {
    const orderItem = document.createElement("div")
    orderItem.className = "order-item"
    orderItem.innerHTML = `
            <span>${item.quantity} x ${item.name}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `
    orderItemsContainer.appendChild(orderItem)
  })

  // Mostrar sección de confirmación
  showSection("confirmation")

  // Limpiar carrito
  cart = []
  saveCart()
  updateCartCount()
}

// Función para mostrar notificación
function showNotification(message) {
  notificationMessage.textContent = message
  notification.classList.add("show")

  // Ocultar después de 3 segundos
  setTimeout(() => {
    closeNotification()
  }, 3000)
}

// Función para cerrar notificación
function closeNotification() {
  notification.classList.remove("show")
}

// Función para guardar carrito en localStorage

// Funciones para el menú móvil
function toggleMobileMenu() {
  mobileMenuOverlay.classList.add("active")
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove("active")
}

function renderCart() {
  // This is a placeholder. Implement your cart rendering logic here.
  console.log("Rendering cart...")
}

function updateCartTotals() {
  // This is a placeholder. Implement your cart total updating logic here.
  console.log("Updating cart totals...")
}

function addToCart(productId) {
  // This is a placeholder. Implement your add to cart logic here.
  console.log("Adding to cart: ", productId)
}

