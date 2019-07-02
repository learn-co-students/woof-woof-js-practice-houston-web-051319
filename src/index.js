let pups = "http://localhost:3000/pups";
let divD = document.querySelector("#dog-bar");
let box = document.querySelector("#dog-info");
let filter = document.querySelector("#good-dog-filter");

document.addEventListener("DOMContentLoaded", function() {
  fetch(pups)
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      console.log(result);
      let allPups = result;

      filter.addEventListener("click", e => {
        e.preventDefault();
        // console.log("filter clicked", filter.innerText);

        if (filter.innerText == "Filter good dogs: OFF") {
          console.log("innertext to be changed", allPups);
          filter.innerText = "Filter good dogs: ON";
          divD.innerHTML = "";
          let pups = allPups.filter(function(pup) {
            // console.log("pup", pup);
            return pup.isGoodDog !== false;
          });

          console.log("pups", pups);
          pups.forEach(function(pup) {
            pupCreate(pup);
          });
        } else {
          filter.innerText = "Filter good dogs: OFF";
          divD.innerHTML = "";
          allPups.forEach(function(pup) {
            pupCreate(pup);
          });
        }
      });

      allPups.forEach(function(pup) {
        pupCreate(pup);
      });
    });

  function pupCreate(pup) {
    span = document.createElement("span");
    span.innerText = pup.name;
    divD.append(span);

    span.addEventListener("click", e => {
      e.preventDefault();
      box.innerHTML = "";
      let img = document.createElement("img");
      img.src = `${pup.image}`;

      let h2 = document.createElement("h2");
      h2.innerText = `${pup.name}`;

      let button = document.createElement("button");
      button.className = "DogButton";

      if (pup.isGoodDog == true) button.innerText = "Good Dog!";
      else button.innerText = "Bad Dog!";
      box.append(img, h2, button);

      button.addEventListener("click", e => {
        e.preventDefault();

        if (button.innerText == "Good Dog!") {
          button.innerText = "Bad Dog!";
          fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              isGoodDog: false
            })
          });
        } else {
          button.innerText = "Good Dog!";
          fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              isGoodDog: true
            })
          });
        }
      });
    });
  }
});
