import { initMenu } from "./menu.js";
import { displayNav, initNavbarAnimation } from "./navbar.js";
import { displayBanner } from "./banner.js";
window.onload = function () {
    displayNav();
    initNavbarAnimation();
    initMenu();
    displayBanner("Products");
}