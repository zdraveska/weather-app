const API_BASE = 'http://localhost:8141/api/public';

async function updateLocalDateTime() {
  try {
    const res = await fetch(`${API_BASE}/datetime`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    document.getElementById('datetime').textContent = `Date: ${data.date}, Time: ${data.time}`;
  } catch (err) {
    console.error('Failed to fetch datetime:', err);
    document.getElementById('datetime').textContent = 'Error loading date/time';
  }
}

setInterval(updateLocalDateTime, 1000);
updateLocalDateTime();
