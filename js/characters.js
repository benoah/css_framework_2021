import {getExistingFavs} from "./utils/FavFunction.js";
// Make a call to the base URL,
const baseUrl = "https://rickandmortyapi.com/api/character/";

// const newBaseUrl = "https://cors-anywhere.herokuapp.com/" + baseUrl;
// making a fetch
const cardPlacer = document.querySelector(".results");

const favourites = getExistingFavs();


let allCharacters;

async function getProducts() {
  try {
    const response = await fetch(baseUrl);
    const json = await response.json();
    const results = json.results;
    allCharacters = results;
    cardHolder(results);
    //   console.log(results);

    //  searchProducts(products)
  } catch (error) {
    console.log(error);
    //displayMessage("error", error, ".product-container");
  }
}
getProducts();

function cardHolder(results) {
  let html = "";

  results.forEach((result) => {
    let cssClass = "far";

   // check through favs array
    // does the product id exist in the favs array
    const doesObjectExist = favourites.find(function (fav) {
        console.log(fav);

        return parseInt(fav.id) === result.id;
    });

    console.log(doesObjectExist);

    // if is in the array, change the style of the i element
    if (doesObjectExist) {
        cssClass = "fa";
    }

    
    let type = "unknown";

    if (result.type != "" && result.type != undefined) {
      type = result.type;
    }

    cardPlacer.innerHTML =
      html += `    <div class="col-md-6 col-lg-3 news-block">
      <div class="card ">
          <div class="card-img-top embed-responsive embed-responsive-4by3" style="background-image: url(${result.image});"></div>
          <div class="card-body">
          <div class="row"> 
          <div class="col-10"> <h5 class="card-title">${result.name}</h5></div>
          <div class="col"> 
          <i class="${cssClass} fa-heart" data-id="${result.id}" data-name="${result.name}"> </i></div>
          </div>
              <p class="card-text">${type}</p>
              <p>Episode count ${result.episode.length} </p> 
                                       
              <a href="details.html?id=${result.id}" class="btn btn-primary">MORE</a>
          </div>
      </div>
  </div>`;
  });
  const favButtons = document.querySelectorAll(".card i");
  favButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
});

}
function handleClick() {
    this.classList.toggle("fa");
    this.classList.toggle("far");
    const id = this.dataset.id;
    const name = this.dataset.name;
    const currentFavs = getExistingFavs();

    const resultsExists = currentFavs.find(function (fav) {
        return fav.id === id;
    });

    if (resultsExists === undefined) {
        const results = { id: id, name: name };
        currentFavs.push(results);
        saveFavs(currentFavs)
    } else {
        const newFavs = currentFavs.filter((fav) => fav.id !== id);
        saveFavs(newFavs);
    }
}






function saveFavs(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
}



const search = document.querySelector(".search");

search.onkeyup = function (event) {
  // console.log("allProducts: ", allProducts);
  const searchValue = event.target.value.trim().toLowerCase();

  const filteredCharacters = allCharacters.filter(function (character) {
    console.log("result", character);
    if (character.name.toLowerCase().startsWith(searchValue)) {
      return true;
    }
  });
  cardHolder(filteredCharacters);
};
