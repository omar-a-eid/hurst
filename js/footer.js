window.addEventListener("load", function () {
  drawFooter();
});

function drawFooter() {
  let path = "./";

  if (window.location.pathname != "index.html") {
    path = "../";
  }

  let cssLink = document.createElement("link");
  cssLink.rel = "stylesheet";
  cssLink.href = path + "css/footer.css";
  document.head.appendChild(cssLink);

  let footerHTML = `
    <div class="container w-100 d-flex justify-content-center search-div">
        <div class="row d-flex w-100 align-items-center justify-content-center search-container">
            <div class="col-md-6">
                <input type="text" name="search" placeholder="Enter your email address" id="subscribe">
            </div>
            <div class="col-md-2 mt-3 mt-md-0">
                <button class="subscribe btn w-100" id="sub-btn">SUBSCRIBE</button>
            </div>
        </div>
        </div>

        <div class="footer-area p-5">
        <div class="container">
            <div class="row mt-5">
                <div class="col-lg-4 col-md-6">
                    <div>
                        <h3>Contact Us</h3>
                        <hr class="new5">
                        <div class="row">
                            <div class="col-3">
                                <p>Address :</p>
                            </div>
                            <div class="col-9">
                                <p>28 Green Tower, Street Name, New York City, USA</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <p>Cell-Phone:</p>
                            </div>
                            <div class="col-9">
                                <p>012345 - 123456789</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <p>Email :</p>
                            </div>
                            <div class="col-9">
                                <p>gharabwy@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6">
                    <div class="single-footer">
                        <h3 class="footer-title title-border">accounts</h3>
                        <hr class="new5">
                        <ul class="footer-menu list-unstyled">
                            <li><a href="${path}pages/favourites.html" class="text-decoration-none"><i class="bi bi-record-circle product-icons"></i>My Wishlist</a></li>
                            <li><a href="${path}pages/checkout.html" class="text-decoration-none"><i class="bi bi-record-circle product-icons"></i>My Cart</a></li>
                            <li><a href="${path}pages/signinSignup.html" class="text-decoration-none"><i class="bi bi-record-circle product-icons"></i>Sign In</a></li>
                            <li><a href="${path}pages/checkout.html" class="text-decoration-none"><i class="bi bi-record-circle product-icons"></i>Check out</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-6">
                    <div class="single-footer">
                        <h3 class="footer-title title-border">shipping</h3>
                        <hr class="new5">
                        <ul class="footer-menu list-unstyled">
                            <li><a href="#new-arrivals" class="text-decoration-none"><i class="bi bi-record-circle product-icons"></i>New Products</a></li>
                            <li><a href="#best-seller" class="text-decoration-none"><i class="bi bi-record-circle product-icons"></i>Top Sellers</a></li>
                            <li><a href="#" class="text-decoration-none"><i class="bi bi-record-circle product-icons"></i>Suppliers</a></li>
                            <li><a href="#" class="text-decoration-none "><i class="bi bi-record-circle product-icons"></i>Specials</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="single-footer">
                        <h3 class="footer-title title-border">your choice Products</h3>
                        <hr class="new5">
                        <div class="footer-product">
                            <div class="row">
                                <div class="col-sm-6 col-12">
                                    <div class="footer-thumb">
                                        <a href="#"><img src="${path}images/footer1.webp" alt="" /></a>
                                        <div class="footer-thumb-info">
                                            <p><a href="#">Furniture Product<br>Name</a></p>
                                            <h4 class="price-3">$ 60.00</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-12">
                                    <div class="footer-thumb">
                                        <a href="#"><img src="${path}images/footer2.webp" alt="" /></a>
                                        <div class="footer-thumb-info">
                                            <p><a href="#">Furniture Product<br>Name</a></p>
                                            <h4 class="price-3">$ 60.00</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div class="copyright-area p-3">
        <div class="container">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <p class="mb-0">&copy; <a href="https://github.com/omar-a-eid/hurst.git" target="_blank" class="text-decoration-none">CodeCarnival</a> 2022. All Rights Reserved.</p>
                </div>
                <div class="col-md-6 text-md-end">
                    <div class="payment">
                        <a href="${path}pages/checkout.html"><img src="${path}images/1pay1.webp" alt="" /></a>
                        <a href="${path}pages/checkout.html"><img src="${path}images/pay2.webp" alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  let footerContainer = document.createElement("footer");
  footerContainer.innerHTML = footerHTML;
  document.body.appendChild(footerContainer);

  /******************************************* Handling subscribe alert message *****************************************/
  
  function SubscribeAlertMessage()
  {
        let subText = document.getElementById('subscribe');

        let email = subText.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(email)) 
        {
            let alertMessage = `
            <div class="alert alert-success" role="alert" 
                style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999;">
            <strong>Success!</strong> Your email sent successfully!
            </div>
        `;

        document.body.insertAdjacentHTML("afterbegin", alertMessage);

        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 3000);
        subText.value = '';
            
        } else {
            let alertMessage = `
                <div class="alert alert-danger" 
                role="alert"
                style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999;">
                <strong>Error!</strong> Your email is nit valid!
                </div>
            `;

            document.body.insertAdjacentHTML("afterbegin", alertMessage);

            setTimeout(function () {
                document.querySelector(".alert").remove();
            }, 3000);
        }
    }

    document.querySelector('.subscribe').addEventListener('click', function(event) {
        event.preventDefault();
        SubscribeAlertMessage();
    });
}
