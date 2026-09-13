const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const statusEl = document.getElementById("status");
const cityNameEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const summaryEl = document.getElementById("summary");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const feelsLikeEl = document.getElementById("feelsLike");
const forecastEl = document.getElementById("forecast");

const weatherLabels = {
  0: "Cielo despejado",
  1: "Principalmente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna ligera",
  53: "Llovizna moderada",
  55: "Llovizna intensa",
  61: "Lluvia ligera",
  63: "Lluvia moderada",
  65: "Lluvia intensa",
  80: "Chubascos ligeros",
  81: "Chubascos moderados",
  82: "Chubascos intensos",
  95: "Tormenta"
};

function setStatus(message) {
  statusEl.textContent = message;
}

function formatDay(dateString) {
  return new Intl.DateTimeFormat("es", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(`${dateString}T12:00:00`));
}

async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No se pudo consultar la ciudad.");
  }

  const data = await response.json();
  const place = data.results?.[0];

  if (!place) {
    throw new Error("No encontre esa ciudad. Prueba con otra busqueda.");
  }

  return place;
}

async function getWeather(place) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto"
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

  if (!response.ok) {
    throw new Error("No se pudo cargar el clima.");
  }

  return response.json();
}

function renderWeather(place, weather) {
  const current = weather.current;
  const label = weatherLabels[current.weather_code] || "Clima variable";

  cityNameEl.textContent = `${place.name}, ${place.country_code}`;
  temperatureEl.textContent = Math.round(current.temperature_2m);
  summaryEl.textContent = label;
  humidityEl.textContent = `${current.relative_humidity_2m}%`;
  windEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  feelsLikeEl.textContent = `${Math.round(current.apparent_temperature)} °C`;

  forecastEl.innerHTML = weather.daily.time.map((day, index) => {
    const max = Math.round(weather.daily.temperature_2m_max[index]);
    const min = Math.round(weather.daily.temperature_2m_min[index]);
    const dayLabel = weatherLabels[weather.daily.weather_code[index]] || "Variable";

    return `
      <article class="forecast-day">
        <strong>${formatDay(day)}</strong>
        <span>${dayLabel}</span>
        <span>${min}° / ${max}°</span>
      </article>
    `;
  }).join("");
}

async function searchWeather(city) {
  try {
    setStatus("Buscando ciudad...");
    const place = await getCoordinates(city);
    setStatus("Cargando clima...");
    const weather = await getWeather(place);
    renderWeather(place, weather);
    setStatus("Datos cargados desde Open-Meteo.");
  } catch (error) {
    setStatus(error.message);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchWeather(cityInput.value.trim());
});

searchWeather(cityInput.value);
