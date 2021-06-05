"use strict";

var _FavFunction = require("./utils/FavFunction.js");

var baseUrl = "https://rickandmortyapi.com/api/character/";
var cardPlacer = document.querySelector(".results");
var favourites = (0, _FavFunction.getExistingFavs)();
var allCharacters;

function getProducts() {
  var response, json, results;
  return regeneratorRuntime.async(function getProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch(baseUrl));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context.sent;
          results = json.results;
          allCharacters = results;
          cardHolder(results);
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          displayMessage("error", _context.t0, ".product-container");

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

getProducts();

function cardHolder(results) {
  var html = "";
  results.forEach(function (result) {
    var cssClass = "far"; // check through favs array
    // does the product id exist in the favs array

    var doesObjectExist = favourites.find(function (fav) {
      console.log(fav);
      return parseInt(fav.id) === result.id;
    });
    console.log(doesObjectExist); // if is in the array, change the style of the i element

    if (doesObjectExist) {
      cssClass = "fa";
    }

    var type = "unknown";

    if (result.type != "" && result.type != undefined) {
      type = result.type;
    }

    cardPlacer.innerHTML = html += "    <div class=\"col-md-6 col-lg-3 news-block\">\n      <div class=\"card \">\n          <div class=\"card-img-top embed-responsive embed-responsive-4by3\" style=\"background-image: url(".concat(result.image, ");\"></div>\n          <div class=\"card-body\">\n          <div class=\"row\"> \n          <div class=\"col\"><h5 class=\"card-title\">").concat(result.name, "</h5></div>\n         \n        \n          <i class=\"").concat(cssClass, " fa-heart\" data-id=\"").concat(result.id, "\" data-name=\"").concat(result.name, "\" data-image=\"").concat(result.image, "\"> </i></div>\n\n              <p class=\"card-text\">").concat(type, "</p>\n              <p>Episode count ").concat(result.episode.length, " </p> \n                                       \n              <a href=\"details.html?id=").concat(result.id, "\" class=\"btn btn-primary\">MORE</a>\n          </div>\n      </div>\n  </div>");
  });
  var favButtons = document.querySelectorAll(".card i");
  favButtons.forEach(function (button) {
    button.addEventListener("click", handleClick);
  });
}

function handleClick() {
  this.classList.toggle("fa");
  this.classList.toggle("far");
  var id = this.dataset.id;
  var name = this.dataset.name;
  var image = this.dataset.image;
  var currentFavs = (0, _FavFunction.getExistingFavs)();
  var resultsExists = currentFavs.find(function (fav) {
    return fav.id === id;
  });

  if (resultsExists === undefined) {
    var results = {
      id: id,
      name: name,
      image: image
    };
    currentFavs.push(results);
    saveFavs(currentFavs);
  } else {
    var newFavs = currentFavs.filter(function (fav) {
      return fav.id !== id;
    });
    saveFavs(newFavs);
  }
}

function saveFavs(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
}

var search = document.querySelector(".search");

search.onkeyup = function (event) {
  // console.log("allProducts: ", allProducts);
  var searchValue = event.target.value.trim().toLowerCase();
  var filteredCharacters = allCharacters.filter(function (character) {
    console.log("result", character);

    if (character.name.toLowerCase().startsWith(searchValue)) {
      return true;
    }
  });
  cardHolder(filteredCharacters);
};