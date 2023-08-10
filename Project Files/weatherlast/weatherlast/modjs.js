const apikey = "4fbe9f4665840ac9b009e3c00c5be40f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
const detailReport = document.querySelector(".report");
const searchForm = document.querySelector('.search');
const locationBtn = document.querySelector(".weather__location-btn");
let units = "metric";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

locationBtn.addEventListener("click", getCurrentLocationWeather);

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.log(error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

async function fetchWeatherByCoordinates(latitude, longitude) {
  try {
    const response = await fetch(
      `${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${units}`
    );
    if (!response.ok) {
      throw new Error("Weather data not available.");
    }
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    console.log(error);
  }
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWhether(city);
  }
  searchBox.value = "";
});

async function checkWhether(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`)
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      throw new Error("Weather data is not available");
    }
    else {
      document.querySelector(".error").style.display = "none";
    }
    var data = await response.json();
    console.log(data);
    updateWeather(data);
  }
  catch (error) {
    console.log(error);
  }
}

function updateWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".weatherdesc").innerHTML = data.weather[0].description;
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " Km/hr";
  document.querySelector(".cityname").innerHTML = data.name;
  document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".desc").innerHTML = data.weather[0].description;
  document.querySelector(".humid").innerHTML = data.main.humidity + "%";
  document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
  document.querySelector(".max_temp").innerHTML = Math.round(data.main.temp_max) + "°c";
  document.querySelector(".min_temp").innerHTML = Math.round(data.main.temp_min) + "°c";
  document.querySelector(".windspeed").innerHTML = data.wind.speed + " Km/hr";

  if (data.weather[0].main == "Clouds") {
    document.body.style.backgroundImage = "url('./clouds.gif')";
    weatherIcon.src = "./gifcloudy.svg";
  }
  else if (data.weather[0].main == "Clear") {
    document.body.style.backgroundImage = "url('./clearuuu.gif')";
    weatherIcon.src = "./gifday.svg";
  }
  else if (data.weather[0].main == "Drizzle") {
    document.body.style.backgroundImage = "url('./drizzleee.gif')";
    weatherIcon.src = "./gifdrizzle.svg";
  }
  else if (data.weather[0].main == "Mist") {
    document.body.style.backgroundImage = "url('./misttt.gif')";
    weatherIcon.src = "./gifmist.svg";
  }
  else if (data.weather[0].main == "Rain") {
    document.body.style.backgroundImage = "url('./rainuuu.gif')";
    weatherIcon.src = "./gifrainy.svg";
  }
  else if (data.weather[0].main == "snow") {
    document.body.style.backgroundImage = "url('./snow.gif')";
    weatherIcon.src = "./gifsnowy.svg";
  }
  else if (data.weather[0].main == "Smoke") {
    document.body.style.backgroundImage = "url('./smokeee.gif')";
    weatherIcon.src = "./gifmist.svg";
  }
  else if (data.weather[0].main == "Fog") {
    document.body.style.backgroundImage = "url('./foggg.gif')";
    weatherIcon.src = "./gifmist.svg";
  }
  else if (data.weather[0].main == "Haze") {
    document.body.style.backgroundImage = "url('./misttt.gif')";
    weatherIcon.src = "./gifmist.svg";
  }
  else if (data.weather[0].main == "Thunderstrom") {
    document.body.style.backgroundImage = "url('./thunderrrr.gif')";
    weatherIcon.src = "./thunder.svg";
  }
}

searchButton.addEventListener("click", () => {
  checkWhether(searchBox.value);
});

window.addEventListener("load", () => {
  checkWhether("goa");
});

const showCart = () => {
  document.getElementById('cart-container').style.display = "block";
  document.querySelector(".detail").style.display = "block";
}
const hiddenCart = () => {
  document.getElementById('cart-container').style.display = "none";
}