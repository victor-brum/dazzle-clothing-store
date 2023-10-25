const menuMobile = document.querySelector(".mobile-menu");
const menuLogo = document.querySelector(".mobile-btn");

const wrapper = document.querySelector(".wrapper");
const overlay = document.querySelector(".overlay");

const discoveryBtn = document.querySelector(".discovery-btn");

const allFilterItems = document.querySelectorAll(".filter-item");
const allFilterBtns = document.querySelectorAll(".filter-btn");

let qty = document.querySelector("#qtyBox");
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// SHOW MENU

showMenu = () => {
  if (menuMobile.classList.contains("open")) {
    menuMobile.classList.remove("open");
    menuLogo.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
  } else {
    menuMobile.classList.add("open");
    menuLogo.innerHTML = '<ion-icon name="close"></ion-icon>';
  }
};

// LOGIN-REGISTER
showLogin = () => {
  wrapper.classList.remove("active");
  wrapper.classList.add("active-popup");
  showOverlay();
};

showRegister = () => {
  wrapper.classList.add("active");
  wrapper.classList.add("active-popup");
  showOverlay();
};

closeButton = () => {
  wrapper.classList.remove("active-popup");
  hiddenOverlay();
};

// OVERLAY
showOverlay = () => {
  overlay.classList.add("active-overlay");
};

hiddenOverlay = () => {
  overlay.classList.remove("active-overlay");
};

// SKIP SECTION

discoveryBtn.onclick = () => {
  document
    .getElementById("skip-section")
    .scrollIntoView({ behavior: "smooth" });
};

// CART
cartIcon.onclick = () => {
  cart.classList.add("active");
  menuMobile.classList.remove("open");
  menuLogo.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
};

closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  // Remove Items From Cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity Changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to Cart
  var addCart = document.getElementsByClassName("add-cart-item");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // Buy Button Work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// Buy Button
function buyButtonClicked() {
  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

// Add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to the cart");
      return;
    }
  }
  qty.value = parseInt(qty.value) + 1;

  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img" />
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity" />
    </div>
    <!-- Remove Cart -->
    <i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  qty.value = parseInt(qty.value) - 1;
  updateTotal();
}

// Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Update Total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    // If price Contain some Cents Value
    total = Math.round(total * 100) / 100;
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// CATEGORY FILTER
window.addEventListener("DOMContentLoaded", () => {
  allFilterBtns[0].classList.add("active-btn");
});

allFilterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    showFilteredContent(btn);
  });
});

function showFilteredContent(btn) {
  allFilterItems.forEach((item) => {
    if (item.classList.contains(btn.id)) {
      resetActiveBtn();
      btn.classList.add("active-btn");
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function resetActiveBtn() {
  allFilterBtns.forEach((btn) => {
    btn.classList.remove("active-btn");
  });
}
