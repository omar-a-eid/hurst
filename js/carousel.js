import {getFavorites} from './favorites.js';


export function displayProducts(products) {

    let result = '';
    const featuredProducts = document.getElementById('featuredProducts');
    if (!featuredProducts) {
        return;
    }
    
    products.forEach((product, index) => {
      const activeClass = index === 0 ? 'active' : '';
  
      const isFavorite = getFavorites().some(favorite => favorite.id === product.id);
      const favIconClass = isFavorite ? 'fav-btn-active' : '';
  
      result += `
      <div class="carousel-item ${activeClass} second-carousel-item">
      <div class="card">
          <div class="img-wrapper mt-3"><img src="images/${product.image}" class="w-100" alt=""></div>
          <div class="card-body">
              <div class="row">
                  <div class="col-lg-6 col-12"> 
                      <p class="card-title">${product.productName}</p>
                      <p class="card-text">${product.price}$</p>
                  </div>
                  <div class="col-lg-4 mt-lg-0 mt-3 col-12 text-center"> 
                      <div class="col-12 mt-lg-0 mt-3">
                          <i class="fa-solid fa-cart-plus ms-3" aria-hidden="true"></i>
                          <i class="fa-solid fa-heart-circle-plus ms-3 addToFav ${favIconClass}" aria-hidden="true" data-id="${product.id}"></i>
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
      </div>
  </div>
  
      `;
    });
  
    featuredProducts.innerHTML = result;
  }
  
 export function initializeCarousel() {
    let multipleCardCarousel = document.querySelector("#carouselExampleControls2");
  
    if(!multipleCardCarousel){
        return;
    }

    if (window.matchMedia("(min-width: 768px)").matches) {
      let carouselContainer = document.querySelector(".second-carousel");
      let cardWidth = document.querySelector(".second-carousel-item").offsetWidth;
      let visibleCards = Math.floor(carouselContainer.clientWidth / cardWidth);
      let totalCards = document.querySelectorAll(".second-carousel-item").length;
      let maxScrollPosition = cardWidth * (totalCards - visibleCards);
      let scrollPosition = 0;
  
      document.querySelector("#carouselExampleControls2 .btn-second-carousel-next").addEventListener("click", function () {
        if (scrollPosition < maxScrollPosition) {
          scrollPosition += cardWidth;
          carouselContainer.scroll({ left: scrollPosition, behavior: 'smooth' });
        }
      });
  
      document.querySelector("#carouselExampleControls2 .btn-second-carousel-prev").addEventListener("click", function () {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          carouselContainer.scroll({ left: scrollPosition, behavior: 'smooth' });
        }
      });
    } else {
      multipleCardCarousel.classList.add("slide");
    }
  }



