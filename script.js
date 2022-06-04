


var owmAPI = "6875b27a4040697b2d0f7e8594f158cd"
var currentCity = "";
var lastCity = "";
var searchBtnEl = document.querySelector("#searchBtn");






var getTodayConditions = function(event){
    var city = $('#cityLookUp').val();
    currentCity = $('#cityLookUp').val();

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
fetch(queryURL)


.then((response) => {
    return response.json();
})
.then((response) => {
//calls where it saves the cities
citySave(city);
$('#search-error').text("");
var todayWeatherIcon ="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

var currentTimeUTC = response.dt;
var currentTimeZoneOffset = response.timezone;
var currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
var currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTimeZoneOffsetHours);

renderCities();

getFiveDayForecast(event);


console.log(response);
var todayWeatherHTML =`
<h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${todayWeatherIcon}"></h3>
<ul class="list-unstyled">
    <li>Temperature: ${response.main.temp}&#8457;</li>
    <li>Humidity: ${response.main.humidity}%</li>
    <li>Wind Speed: ${response.wind.speed} mph</li>
    <li id="uvIndex">UV Index:</li>
</ul>`;
$('#current-weather').html(todayWeatherHTML);

var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var uvQueryURL = "api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&APPID=" + owmAPI;
       
        uvQueryURL = "https://cors-anywhere.herokuapp.com/" + uvQueryURL;
        
        fetch(uvQueryURL)
        .then(handleErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            var uvIndex = response.value;
            $('#uvIndex').html(`UV Index: <span id="uvVal"> ${uvIndex}</span>`);
            if (uvIndex>=0 && uvIndex<3){
                $('#uvVal').attr("class", "uv-favorable");
            } else if (uvIndex>=3 && uvIndex<8){
                $('#uvVal').attr("class", "uv-moderate");
            } else if (uvIndex>=8){
                $('#uvVal').attr("class", "uv-severe");
            }
        });
    })}











var getFiveDayForecast = (event) => {
    var city = $('#cityLookUp').val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + owmAPI;
    
    fetch(queryURL)
        
        .then((response) => {
            return response.json();
        })
        .then((response) => {
        //screen set up for 5 day forcast
        var fiveDayForecastHTML = `
        <h2>5-Day Forecast:</h2>
        <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
        // Loop for the 5 day forcast
        for (var i = 0; i < response.list.length; i++) {
            var dayData = response.list[i];
            var dayTimeUTC = dayData.dt;
            var timeZoneOffset = response.city.timezone;
            var timeZoneOffsetHours = timeZoneOffset / 60 / 60;
            var thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);
            var iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
            // displays forcast only during the day time for the 5 days
            if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                fiveDayForecastHTML += `
                <div class="weather-card card m-2 p0">
                    <ul class="list-unstyled p-3">
                        <li>${thisMoment.format("MM/DD/YY")}</li>
                        <li class="weather-icon"><img src="${iconURL}"></li>
                        <li>Temp: ${dayData.main.temp}&#8457;</li>
                        <li>Wind Speed: ${dayData.wind.speed} mph</li>
                        <li>Humidity: ${dayData.main.humidity}%</li>
                    </ul>
                </div>`;
            }}
        
        fiveDayForecastHTML += `</div>`;
       
        $('#five-day-forecast').html(fiveDayForecastHTML);
    })
}











//to save the city in localstorage
var citySave = function(newcity){
    var repeatCity = false;
    for(var i=0; i<localStorage.length; i++){
        if(localStorage["cities"+i]===newcity){
            repeatCity = true;
            //sends user out of the function
            break;
        }
    }
    if(repeatCity === false){
        localStorage.setItem("cities"+localStorage.length, newcity);
    }
}

//gets the list of searched cities
var renderCities = function(){
    $('#city-results').empty();
    //
    if (localStorage.length===0){
        if (lastCity){
            $('#cityLookUp').attr("value", lastCity);
        } else {
            $('#cityLookUp').attr("value", "");
        }
    }else {
      
        var lastCityKey="cities"+(localStorage.length-1);
        lastCity=localStorage.getItem(lastCityKey);
       
        $('#cityLookUp').attr("value", lastCity);
       
        for (var i = 0; i < localStorage.length; i++) {
            var city = localStorage.getItem("cities" + i);
            var cityEl;
          
            if (currentCity===""){
                currentCity=lastCity;
            }
           
            if (city === currentCity) {
                cityEl = `<button type="button" class="list-group-item list-group-item-action active">${city}</button></li>`;
            } else {
                cityEl = `<button type="button" class="list-group-item list-group-item-action">${city}</button></li>`;
            } 
          
            $('#city-results').prepend(cityEl);
        }
       
    } 
}
    
//search button
searchBtnEl.addEventListener("click", function(event){
event.preventDefault();
currentCity = $('#cityLookUp').val();
getTodayConditions();
})