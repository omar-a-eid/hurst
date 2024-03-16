export function initMenu() {
  document.addEventListener('DOMContentLoaded', function () {
    var menu = document.getElementById('menu');
    var submenuItems = {
      Home: ['Home 1', 'Home 2', 'Home 3'],
      Products: ['Product 1', 'Product 2', 'Product 3'],
      Shortcodes: ['Shortcode 1', 'Shortcode 2', 'Shortcode 3'],
      Accessories: ['Accessories 1', 'Accessories 2', 'Accessories 3'],
      Lookbook: ['Lookbook 1', 'Lookbook 2', 'Lookbook 3'],
      Blog: ['Blog 1', 'Blog 2', 'Blog 3'],
      Pages: ['Pages 1', 'Pages 2', 'Pages 3'],
      'About Us': ['About 1', 'About 2', 'About 3'],
      Contact: ['Contact 1', 'Contact 2', 'Contact 3'],
    };

    Object.keys(submenuItems).forEach(function (parentText) {
      var parent = document.createElement('li');
      parent.classList.add('parent', 'pt-2');
      var parentLink = document.createElement('a');
      parentLink.href = '#';
      parentLink.textContent = parentText;
      parent.appendChild(parentLink);

      var submenu = document.createElement('ul');
      submenu.classList.add('submenu');
      submenuItems[parentText].forEach(function (submenuItemText) {
        var submenuItem = document.createElement('li');
        var submenuLink = document.createElement('a');
        submenuLink.href = '#';
        submenuLink.textContent = submenuItemText;
        submenuItem.appendChild(submenuLink);
        submenu.appendChild(submenuItem);
      });

      parent.appendChild(submenu);
      menu.appendChild(parent);
    });

    var parents = document.querySelectorAll('.parent');
    parents.forEach(function (parent) {
      parent.addEventListener('mouseover', function () {
        var submenu = this.querySelector('.submenu');
        if (submenu) {
          submenu.style.visibility = 'visible';
          submenu.style.opacity = '1';
        }
      });

      parent.addEventListener('mouseout', function () {
        var submenu = this.querySelector('.submenu');
        if (submenu) {
          submenu.style.visibility = 'hidden';
          submenu.style.opacity = '0';
        }
      });
    });
  });
}
