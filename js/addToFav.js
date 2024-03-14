function getFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}

function displayFav() {
    const favoritesProd = getFavorites();
    let result = '';
    const favProducts = document.getElementById('favItems');
    if (favoritesProd.length === 0) {
        result += `<h1 class="text-center mt-5">No Favorite Items</h1>`;
    }
    favoritesProd.forEach((product) => {
        const isFavorite = favoritesProd.some(favorite => favorite.id === product.id);
        const favIconClass = isFavorite ? 'fav-btn-active' : '';

        result += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <img src="../images/${product.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text">${product.price}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <i class="fa-solid fa-cart-plus" aria-hidden="true"></i>
                            <i class="fa-solid fa-heart-circle-plus addToFav ${favIconClass}" aria-hidden="true" data-id="${product.id}" onclick="addedToFavourite(${product.id})"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    favProducts.innerHTML = result;
}

document.addEventListener('DOMContentLoaded', displayFav);
