export function removeWhishlistItem(index) {
  let wishlist = JSON.parse(localStorage.getItem("favorites")) || [];
  if (index >= 0 && index < wishlist.length) {
    wishlist.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(wishlist));
  }
}
