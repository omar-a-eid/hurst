import { initNavbarAnimation,displayNav } from './navbar.js';
import { initMenu } from './menu.js';
import { initSearch } from './search.js';
import { fetchAndDisplayProducts } from './fetchData.js';
import { displayFav, addedToFavourite } from './favorites.js';
import { addToCart } from './cart.js';
import auth,{ logout } from "./auth.js";



document.addEventListener('click', function(e) {
    if (e.target.classList.contains('addToFav')) {
        const id = e.target.dataset.id;
        console.log(e);
        addedToFavourite(id);
    }

    if (e.target.classList.contains('product-add-cart')) {
        const id = e.target.dataset.id;
        addToCart(id);
    }

    if (e.target.classList.contains('logout')) {
        console.log('logout');
        logout();
    }

});

const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        initSearch(searchInput.value);
        
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayNav();
    initNavbarAnimation();
    initMenu();
    fetchAndDisplayProducts();
    const favItems = document.getElementById('favItems');
    if (favItems) {
        displayFav();
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        initSearch(searchInput);
    }
    let isLogged = auth();
    const userIconContainer = document.getElementById("userIconContainer");

    if (isLogged) {
      
        userIconContainer.innerHTML = '<i class="fa-solid fa-right-from-bracket pt-4 logout"></i>';
    } else {
      
        userIconContainer.innerHTML = '<a href="./pages/signinSignup.html"><i class="fa-regular fa-user pt-4"></i></a>';
    }

});
