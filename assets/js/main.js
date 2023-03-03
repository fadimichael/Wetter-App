let cityName = document.querySelector(".city");
let info = document.querySelector(".description");
let tempValue = document.querySelector(".temp");
let humidityValue = document.querySelector(".humidity");
let image = document.querySelector(".icon");
let windS = document.querySelector(".wind");
let wetter = document.querySelector(".weather");
let weekContainer = document.querySelector(".week-container");
let inputCity = document.querySelector("#search-bar");
let button = document.querySelector("button");
let body = document.querySelector("body");
let cName;
let countryName;
let minTemp;
let maxTemp;
let datum = new Date();
let day = datum.getDay();
let datumtoday = datum.toLocaleString();
let datumHeute = document.querySelector("#datum-heute");

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weatherApp = {
  apiKey: "630e5fd0b9bc17119f180d0fbedc4d97",

  fetchWeatherData: function () {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=
    ${inputCity.value}&appid=${weatherApp.apiKey}`)
      .then((response) => response.json())
      .then((geo) => {
        if (inputCity.length != 0) {
          let lat = geo[0].lat;
          let lon = geo[0].lon;
          cName = geo[0].name;
          countryName = geo[0].country;
          fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApp.apiKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              weatherApp.displayWeather(data);
              weatherApp.forcastvalues(data);
              setInterval(weatherApp.interval, 1000);
            });
        } else {
          window.alert(`Bitte richtige City Name eingeben`);
        }
      });
  },

  displayWeather: function (data) {
    let icon = data.list[0].weather[0].icon;
    let description = data.list[0].weather[0].description;
    let temp = data.list[0].main.temp.toFixed();
    let humidity = data.list[0].main.humidity;
    let speed = data.list[0].wind.speed;

    cityName.textContent = ` Das Wetter in ${cName}, ${countryName} `;
    image.src = `https://openweathermap.org/img/wn/${icon}.png`;
    info.textContent = `${description}`;
    tempValue.textContent = `${temp} °C`;
    humidityValue.textContent = `Humidity: ${humidity} %`;
    windS.textContent = `Wind speed: ${speed} km/h`;
    wetter.classList.remove("loading");
    weekContainer.classList.remove("loading");
    datumHeute.classList.remove("loading");

    body.style.backgroundImage = `url(https://source.unsplash.com/1720x1300/?${cName})`;
  },
  forcastvalues: function (data) {
    for (let i = 1; i < 5; i++) {
      let forcastTemp = data.list[i * 8].main.temp.toFixed(1);
      let feelTemp = data.list[i * 8].main.feels_like.toFixed(1);
      let forcastIcon = data.list[i * 8].weather[0].icon;
      let forcastValue = document.querySelector(`#temp${i}`);
      forcastValue.innerHTML = `Temp=${forcastTemp} °C <br> feels like=${feelTemp} °C`;
      let forcastIconImg = document.querySelector(`#icon${i}`);
      forcastIconImg.src = `https://openweathermap.org/img/wn/${forcastIcon}.png`;
      let forcastDay = document.querySelector(`#day${i}`);
      forcastDay.innerHTML = weekday[day + i].slice(0, 3);
    }
  },
  interval: function () {
    datum = new Date();
    let year = datum.getFullYear();
    let monthss = datum.getMonth();
    let days = datum.getDay();
    let hours = datum.getHours();
    let minutes = datum.getMinutes();
    let seconds = datum.getSeconds();
    let weekDays = weekday[datum.getDay()].slice(0, 3);
    datumHeute.innerHTML = `${weekDays} ${hours} : ${minutes} : ${seconds}`;
  },

  search: function () {
    weatherApp.fetchWeatherData(inputCity.value);
    inputCity.value = "";
  },
};

button.addEventListener("click", () => {
  weatherApp.search();
});
document.addEventListener("keydown", (a) => {
  if (a.key == "Enter") {
    weatherApp.search();
  }
});

/* -------------------------------------------------------------------------- */
/*                             GOOGLE AUTOCOMPLETE                            */
/* -------------------------------------------------------------------------- */
// function activatePlacesSearch() {
//   inputCity = document.querySelector("#search-bar");
//   let autocompelete = new google.maps.places.Autocomplete(inputCity);
// }
// activatePlacesSearch();
