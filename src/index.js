let currentTime = new Date();

let currentYear = currentTime.getFullYear();
let currentHours = currentTime.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentDate = currentTime.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[currentTime.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let currentMonth = months[currentTime.getMonth()];

let dateHtml = document.querySelector("#date");
dateHtml.innerHTML = `${currentDay}, ${currentHours}:${currentMinutes}, ${currentMonth} ${currentDate}, ${currentYear}`;

function setHtmlDate(schedule, displayDay) {
  let currentHours = schedule.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = schedule.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentDate = schedule.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[schedule.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let currentMonth = months[schedule.getMonth()];
  let tomorrowDisplay = document.querySelector(displayDay);
  tomorrowDisplay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputcity").value;
  let citynameHtml = document.querySelector(".cityname");
  citynameHtml.innerHTML = `${cityInput}`;

  let apiKey = "fc1ba4d8c20faae50c9db10bb53ae3ed";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#cityform");
searchForm.addEventListener("submit", searchCity);

let currentTemp = 12;

function searchTempCs() {
  let cTemp = document.querySelector("#temperature");
  cTemp.innerHTML = currentTemp;
}
let tempCs = document.querySelector("#celsius");
tempCs.addEventListener("click", searchTempCs);

function searchTempFt() {
  let fTemp = document.querySelector("#temperature");
  fTemp.innerHTML = (currentTemp * 9) / 5 + 32;
}
let tempFt = document.querySelector("#farenheit");
tempFt.addEventListener("click", searchTempFt);

function showWeather(response) {
  let weatherTypeDis = document.querySelector("#weathertype");
  weatherTypeDis.innerHTML = `${response.data.weather[0].description}`;

  let tempDis = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemp = temperature;
  tempDis.innerHTML = `${temperature}°`;
  let tempCity = document.querySelector(".cityname");
  tempCity.innerHTML = `${response.data.name}`;

  let pressureDis = document.querySelector("#press");
  let pressure = Math.round(response.data.main.pressure);
  pressureDis.innerHTML = `Pressure: ${pressure} hPa`;

  let humidityDis = document.querySelector("#humi");
  let humidity = Math.round(response.data.main.humidity);
  humidityDis.innerHTML = `Humidity: ${humidity}%`;

  let windDis = document.querySelector("#wind");
  let wind = Math.round(response.data.wind.speed);
  windDis.innerHTML = `Wind Speed: ${wind * 3.6} km/h`;
}

function retrievePosition(position) {
  let apiKey = "fc1ba4d8c20faae50c9db10bb53ae3ed";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

let tomorrow = addDays(currentTime, 1);
setHtmlDate(tomorrow, "#tomorrow");
let nextDay = addDays(currentTime, 2);
setHtmlDate(nextDay, "#nextday");
let nextDay2 = addDays(currentTime, 3);
setHtmlDate(nextDay2, "#nextday2");
let nextDay3 = addDays(currentTime, 4);
setHtmlDate(nextDay3, "#nextday3");
let nextDay4 = addDays(currentTime, 5);
setHtmlDate(nextDay4, "#nextday4");
