function cardHolder(json) {
    // console.dir(json);
    const results = json.results;
    const cardPlacer = document.querySelector(".results");
    let html = "";
    // console.log(results);
  
    results.forEach(function(result) {
      let type = "unknown";
  
      if (result.type != "" && result.type != undefined) {
        type = result.type;
      }
  
      html += `    <div class="col-md-6 col-lg-3 news-block">
      <div class="card ">
          <div class="card-img-top embed-responsive embed-responsive-4by3" style="background-image: url(${result.image});"></div>
          <div class="card-body">
              <h5 class="card-title">${result.name}</h5>
              <p class="card-text">${type}</p>
              <p>Episode count ${result.episode.length} </p>                                       
              <a href="details.html?id=${result.id}" class="btn btn-primary">MORE</a>
          </div>
      </div>
  </div>`;
    });
    cardPlacer.innerHTML = html;
  }
  
  