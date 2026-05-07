// ============ ETAT ET DONNÉES ============
let state = {
  airWeek: 1,
  airDone: [],
  mesures: [],
  streaks: 0
};

// Navigation fluide
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.getElementById('nav-'+name).classList.add('active');
  
  if(name === 'home') renderHome();
}

// Rendu de l'accueil dynamique
function renderHome() {
  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  document.getElementById('home-date').textContent = now.toLocaleDateString('fr-FR', options);
  
  const tc = document.getElementById('today-card-wrap');
  tc.innerHTML = `
    <div class="today-card">
      <div class="today-label">Programme du jour</div>
      <div class="today-day">Air Alert + Cardio</div>
      <div style="margin-top: 10px; font-size: 14px; opacity: 0.9;">Semaine ${state.airWeek} • Focus explosivité</div>
    </div>
  `;
}

// ============ PWA INSTALLATION ============
if ('serviceWorker' in navigator) {
  const swCode = `
    self.addEventListener('install', e => self.skipWaiting());
    self.addEventListener('fetch', e => { /* Cache logic offline-first */ });
  `;
  const swBlob = new Blob([swCode], {type: 'application/javascript'});
  navigator.serviceWorker.register(URL.createObjectURL(swBlob));
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  renderHome();
});