  import { displayBanner } from "./banner.js";
import {
  addToCartHandler,
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from "./cart.js";
import {
  accordionToggle,
  displayCartItems,
  displayWhishlistItems,
} from "./checkoutUI.js";
import { initMenu } from "./menu.js";
import { displayNav, initNavbarAnimation } from "./navbar.js";
import { removeWhishlistItem } from "./wishlist.js";

window.onload = function () {
  displayNav();
  initNavbarAnimation();
  initMenu();
  displayBanner("Shopping Cart");

  displayCartItems();
  displayWhishlistItems();
  accordionToggle();

  const cartBody = document.getElementById("cart-body");
  const whishlistBody = document.getElementById("whishlist-body");

  cartBody.addEventListener("click", function (event) {
    handleCartActions(event);
    displayCartItems();
  });

  whishlistBody.addEventListener("click", function (event) {
    handleWishlistActions(event);
    displayWhishlistItems();
  });

  addToCartHandler("wishlist");
};

function handleCartActions(event) {
  if (event.target.classList.contains("qtybutton")) {
    const index = event.target.closest("tr").rowIndex - 1;
    console.log(index);
    if (event.target.classList.contains("dec")) {
      decreaseQuantity(index);
    } else if (event.target.classList.contains("inc")) {
      increaseQuantity(index);
    }
  } else if (event.target.classList.contains("delete-product")) {
    const index = event.target.closest("tr").rowIndex - 1;
    removeCartItem(index);
  }
  displayCartItems();
}

function handleWishlistActions(event) {
  if (event.target.classList.contains("delete-product")) {
    const index = event.target.closest("tr").rowIndex - 1;
    removeWhishlistItem(index);
  }
}
