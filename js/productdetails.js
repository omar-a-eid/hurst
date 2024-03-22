import {addToCart} from './cart.js';

function details() {
    let counter = 0;
    const counterValue = document.getElementById('counter-value');

    function increase() {
        counter++;
        counterValue.textContent = counter;
    }

    function decrease() {
        if (counter > 0) {
            counter--;
            counterValue.textContent = counter;
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(function (navLink) {
            navLink.addEventListener('click', function () {
                navLinks.forEach(function (link) {
                    link.classList.remove('rev');
                });
                this.classList.add('rev');
            });
        });
    });
    // let cards = document.getElementById("cards");
    function getData() {
        fetch("../data/data.json").then((res) => {
            // to 
            if (!res.ok) {
                throw new Error("File can't load");
            }
            return res.json();
        }).then((res) => {

            let pro_id = new URLSearchParams(window.location.search);
            // console.log(pro_id);
            let product = res.products.filter(pro => pro.id == pro_id.get("id"));
            let obj = product[0];
            // console.log(obj);
            // console.log(obj.colors[0]);

            let str =
                `
            <div class="row mt-5 col-12 ">
<div class="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 bg-color ">
    <img class="additional-img w-100 img-fluid" src="../images/${obj.image}" alt="furnituer">
</div>
<div class="col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 bg-color ">
    <div class="row">
        <div class="col-6">
            <p><strong>${obj.productName}</strong></p>
        </div>
        <div class="col-6">
            <ul class="nav justify-content-end color"><!-- Stars -->
                <li class="nav-item">
                    <a class="star fa-solid fa-star" href="#"></a>
                </li>
                <li class="nav-item">
                    <a class="star fa-solid fa-star" href="#"></a>
                </li>
                <li class="nav-item">
                    <a class="star fa-solid fa-star" href="#"></a>
                </li>
                <li class="nav-item">
                    <a class="star fa-solid fa-star-half-stroke" href="#"></a>
                </li>
                <li class="nav-item">
                    <a class="star fa-regular fa-star" href="#"></a>
                </li>
                <p>( ${obj.rating} Rating )</p>
            </ul>
        </div>
    </div>
    <div class="row col-12 ">
        <p class="star">$ ${obj.price}</p>
    </div>
    <div class="row col-12 ">
        <p>${obj.info}</p>
    </div>
    <div class="row col-12 mt-4">
        <div class="row col-12">
            <div class="col-5 counter justify-content-evenly d-flex bg-colorgray">
                <button class="btn btn-secondary btn-counter bg-colorgray" onclick="decrease()">-</button>
                <div class="counter-line"></div>
                <span id="counter-value" class="mx-3">0</span>
                <div class="counter-line"></div>
                <button class="btn btn-secondary btn-counter bg-colorgray" onclick="increase()">+</button>
            </div>
            <div class="col-1"></div>
            <div class="col-6 bg-colorgray">
                <ul class="nav justify-content-evenly mt-2 bg-colorgray "> <!-- Favourite , Search , refresh , cart -->
                    <li class="nav-item">
                        
                    </li>
                    <div class="counter-line"></div>
                    <li class="nav-item">
                        <a class="black fa-solid fa-magnifying-glass-plus" href="#"></a>
                    </li>
                    <div class="counter-line"></div>
                    <li class="nav-item">
                        <a class="black fa-solid fa-rotate" href="#"></a>
                    </li>
                    <div class="counter-line"></div>
                    <li class="nav-item">
                        <a class="black fa-solid fa-cart-arrow-down" id="myLink" href="#"></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="row col-12 mt-4">
        <div class="slider-container mb-3">
            <button class="prev-btn">Previous</button>
            <div class="slider">
                <img src="../images/${obj.images[0]}" alt="Image 1">
                <img class=" img" src="../images/${obj.images[1]}" alt="Image 2">
                <img class=" img" src="../images/${obj.images[2]}" alt="Image 3">
                <img class=" img" src="../images/${obj.images[3]}" alt="Image 2">
                <img class=" img" src="../images/${obj.images[4]}" alt="Image 3">
            </div>
            <button class="next-btn">Next</button>
        </div>
    </div>
</div>
<div class="mt-5"></div>
<div class="d-block d-md-block d-lg-flex col-12 mt-3 align-items-start ">
    <div class="nav flex-column nav-pills me-3 " id="v-pills-tab" role="tablist "
        aria-orientation="vertical">
        <button class=" blacko nav-link bg-color mg" id="v-pills-home-tab " data-bs-toggle="pill"
            data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home"
            aria-selected="true">Description</button>
        <button class=" blacko nav-link bg-color mg" id="v-pills-profile-tab " data-bs-toggle="pill"
            data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile"
            aria-selected="false">Reviews</button>
        <button class=" blacko nav-link bg-color mg" id="v-pills-messages-tab " data-bs-toggle="pill"
            data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages"
            aria-selected="false">Information</button>
        <button class=" blacko nav-link bg-color mg" id="v-pills-settings-tab " data-bs-toggle="pill"
            data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings"
            aria-selected="false">Tags</button>
    </div>
    <div class="tab-content bg-color pd" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel"
            aria-labelledby="v-pills-home-tab">
            <div class="row col-10">
                <p>${obj.productName}</p>
                <p>${obj.description}</p>
                <p>${obj.description}</p>
                <p>${obj.description}</p>
            </div>
        </div>
        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel"
            aria-labelledby="v-pills-profile-tab">
            <h5><strong>CUSTOMER REVIEW</strong></h5>
            <div class="row col-12">
                <div class="col-2 col-sm-12 text-center col-md-2 col-lg-2">
                    <img class="img-fluid"src="../images/${obj.reviews[0].image}" alt="pic">
                </div>
                <div class="row col-10 d-flex">
                    <div class="col-4 col-sm-10 justify col-md-4 col-lg-4">
                        <h5><strong>${obj.reviews[0].customerName}</strong></h5>
                    </div>
                    <div class="col-4 d-flex justify-content-end">
                        <button class="button fas fa-hand-point-left"></button>
                        <button class="button fas fa-times"></button>
                    </div>
                    <div class="row col-12">
                        <p>27 Jun, 2021 at 2:30pm</p>
                    </div>
                    <div class="row col-10">
                        <p>${obj.reviews[0].review}</p>
                    </div>
                </div>
            </div>
            <div class="row col-12">
                <div class="col-2">
                    <img class="img-fluid" src="../images/${obj.reviews[1].image}" alt="pic">
                </div>
                <div class="row col-10 d-flex">
                    <div class="col-4">
                        <h5><strong>${obj.reviews[1].customerName}</strong></h5>
                    </div>
                    <div class="col-4 d-flex justify-content-end">
                        <button class="button fas fa-hand-point-left"></button>
                        <button class="button fas fa-times"></button>
                    </div>
                    <div class="row col-12">
                        <p>27 Jun, 2021 at 2:30pm</p>
                    </div>
                    <div class="row col-10">
                        <p>${obj.reviews[1].review}</p>
                    </div>
                </div>
            </div>
            <div class="row col-12 mt-5">
                <p>LEAVE YOUR REVIW</p>
            </div>
            <div class="row col-12">
                <div class="col-12">
                    <p>Your Rating</p>
                </div>
                <div class="row col-10">
                    <div class="star col-1 d-flex">
                        <a class="star fa-regular fa-star " href="#"></a>
                        <div class="counter-line "></div>
                    </div>
                    <div class="star col-2 d-flex ">
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <div class="counter-line "></div>
                    </div>
                    <div class="star col-2 d-flex ">
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <div class="counter-line "></div>
                    </div>
                    <div class="star col-2 d-flex ">
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <div class="counter-line "></div>
                    </div>
                    <div class="star col-1 d-flex ">
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                        <a class="star fa-regular fa-star " href="#"></a>
                    </div>
                </div>
            </div>
            <div class="row col-12 mt-5">
                <div class="col-5">
                    <form>
                        <div class="mb-3">
                            <input type="email" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp" placeholder="Yout Name here...">
                        </div>
                    </form>
                </div>
                <div class="col-5">
                    <form>
                        <div class="mb-3">
                            <input type="email" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp" placeholder="Subject...">
                        </div>
                    </form>
                </div>
            </div>
            <div class="row col-12 mt-2">
                <form>
                    <div class="mb-3">
                        <input type="text" class="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Your review here...">
                    </div>
                    <button type="submit" class="btn btn-primary star1">SUBMIT REVIEW</button>
                </form>
            </div>
        </div>
        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel"
            aria-labelledby="v-pills-messages-tab">
            <div class="row col-10">
                <p>PRODUCT INFORMATION</p>
                <p>${obj.info}</p>
                <p>${obj.info}</p>
                <p>${obj.info}</p>
            </div>
        </div>
        <div class="tab-pane fade" id="v-pills-settings" role="tabpanel"
            aria-labelledby="v-pills-settings-tab">
            <div class="row col-10">
                <p>TAGS</p>
                <p>${obj.tags}</p>
                <p>${obj.tags}</p>
                <p>${obj.tags}</p>
            </div>
        </div>
    </div>
</div>
</div>
            `;

            document.getElementById("cont").innerHTML = str;
            let myLink = document.querySelector("#myLink");
            myLink.addEventListener("click", function (e) {
                e.preventDefault();
                addToCart(obj.id, obj.amount);
                this.setAttribute('href', '../pages/checkout.html');
            });
            const nextBtn = document.querySelector(".next-btn");
            console.log(nextBtn);
            // div.insertAdjacentHTML('afterend', str);
            const slider = document.querySelector(".slider");
            const prevBtn = document.querySelector(".prev-btn");
            const images = document.querySelectorAll(".slider img");
            const additionalImg = document.querySelector(".additional-img");

            let counter = 0;
            const imageWidth = images[0].clientWidth;


            // Function to update additional image src
            function updateAdditionalImageSrc() {
                additionalImg.src = images[counter % images.length].src;
            }

            // Initial update of additional image source
            updateAdditionalImageSrc();

            // Event listener for transitionend event on slider
            slider.addEventListener("transitionend", updateAdditionalImageSrc);
            console.log(nextBtn);
            nextBtn.addEventListener("click", () => {
                console.log("hello");
                counter++;
                updateAdditionalImageSrc(); // Update additional image immediately
                slider.style.transition = "transform 0.5s ease";
                slider.style.transform = `translateX(-${counter * imageWidth}px)`;
                if (counter === images.length) {
                    counter = 0;
                    slider.style.transition = "none";
                    slider.style.transform = `translateX(0px)`;

                    setTimeout(() => {
                        slider.style.transition = "transform 0.5s ease";
                        slider.style.transform = `translateX(-${counter * imageWidth}px)`;
                    }, 50);
                }
            });

            prevBtn.addEventListener("click", () => {
                if (counter <= 0) return;
                counter--;
                updateAdditionalImageSrc(); // Update additional image immediately
                slider.style.transition = "transform 0.5s ease";
                slider.style.transform = `translateX(-${counter * imageWidth}px)`;
            });


        }).catch(error => console.log(error));
    }
    if (window.location.search !== "") {
        getData();
    } else {
        alert("Id not found");
        window.location.href = "../Pages/productpage.html";
    }

}
window.onload = function (){
    details();
}