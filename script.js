// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city



var owmAPI = "788d5638d7c8e354a162d6c9747d1bdf"
var currentCity = "";
var lastCity = "";
var searchBtnEl = document.querySelector("#searchBtn");


var getLocationConditions = function(event){
    var city = $('#cityLookUp').val();
    currentCity = $('#cityLookUp').val();

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
fetch(queryURL)

}

//to save the city in localstorage
var citySave = function(newcity){
    var repeatCity = false;
    for( i=0; i<localStorage.length; i++){
        if(localStorage["cities"+i]===newcity){
            repeatCity = true;
            //sends user out of the function
            break;
        }
    }
    if(repeatCity === false){
        localStorage.setItem("cities"+localStorage, newcity);
    }
}

searchBtnEl.addEventListener("click", function(event){
event.preventDefault();
currentCity = $('#citdyLookUp')
})