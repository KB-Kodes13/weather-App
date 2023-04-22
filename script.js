//https://api.openweathermap.org/data/2.5/weather?zip=31545,US&appid=8c261e481efd74464656d01131d1131c&units=imperial
// {"coord":{"lon":-81.8871,"lat":31.6043},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],
// "base":"stations","main":{"temp":76.48,"feels_like":76.32,"temp_min":72.68,"temp_max":79.34,"pressure":1015,"humidity":53},
// "visibility":10000,"wind":{"speed":8.05,"deg":130},"clouds":{"all":40},"dt":1682118307,"sys":{"type":1,"id":4581,"country":"US",
// "sunrise":1682074347,"sunset":1682121584},"timezone":-14400,"id":0,"name":"Jesup","cod":200}


//my key to info
let weather = {
    'apiKey': '8c261e481efd74464656d01131d1131c',
    //this function will fetch the weather data from the api
    fetchWeather: function(zipCode) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&units=imperial&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    //this function will display the weather data on the html page
    displayWeather: function(data) {
        const { name } = data;
        const {icon, description} = data.weather[0];
        const { temp, humidity, feels_like, temp_max, temp_min } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed, temp_min, temp_max, feels_like);
        document.querySelector('.zipCode').innerText = 'Weather in ' + name;
        document.querySelector('.current-conditions').innerText = 'Current Conditions: ' + description; 
        document.querySelector('.temp').innerText = Math.round(temp) +'°F';
        document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/` + icon + '@2x.png';
        document.querySelector('.temp-high').innerText = 'High: '+ Math.round(temp_max) +'°F';
        document.querySelector('.temp-low').innerText = 'Low: '+ Math.round(temp_min) +'°F';
        document.querySelector('.feels-like').innerText = 'Feels Like: '+ Math.round(feels_like) +'°F';
        document.querySelector('.humidity').innerText = 'Humidity: '+ humidity +'%';
        document.querySelector('.wind').innerText = 'Wind Speed: '+ Math.round(speed) + ' mph ';
        //The following are not available in the data from the api documentation
        document.querySelector('.currentDay').innerHTML = new Date().toLocaleDateString('en-US', {weekday: 'long'});
        document.querySelector(".currentYear").innerHTML = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    },
    // this function will allow us fetch data from the api using the search
    search: function() {
        this.fetchWeather(document.querySelector('.weather-search').value);
    }
};

//this will bring the searchbar to life
document.querySelector('.search button').addEventListener('click', function() {
    weather.search();
});
document.querySelector('.weather-search').addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
        weather.search();
    }
});

