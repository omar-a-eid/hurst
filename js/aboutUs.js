import { initMenu } from "./menu.js";
import { displayNav, initNavbarAnimation } from "./navbar.js";

if ($(".swiper-container").hasClass("team-member-slider")) {
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 3,
    allowTouchMove: true,
    loop: true,
    centeredSlides: true,
    slideToClickedSlide: true,
    effect: "coverflow",
    grabCursor: true,
    autoplay: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    coverflow: {
      rotate: 0,
      stretch: 100,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      1199: {
        slidesPerView: 3,
        effect: "coverflow",
      },
      991: {
        slidesPerView: 3,
        effect: "coverflow",
      },
      767: {
        slidesPerView: 1,
        centeredSlides: false,
        effect: "slide",
      },
    },
  });
}

window.onload = function () {
  displayNav();
  initNavbarAnimation();
  initMenu();
};
