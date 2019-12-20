let API_KEY = "476f157be40b6d7f783d393f90b76f0c"; //the only constant

let loc; //Create variable outside of function i.e. global variable 
let fahrenheit = false; //toggle that will be switched on or off  
let weatherdata; 

function displayTemp(cTemp, f){
  if(f) return Math.round((cTemp * 9/5) + 32) + " °F";
  return Math.round(cTemp) + " °C"; 
}

function render(weatherdata, fahrenheit){
    let currentLocation = weatherdata.name;
    let currentWeather = weatherdata.weather[0].description;
    let currentTemp = displayTemp(weatherdata.main.temp, fahrenheit);
    let high = displayTemp(weatherdata.main.temp_max, fahrenheit);
    let low = displayTemp(weatherdata.main.temp_min, fahrenheit);
    let icon = weatherdata.weather[0].icon;
      
    $('#currentLocation').html(currentLocation);
    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    $('#high-low').html(high + " / " + low);
      
    let iconSrc = "https://openweathermap.org/img/wn/" + icon + ".png";   
    $('#currentTemp').prepend('<img src="' + iconSrc + '"/>');
}

$(function(){ // execute a function inside a jquery wrapper 
  $.get("https://ipinfo.io", function(response) { //Copied & pasted from ipinfo.io, gets user location
  loc = response.loc.split(",");
  console.log(response.ip, response.country, loc);
    
    // call to the weather API
    
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?units=metric&lat="
           + loc[0] + "&lon=" + loc[1] + "&APPID=" + API_KEY, function(apiData){
      
      weatherdata = apiData;
      
      render(apiData, fahrenheit);
      
      $('#toggle').click(function(){
        fahrenheit = !fahrenheit;
        render(weatherdata, fahrenheit);
      })
      
    console.log(weatherdata); //from the JSON
    
      
  })
    
}, "jsonp")
  
  
  
  
  

  
  
  
});

// get lat and long