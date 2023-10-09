const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
// API Key from OpenWeatherMap
const API_KEY = "3c55973fc99b3e92dab73b10e74cd9ac";

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}';

    fetch(WEATHER_API_URL).then(res => res.jason()).then(data => {
        console.log(data);

        // so that we only see one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt.txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });


    }).catch(() => {
        alert("An Error Occured While Predicting The Future About The Weather!");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();  
    if(cityName === "") return; 

    // This gets the city coodinates in latitude and longitude format with the city name from the API response.
    const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}';

    fetch(GEOCODING_API_URL).then(res => res.jason()).then(data => {
        if(!data.length) return alert('No directions to that city found!');
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An Error Occured While Getting The Directions To That City!");
    });
} 

searchButton.addEventListener("click", getCityCoordinates);