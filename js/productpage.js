import { displayBanner } from './banner.js';
import { initMenu } from './menu.js';
import { displayNav, initNavbarAnimation } from './navbar.js';
(function () {
  'use strict';

  window.addEventListener('load', function () {
    displayNav();
    initNavbarAnimation();
    initMenu();
    displayBanner('Products');
    main();
  });

  function main() {
    // Get the range input element and output element for the price range
    // const priceRange = document.getElementById("priceRange");
    // const priceOutput = document.getElementById("priceOutput");

    // Add event listener for the input event on the range input
    // priceRange.addEventListener("input", function () {
    //   // Update the value displayed in the output element
    //   priceOutput.textContent = "$50 - $" + (50 + parseInt(this.value));
    // });

    // Get the cards container element
    const cards = document.getElementById('cards');

    // Function to fetch and render data
    function getData(category, type) {
      cards.innerHTML = ''; // Clear the cards container
      fetch('../data/data.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error("File can't load");
          }
          return response.json();
        })
        .then((data) => {
          let products = [];
          switch (type) {
            case 'products':
              if (category || category == 'all') {
                products = data.products;
              } else {
                products = data.products.filter(
                  (product) => product.category === category
                );
              }
              break;
          }
          renderProducts(products);
        })
        .catch((error) => console.error(error));
    }

    // Function to render products onto the page
    function renderProducts(products) {
      let count = 0;
      let random = 0.0;
      products.forEach((product) => {
        if (count % 4 === 0) {
          random = Math.random();
          cards.insertAdjacentHTML(
            'beforeend',
            `<div id="${random}" class="row col-12 justify-content-around mt-5"></div>`
          );
        }
        const div = document.getElementById(random);
        div.insertAdjacentHTML(
          'beforeend',
          `
          <div class="col-12 col-lg-4 col-xl-4 col-xxl-3 my-3">
    <div class="card border-0 position-relative">
        <a href="productdetails.html?id=${product.id}&name=${product.productName}" class="card-img-link">
            <div class="img-wrapper position-relative">
                <img src="../images/${product.image}" class="card-img-top rounded-top img-wrapper" style="height: 500px;" alt="Product Image">
                <div class="price-badge position-absolute top-0 start-0 p-2">
                    <span class="badge bg-price">$${product.price}</span>
                </div>
                <div class="new-badge position-absolute top-0 end-0 p-2">
                    <span class="badge bg-new rounded-pill px-2">New</span>
                </div>
            </div> 
        </a>
        <div class="card-body text-center">
            <h5 class="card-title mb-0">${product.productName}</h5>
            <ul class="nav justify-content-center star-rating">
                <li class="nav-item"><a class="star star1 fa-solid fa-star" href="#"></a></li>
                <li class="nav-item"><a class="star star1 fa-solid fa-star" href="#"></a></li>
                <li class="nav-item"><a class="star star1 fa-solid fa-star" href="#"></a></li>
                <li class="nav-item"><a class="star star1 fa-solid fa-star-half-stroke" href="#"></a></li>
                <li class="nav-item"><a class="star star1 fa-regular fa-star" href="#"></a></li>
            </ul>
            <ul class="nav justify-content-between action-icons mt-3">
                <li class="nav-item"><a class="nav-link link star black fa-regular fa-heart" href="#"></a></li>
                <li class="nav-item"><a class="nav-link link star black fa-solid fa-search" href="#"></a></li>
                <li class="nav-item"><a class="nav-link link star black fa-solid fa-sync-alt" href="#"></a></li>
                <li class="nav-item"><a class="nav-link link star black fa-solid fa-cart-arrow-down" href="#"></a></li>
            </ul>
        </div>
    </div>
</div>

          `
        );
        count++;
      });
    }

    window.addEventListener('popstate', () => {
      const searchParams = new URLSearchParams(window.location.search);
      const type = searchParams.get('type');
      const category = searchParams.get('category');
      getData(category, type);
    });

    let path = window.location.search.split('?')[1];
    let category = 'all';
    if (path) {
      let params = new URLSearchParams(path);
      let categoryUndecoded = params.get('category');
      category = decodeURIComponent(categoryUndecoded);

      let pageNumber = params.get('page');
      if (pageNumber) {
        currentPage = decodeURIComponent(pageNumber);
      }
    }
    getData(category, 'products');
  }
})();
