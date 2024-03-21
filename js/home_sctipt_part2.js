import { getFavorites } from "../js/favorites.js";

/************************************* links activation ***********************************/

let Links = document.querySelectorAll('.tab-menu a');
// console.log(Links);

Links.forEach(link => {
    link.addEventListener('click', function() {
        Links.forEach(link => {
            link.classList.remove('active');
            let hrElement = link.querySelector('.new5');
            // console.log(hrElement);
            if (hrElement) {
                hrElement.remove();
            }
        });

        this.classList.add('active');
        this.innerHTML += '<hr class="new5">';
    });
});

/************************************ Fetch data from json **************************************/

async function fetchData() 
{
    try {
        let response = await fetch('data/data.json');
        // console.log(response);
        let data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchAndDisplayProducts(category) 
{
    try {
        let fetchedData = await fetchData();
        // console.log(fetchedData);

        if (fetchedData.hasOwnProperty(category)) 
        {
            // console.log(fetchedData[category]);
            let products = fetchedData[category];
            displayProducts(products);
        } else {
            console.error('Category not found:', category);
        }
    } catch (error) {
        console.error('Error fetching or displaying products:', error);
    }
}

/*********************************************** Display Products **************************************************/

function displayProducts(products) {
    let container = document.querySelector('.items');
    container.innerHTML = '';

    products.forEach(product => {

        const isFavorite = getFavorites().some(favorite => favorite.id === product.id);
        const favIconClass = isFavorite ? 'fav-btn-active' : '';

        let userRating = getUserRating(product.id);
        let starRatingHTML = '';
        for (let i = 5; i >= 1; i--)
        {
            let checked = i === userRating ? 'checked' : '';
            starRatingHTML += `
                <input type="radio" id="star${i}_${product.id}" name="rating_${product.id}" value="${i}" ${checked}>
                <label for="star${i}_${product.id}"></label>
            `;
        }


        let productHTML = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 card-parent">
            <div class="h-100 card-content p-2">
                <div class="card border-0 w-100 h-100">
                    <img src="./images/${product.image}" alt="${product.productName}">
                    <div class="product-action bg-light w-75 d-flex align-items-center justify-content-around">
                        <i class="fa-solid fa-heart-circle-plus ms-3 addToFav ${favIconClass}" aria-hidden="true" data-id="${product.id}"></i>
                        <span class="glyphicon glyphicon-option-vertical"></span>
                        <a type="button" data-bs-toggle="modal" data-bs-target="#detailsModal" data-product='${JSON.stringify(product)}' title="Quick View">
                            <i class="fa-solid fa-search product-icons"></i>
                        </a>
                        <span class="glyphicon glyphicon-option-vertical"></span>
                        <i class="fa-solid fa-cart-plus product-add-cart ms-3" aria-hidden="true" id="cart" data-id="${product.id}"></i>
                    </div>

                    <div class="details d-flex justify-content-between mt-3 p-0">
                        <h3><b>${product.productName}</b></h3>
                        <p>${product.type}</p>
                    </div>

                    <div class="d-inline-block justify-content-between align-items-center">
                        <h4><b>$${product.price}</b></h4>
                        <div class="rating">
                            ${starRatingHTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += productHTML; 
    });
    
}

/*************************************** handling categories *****************************************/

document.addEventListener('DOMContentLoaded', function () {
    Links.forEach(link => {
        link.addEventListener('click', function() {
            let category = this.getAttribute('href').substring(1);
            fetchAndDisplayProducts(category);
        });
    });

    let viewDefaultItems = document.querySelector('.tab-menu a[href="#new-arrivals"]');
    viewDefaultItems.click();
}); 

/************************************** Rating Products *********************************************/


function saveUserRating(productId, rating) 
{
    sessionStorage.setItem(`user_rating_${productId}`, rating);
    updateRatingsDisplay(productId);
}

document.addEventListener('change', function(event) {
    if (event.target.matches('.rating input[type="radio"]')) 
    {
        let productId = event.target.id.split('_')[1];
        let rating = parseInt(event.target.value);
        saveUserRating(productId, rating);
    }
});

function getUserRating(productId) 
{
    let userRating = sessionStorage.getItem(`user_rating_${productId}`);
    return userRating ? parseInt(userRating) : 0;
}

function updateRatingsDisplay(productId) 
{
    let productCard = document.querySelector(`.card-parent[data-id="${productId}"]`);
    if (productCard) {
        let averageRatingDisplay = productCard.querySelector('.average-rating');
        if (averageRatingDisplay) {
            averageRatingDisplay.textContent = `Average Rating: ${averageRating}`;
        }
    }
}

/************************************** Filter Function *********************************************/

let filterDiv = document.getElementById('myDIV');
console.log(filterDiv);

let filterMessage = document.getElementById('no_product_message');
console.log(filterMessage);
filterMessage.style.display = 'none';


document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let minPrice = parseFloat(document.getElementById('minPrice').value);
    let maxPrice = parseFloat(document.getElementById('maxPrice').value);
    let productType = document.getElementById('productType').value;

    let allProducts = document.querySelectorAll('.items .card-parent');
    
    let productsFound = false; 

    allProducts.forEach(product => {
        let price = parseFloat(product.querySelector('.price h4').textContent.replace('$', ''));
        let type = product.querySelector('.details p').textContent.trim();

        let meetsPriceCriteria = isNaN(minPrice) || isNaN(maxPrice) || (price >= minPrice && price <= maxPrice);
        let meetsTypeCriteria = productType === '' || type === productType;

        if (meetsPriceCriteria && meetsTypeCriteria) {
            product.style.display = 'block';
            productsFound = true; 
        } else {
            product.style.display = 'none';
        }
    });


    if (productsFound == false) {
        filterMessage.style.display = 'flex';
        filterMessage.style.textAlign = 'center';
    } else {
        filterMessage.style.display = 'none';
    }

    filterDiv.style.display = 'none';


});

/************************************ Handling filter btn and div style *******************************/

let filterBtn = document.getElementById('filter-btn');

filterBtn.addEventListener('mouseenter', function() 
{
    filterDiv.style.display = "block";
});

filterBtn.addEventListener('mouseleave', function(event) 
{
    if (!event.relatedTarget || !filterDiv.contains(event.relatedTarget)) 
    {
        filterDiv.style.display = "none";
    }
});


filterDiv.addEventListener('mouseenter', function() 
{
    filterDiv.style.display = "block";
});

filterDiv.addEventListener('mouseleave', function(event) 
{
    if (!event.relatedTarget || event.relatedTarget !== filterBtn)
     {
        filterDiv.style.display = "none";
    }
});

/************************************ display filter products div ******************************************/

function displayFilter() {
    if (filterDiv.style.display === "none") {
        filterDiv.style.display = "block";
    } else {
        filterDiv.style.display = "none";
    }
}

displayFilter()

/************************************** Display Product Details in Modal *********************************************/

function displayProductDetails(product) {
    console.log(product);
    let modalBody = document.getElementById('my-content');
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-6 p-3">
                <img src="./images/${product.image}" class="w-100 h-100" alt="${product.productName}">
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">

                <div class="container-fluid">
                    <div class="row form-group mt-3 mb-0">
                        <div class="col-sm-2 w-100">
                            <p>${product.productName}</p>
                        </div>
                    </div>
                    <hr class"mt-0">
                    <div class="row form-group m-2">
                        <div class="col-sm-2 w-100 mb-0">
                            <p>${product.price}</p>
                        </div>
                    </div>
                    <hr class"mt-0">
                    <div class="col-sm-12 mb-4">
                        <a href="#" class="feature-link">See all features</a>
                    </div>

                    <div class="row m-2 mx-0 mr-0">
                        <div class="col-3">
                            <input class="form-control" id="quantity" type="number" value="0">
                        </div>
                        <div class="col-9 add-cart-btn p-0">
                            <a class="btn w-75 data text-light add-cart-btn product-add-cart w-100" data-id="${product.id}" type="submit">Add to cart</a>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <p>${product.smallDesc}</p>
                    </div>

                    <hr>
            </div>
            </div>
        </div>
        
    `;
}

/************************ Display product details modal ***********************/

$('#detailsModal').on('show.bs.modal', function (event) 
{
    let button = $(event.relatedTarget);
    let product = button.data('product'); 
    // console.log(product);
    displayProductDetails(product);
});

/*****************************************************************************/

