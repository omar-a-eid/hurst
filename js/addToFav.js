function getFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}

function displayFav() {
  const favoritesProd = getFavorites();
  let result = '';
  const favProducts = document.getElementById('favItems');
  if (favoritesProd.length === 0) {
    result += `<h1 class="text-center">No Favorite Items</h1>`;
  }
  favoritesProd.forEach((product) => {
    result += `
<div class="card mb-3 mt-5" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="../images/${product.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.productName}</h5>
        <p class="card-text">${product.price}</p>
        <i class="fa-solid fa-cart-plus ms-3" aria-hidden="true"></i>
        <i class="fa-solid fa-heart-circle-plus ms-3 addToFav" aria-hidden="true" data-id="${product.id}" onclick="addedToFavourite(${product.id})"></i>
      </div>
    </div>
  </div>
</div>
  `;
  });

  favProducts.innerHTML = result;
}

document.addEventListener('DOMContentLoaded', displayFav);
