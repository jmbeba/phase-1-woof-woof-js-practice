const dogBar = document.getElementById("dog-bar");
const dogInfo = document.getElementById("dog-info");
const dogFilter = document.getElementById("good-dog-filter");
let dogFilterStatus = false;

const displayContent = ({ id, name, isGoodDog, image }) => {
  const img = document.createElement("img");
  const h2 = document.createElement("h2");
  const button = document.createElement("button");

  img.src = image;
  h2.textContent = name;
  const dogStatus = isGoodDog ? "Good Dog" : "Bad Dog";
  button.textContent = dogStatus;

  dogInfo.innerHTML = "";
  dogInfo.appendChild(img);
  dogInfo.appendChild(h2);
  dogInfo.appendChild(button);
  

  button.addEventListener("click", (e) => {
    fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        isGoodDog: !isGoodDog,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        displayContent(data);
        const p = document.createElement("p");
        p.textContent = data;
      });
  });
};

fetch("http://localhost:3000/pups")
      .then((res) => res.json())
      .then((data) => {
        dogBar.innerHTML = "";
        data.map((element) => {
           
          const span = document.createElement("span");
          span.textContent = element.name;

          dogBar.appendChild(span);

          span.addEventListener("click", (e) => {
            displayContent(element);
          });
        });
      });

dogFilter.addEventListener("click", () => {
  dogFilterStatus = !dogFilterStatus;
  dogFilter.textContent =
    dogFilterStatus === true ? "Filter good dogs: ON" : "Filter good dogs: OFF";

  if (dogFilterStatus) {
    fetch("http://localhost:3000/pups")
      .then((res) => res.json())
      .then((data) => {
        const filteredDogs = data.filter((element) => {
          return element.isGoodDog === true;
        });

        dogBar.innerHTML = "";

        filteredDogs.map((element) => {            
          const span = document.createElement("span");
          span.textContent = element.name;

          dogBar.appendChild(span);

          span.addEventListener("click", (e) => {
            displayContent(element);
          });
        });
      });
  } else {
    fetch("http://localhost:3000/pups")
      .then((res) => res.json())
      .then((data) => {
        dogBar.innerHTML = "";
        data.map((element) => {
           
          const span = document.createElement("span");
          span.textContent = element.name;

          dogBar.appendChild(span);

          span.addEventListener("click", (e) => {
            displayContent(element);
          });
        });
      });
  }
});
