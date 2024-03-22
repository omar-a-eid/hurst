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
    <div class="container w-50 d-flex justify-content-center search-div">
            <div class="row d-flex w-100 align-items-center justify-content-center search-container">
                <div class="col-6">
                    <input type="text" name="search" 
                    class="w-100 border-bottom border-top-0 border-0" 
                    id="search">
                </div>
                <div class="col-2">
                    <button class="subscribe btn">SUBSCRIBE</button>
                </div>
            </div>
        </div>


            <div class="footer-area p-5">
                <div class="container">
                    <div class="row mt-5">
                        <div class="col-lg-4 col-md-6">
                            <div>
                                <h3>
                                    Contact Us
                                    <hr class="new5">
                                </h3>
                                <div class="row">
                                    <div class="col-3">
                                        <p>Address :</p>
                                    </div>
                                    <div class="col-8">
                                        <p>
                                            28 Green Tower, Street Name,
                                            New York City, USA
                                        </p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-3">
                                        <p>Cell-Phone:</p>
                                    </div>
                                    <div class="col-8">
                                        <p>
                                            012345 - 123456789
                                        </p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-3">
                                        <p>Email :</p>
                                    </div>
                                    <div class="col-8">
                                        <p>
                                            gharabwy@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-6">
                            <div class="single-footer">
                                <h3 class="footer-title  title-border">
                                    accounts
                                    <hr class="new5">
                                </h3>
                                <ul class="footer-menu list-unstyled">
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            My Account
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            My Wishlist
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            My Cart
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            Sign In
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            Check out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-6">
                            <div class="single-footer">
                                <h3 class="footer-title  title-border">
                                    shipping
                                    <hr class="new5">
                                </h3>
    
                                <ul class="footer-menu list-unstyled">
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            New Products
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            Top Sellers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            Manufactirers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            Suppliers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="text-decoration-none ">
                                            <i class="bi bi-record-circle product-icons"></i>
                                            Specials
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="single-footer">
                                <h3 class="footer-title  title-border">
                                    your choice Products
                                    <hr class="new5">
                                </h3>
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
            <!--------------------------------------------- Footer-area end ----------------------------------------->
    
            <!--------------------------------------------- Copyright-area start ------------------------------------>
            <div class="copyright-area p-3">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="copyright">
                                <p class="mb-0">&copy; <a href=" https://github.com/omar-a-eid/hurst.git " target="_blank" class="text-decoration-none"> CodeCarnival  </a> 2022. All Rights Reserved.</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="payment text-md-end">
                                <a href="#"><img src="${path}images/1pay1.webp" alt="" /></a>
                                <a href="#"><img src="${path}images/pay2.webp" alt="" /></a>
                                <a href="#"><img src="${path}images/pay2.webp" alt="" /></a>
                                <a href="#"><img src="${path}images/pay4.webp" alt="" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-------------------------------------------- Copyright-area start ---------------------------------------->
    `;
  let footerContainer = document.createElement("footer");
  footerContainer.innerHTML = footerHTML;
  document.body.appendChild(footerContainer);
}
