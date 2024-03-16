import { initNavbarAnimation } from './navbarAnimation.js';
import { initMenu } from './menu.js';
import { initSearch } from './search.js';
import { fetchAndDisplayProducts } from './fetchData.js';
import { displayFav, addedToFavourite } from './favorites.js';

initNavbarAnimation();
initMenu();
fetchAndDisplayProducts();

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('addToFav')) {
        const id = e.target.dataset.id;
        addedToFavourite(id);
    }

    if (e.target.id === 'search-icon') {
        const searchIcon = document.getElementById('search-icon');
        if (searchIcon) {
            initSearch(searchIcon);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const favItems = document.getElementById('favItems');
    if (favItems) {
        displayFav();
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        initSearch(searchInput);
    }
});
