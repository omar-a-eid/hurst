function main() {
  document.addEventListener("DOMContentLoaded", function () {
    // Get the dropdown toggle button and menu
    var dropdownToggleButton = document.querySelector('.dropdown-toggle');
    var dropdownMenu = document.querySelector(".dropdown-menu");

    // Hide the dropdown menu initially
    dropdownMenu.classList.add("d-none");

    // Add click event listener to the dropdown toggle button
    dropdownToggleButton.onclick = () => {
      if (dropdownMenu.classList.contains("d-none")) {
        dropdownMenu.classList.add("d-block");
        dropdownMenu.classList.remove("d-none");
      } else {
        dropdownMenu.classList.remove("d-block");
        dropdownMenu.classList.add("d-none");
      }
    }
  });
  // Get the range input element
  const priceRange = document.getElementById('priceRange');

  // Get the output element for the price range
  const priceOutput = document.getElementById('priceOutput');

  // Add event listener for the input event on the range input
  priceRange.addEventListener('input', function () {
    // Update the value displayed in the output element
    priceOutput.textContent = '$50 - $' + (50 + parseInt(this.value));
  });

  document.addEventListener('DOMContentLoaded', function () {
    const sizeClickable = document.querySelectorAll('.size-clickable');

    sizeClickable.forEach(function (element) {
      element.addEventListener('click', function (event) {
        event.stopPropagation();
      });
    });
  });


  let cards = document.getElementById("cards");
  function getData(category, type) {
    cards.innerHTML = "";
    fetch("../data/data.json").then((res) => {
      // to 
      if (!res.ok) {
        throw new Error("File can't load");
      }
      return res.json();
    }).then((res) => {
      let res_chair = "";
      switch (type) {
        case "products":
          res_chair = res.products.filter(pro => pro.category == category);
          break;
        case "furniture":
          res_chair = res.furniture.filter(pro => pro.category == category);
          break;
        case "Accessories":
          res_chair = res.Accessories.filter(pro => pro.category == category);
          break;
      }
      console.log(res_chair);
      let count = 0;
      let random = 0.0;
      let div = "";
      if (res_chair) {
        res_chair.forEach(obj => {
          if (count % 4 == 0) {
            random = Math.random();
            let strcards = `
    <div id="${random}" class="row col-12 justify-content-around mt-5">
    </div>
    `;
            cards.insertAdjacentHTML("beforeend", strcards);
            div = document.getElementById(random);
          }
          let str = `
          <div class="d-flex card col-12 col-lg-2 col-xl-2 col-xxl-2 bg-color p-3">
          <a  href="productdetails.html?id=${obj.id}"><img  src="../images/${obj.image}" class="card-img-top w-100" alt="image"></a><!-- product image -->
          <div class="col-12 card-body text-center">
            <h5 class="d-flex col-12 card-title justify-content-center">${obj.productName}</h5><!-- product name -->
            <ul class="d-flex col-12 nav justify-content-center "><!-- Stars -->
              <li class=" nav-item">
                <a class=" star star1 fa-solid fa-star" href="#"></a>
              </li>
              <li class=" nav-item">
                <a class=" star star1 fa-solid fa-star justify-conten" href="#"></a>
              </li>
              <li class=" nav-item">
                <a class=" star star1 fa-solid fa-star" href="#"></a>
              </li>
              <li class=" nav-item">
                <a class=" star star1 fa-solid fa-star-half-stroke" href="#"></a>
              </li>
              <li class=" nav-item">
                <a class=" star star1 fa-regular fa-star" href="#"></a>
              </li>
            </ul>
            <ul class="col-12 col-xs-2 col-sm-12 kmz nav justify-content-between mt-3 px-2"> <!-- Favourite , Search , refresh , cart -->
              <li class="nav-item">
                <a class="nav-link link star black fa-regular fa-heart " href="#"></a>
              </li>
              <div class="counter-line"></div>
              <li class="nav-item">
                <a class="nav-link link star black fa-solid fa-magnifying-glass-plus " href="#"></a>
              </li>
              <div class="counter-line"></div>
              <li class="nav-item">
                <a class="nav-link link star black fa-solid fa-rotate " href="#"></a>
              </li>
              <div class="counter-line"></div>
              <li class="nav-item">
                <a class="nav-link link star black fa-solid fa-cart-arrow-down" href="#"></a>
              </li>
            </ul>
          </div>
          <div class="position-absolute top-0 end-0 p-2">
            <span class="badge price">$${obj.price}</span>
          </div>
          <div class="position-absolute top-0 start-0 p-2">
            <span class="badge top-left-New">New</span>
          </div>
        </div>
          `;
          div.insertAdjacentHTML('beforeend', str);
          count++;
        });
      }
    }).catch(error => console.log(error));
  }
  // to fetch data from 


  document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to all anchor elements
    document.querySelectorAll('a').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        // Prevent the default action of the anchor element
        event.preventDefault();

        // Get the href attribute of the clicked anchor
        var href = anchor.getAttribute('href');

        // Perform your desired action with the href value
        console.log('Clicked URL:', href);

        // Change the URL programmatically
        window.history.pushState(null, null, href);

        // Dispatch a new popstate event to trigger your event listener
        window.dispatchEvent(new Event('popstate'));
      });
    });
  });

  // Listen for the popstate event to detect URL changes
  window.addEventListener('popstate', function (event) {
    let search = new URLSearchParams(window.location.search);
    let type = search.get("type");
    let category = search.get("category");
    getData(category, type);
  });
  getData("chair", "products");
}