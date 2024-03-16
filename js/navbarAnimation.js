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
