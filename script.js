// Variables globales
let cart = []
const TAX_RATE = 0.1 // 10% de impuesto

// Función para mostrar una sección
function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Mostrar la sección seleccionada
  const selectedSection = document.getElementById(sectionId)
  if (selectedSection) {
    selectedSection.classList.add("active")
  }

  // Actualizar navegación
  const navButtons = document.querySelectorAll(".nav-btn")
  navButtons.forEach((btn) => {
    btn.classList.remove("active")
  })

  // Encontrar y activar el botón de navegación correspondiente
  navButtons.forEach((btn) => {
    if (btn.getAttribute("onclick").includes(sectionId)) {
      btn.classList.add("active")
    }
  })

  // Si es la sección del carrito, actualizar la visualización
  if (sectionId === "cart") {
    updateCartDisplay()
  }

  // Scroll al inicio
  window.scrollTo(0, 0)
}

// Función para mostrar una categoría del menú
function showCategory(categoryId) {
  showSection("menu")
  showTab(categoryId)
}

// Función para mostrar una pestaña del menú
function showTab(tabId) {
  // Ocultar todos los contenidos
  const contents = document.querySelectorAll(".menu-content")
  contents.forEach((content) => {
    content.classList.remove("active")
  })

  // Mostrar el contenido seleccionado
  const selectedContent = document.getElementById(tabId)
  if (selectedContent) {
    selectedContent.classList.add("active")
  }

  // Actualizar pestañas
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach((btn) => {
    btn.classList.remove("active")
  })

  // Encontrar y activar la pestaña correspondiente
  tabButtons.forEach((btn) => {
    if (btn.getAttribute("onclick").includes(tabId)) {
      btn.classList.add("active")
    }
  })
}

// Función para añadir un producto al carrito
function addToCart(name, price, image) {
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

// Función para actualizar el contador del carrito
function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  cartCount.textContent = itemCount

  // Mostrar u ocultar el contador
  if (itemCount > 0) {
    cartCount.style.display = "flex"
  } else {
    cartCount.style.display = "none"
  }
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items")
  const cartSummary = document.getElementById("cart-summary")

  // Si el carrito está vacío
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Tu carrito está vacío</p>
                <button class="btn primary" onclick="showSection('menu')">Ver Menú</button>
            </div>
        `
    cartSummary.style.display = "none"
    return
  }

  // Mostrar el resumen
  cartSummary.style.display = "block"

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
                <h4>${item.name}</h4>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
        `

    cartItemsContainer.appendChild(cartItem)
  })

  // Actualizar totales
  updateCartTotals()
}

// Función para actualizar los totales del carrito
function updateCartTotals() {
  const subtotalElement = document.getElementById("subtotal")
  const taxElement = document.getElementById("tax")
  const totalElement = document.getElementById("total")

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
function updateQuantity(index, change) {
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
  document.getElementById("order-number").textContent = orderNumber

  // Calcular total
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  // Actualizar total en la página de confirmación
  document.getElementById("order-total").textContent = `$${total.toFixed(2)}`

  // Generar resumen de la orden
  const orderItems = document.getElementById("order-items")
  orderItems.innerHTML = ""

  cart.forEach((item) => {
    const orderItem = document.createElement("div")
    orderItem.className = "order-item"
    orderItem.innerHTML = `
            <span>${item.quantity} x ${item.name}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `
    orderItems.appendChild(orderItem)
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
  const notification = document.getElementById("notification")
  const notificationMessage = document.getElementById("notification-message")

  // Establecer mensaje
  notificationMessage.textContent = message

  // Mostrar notificación
  notification.classList.add("show")

  // Ocultar después de 3 segundos
  setTimeout(() => {
    closeNotification()
  }, 3000)
}

// Función para cerrar notificación
function closeNotification() {
  const notification = document.getElementById("notification")
  notification.classList.remove("show")
}

// Función para guardar carrito en localStorage
function saveCart() {
  localStorage.setItem("sushiCart", JSON.stringify(cart))
}

// Función para cargar carrito desde localStorage
function loadCart() {
  const savedCart = localStorage.getItem("sushiCart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
    updateCartCount()
  }
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Cargar carrito desde localStorage
  loadCart()

  // Mostrar sección de inicio por defecto
  showSection("home")
})

