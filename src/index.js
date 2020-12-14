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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = '';

  for (let index = 0; index < 8; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML +=
      ` <div class="col-2 offset-1">
  <div class="c1">
    <strong> ${formatHours(forecast.dt * 1000)} </strong>
    <div class="row">
      <div class="weather">
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
      </div>
    </div>
    <div class="row">
      <div class="weather" id="tempt${index}"><strong>${Math.round(forecast.main.temp_max)}º</strong>${Math.round(forecast.main.temp_min)}º</div>
      <div class="cls" id="cls${index}"> ºC </div> |<div class="fht" id="fht${index}">ºF</div>
      </div>
    <div class="row">
      <div class="weather" id="pressr">Pressure:${Math.round(forecast.main.pressure)}hPa</div>
    </div>
    <div class="row">
      <div class="weather" id="humidt">Humidity:${Math.round(forecast.main.humidity)}%</div>
    </div>
    <div class="row">
      <div class="weather" id="windy2">Wind:${Math.round(forecast.wind.speed) * 3.6}km/h</div>
    </div>
  </div>
</div>`;
  }

  
  for (let index = 0; index < 8; index++) {

    function forecastCelsius() {
      let blockTemp = document.querySelector(`#tempt${index}`);
      blockTemp.innerHTML = `<div class="weather" id="tempt${index}"><strong>${(Math.round(response.data.list[index].main.temp_max))}º</strong>${(Math.round(response.data.list[index].main.temp_min))}º</div>`;
    }
    let tempCls = document.querySelector(`#cls${index}`);
    tempCls.addEventListener("click", forecastCelsius);

    function forecastFarenheit() {
      let fhTemp = document.querySelector(`#tempt${index}`);
      fhTemp.innerHTML = `<div class="weather" id="tempt${index}"><strong>${((Math.round(response.data.list[index].main.temp_max)) * 9) / 5 + 32}º</strong>${(((Math.round(response.data.list[index].main.temp_min)) * 9) / 5 + 32)}º</div>`;
    }
    let tempFht = document.querySelector(`#fht${index}`);
    tempFht.addEventListener("click", forecastFarenheit);

  }
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
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
  tempDis.innerHTML = `${temperature}`;
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

  let iconDis = document.querySelector("#icon");
  iconDis.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconDis.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(position) {
  let apiKey = "fc1ba4d8c20faae50c9db10bb53ae3ed";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

navigator.geolocation.getCurrentPosition(retrievePosition);


function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function imageHour() {
  let image = document.querySelector("#earth");

  if (currentHours >= 6 && currentHours <= 19) {
    image.setAttribute("src", "images/earthmorning.jpg");
  } if (currentHours <= 5 && currentHours >= 20) {
    image.setAttribute("src", "images/earthnight.jpg");
  }
}
imageHour();