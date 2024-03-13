// navbar animation
let scrolled = false;
window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 0 && !scrolled) {
    scrolled = true;
    navbar.classList.add('scroll-down');
    navbar.style.transition =
      'height 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
  }
  if (window.scrollY === 0 && scrolled) {
    scrolled = false;
    navbar.classList.remove('scroll-down');
    navbar.style.transition =
      'height 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
  }
});
