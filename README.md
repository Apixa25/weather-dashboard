# WEATHER DASHBOARD - Using Server Side API's 

## Technology Used 

 <p float="left">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

## Description 

[Visit the Deployed Site](https://apixa25.github.io/weather-dashboard/)

This is a weather forecast site.  It shows today's forecast in a large bold header and underneath it a 5-day forecast for a total of 6 days.

Anyone who wants to check on a weather forecast can enter the city of their choice and the site will pull from the Open Weather Map API at https://openweathermap.org/api. If they enter a city that cannot be found or if they enter text that has nothing to do with a location on the map, the site will give them a message: “No Coordinates Found”.  

This Weather Dashboard works by calling two separate API’s.  A user inputs the name of where they would like to see the weather and a first API is called: Open Weather Map API at https://openweathermap.org/api/geocoding-api this API converts the written name of the location into a set of Latitude and Longitude coordinates.  These two coordinates are then put into the Open Weather API and that API sends back the six days of forecast. Today’s is shown in the big panel with the location name.  The lower five panels show the following five days of forecast.

I also built a button for “Use Current Location” which asks the user's browser the location of where the browser is being used.  When a user presses “Use current location” the browser will issue a warning “This file wants to know your location”. If the user allows the use of the browser's location then the city location is found by reverse geocoding using the same Open Weather Map API.  

The Weather Dashboard also uses persistent data to store the names of up to five of the last city names so that a user can quickly come back and check the weather for up to five locations.  This is done by using JSON to stringify the search history list.  If the user has not cleared the browser's memory then upon opening the browser JSON is called to parse the local storage and bring back the search history array of the last time they used the Weather Dashboard. 


![Site Langing Page](./assets/Screenshot%20Weather%20Dashboard.png)





### Steven Sills II 

<a href="mailto: stevensills2@gmail.com" target="_blank"><img align="center" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="paperpatch"/></a>
<a href="https://www.linkedin.com/in/steven-sills-ii-90781b53/" target="_blank"><img align="center" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="paperpatch"/></a>
<a href="https://apixa25.github.io/steven-sills-portfolio/" target="_blank"><img align="center" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="paperpatch"/></a>


## Credits

Codeing Nepal of YouTube 