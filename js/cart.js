import { displayCartItems } from "./checkoutUI.js";
import { fetchData } from "./fetchData.js";

/*Will return the cart items */
export function getCarItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
export function removeCartItem(index) {
  let cartItems = getCarItems();
  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

export function increaseQuantity(index) {
  let cartItems = getCarItems();
  if (
    index >= 0 &&
    index < cartItems.length &&
    cartItems[index].qty < cartItems[index].stock
  ) {
    cartItems[index].qty++;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

export function decreaseQuantity(index) {
  let cartItems = getCarItems();
  if (index >= 0 && index < cartItems.length && cartItems[index].qty > 1) {
    cartItems[index].qty--;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

function findProductById(id, ...productArrays) {
  for (const products of productArrays) {
      const foundProduct = products.find(product => product.id === id);
      if (foundProduct) {
          return foundProduct;
      }
  }
  return null;
}


/* Call the function with qty if it's there and it only needs the id of the product */

export async function addToCart(prodId, qty = 1) {
  const id =parseInt(prodId);
  let cartItems = getCarItems();
  let product = undefined;
  try {
    const data = await fetchData();
    const products = data.products;
    product = findProductById(id, data.featuredProduct, products, data["new-arrivals"], data["best-seller"], data["most-view"], data["discounts"]);
  } catch (error) {
    console.log(error);
  }
  if (product) {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      existingItem.qty += qty;

      let alertMessage = `
        <div class="alert alert-danger" 
          role="alert"
          style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999;">
          <strong>Attention!</strong> Product already exists at the cart!
        </div>
      `;

      document.body.insertAdjacentHTML("afterbegin", alertMessage);

      setTimeout(function () {
        document.querySelector(".alert").remove();
      }, 3000);

    } else {
      cartItems.push({
        id: id,
        productName: product.productName,
        price: product.price,
        qty: qty,
        image: product.image,
        stock: product.amount,
      });


      let alertMessage = `
        <div class="alert alert-success" role="alert" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999;">
          <strong>Success!</strong> Product added to cart successfully!
        </div>
      `;

      document.body.insertAdjacentHTML("afterbegin", alertMessage);

      setTimeout(function () {
        document.querySelector(".alert").remove();
      }, 3000);

    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    if (window.location.pathname === "/pages/checkout.html") {
      displayCartItems();
    }
  }
}

export function addToCartHandler(bodyElement) {
  const body = document.getElementById(bodyElement);
  body.addEventListener("click", function (event) {
    if (event.target.classList.contains("product-add-cart")) {
      const index = event.target.closest("tr").dataset.id;
      addToCart(index);
    }
  });
}
