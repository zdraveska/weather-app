const API_BASE = 'http://localhost:8141/api/public';

function goBack() {
  window.location.href = 'index.html';
}

async function login() {
  const username = document.getElementById('username').value;
  const container = document.getElementById('loginResult');
  container.textContent = 'Logging in...';

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);

    sessionStorage.setItem('privateToken', data.token);
    container.textContent = 'Login successful! Redirecting...';
    window.location.href = 'weather.html';
  } catch (err) {
    container.textContent = 'Error: ' + err.message;
    container.classList.add('error');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginBtn').addEventListener('click', login);
  document.getElementById('backBtn').addEventListener('click', goBack);
});
