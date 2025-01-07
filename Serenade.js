// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// Ketika humburger menu diklik
document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");
// ketika search diklik
document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};
// Get references to the input and list elements
const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");

// Add event listener to the search input
searchInput.addEventListener("input", function () {
  const filter = searchInput.value.toLowerCase();
  const items = resultsList.getElementsByClassName("shop-content");

  // Loop through all list items and hide those that don't match the search query
  for (let i = 0; i < items.length; i++) {
    const itemText = items[i].textContent || items[i].innerText;
    if (itemText.toLowerCase().indexOf(filter) > -1) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
});
// Toggle Search

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
// ketika shopping cart diklik
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik diluar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

document.addEventListener("click", function (e) {
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

// Notifikasi Shopping Cart Start
let cartCount = 0;
const cartItems = [];

function addToCart(itemId, itemName, itemPrice) {
  const existingItem = cartItems.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: itemId,
      name: itemName,
      price: itemPrice,
      quantity: 1,
    });
  }

  cartCount++;
  updateCartUI();
}

function removeFromCart(itemId) {
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    cartCount -= cartItems[itemIndex].quantity; // Kurangi jumlah notifikasi dengan quantity item yang dihapus
    cartItems.splice(itemIndex, 1); // Hapus item dari keranjang
    updateCartUI();
  }
}

function updateCartUI() {
  const cartCountElement = document.getElementById("cart-count");
  const cartListElement = document.getElementById("cart-list");

  cartCountElement.textContent = cartCount;
  cartCountElement.classList.toggle("show", cartCount > 0);

  cartListElement.innerHTML = "";
  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-quantity">x${item.quantity}</span>
            <span class="item-price">${item.price}</span>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
    cartListElement.appendChild(listItem);
  });

  // Tambahkan event listener untuk tombol hapus
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const itemId = button.getAttribute("data-id");
      removeFromCart(itemId);
    });
  });
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const itemId = button.getAttribute("data-id");
    const itemName = button.getAttribute("data-name");
    const itemPrice = button.getAttribute("data-price");
    addToCart(itemId, itemName, itemPrice);
  });
});

// Notifikasi Shopping Cart End

// Toggle Cart Start
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cart = document.querySelector("#shopping-cart");
  const cartItemsContainer = cart.querySelector(".cart-items");
  const cartButton = document.querySelector("#shopping-cart-button");

  // Toggle cart visibility
  // cartButton.addEventListener("click", function () {
  //   cart.classList.toggle("visible");
  // });

  // Add to Cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".shop-card");
      const itemName = productCard.querySelector(".shop-content").textContent;
      const itemPrice = productCard.querySelector(".shop-price").textContent;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
              <div>
                  <h3>${itemName}</h3>
                  <div class="item-price">${itemPrice}</div>
              </div>
              <i data-feather="trash-2" class="remove-item"></i>
              
          `;

      cartItemsContainer.appendChild(cartItem);
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
// Toggle Cart End

// Ganti Warna Start
const sMerah = document.querySelector("input[name=sMerah]");
const sHijau = document.querySelector("input[name=sHijau]");
const sBiru = document.querySelector("input[name=sBiru]");

sMerah.addEventListener("input", function () {
  const r = sMerah.value;
  const g = sHijau.value;
  const b = sBiru.value;
  document.body.style.backgroundColor = "rgb(" + r + "," + g + ", " + b + ")";
});

sHijau.addEventListener("input", function () {
  const r = sMerah.value;
  const g = sHijau.value;
  const b = sBiru.value;
  document.body.style.backgroundColor = "rgb(" + r + "," + g + ", " + b + ")";
});

sBiru.addEventListener("input", function () {
  const r = sMerah.value;
  const g = sHijau.value;
  const b = sBiru.value;
  document.body.style.backgroundColor = "rgb(" + r + "," + g + ", " + b + ")";
});
// Ganti Warna End

// Reviews Start
const reviewmodall = document.getElementById("reviewmodall");
const writeReviewBtn = document.getElementById("writeReviewBtn");
const cancelBtn = document.getElementById("cancelBtn");
const ratingStars = document.querySelectorAll(".rating span");
const reviewCards = document.getElementById("reviewCards");

let selectedRating = 5;

writeReviewBtn.addEventListener("click", () => {
  reviewmodall.style.display = "block";
});

cancelBtn.addEventListener("click", () => {
  reviewmodall.style.display = "none";
});

ratingStars.forEach((star) => {
  star.addEventListener("click", () => {
    const value = star.getAttribute("data-value");
    selectedRating = value;
    ratingStars.forEach((s) => {
      s.classList.remove("active");
      if (s.getAttribute("data-value") <= value) {
        s.classList.add("active");
      }
    });
  });
});

document.querySelector(".submit-btn").addEventListener("click", () => {
  const feedback = document
    .querySelector(".modall-content textarea")
    .value.trim();
  const name = document
    .querySelector('.modall-content input[type="text"]')
    .value.trim();
  const email = document
    .querySelector('.modall-content input[type="email"]')
    .value.trim();
  const fileInput = document.querySelector(
    '.modall-content input[type="file"]'
  );
  const file = fileInput.files[0];

  if (!feedback || !name || !email || !file) {
    alert("Please fill out all fields and upload a profile picture.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const newCard = document.createElement("div");
    newCard.className = "card";

    const starHtml = "&#9733;".repeat(selectedRating);

    newCard.innerHTML = `
            <div class="stars">${starHtml}</div>
            <p>${feedback}</p>
            <div class="customer">
              <img src="${reader.result}" alt="${name}" />
              <div class="customer-info">
                <span>${name}</span><br />
                Happy Customer
              </div>
            </div>
          `;

    reviewCards.appendChild(newCard);
    alert(`Thank you for your review, ${name}!`);
    reviewmodall.style.display = "none";
    fileInput.value = "";
    document.querySelector(".modall-content textarea").value = "";
    document.querySelector('.modall-content input[type="text"]').value = "";
    document.querySelector('.modall-content input[type="email"]').value = "";
    ratingStars.forEach((s) => s.classList.remove("active"));
    ratingStars[4].classList.add("active"); // Reset rating to 5
  };
  reader.readAsDataURL(file);
});
// Reviews End

// Modal Box Start
const itemDetailModal1 = document.querySelector("#item-detail-modal1");
const itemDetailButtons1 = document.querySelectorAll(".item-detail-button1");
const itemDetailModal2 = document.querySelector("#item-detail-modal2");
const itemDetailButtons2 = document.querySelectorAll(".item-detail-button2");
const itemDetailModal3 = document.querySelector("#item-detail-modal3");
const itemDetailButtons3 = document.querySelectorAll(".item-detail-button3");
const itemDetailModal4 = document.querySelector("#item-detail-modal4");
const itemDetailButtons4 = document.querySelectorAll(".item-detail-button4");
const itemDetailModal5 = document.querySelector("#item-detail-modal5");
const itemDetailButtons5 = document.querySelectorAll(".item-detail-button5");
const itemDetailModal6 = document.querySelector("#item-detail-modal6");
const itemDetailButtons6 = document.querySelectorAll(".item-detail-button6");
const itemDetailModal7 = document.querySelector("#item-detail-modal7");
const itemDetailButtons7 = document.querySelectorAll(".item-detail-button7");
const itemDetailModal8 = document.querySelector("#item-detail-modal8");
const itemDetailButtons8 = document.querySelectorAll(".item-detail-button8");
const itemDetailModal9 = document.querySelector("#item-detail-modal9");
const itemDetailButtons9 = document.querySelectorAll(".item-detail-button9");
const itemDetailModal10 = document.querySelector("#item-detail-modal10");
const itemDetailButtons10 = document.querySelectorAll(".item-detail-button10");
const itemDetailModal11 = document.querySelector("#item-detail-modal11");
const itemDetailButtons11 = document.querySelectorAll(".item-detail-button11");
const itemDetailModal12 = document.querySelector("#item-detail-modal12");
const itemDetailButtons12 = document.querySelectorAll(".item-detail-button12");
const itemDetailModal13 = document.querySelector("#item-detail-modal13");
const itemDetailButtons13 = document.querySelectorAll(".item-detail-button13");
const itemDetailModal14 = document.querySelector("#item-detail-modal14");
const itemDetailButtons14 = document.querySelectorAll(".item-detail-button14");
const itemDetailModal15 = document.querySelector("#item-detail-modal15");
const itemDetailButtons15 = document.querySelectorAll(".item-detail-button15");
const itemDetailModal16 = document.querySelector("#item-detail-modal16");
const itemDetailButtons16 = document.querySelectorAll(".item-detail-button16");
const itemDetailModal17 = document.querySelector("#item-detail-modal17");
const itemDetailButtons17 = document.querySelectorAll(".item-detail-button17");
const itemDetailModal18 = document.querySelector("#item-detail-modal18");
const itemDetailButtons18 = document.querySelectorAll(".item-detail-button18");
const itemDetailModal19 = document.querySelector("#item-detail-modal19");
const itemDetailButtons19 = document.querySelectorAll(".item-detail-button19");
const itemDetailModal20 = document.querySelector("#item-detail-modal20");
const itemDetailButtons20 = document.querySelectorAll(".item-detail-button20");
const itemDetailModal21 = document.querySelector("#item-detail-modal21");
const itemDetailButtons21 = document.querySelectorAll(".item-detail-button21");
const itemDetailModal22 = document.querySelector("#item-detail-modal22");
const itemDetailButtons22 = document.querySelectorAll(".item-detail-button22");
const itemDetailModal23 = document.querySelector("#item-detail-modal23");
const itemDetailButtons23 = document.querySelectorAll(".item-detail-button23");
const itemDetailModal24 = document.querySelector("#item-detail-modal24");
const itemDetailButtons24 = document.querySelectorAll(".item-detail-button24");
const itemDetailModal25 = document.querySelector("#item-detail-modal25");
const itemDetailButtons25 = document.querySelectorAll(".item-detail-button25");
const itemDetailModal26 = document.querySelector("#item-detail-modal26");
const itemDetailButtons26 = document.querySelectorAll(".item-detail-button26");
const itemDetailModal27 = document.querySelector("#item-detail-modal27");
const itemDetailButtons27 = document.querySelectorAll(".item-detail-button27");
const itemDetailModal28 = document.querySelector("#item-detail-modal28");
const itemDetailButtons28 = document.querySelectorAll(".item-detail-button28");
const itemDetailModal29 = document.querySelector("#item-detail-modal29");
const itemDetailButtons29 = document.querySelectorAll(".item-detail-button29");
const itemDetailModal30 = document.querySelector("#item-detail-modal30");
const itemDetailButtons30 = document.querySelectorAll(".item-detail-button30");

// Modal 1
itemDetailButtons1.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal1.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon1").onclick = (e) => {
  itemDetailModal1.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal1) {
    itemDetailModal1.style.display = "none";
  }
};

// Modal 2
itemDetailButtons2.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal2.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon2").onclick = (e) => {
  itemDetailModal2.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal2) {
    itemDetailModal2.style.display = "none";
  }
};

// Modal 3
itemDetailButtons3.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal3.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon3").onclick = (e) => {
  itemDetailModal3.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal3) {
    itemDetailModal3.style.display = "none";
  }
};
// Modal 4
itemDetailButtons4.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal4.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon4").onclick = (e) => {
  itemDetailModal4.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal4) {
    itemDetailModal4.style.display = "none";
  }
};
// Modal 5
itemDetailButtons5.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal5.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon5").onclick = (e) => {
  itemDetailModal5.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal5) {
    itemDetailModal5.style.display = "none";
  }
};
// Modal 6
itemDetailButtons6.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal6.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon6").onclick = (e) => {
  itemDetailModal6.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal6) {
    itemDetailModal6.style.display = "none";
  }
};
// Modal 7
itemDetailButtons7.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal7.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon7").onclick = (e) => {
  itemDetailModal7.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal7) {
    itemDetailModal7.style.display = "none";
  }
};
// Modal 8
itemDetailButtons8.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal8.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon8").onclick = (e) => {
  itemDetailModal8.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal8) {
    itemDetailModal8.style.display = "none";
  }
};
// Modal 9
itemDetailButtons9.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal9.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon9").onclick = (e) => {
  itemDetailModal9.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal9) {
    itemDetailModal9.style.display = "none";
  }
};
// Modal 10
itemDetailButtons10.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal10.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon10").onclick = (e) => {
  itemDetailModal10.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal10) {
    itemDetailModal10.style.display = "none";
  }
};
// Modal 11
itemDetailButtons11.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal11.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon11").onclick = (e) => {
  itemDetailModal11.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal11) {
    itemDetailModal11.style.display = "none";
  }
};
// Modal 12
itemDetailButtons12.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal12.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon12").onclick = (e) => {
  itemDetailModal12.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal12) {
    itemDetailModal12.style.display = "none";
  }
};
// Modal 13
itemDetailButtons13.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal13.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon13").onclick = (e) => {
  itemDetailModal13.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal13) {
    itemDetailModal13.style.display = "none";
  }
};
// Modal 14
itemDetailButtons14.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal14.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon14").onclick = (e) => {
  itemDetailModal14.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal14) {
    itemDetailModal14.style.display = "none";
  }
};
// Modal 15
itemDetailButtons15.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal15.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon15").onclick = (e) => {
  itemDetailModal15.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal15) {
    itemDetailModal15.style.display = "none";
  }
};
// Modal 16
itemDetailButtons16.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal16.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon16").onclick = (e) => {
  itemDetailModal16.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal16) {
    itemDetailModal16.style.display = "none";
  }
};
// Modal 17
itemDetailButtons17.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal17.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon17").onclick = (e) => {
  itemDetailModal17.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal17) {
    itemDetailModal17.style.display = "none";
  }
};
// Modal 18
itemDetailButtons18.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal18.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon18").onclick = (e) => {
  itemDetailModal18.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal18) {
    itemDetailModal18.style.display = "none";
  }
};
// Modal 19
itemDetailButtons19.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal19.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon19").onclick = (e) => {
  itemDetailModal19.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal19) {
    itemDetailModal19.style.display = "none";
  }
};
// Modal 20
itemDetailButtons20.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal20.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon20").onclick = (e) => {
  itemDetailModal20.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal20) {
    itemDetailModal20.style.display = "none";
  }
};
// Modal 21
itemDetailButtons21.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal21.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon21").onclick = (e) => {
  itemDetailModal21.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal21) {
    itemDetailModal21.style.display = "none";
  }
};
// Modal 22
itemDetailButtons22.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal22.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon22").onclick = (e) => {
  itemDetailModal22.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal22) {
    itemDetailModal22.style.display = "none";
  }
};
// Modal 23
itemDetailButtons23.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal23.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon23").onclick = (e) => {
  itemDetailModal23.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal23) {
    itemDetailModal23.style.display = "none";
  }
};
// Modal 24
itemDetailButtons24.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal24.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon24").onclick = (e) => {
  itemDetailModal24.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal24) {
    itemDetailModal24.style.display = "none";
  }
};
// Modal 25
itemDetailButtons25.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal25.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon25").onclick = (e) => {
  itemDetailModal25.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal25) {
    itemDetailModal25.style.display = "none";
  }
};
// Modal 26
itemDetailButtons26.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal26.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon26").onclick = (e) => {
  itemDetailModal26.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal26) {
    itemDetailModal26.style.display = "none";
  }
};
// Modal 27
itemDetailButtons27.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal27.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon27").onclick = (e) => {
  itemDetailModal27.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal27) {
    itemDetailModal27.style.display = "none";
  }
};
// Modal 28
itemDetailButtons28.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal28.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon28").onclick = (e) => {
  itemDetailModal28.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal28) {
    itemDetailModal28.style.display = "none";
  }
};
// Modal 29
itemDetailButtons29.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal29.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon29").onclick = (e) => {
  itemDetailModal29.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal29) {
    itemDetailModal29.style.display = "none";
  }
};
// Modal 30
itemDetailButtons30.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal30.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelector(".modal .close-icon30").onclick = (e) => {
  itemDetailModal30.style.display = "none";
  e.preventDefault();
};

// klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal30) {
    itemDetailModal30.style.display = "none";
  }
};
// Modal Box End
