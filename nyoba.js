// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
// ketika shopping cart diklik
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Toggle Cart
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cart = document.querySelector("#shopping-cart");
  const cartItemsContainer = cart.querySelector(".cart-items");
  const cartButton = document.querySelector("#shopping-cart-button");

  // Toggle cart visibility
  cartButton.addEventListener("click", function () {
    cart.classList.toggle("visible");
  });

  // Add to Cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".shop-card");
      const itemName = productCard.querySelector(".shop-content").textContent;
      const itemPrice = productCard.querySelector(".shop-price").textContent;

      feather.replace(); // Update icons

      // Add event listener for removing items
      cartItem
        .querySelector(".remove-item")
        .addEventListener("click", function () {
          cartItem.remove();
        });
    });
  });
});
let cartCount = 0; // Jumlah total barang di keranjang
const cartItems = []; // Menyimpan barang dalam bentuk array

function addToCart(itemId, itemName, itemPrice) {
  const existingItem = cartItems.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1; // Tambah jumlah barang
  } else {
    cartItems.push({
      id: itemId,
      name: itemName,
      price: itemPrice,
      quantity: 1, // Barang baru dimulai dari jumlah 1
    });
  }

  cartCount++; // Tambah total barang
  updateCartUI();
}

function removeFromCart(itemId) {
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);

  if (itemIndex > -1) {
    const itemQuantity = cartItems[itemIndex].quantity; // Ambil jumlah barang
    cartCount -= itemQuantity; // Kurangi jumlah total barang
    cartItems.splice(itemIndex, 1); // Hapus barang dari array
    updateCartUI();
  }
}

function updateCartUI() {
  const cartCountElement = document.getElementById("cart-count");
  const cartListElement = document.getElementById("cart-list");

  // Update angka keranjang
  cartCountElement.textContent = cartCount;
  cartCountElement.classList.toggle("show", cartCount > 0);

  // Perbarui daftar barang
  cartListElement.innerHTML = ""; // Kosongkan elemen sebelum mengisi ulang
  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            ${item.name} (x${item.quantity}) - IDR ${item.price} 
            <span class="remove-item" data-id="${item.id}">Remove</span>
        `;
    cartListElement.appendChild(listItem);
  });

  // Tambahkan event listener untuk tombol "Remove"
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      removeFromCart(itemId);
    });
  });
}

// Event listener untuk tombol "Add to Cart"
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    const shopCard = button.closest(".shop-card"); // Ambil elemen terdekat
    const itemId = shopCard.id; // Ambil ID dari elemen terdekat
    const itemName = shopCard.querySelector(".shop-content h3").textContent; // Ambil nama produk
    const itemPriceText = shopCard.querySelector(".shop-price").textContent; // Ambil harga produk
    const itemPrice = parseInt(
      itemPriceText.replace("IDR ", "").replace("K", "000")
    ); // Ambil harga produk

    addToCart(itemId, itemName, itemPrice);
  });
});

function updateCartUI() {
  const cartCountElement = document.getElementById("cart-count");
  const cartListElement = document.getElementById("cart-list");
  const totalPriceElement = document.getElementById("total-price"); // Elemen untuk total harga

  let totalPrice = 0; // Variabel untuk total harga

  // Update angka keranjang
  cartCountElement.textContent = cartCount;
  cartCountElement.classList.toggle("show", cartCount > 0);

  // Perbarui daftar barang
  cartListElement.innerHTML = ""; // Kosongkan elemen sebelum mengisi ulang
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity; // Hitung total harga

    const listItem = document.createElement("li");
    listItem.innerHTML = `
            ${item.name} (x${item.quantity}) - IDR ${
      item.price * item.quantity
    } 
            <span class="remove-item" data-id="${item.id}">Remove</span>
        `;
    cartListElement.appendChild(listItem);
  });

  // Tampilkan total harga
  totalPriceElement.textContent = `Total: IDR ${totalPrice}`;
  totalPriceElement.classList.toggle("show", totalPrice > 0);

  // Tambahkan event listener untuk tombol "Remove"
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      removeFromCart(itemId);
    });
  });
  function removeFromCart(itemId) {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (itemIndex > -1) {
      const item = cartItems[itemIndex];

      // Kurangi jumlah barang
      if (item.quantity > 1) {
        item.quantity -= 1;
        cartCount--; // Kurangi total barang
      } else {
        // Jika quantity 1, hapus barang dari array
        cartCount--; // Kurangi total barang
        cartItems.splice(itemIndex, 1);
      }

      updateCartUI();
    }
  }
}
