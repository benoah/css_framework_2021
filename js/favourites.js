import { getExistingFavs } from "./utils/FavFunction.js";

const favourites = getExistingFavs();

const productContainer = document.querySelector(".fav-container");

if (favourites.length === 0) {
  productContainer.innerHTML = "No favourites yet";
}

favourites.forEach((favourite) => {
  console.log(favourite);
  productContainer.innerHTML += `
    <div class="col-md-6 col-lg-3 news-block">
    <div class="card ">
    <div class="card-img-top embed-responsive embed-responsive-4by3" style="background-image: url(${favourite.image});"></div>

    <div class="card-body">
        <div class="row"> 
        <div class="col">
        <h5 class="card-title">${favourite.name}</h5>
        </div>
        </div>
    </div>
</div>`;
});
