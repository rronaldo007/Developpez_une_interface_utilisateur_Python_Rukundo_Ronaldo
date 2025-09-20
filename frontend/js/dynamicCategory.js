import { state } from './state.js';
import { API_BASE_URL } from './config.js';
import { fetchGenres } from './api.js';
import { isMobile as isMobileView } from './utils.js';

function ensureMobileState() {
  state.ui = state.ui || {};
  state.ui.expanded = state.ui.expanded || { topRated: false, mystery: false, dynamic: false };
  state.mobileBuffer = state.mobileBuffer || { topRated: [], mystery: [], dynamic: [] };
}

export async function loadAvailableGenres() {
  console.log('Chargement des genres disponibles...');
  const data = await fetchGenres();

  const categorySelect = document.getElementById('category-select');

  if (data && data.results && Array.isArray(data.results)) {
    state.availableGenres = data.results;
    console.log('Genres disponibles:', state.availableGenres.length, state.availableGenres);

    if (!categorySelect) return;

    categorySelect.innerHTML = '<option value="">Sélectionnez une catégorie</option>';
    state.availableGenres.forEach(genre => {
      const opt = document.createElement('option');
      opt.value = genre.name;
      opt.textContent = genre.name;
      categorySelect.appendChild(opt);
    });
  }
}

export async function loadDynamicCategoryLocal(genre, displayName) {
  console.log(`Chargement des films ${genre}...`);
  ensureMobileState();

  const section = document.getElementById('dynamic-category');
  section.style.display = 'block';
  document.getElementById('dynamic-title').textContent = displayName;
  document.getElementById('dynamic-container').style.display = 'none';

  const loadingEl = document.getElementById('dynamic-loading');
  if (loadingEl) loadingEl.style.display = 'block';

  setTimeout(() => {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  try {
    const res = await fetch(`${API_BASE_URL}/titles/?genre=${encodeURIComponent(genre)}&sort_by=-imdb_score&page_size=6`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();

    const grid = document.getElementById('dynamic-movies');
    grid.innerHTML = '';

    const list = (data && data.results) ? data.results : [];

    const isMobile = isMobileView();
    const initialCount = isMobile ? 4 : 6;

    const visible = list.slice(0, initialCount);
    const hidden = list.slice(initialCount);

    visible.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'movie-card';
      card.dataset.movieId = movie.id;

      card.innerHTML = `
        <img src="${movie.image_url || 'https://via.placeholder.com/300x280/ddd/666?text=No+Image'}"
             alt="${movie.title}"
             loading="lazy"
             decoding="async"
             onerror="this.src='https://via.placeholder.com/300x280/ddd/666?text=No+Image'">
        <div class="movie-overlay">
          <button class="movie-details-btn" type="button" onclick="showMovieDetails(${movie.id})">Détails</button>
          <div class="movie-title">${movie.title}</div>
        </div>
      `;
      grid.appendChild(card);
    });

    state.mobileBuffer.dynamic = hidden;
    state.ui.expanded.dynamic = !isMobile;

    if (loadingEl) loadingEl.style.display = 'none';
    document.getElementById('dynamic-container').style.display = 'block';

    const btn = document.getElementById('dynamic-see-more');
    if (btn) btn.style.display = (isMobile && hidden.length > 0) ? 'block' : 'none';

    if (!grid.dataset.boundClick) {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.movie-card');
        if (!card) return;
        const id = Number(card.dataset.movieId);
        if (id) window.showMovieDetails(id);
      }, { passive: true });
      grid.dataset.boundClick = '1';
    }
  } catch (err) {
    console.error(`Erreur lors du chargement des films ${genre}:`, err);
    if (loadingEl) loadingEl.textContent = `Erreur lors du chargement des films ${genre}`;
  }
}

export function setupCategorySelector() {
  console.log('FORCE: Configuration du sélecteur de catégories...');
  const categorySelect = document.getElementById('category-select');
  const categoryIndicator = document.getElementById('category-indicator');

  if (!categorySelect) {
    console.error('Sélecteur de catégories non trouvé !');
    return;
  }

  categorySelect.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;

    console.log('EVENT: Changement de sélection:', { selectedValue, selectedText });

    if (selectedValue) {
      categorySelect.classList.add('selected');
      if (categoryIndicator) categoryIndicator.classList.add('active');
      console.log('DEBUT: loadDynamicCategoryLocal()');
      loadDynamicCategoryLocal(selectedValue, selectedText);
    } else {
      categorySelect.classList.remove('selected');
      if (categoryIndicator) categoryIndicator.classList.remove('active');
      const dynamicSection = document.getElementById('dynamic-category');
      if (dynamicSection) {
        dynamicSection.style.display = 'none';
        console.log('Section dynamique cachée');
      }
    }
  });

  console.log('Événement change ajouté avec succès !');
}
