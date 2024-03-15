export function initSearch(searchIcon) {

  searchIcon.classList.add('search-hover');
    var searchForm=document.getElementById('search-form');
    searchForm.classList.remove('d-none');
  
  
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('search-icon').classList.remove('search-hover');
      document.getElementById('search-form').classList.add('d-none');
    }
  });
  
  document.getElementById('search-input').addEventListener('focus', function () {
    this.style.border = '1px solid #c8a165';
    this.style.boxShadow = 'none';
  });
  
  document.querySelector('.fa-xmark').addEventListener('click', function () {
    document.getElementById('search-icon').classList.remove('search-hover');
    document.getElementById('search-form').classList.add('d-none');
  });
      
}