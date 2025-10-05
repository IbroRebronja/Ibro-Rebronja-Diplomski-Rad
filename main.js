let searchForm=document.querySelector('.search-form')
document.querySelector('#search-btn').onclick=()=>{
    searchForm.classList.toggle('active')
    shoppingCart.classList.remove('active')
    account.classList.remove('active')
    navbar.classList.remove('active')
}

let account=document.querySelector('.login-form')
document.querySelector('#login-btn').onclick=()=>{
    account.classList.toggle('active')
    searchForm.classList.remove('active')
    shoppingCart.classList.remove('active')
    navbar.classList.remove('active')
}

let navbar=document.querySelector('.navbar')
document.querySelector('#menu-btn').onclick=()=>{
    navbar.classList.toggle('active')
    searchForm.classList.remove('active')
    shoppingCart.classList.remove('active')
    account.classList.remove('active')
}

window.onscroll =()=>{
    searchForm.classList.remove('active')
    shoppingCart.classList.remove('active')
    account.classList.remove('active')
    navbar.classList.remove('active')
}

var swiper = new Swiper(".product-slider", {
    slidesPerView: 3,
    spaceBetween: 25,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
    el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });

var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 4
      },
    },
  });


// --- CART FUNCTIONALITY ---
document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cart-btn");
  const cart = document.querySelector(".shopping-cart");
  const addToCartBtns = document.querySelectorAll(".products .btn");
  const cartContainer = document.querySelector(".shopping-cart");
  const totalElement = document.querySelector(".shopping-cart .total");
  const paymentBtn = document.querySelector(".shopping-cart .btn");
  let cartItems = [];

  // Toggle cart visibility
  cartBtn.addEventListener("click", () => {
    cart.classList.toggle("active");
  });

  // Add to cart button clicked
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const box = e.target.closest(".box");
      const name = box.querySelector("h3").innerText;
      const priceText = box.querySelector(".price").innerText;
      const price = parseFloat(priceText.replace("€", "").replace("/-", "").trim());
      const imgSrc = box.querySelector("img").src;

      const existingItem = cartItems.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({ name, price, imgSrc, quantity: 1 });
      }

      updateCart();
      showNotification(`${name} je dodan u korpu!`);
    });
  });

  // Update cart UI
  function updateCart() {
    const boxes = cartContainer.querySelectorAll(".box");
    boxes.forEach(b => b.remove());

    let total = 0;

    cartItems.forEach((item, index) => {
      total += item.price * item.quantity;

      const box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = `
        <i class="fas fa-trash" data-index="${index}"></i>
        <img src="${item.imgSrc}" alt="${item.name}">
        <div class="content">
          <h3>${item.name}</h3>
          <span class="price">€ ${item.price}/-</span>
          <span class="quantity">Qty: ${item.quantity}</span>
        </div>
      `;
      cartContainer.insertBefore(box, totalElement);

      // Delete button event
      box.querySelector(".fa-trash").addEventListener("click", () => {
        cartItems.splice(index, 1);
        updateCart();
        showNotification(`${item.name} je obrisan iz korpe!`);
      });
    });

    totalElement.innerText = `Total: € ${total}/-`;
  }

  // Show a small notification
  function showNotification(message) {
    const notif = document.createElement("div");
    notif.className = "cart-notification";
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.classList.add("show");
    }, 10);
    setTimeout(() => {
      notif.classList.remove("show");
      setTimeout(() => notif.remove(), 300);
    }, 2000);
  }

  // Fake payment popup
  paymentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      showNotification("Vaša korpa je prazna!");
      return;
    }

    const overlay = document.createElement("div");
    overlay.className = "payment-popup";
    overlay.innerHTML = `
      <div class="popup-content">
        <h3>Ovo je samo test plaćanja 💳</h3>
        <p>Funkcionalnost plaćanja trenutno nije aktivna.</p>
        <button class="btn close-popup">U redu</button>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector(".close-popup").addEventListener("click", () => {
      overlay.remove();
    });
  });
});
