//First  get the query string and the params from it:
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

let id;

if (params.has("id")) {
  id = params.get("id");
} else {
  document.location.href = "/";
}

const baseUrl = "https://rickandmortyapi.com/api/";
const charaUrl = `${baseUrl}character/`;
const detailsUrl = `${charaUrl}${id}`;

fetch(detailsUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    createDetails(json);
  })
  .catch(function () {
    document.location.href = "error.html";
  });

function createDetails(details) {
  // Level 2
  const container = document.querySelector(".container");
  const loader = document.querySelector(".loader");
  container.removeChild(loader);

  //console.dir(details);
  const heading = document.querySelector("h1");
  //heading.className = "details-title";
  heading.innerText = details.name;

  const showStatus = document.querySelector("#status");
  showStatus.innerHTML = details.status;

  const showSpecies = document.querySelector("#species");
  showSpecies.innerHTML = details.species;

  const showOrigin = document.querySelector("#origin");
  showOrigin.innerHTML = details.origin.name;

  const showLocation = document.querySelector("#location");
  showLocation.innerHTML = details.location.name;

  const showImage = document.querySelector(".details-image");
  showImage.src = details.image;
  showImage.alt = details.name;

  // google
  const newTitel = `${details.name}`;
  document.title = newTitel;
}
