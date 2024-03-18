export function displayNav(){
  const nav = document.getElementById('navbar');
  let result = '';
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
        href="#">
        <img
        src="images/logo.webp"
        alt="logo"
        onerror="this.onerror=null; this.src='../images/logo.webp';"
        />
      </a>
    </div>

    <div class="col-lg-4 col-6 text-end">
      <a
        class="navbar-brand"
        href="#">
        <i class="fa-solid fa-cart-shopping"></i>
      </a>
    </div>
  </div>
</div>
`
    let offcanvas = document.getElementById('offcanvasExample');
    let offcanvasHtml=` 
    <div class="offcanvas-header">
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <ul id="menu">
    
    </ul>
  </div>
  `
  ;

  nav.innerHTML = result;
  offcanvas.innerHTML =offcanvasHtml;


}

let scrolled = false;

export function initNavbarAnimation() {
  window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (window.scrollY > 0 && !scrolled) {
      scrolled = true;
      navbar.classList.add('scroll-down');
      navbar.style.transition = 'all 0.7s ease-in-out';
    }
    if (window.scrollY === 0 && scrolled) {
      scrolled = false;
      navbar.classList.remove('scroll-down');
      navbar.style.transition = 'all 0.7s ease-in-out';
    }
  });
}
