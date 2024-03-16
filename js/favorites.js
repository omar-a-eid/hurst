export async function addedToFavourite(prodId) {
  let id =parseInt(prodId);
  try {
    const data = JSON.parse(localStorage.getItem('featuredProduct'));

   
    let favProduct = data.find((product) => product.id === id);

    if (favProduct) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      const isFavorite = favorites.some((product) => product.id === id);

      if (!isFavorite) {
        favorites.push(favProduct);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(favProduct);

        const icon = document.querySelector(`.addToFav[data-id="${id}"]`);
        if (icon) {
          icon.classList.add('fav-btn-active');
        }
      } else {
        favorites = favorites.filter((product) => product.id !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(favProduct);

        const icon = document.querySelector(`.addToFav[data-id="${id}"]`);
        if (icon) {
          icon.classList.remove('fav-btn-active');
        }
      }
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.error('Error adding product to favorites:', error);
  }
}

export function getFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}

export function displayFav() {
  const favoritesProd = getFavorites();
  let result = '';
  const favProducts = document.getElementById('favItems');
  if (favoritesProd.length === 0) {
    result += `<h1 class="text-center mt-5">No Favorite Items</h1>`;
  }
  favoritesProd.forEach((product) => {
    const isFavorite = favoritesProd.some(
      (favorite) => favorite.id === product.id
    );
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
                            <i class="fa-solid fa-heart-circle-plus addToFav ${favIconClass}" aria-hidden="true" data-id="${product.id}"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });

  favProducts.innerHTML = result;
}
