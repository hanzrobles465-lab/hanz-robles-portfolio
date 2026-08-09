import { useEffect, useState } from "react";
import type { Place, WeatherResponse } from "./types";

const weatherLabels: Record<number, string> = {
  0: "Cielo despejado",
  1: "Principalmente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  61: "Lluvia ligera",
  80: "Chubascos ligeros"
};

async function getCoordinates(city: string): Promise<Place> {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`);
  const data = await response.json();
  const place = data.results?.[0];

  if (!place) {
    throw new Error("No encontre esa ciudad.");
  }

  return place;
}

async function getWeather(place: Place): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto"
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  return response.json();
}

export default function App() {
  const [city, setCity] = useState("Nagoya");
  const [place, setPlace] = useState<Place | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [status, setStatus] = useState("Listo para buscar.");

  async function searchWeather(nextCity = city) {
    try {
      setStatus("Cargando datos...");
      const nextPlace = await getCoordinates(nextCity);
      const nextWeather = await getWeather(nextPlace);
      setPlace(nextPlace);
      setWeather(nextWeather);
      setStatus("Datos cargados desde Open-Meteo.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No se pudo cargar el clima.");
    }
  }

  useEffect(() => {
    searchWeather("Nagoya");
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">React + TypeScript + API</p>
        <h1>Weather API Dashboard</h1>
        <p>Busca una ciudad y revisa clima actual, humedad, viento y pronostico semanal usando Open-Meteo.</p>
      </section>

      <form className="search-panel" onSubmit={(event) => { event.preventDefault(); searchWeather(); }}>
        <label htmlFor="city">Ciudad</label>
        <div className="search-row">
          <input id="city" value={city} onChange={(event) => setCity(event.target.value)} />
          <button type="submit">Buscar</button>
        </div>
        <p>{status}</p>
      </form>

      {weather && place ? (
        <section className="weather-grid">
          <article className="current-card">
            <p className="label">Clima actual</p>
            <h2>{place.name}, {place.country_code}</h2>
            <div className="temperature">{Math.round(weather.current.temperature_2m)}<small>°C</small></div>
            <p>{weatherLabels[weather.current.weather_code] ?? "Clima variable"}</p>
          </article>
        </section>
      ) : null}
    </main>
  );
}
