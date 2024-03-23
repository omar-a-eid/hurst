import auth from "./auth.js";
export function displayNav() {
  let isLogged = auth();
  const nav = document.getElementById("navbar");
  let result = "";
  result += `
  <div class="container-fluid">
  <div class="row w-100 align-items-center">
    <div class="col-lg-4 col-12 order-md-0 order-1">
      <button
        class="navbar-toggler border-0 d-lg-block"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>

    <div class="col-lg-4 text-lg-center col-6">
      <a
        class="navbar-brand"
        href="../index.html">
        <img
        src="images/logo.webp"
        alt="logo"
        onerror="this.onerror=null; this.src='../images/logo.webp';"
        />
      </a>
    </div>

    ${
      isLogged
        ? `<div class="col-lg-4 col-6 text-end">
    <a
      class="navbar-brand"
      href="../pages/checkout.html">
      <i class="fa-solid fa-cart-shopping"></i>
    </a>
    <i class="navbar-brand fa-solid fa-right-from-bracket logout"></i>
  </div>`
        : `<div class="col-lg-4 col-6 text-end">
    <a
      class="navbar-brand"
      href="../pages/signinSignup.html">
      <i class="fa-solid fa-right-to-bracket"></i>
    </a>
  </div>`
    }
    
  </div>
</div>
`;
  let offcanvas = document.getElementById("offcanvasExample");
  let offcanvasHtml = ` 
    <div class="offcanvas-header">
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <ul id="menu">
    <li class="parent pt-2">
    <a href="../index.html">Home</a>
  </li>
  <li class="parent pt-2">
    <a href="../pages/productpage.html">Products</a>
    <ul class="submenu">
      <li><a href="../pages/productpage.html"> All Products </a></li>
      <li><a href="../pages/productdetails.html">Product Details</a></li>
    </ul>
  </li>
  <li class="parent pt-2">
    <a href="#">Shortcodes</a>
  </li>
  <li class="parent pt-2">
    <a href="../pages/contactUs.html">Blog</a>
  </li>
  <li class="parent pt-2">
    <a href="../pages/contactUs.html">Contact Us</a>
  </li>
  <li class="parent pt-2">
    <a href="../pages/aboutUs.html">About Us</a>
  </li>

  ${
    isLogged
      ? ""
      : `
  <li class="parent pt-2">
    <a href="../pages/signinSignup.html">Login</a>
  </li>
  `
  }
    </ul>
  </div>
  `;
  nav.innerHTML = result;
  offcanvas.innerHTML = offcanvasHtml;
}

let scrolled = false;

export function initNavbarAnimation() {
  window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");
    if (window.scrollY > 0 && !scrolled) {
      scrolled = true;
      navbar.classList.add("scroll-down");
      navbar.style.transition = "all 0.7s ease-in-out";
    }
    if (window.scrollY === 0 && scrolled) {
      scrolled = false;
      navbar.classList.remove("scroll-down");
      navbar.style.transition = "all 0.7s ease-in-out";
    }
  });
}
