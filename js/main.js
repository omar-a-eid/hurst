// navbar animation
let scrolled = false;
window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 0 && !scrolled) {
    scrolled = true;
    navbar.classList.add('scroll-down');
    navbar.style.transition =
      'all 0.7s ease-in-out';
  }
  if (window.scrollY === 0 && scrolled) {
    scrolled = false;
    navbar.classList.remove('scroll-down');
    navbar.style.transition =
      'all 0.7s ease-in-out';
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var menu = document.getElementById('menu');
  
  var submenuItems = {
    'Home': ['Home 1', 'Home 2', 'Home 3'],
    'Products': ['Product 1', 'Product 2', 'Product 3'],
    'Shortcodes': ['Shortcode 1', 'Shortcode 2', 'Shortcode 3'], 
    'Accessories': ['Accessories 1', 'Accessories 2', 'Accessories 3'],
    'Lookbook': ['Lookbook 1', 'Lookbook 2', 'Lookbook 3'],
    'Blog': ['Blog 1', 'Blog 2', 'Blog 3'],
    'Pages': ['Pages 1', 'Pages 2', 'Pages 3'],
    'About Us': ['About 1', 'About 2', 'About 3'],
    'Contact': ['Contact 1', 'Contact 2', 'Contact 3']
  };

  Object.keys(submenuItems).forEach(function(parentText) {
    var parent = document.createElement('li');
    parent.classList.add('parent', 'pt-2');
    var parentLink = document.createElement('a');
    parentLink.href = '#';
    parentLink.textContent = parentText;
    parent.appendChild(parentLink);
    
    var submenu = document.createElement('ul');
    submenu.classList.add('submenu');
    submenuItems[parentText].forEach(function(submenuItemText) {
      var submenuItem = document.createElement('li');
      var submenuLink = document.createElement('a');
      submenuLink.href = '#';
      submenuLink.textContent = submenuItemText;
      submenuItem.appendChild(submenuLink);
      submenu.appendChild(submenuItem);
    });
    
    parent.appendChild(submenu);
    menu.appendChild(parent);
  });

  var parents = document.querySelectorAll('.parent');
  parents.forEach(function(parent) {
    parent.addEventListener('mouseover', function() {
      var submenu = this.querySelector('.submenu');
      if (submenu) {
        submenu.style.visibility = 'visible';
        submenu.style.opacity = '1';
      }
    });

    parent.addEventListener('mouseout', function() {
      var submenu = this.querySelector('.submenu');
      if (submenu) {
        submenu.style.visibility = 'hidden';
        submenu.style.opacity = '0';
      }
    });
  });
});

document.getElementById('search-icon').addEventListener('click', function () {
  this.classList.add('search-hover');
  var searchForm=document.getElementById('search-form');
  searchForm.classList.remove('d-none');

});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.getElementById('search-icon').classList.remove('search-hover');
    document.getElementById('search-form').classList.add('d-none');
  }
});

document.getElementById('search-input').addEventListener('focus', function () {
  this.style.border = '1px solid #c8a165';
  this.style.boxShadow = 'none';
});

document.querySelector('.fa-xmark').addEventListener('click', function () {
  document.getElementById('search-icon').classList.remove('search-hover');
  document.getElementById('search-form').classList.add('d-none');
});


/* -------------------------------------------------------------------------- */
/*                     fetch Data from json file                              */
/* -------------------------------------------------------------------------- */
async function fetchData() {
  const response = await fetch('../data/data.json');
  const data = await response.json();
  localStorage.setItem('featuredProduct', JSON.stringify(data.featuredProduct));
  localStorage.setItem('Product', JSON.stringify(data.products));
  return data;
}

async function fetchAndDisplayProducts() {
  try {
    const fetchedData = await fetchData();
    displayProducts(fetchedData.featuredProduct);
    initializeCarousel();
    // initializeAddToFavButtons();
  } catch (error) {
    console.error('Error fetching or displaying products:', error);
  }
}

function getFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites;
}

function displayProducts(products) {
  let result = '';
  const featuredProducts = document.getElementById('featuredProducts');

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
              <div class="col-md-6">
                <p class="card-title">${product.productName}</p>
                <p class="card-text" >${product.price}$</p>
              </div>
              <div class="col-md-4 mt-lg-0 mt-3">
                <div class="col-12 mt-lg-0 mt-3">
                    <i class="fa-solid fa-cart-plus ms-3" aria-hidden="true"></i>
                    <i class="fa-solid fa-heart-circle-plus ms-3 addToFav ${favIconClass}" aria-hidden="true" data-id="${product.id}" onclick="addedToFavourite(${product.id})"></i>
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

function initializeCarousel() {
  let multipleCardCarousel = document.querySelector("#carouselExampleControls2");

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

// function initializeAddToFavButtons() {
//   let favBtns = document.querySelectorAll('.addToFav');
//   favBtns.forEach(function (btn) {
//     btn.addEventListener('click', function (e) {
//       e.classList.toggle('fav-btn-active');
//       // console.log(e);
//     });
//   });
// }

document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);

async function addedToFavourite(id) {
  try {
    const data = JSON.parse(localStorage.getItem('featuredProduct')) || JSON.parse(localStorage.getItem('products'));

    let favProduct = data.find(product => product.id === id);

    if (favProduct) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      const isFavorite = favorites.some(product => product.id === id);

      if (!isFavorite) {
        favorites.push(favProduct);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(favProduct);

        const icon = document.querySelector(`.addToFav[data-id="${id}"]`);
        if (icon) {
          icon.classList.add('fav-btn-active');
        }

      } else {
        favorites = favorites.filter(product => product.id !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(favProduct);

        const icon = document.querySelector(`.addToFav[data-id="${id}"]`);
        if (icon) {
          icon.classList.remove('fav-btn-active');
        }
      }
    }
  } catch (error) {
    console.error('Error adding product to favorites:', error);
  }
}