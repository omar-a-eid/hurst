import {fetchData} from './fetchData.js';
import {getFavorites} from './favorites.js';

export async function initSearch(searchInput) {

  // try {
    if (!searchInput.trim()) {
      displaySearchResult([]);
      return;
  }
      const fetchedProducts = await fetchData();
      const products = fetchedProducts.products;
      const searchResult = products.filter(product =>
          product.productName.toLowerCase().includes(searchInput.toLowerCase())
      );

      console.log(searchResult); 
      
      displaySearchResult(searchResult);
  // } catch (error) {
  //     console.log(error);
  // }
}

export function displaySearchResult(searchResult) {
    const searchResultContainer = document.getElementById('searchResult');
    searchResultContainer.innerHTML = '';
    searchResult.forEach(res=>{
      
      const isFavorite = getFavorites().some(favorite => favorite.id === res.id);
      const favIconClass = isFavorite ? 'fav-btn-active' : '';
  
        return searchResultContainer.innerHTML +=
        `
        <div class="card">
          <div class="img-wrapper mt-3"><img src="images/${res.image}" class="w-100" alt=""></div>
          <div class="card-body">
              <div class="row">
                  <div class="col-lg-6 col-12"> 
                      <p class="card-title">${res.productName}</p>
                      <p class="card-text">${res.price}$</p>
                  </div>
                  <div class="col-lg-4 mt-lg-0 mt-3 col-12 text-center"> 
                      <div class="col-12 mt-lg-0 mt-3">
                          <i class="fa-solid fa-cart-plus ms-3" aria-hidden="true"></i>
                          <i class="fa-solid fa-heart-circle-plus ms-3 addToFav ${favIconClass}" aria-hidden="true" data-id="${res.id}"></i>
                      </div>
                      <div class="col-12">
                          <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                          <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                          <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                          <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                          <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                      </div>
                  </div>
              </div>
          </div>
      </div> `;

    })
}