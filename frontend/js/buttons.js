import { state } from './state.js';
import { showMovieDetails } from './modal.js';

function bindOnce(el, type, handler, key) {
  if (!el || !type || !handler) return;
  const mark = `bound_${key || type}`;
  if (el.dataset[mark]) return;
  el.addEventListener(type, handler);
  el.dataset[mark] = '1';
}

function revealTwo(gridId, bufferKey, expandedKey, btnId) {
  const grid = document.getElementById(gridId);
  const btn = document.getElementById(btnId);
  const buffer = state.mobileBuffer[bufferKey] || [];
  if (!grid || !btn || !buffer.length) return;

  buffer.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.movieId = movie.id;
    const src = movie.image_url || 'https://via.placeholder.com/300x280/ddd/666?text=No+Image';
    card.innerHTML = `
      <img src="${src}" alt="${movie.title}" loading="lazy" decoding="async"
           onerror="this.src='https://via.placeholder.com/300x280/ddd/666?text=No+Image'">
      <div class="movie-overlay">
        <button class="movie-details-btn" type="button" onclick="showMovieDetails(${movie.id})">Détails</button>
        <div class="movie-title">${movie.title}</div>
      </div>
    `;
    grid.appendChild(card);
  });

  state.mobileBuffer[bufferKey] = [];
  state.ui.expanded[expandedKey] = true;
  btn.style.display = 'none';
}

export function setupButtons() {
  const btnDetails = document.getElementById('btn-details');
  bindOnce(btnDetails, 'click', () => {
    if (state.featuredMovie) showMovieDetails(state.featuredMovie.id);
  }, 'details');

  bindOnce(document.getElementById('btn-see-more'), 'click', () => {
    revealTwo('top-rated-movies', 'topRated', 'topRated', 'btn-see-more');
  }, 'see_more_top');

  bindOnce(document.getElementById('mystery-see-more'), 'click', () => {
    revealTwo('mystery-movies', 'mystery', 'mystery', 'mystery-see-more');
  }, 'see_more_mystery');

  bindOnce(document.getElementById('dynamic-see-more'), 'click', () => {
    revealTwo('dynamic-movies', 'dynamic', 'dynamic', 'dynamic-see-more');
  }, 'see_more_dynamic');
}
