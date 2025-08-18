const API_BASE = 'http://localhost:8141/api/private';
const privateToken = sessionStorage.getItem('privateToken');

if (!privateToken) {
  alert('No token found. Please login first.');
  window.location.href = 'login.html';
}

function goBack() {
  window.location.href = 'index.html';
}

async function getWeather() {
  const container = document.getElementById('weatherCards');
  container.innerHTML = 'Loading...';

  try {
    const res = await fetch(`${API_BASE}/weather`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${privateToken}` }
    });
    if (!res.ok) throw new Error((await res.json()).error || `HTTP ${res.status}`);
    const data = await res.json();
    container.innerHTML = '';
    data.forEach((city) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = city.error
        ? `Failed to fetch weather for ${city.city}: ${city.error}`
        : `<h3>${city.city} (${city.country})</h3>
               <p>Weather: ${city.weather}</p>
               <p>Temp: ${city.temp}°C</p>
               <p>Humidity: ${city.humidity}%</p>
               <p>Wind speed: ${city.wind_speed} m/s</p>`;
      container.appendChild(card);
    });
  } catch (err) {
    container.textContent = 'Error fetching weather: ' + err.message;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('backBtn').addEventListener('click', goBack);
});

getWeather();
