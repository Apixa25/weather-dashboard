const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
// API Key from OpenWeatherMap
const API_KEY = "483485cb74d86bde93ff36e3ccd53cf5";

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid={API_KEY}';

    fetch(WEATHER_API_URL).then(res => res.jason()).then(data => {
        console.log(data);
    }).catch(() => {
        alert("An Error Occured While Predicting The Future About The Weather!");
    })
}

const getCityCoodinates = () => {
    const cityName = cityInput.value.trim();  
    if(!cityName) return; 

    // This gets the city coodinates in latitude and longitude format with the city name from the API response.
    const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}'
    fetch(GEOCODING_API_URL).then(res => res.jason()).then(data => {
        if(data.length) return alert('No directions to ${cityName} found!');
        const { name, lat, lon } = data = [0];
        getWeatherDetails();
    }).catch(() => {
        alert("An Error Occured While Getting The Directions To That City!")
    });
} 

searchButton.addEventListener("click", getCityCoodinates);