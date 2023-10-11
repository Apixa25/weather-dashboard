const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "483485cb74d86bde93ff36e3ccd53cf5"; // API key for OpenWeatherMap API

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp - 0).toFixed(2)}°F</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 0).toFixed(2)}°F</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        // Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        // Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("An error occurred while fetching the city name!");
            });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}





// // add on click event listener 
// $(".search-btn").on("click", function(event) {
//     event.preventDefault();
//     console.log();

//     var cityName = $(".city-input").val().trim();
//     getWeatherDetails(cityName);
//     if (!searchHistoryList.includes(cityName)) {
//         searchHistoryList.push(cityName);
//         var searchedCity = $(`
//             <li class="list-group-item">${cityName}</li>
//             `);
//         $("#searchHistory").append(searchedCity);
//     };
    
//     localStorage.setItem("city", JSON.stringify(searchHistoryList));
//     console.log(searchHistoryList);
// });

// // WHEN I click on a city in the search history
// // THEN I am again presented with current and future conditions for that city
// $(document).on("click", ".list-group-item", function() {
//     var listCity = $(this).text();
//     getWeatherDetails(listCity);
// });

// // WHEN I open the weather dashboard
// // THEN I am presented with the last searched city forecast
// $(document).ready(function() {
//     var searchHistoryArr = JSON.parse(localStorage.getItem("city"));

//     if (searchHistoryArr !== null) {
//         var lastSearchedIndex = searchHistoryArr.length - 1;
//         var lastSearchedCity = searchHistoryArr[lastSearchedIndex];
//         getWeatherDetails(lastSearchedCity);
//         console.log(`Last searched city: ${lastSearchedCity}`);
//     }
// });


// Get the search input element
const searchInput = document.getElementById(".city-input");
// Get the last thing the user searched for
// const lastSearch = searchInput.value;
// Create a new button element
const button = document.createElement("button");
// Set the button's text to the last search term
button.textContent = searchInput;
// Append the button to the DOM
document.body.appendChild(button);


locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

var savedCities = document.getElementById(".location-btn2");
var loggedCities = [];
function displaySavedCities() {

    if (localStorage.getItem("cityName")) {
        loggedCities = JSON.parse(localStorage.getItem("cityName"));
    }

    var cityName = "";
    for (let i = 0; i < loggedCities.length; i++) {
        cityList = cityName + `<button>${loggedCities[i]}</button>`;
    }
    
    // savedWords.innerHTML = cityName;

    var buttonMargin = document.querySelectorAll(".location-btn2");
    for (let i = 0; i < buttonMargin.length; i++) {
        buttonMargin[i].addEventListener("click", function() {
            // quoteGenerator(this.textContent);
            // giphyGenerator(this.textContent);
        });
    }
}

displaySavedCities();