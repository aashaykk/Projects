const API_KEY = "1be89238b91a54cda6f4dfccf6ec4edc";
const date = document.getElementById("date");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const feelsLike = document.getElementById("feelsLike");
const tempImg = document.getElementById("tempImg");
const desc = document.getElementById("description");
const tempMax = document.getElementById("tempMax");
const tempMin = document.getElementById("tempMin");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const forecastCards = document.getElementById("forecastCards");
const loading = document.getElementById("loading");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const setDate = () => {
  const dateObj = new Date();
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  date.innerHTML = `${month} ${day}, ${year}`;
};

const showLoading = () => (loading.style.display = "block");
const hideLoading = () => (loading.style.display = "none");

const getWeather = async () => {
  const cityName = document.getElementById("searchBarInput").value;
  if (!cityName) return alert("Please enter a city name.");
  
  showLoading();
  try {
    // Current Weather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    city.innerHTML = data.name;
    desc.innerHTML = data.weather[0].main;
    tempImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon" />`;
    temp.innerHTML = `<h2>${Math.round(data.main.temp)}&deg;C</h2>`;
    feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}&deg;C`;
    tempMax.innerHTML = `${data.main.temp_max}&deg;C`;
    tempMin.innerHTML = `${data.main.temp_min}&deg;C`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${data.wind.speed} m/s`;

    // Forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();

    forecastCards.innerHTML = "";
    const daily = forecastData.list.filter(f => f.dt_txt.includes("12:00:00"));
    daily.forEach(day => {
      const card = document.createElement("div");
      card.className = "forecast-card";
      card.innerHTML = `
        <p>${new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="icon" />
        <p>${Math.round(day.main.temp)}&deg;C</p>
      `;
      forecastCards.appendChild(card);
    });
  } catch (error) {
    alert(error.message);
  } finally {
    hideLoading();
  }
};

window.onload = () => {
  setDate();

  // Optional: auto-detect location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      showLoading();
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        document.getElementById("searchBarInput").value = data.name;
        getWeather();
      } catch (err) {
        console.error("Location fetch failed", err);
        hideLoading();
      }
    });
  }
};