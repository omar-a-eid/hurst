/*Don't forget to call the function with path */
export function displayBanner(path) {
  const bannerBody = document.getElementById("banner");

  bannerBody.innerHTML = `
  <div class="heading-banner-area overlay-bg">
    <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="heading-banner">
          <div class="heading-banner-title">
            <h2>${path}</h2>
          </div>
          <div class="breadcumbs pb-3">
            <ul>
              <li><a href="../index.html">Home</a></li>
              <li>${path}</li>
            </ul>
          </div>
        </div>
      </div>
  </div>
  `;
}
