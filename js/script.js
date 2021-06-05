// Make a call to the base URL,
const baseUrl = "https://rickandmortyapi.com/api/character/";
// const newBaseUrl = "https://cors-anywhere.herokuapp.com/" + baseUrl;
// making a fetch

fetch(baseUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    cardHolder(json);
  })
  .catch(function(error) {
    window.document.location(error.html);
    console.dir(error);
  });

function cardHolder(json) {
  console.dir(json);
  const results = json.results;
  const cardPlacer = document.querySelector(".results");
  let html = "";
  console.log(results);

  results.forEach(function(result) {
    let type = "unknown";

    if (result.type != "" && result.type != undefined) {
      type = result.type;
    }

    html += ` <div class="col-sm-6 col-md-4 col-lg-3">    
     <div class="card">            
      <img class="image" src="${result.image}" alt="${result.name}">
      <div class="details">
          <h4 class="name">${result.name}</h4>
          <p> Type: ${type}</p>    
          <p>Episode count:${result.episode.length}</p>                                       
          <a class="btn btn-primary" href="details.html?id=${result.id}">Details</a>
      </div></div></div>`;
  });
  cardPlacer.innerHTML = html;
}
