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

/* Call the function with qty if it's there and it only needs the id of the product */

export async function addToCart(id, qty = 1) {
  let cartItems = getCarItems();
  let product = undefined;
  try {
    const data = await fetchData();
    const products = data.products;
    product = products.find((product) => product.id == id);
  } catch (error) {
    console.log(error);
  }
  if (product) {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cartItems.push({
        id: id,
        productName: product.productName,
        price: product.price,
        qty: qty,
        image: product.image,
        stock: product.amount,
      });
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
