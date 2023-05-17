const checkInput = (event) => {
    if (event.target.value.length >= 3) {
        fetch(`http://api.weatherapi.com/v1/search.json?key=691d5d844aa449fd96a94239231505&q=${event.target.value}`)
            .then(response => response.json())
            .then(data => {
                const dataList = document.getElementById("citiesList");
                dataList.innerHTML = "";
                data.map(city => dataList.insertAdjacentHTML("beforeend", `<option>${city.name}</option>`));
            });
    }
}

const displayCurrentWeather = (event) => {
    const divContainer = document.querySelector(".card");
    divContainer.innerHTML = "";
    console.log(favoriteCitiesList);
    favoriteCitiesList.removeAttribute("hidden");
    favoriteButton.removeAttribute("hidden");


    fetch(`http://api.weatherapi.com/v1/current.json?key=691d5d844aa449fd96a94239231505&q=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.current.condition.icon);
            const cityDetails = [`City: ${event.target.value}`, 
                                `Country: ${data.location.country}`, 
                                `Region: ${data.location.region}`];

            const image = `http:${data.current.condition.icon}`;
            const weatherDetails = [data.current.condition.text, 
                                    `Temperature: ${data.current.temp_c}`, 
                                    `Feels like: ${data.current.feelslike_c}`, 
                                    `UV index: ${data.current.uv}`, 
                                    `Precipitation: ${data.current.precip_mm}`,
                                    `Wind: ${data.current.wind_kph}`,
                                    `Humidity: ${data.current.humidity}`];
            let cityDetailsDiv = document.createElement("div");
            let imageElement = document.createElement("img");
            let weatherDetailsDiv = document.createElement("div");

            cityDetailsDiv.className = "container";
            weatherDetailsDiv.className = "container";
            cityDetailsDiv.id = "cityDiv";
            weatherDetailsDiv.id = "weatherDiv";

            cityDetailsDiv.innerText = cityDetails.join("\n\n");
            imageElement.src = image;
            weatherDetailsDiv.innerText = weatherDetails.join("\n\n");

            divContainer.appendChild(cityDetailsDiv);
            divContainer.appendChild(imageElement);
            divContainer.appendChild(weatherDetailsDiv);
        });
}

let favoritesArray = [];


const addToFavorites = () => {
    let details = document.querySelector("#root > div").innerText.split("\n");
    // The text in the div is a string. We split the text at new line then split again to get 
    // only the city then split again to get the city name only. Previous format ("city: ${city}")
    let city = details[0].split(" ")[1];
    
    if(!favoritesArray.includes(city)){
        favoritesArray.push(city);    
        favoriteCitiesList.insertAdjacentHTML("beforeend", `<li>${city}</li>`);
    }
}


const rootElement = document.getElementById("root");
rootElement.insertAdjacentHTML("afterbegin", "<input list='citiesList' id='citiesInput'>");
rootElement.insertAdjacentHTML("beforeend", "<datalist id='citiesList'></datalist>");
rootElement.insertAdjacentHTML("beforeend", "<button id='favorite-button'>Add to favorites</button>");
rootElement.insertAdjacentHTML("beforeend", "<ul id='favorite-cities'></ul>");
rootElement.insertAdjacentHTML("beforeend", "<div class='card'></div>");


var favoriteCitiesList = document.getElementById("favorite-cities");
const favoriteButton = document.getElementById("favorite-button");    
const input = document.getElementById("citiesInput");
const dataList = document.getElementById("citiesList");
const card = document.querySelector(".card");

favoriteCitiesList.setAttribute("hidden", "true");
favoriteButton.setAttribute("hidden", "true");

input.addEventListener("input", checkInput);
input.addEventListener("change", displayCurrentWeather);
favoriteButton.addEventListener("click", addToFavorites);