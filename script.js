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
    fetch(`http://api.weatherapi.com/v1/current.json?key=691d5d844aa449fd96a94239231505&q=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.current.condition.icon);
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

            cityDetailsDiv.textContent = cityDetails.join("\n");
            imageElement.src = image;
            weatherDetailsDiv.textContent = weatherDetails.join("\n");

            divContainer.appendChild(cityDetailsDiv);
            divContainer.appendChild(imageElement);
            divContainer.appendChild(weatherDetailsDiv);
        });
}

function loadEvent() {
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("afterbegin", "<input list='citiesList' id='citiesInput'>");
    rootElement.insertAdjacentHTML("beforeend", "<datalist id='citiesList'></datalist>");
    rootElement.insertAdjacentHTML("beforeend", "<div class='card'></div>");
    
    const input = document.getElementById("citiesInput");
    const dataList = document.getElementById("citiesList");
    const container = document.querySelector(".card");

    input.addEventListener("input", checkInput);
    input.addEventListener("change", displayCurrentWeather);
}


window.addEventListener("load", loadEvent);