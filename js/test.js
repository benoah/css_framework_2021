// Make a call to the base URL,
const baseUrl = "https://rickandmortyapi.com/api/character/2";

// const newBaseUrl = "https://cors-anywhere.herokuapp.com/" + baseUrl;
// making a fetch
let html = "";

fetch(baseUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    cardHolderOne(json);
  })
  .catch(function (error) {
    //  window.document.location(error.html);
    console.dir(error);
  });

function cardHolderOne(json) {
  const cardPlacerTwo = document.querySelector(".characterTWO");
 
  let type = "Secrete";

  if (json.type != "" && json.type != undefined) {
    type = json.type;
  }
  html += ` 
    <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${json.image}" class="card-img " alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <h3 class=""> ${json.name} </h3>
        <p> Type: ${type}</p>   
        <p>Episode count:${json.episode.length}</p>          
        <p class="">
            <a class="" href="#" title=""><img src="./images/SHARE.png" class="img-responsive"></a>
            <a class="ml-2" href="#" title=""><img src="./images/facebook-f.png"    class="img-responsive"></a>
            <a class="ml-2" href="#" title=""><img src="./images/twitter.png" class="img-responsive"></a>
          </p>
        </div>
      </div>
    </div>
  </div>
`;

  cardPlacerTwo.innerHTML = html;
}
