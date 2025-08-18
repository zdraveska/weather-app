const API_BASE = 'http://localhost:8141/api/public';

function goBack() {
  window.location.href = 'index.html';
}

function closeResult() {
  const container = document.getElementById('sortContainer');
  document.getElementById('sortResult').textContent = '';
  container.style.display = 'none';
}

async function sort() {
  const strings = document
    .getElementById('stringInput')
    .value.split(',')
    .map((s) => s.trim());

  if (!strings.length || strings[0] === '') {
    alert('Please enter some strings to sort.');
    return;
  }

  const container = document.getElementById('sortContainer');
  const result = document.getElementById('sortResult');
  result.textContent = 'Sorting...';
  container.style.display = 'block';
  document.getElementById('sortCloseBtn').style.display = 'none';

  try {
    const res = await fetch(`${API_BASE}/sort`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(strings)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    result.textContent = `Sorted: ${data.join(', ')}`;
    document.getElementById('sortCloseBtn').style.display = 'inline-block';
  } catch (err) {
    result.textContent = 'Error: ' + err.message;
    document.getElementById('sortCloseBtn').style.display = 'inline-block';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sortBtn').addEventListener('click', sort);
  document.getElementById('backBtn').addEventListener('click', goBack);
  document.getElementById('sortCloseBtn').addEventListener('click', closeResult);
});
