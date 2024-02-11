let UserLocation = document.querySelector("input");
let UserCity = document.querySelector("h1");
let baseUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
let Api ="&appid=9d72889267a89c2b9b8bde2123db6a40";
let UserCurrentDate = document.querySelector("#head p");
let weatherIcon = document.querySelector(".condition img")
let weatherIconBaseUrl = "./assets/weather-logos/";
let weatherDescription = document.querySelector(".condition span");
let temp = document.querySelector(".temperature");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#w-speed");
let currpressure = document.querySelector("#pressure");
let  windDirection = document.querySelector("#w-direction");
let  container = document.querySelector(".main-app");




const weekDays = {
    0 : "Sun",
    1 : "Mon",
    2 : "Tue",
    3 : "Wed",
    4 : "Thu",
    5 : "Fri",
    6 : "Sat",
}
const allMonths = {
    0 : "Jan",
    1 : "Feb",
    2 : "Mar",
    3 : "Apr",
    4 : "May",
    5 : "Jun",
    6 : "Jul",
    7 : "Aug",
    8 : "Sep",
    9 : "Oct",
    10 : "Nov",
    11 : "Dec", 
}

let updatedDate = ()=>{
       let date =  new Date();
       let currDay = date.getDay();
       let currDate = date.getDate();
       let currMonth = date.getMonth();
       let currYear = date.getFullYear();    
       UserCurrentDate.innerText = `${weekDays[currDay]} ${currDate}-${allMonths[currMonth]}-${currYear}`;
}
let sample;
const getWeatherData = async (city)=>{

    let response = await fetch(`${baseUrl}${city.toLowerCase()}${Api}`);
    let weatherData = await response.json();
    sample = weatherData ;
    UserCity.innerText = weatherData.name;
    updatedDate();
    
    weatherDescription.innerText = sample.weather[0].description;
    temp.innerText = `${Math.round(weatherData.main.temp)}°C`;
    humidity.innerText = `${weatherData.main.humidity}%`;
    windSpeed.innerText = `${weatherData.wind.speed}kph`;
    currpressure.innerText = `${weatherData.main.pressure}mbar`;
      windDirection.innerText = `${weatherData.wind.deg}°`;


    if (weatherData.weather[0].main == "Clouds") {
        weatherIcon.src = `${weatherIconBaseUrl}clouds.png`;
      } else if (weatherData.weather[0].main == "Clear") {
        weatherIcon.src = `${weatherIconBaseUrl}clear.png`;
      } else if (weatherData.weather[0].main == "Rain") {
        weatherIcon.src = `${weatherIconBaseUrl}rain.png`;
      } else if (weatherData.weather[0].main == "Drizzle") {
        weatherIcon.src = `${weatherIconBaseUrl}drizzle.png`;
      } else if (weatherData.weather[0].main == "Mist") {
        weatherIcon.src = `${weatherIconBaseUrl}mist.png`;
      }
    
      container.style.display = "block";
      document.querySelector(".msg").style.display = "none";
}

document.querySelector("button").addEventListener("click",(evt) =>{
  evt.preventDefault();
  getWeatherData(UserLocation.value);
 
});