export function displayCartItems() {
  let cartBody = document.getElementById("cart-body");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let cartHtml = "";
  let total = 0;

  if (cartItems.length != 0) {
    for (let i = 0; i < cartItems.length; i++) {
      cartHtml += `
    <tr data-id="${cartItems[i].id}">
      <td class="product-thumbnail text-left">
        <div class="single-product">
          <div class="product-img">
            <a href="single-product.html">
              <img src="../images/${cartItems[i].image}" alt="">
            </a>
          </div>
          <div class="product-info">
            <h4 class="post-title">
              <a class="text-light-black" href="#">
                ${cartItems[i].productName}
              </a>
            </h4>
          </div>
        </div>
      </td>
      <td class="product-price">$${cartItems[i].price}</td>
      <td class="product-quantity">
        <div class="cart-plus-minus">
          <div class="dec qtybutton">-</div>
          <input type="text" value="${
            cartItems[i].qty
          }" name="qtybutton" class="cart-plus-minus-box">
          <div class="inc qtybutton">+</div>
        </div>
      </td>
      <td class="product-subtotal">$${(
        cartItems[i].qty * cartItems[i].price
      ).toFixed(2)}</td>
      <td class="product-remove">
        <a href="#">
          <i class="zmdi zmdi-close">
            <span class="material-symbols-outlined delete-product">close</span>
          </i>
        </a>
      </td>
    </tr>
    `;

      total += cartItems[i].qty * cartItems[i].price;
    }
  } else {
    cartHtml += `
        <tr> 
          <td colspan="5">
            <h4>Experience the allure of furniture by placing your order now.<h4>
          </td>
        </tr>
    `;
  }
  cartBody.innerHTML = cartHtml;
  displayPaymentDetails(total);
  displayOrderCost(cartItems);
  displayOrderComplete(total);
}

export function displayPaymentDetails(total) {
  let paymentDetailsBody = document.getElementById("payment-details");
  paymentDetailsBody.innerHTML = `
    <tbody>
      <tr>
        <td class="text-left">Cart Subtotal</td>
        <td class="text-end">$${total.toFixed(2)}</td>
      </tr>
      <tr>
        <td class="text-left">Shipping and Handling</td>
        <td class="text-end">$ ${total == 0 ? "0" : (15.0).toFixed(2)}</td>
      </tr>
      <tr>
        <td class="text-left">Order Total</td>
        <td class="text-end">$${total == 0 ? "0" : (total + 15).toFixed(2)}</td>
      </tr>
    </tbody>
  `;
}

export function displayWhishlistItems() {
  let whishlistBody = document.getElementById("whishlist-body");
  let whishlist = JSON.parse(localStorage.getItem("favorites")) || [];
  let whishlistHtml = "";

  if (whishlist.length != 0) {
    for (let i = 0; i < whishlist.length; i++) {
      whishlistHtml += `
      <tr data-id="${whishlist[i].id}">
        <td class="product-thumbnail text-left">
          <div class="single-product">
            <div class="product-img">
              <a href="single-product.html"
                ><img src="../images/${whishlist[i].image}" alt=""
              /></a>
            </div>
            <div class="product-info">
              <h4 class="post-title">
                <a class="text-light-black" href="#"
                  >${whishlist[i].productName}</a
                >
              </h4>
            </div>
          </div>
        </td>
        <td class="product-price">$${whishlist[i].price}</td>
        <td class="product-stock">in stock</td>
        <td class="product-add-cart">
          <a class="text-light-black" href="#">
            <span class="material-symbols-outlined product-add-cart">
              add_shopping_cart
            </span>
          </a>
        </td>
        <td class="product-remove">
          <a href="#">
            <i class="zmdi zmdi-close">
              <span class="material-symbols-outlined delete-product">close</span>
            </i>
          </a>
        </td>
      </tr>
      `;
    }
  } else {
    whishlistHtml += `
    <tr> 
      <td colspan="5">
        <h4>At the moment, you haven't shown interest in any products.<h4>
      </td>
    </tr>
`;
  }

  whishlistBody.innerHTML = whishlistHtml;
}

function displayOrderCost(cartItems) {
  const payment = document.getElementsByClassName("payment-body");
  let paymentHtml = "";

  let total = 0;

  if (cartItems != 0) {
    for (let i = 0; i < cartItems.length; i++) {
      paymentHtml += `
      <tr>
        <td>${cartItems[i].productName} x ${cartItems[i].qty}</td>
        <td class="text-end">$ ${(
          cartItems[i].price * cartItems[i].qty
        ).toFixed(2)}</td>
      </tr>
      `;

      total += cartItems[i].qty * cartItems[i].price;
    }
  }
  paymentHtml += `
    <tr>
      <td>Shipping and Handling</td>
      <td class="text-end">$${total == 0 ? "0" : (15.0).toFixed(2)}</td>
    </tr>
    <tr>
      <td>Order Total</td>
      <td class="text-end">$${total == 0 ? total : (total + 15).toFixed(2)}</td>
    </tr>
  `;

  for (let i = 0; i < payment.length; i++) {
    payment[i].innerHTML = paymentHtml;
  }
}

export function displayOrderComplete(total) {
  const orderCompleteBody = document.getElementById("order-complete-details");
  let orderCompleteHtml = "";
  const orderNumber =
    Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

  if (total != 0) {
    orderCompleteHtml += `
    <div class="thank-recieve bg-white mb-3">
      <p>Thank you. Your order has been received.</p>
    </div>
    <div
      class="order-info bg-white text-center clearfix mb-3"
    >
      <div class="single-order-info">
        <h4
          class="title-1 text-uppercase text-light-black mb-0"
        >
          order no
        </h4>
        <p class="text-uppercase text-light-black mb-0">
          <strong>m ${orderNumber}</strong>
        </p>
      </div>
      <div class="single-order-info">
        <h4
          class="title-1 text-uppercase text-light-black mb-0"
        >
          Date
        </h4>
        <p class="text-uppercase text-light-black mb-0">
          <strong>${formattedDate}</strong>
        </p>
      </div>
      <div class="single-order-info">
        <h4
          class="title-1 text-uppercase text-light-black mb-0"
        >
          Total
        </h4>
        <p class="text-uppercase text-light-black mb-0">
          <strong>$ ${total == 0 ? total : (total + 15).toFixed(2)}</strong>
        </p>
      </div>
      <div class="single-order-info">
        <h4
          class="title-1 text-uppercase text-light-black mb-0"
        >
          payment method
        </h4>
        <p class="text-uppercase text-light-black mb-0">
          <a href="#"><strong>check payment</strong></a>
        </p>
      </div>
    </div>
    
    `;
  } else {
    orderCompleteHtml += `
    <div class="thank-recieve bg-white mb-3">
      <p>Currently, there are no orders placed.</p>
    </div>
    `;
  }
  orderCompleteBody.innerHTML = orderCompleteHtml;
}

export function accordionToggle() {
  const accordionToggles = document.querySelectorAll(
    ".payment-accordion-toggle"
  );

  accordionToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.classList.remove("active");
      } else {
        const allContents = document.querySelectorAll(".payment-content");
        allContents.forEach(function (item) {
          item.style.maxHeight = null;
        });

        const allToggles = document.querySelectorAll(
          ".payment-accordion-toggle"
        );
        allToggles.forEach(function (item) {
          item.classList.remove("active");
        });

        content.style.display = "block";
        content.style.maxHeight = content.scrollHeight + "px";
        this.classList.add("active");
      }
    });
  });
}
