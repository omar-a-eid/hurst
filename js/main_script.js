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
        let response = await fetch('./data/data.json');
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
        // console.log(fetchedData); //// returns object of 4 arrays for categories

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
        let productHTML = `
        <div class="col-3 mb-3 card-parent">
            <div class="h-100 card-content p-2">
                <div class="card border-0 w-100 h-100">
                    <img src="./images/${product.image}" alt="${product.productName}">
                    <div class="product-action bg-light w-75 d-flex align-items-center justify-content-around">
                        <a href="wishlist.html" data-bs-toggle="tooltip" data-placement="top" title="Wishlist">
                            <h1 class="glyphicon glyphicon-heart product-icons"></h1>
                        </a>
                        <span class="glyphicon glyphicon-option-vertical"></span>
                        <a href="#" data-bs-toggle="modal"  data-bs-target="#productModal" title="Quick View">
                            <h1 class="glyphicon glyphicon-search product-icons"></h1>
                        </a>
                        <span class="glyphicon glyphicon-option-vertical"></span>
                        <a href="cart.html" data-bs-toggle="tooltip" data-placement="top" title="Add To Cart">
                            <h1 class="glyphicon glyphicon-shopping-cart product-icons"></h1>
                        </a>
                    </div>
        
                    <div class="details d-flex justify-content-between mt-3 p-0">
                        <h3><b>${product.productName}</b></h3> 
                        <p>${product.type}</p>
                    </div>
                    <div class="price d-flex justify-content-between align-items-center">
                        <h4><b>$${product.price}</b></h4> 
                        <div class="rating">
                            <input type="radio" id="star5_${product.id}" name="rating_${product.id}" value="5">
                            <label for="star5_${product.id}"></label>
                            <input type="radio" id="star4_${product.id}" name="rating_${product.id}" value="4">
                            <label for="star4_${product.id}"></label>
                            <input type="radio" id="star3_${product.id}" name="rating_${product.id}" value="3">
                            <label for="star3_${product.id}"></label>
                            <input type="radio" id="star2_${product.id}" name="rating_${product.id}" value="2">
                            <label for="star2_${product.id}"></label>
                            <input type="radio" id="star1_${product.id}" name="rating_${product.id}" value="1">
                            <label for="star1_${product.id}"></label>
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
            let category = this.getAttribute('href').substring(1); // Remove # from href
            fetchAndDisplayProducts(category);
        });
    });

    let viewDefaultItems = document.querySelector('.tab-menu a[href="#new-arrivals"]');
    viewDefaultItems.click();
}); 

/************************************** Rating Products *********************************************/


