import { state } from './state.js';
import { fetchMovies, fetchMovieDetails } from './api.js';
import { truncateText, hideLoading, isMobile as isMobileView } from './utils.js';
import { createMovieCard } from './ui.js';

function ensureMobileState() {
  state.ui = state.ui || {};
  state.ui.expanded = state.ui.expanded || { topRated: false, mystery: false, dynamic: false };
  state.mobileBuffer = state.mobileBuffer || { topRated: [], mystery: [], dynamic: [] };
}

export async function loadFeaturedMovie() {
  console.log('Chargement du film principal...');
  const data = await fetchMovies('/titles/?sort_by=-imdb_score&page_size=1');

  if (data && data.results && data.results.length > 0) {
    state.featuredMovie = data.results[0];

    const details = await fetchMovieDetails(state.featuredMovie.id);
    if (details) state.featuredMovie = details;

    console.log('Film principal chargé:', state.featuredMovie);

    document.getElementById('featured-title').textContent =
      state.featuredMovie.title || 'Titre indisponible';

    document.getElementById('featured-description').textContent =
      truncateText(state.featuredMovie.description || state.featuredMovie.long_description, 300);

    const featuredImg = document.getElementById('featured-image');
    featuredImg.src =
      state.featuredMovie.image_url ||
      'https://via.placeholder.com/200x300/ddd/666?text=No+Image';
    featuredImg.alt = state.featuredMovie.title || 'Film principal';

    hideLoading('hero-loading');
    document.getElementById('featured-movie').style.display = 'flex';
  } else {
    console.error('Aucun film trouvé pour le héros');
    hideLoading('hero-loading');
    document.getElementById('hero-loading').textContent = 'Erreur: Aucun film trouvé';
  }
}

export async function loadTopRatedMovies() {
  console.log('Chargement des films les mieux notés...');
  ensureMobileState();

  const data = await fetchMovies('/titles/?sort_by=-imdb_score&page_size=6');

  if (data && data.results) {
    const list = data.results.filter(m => (state.featuredMovie ? m.id !== state.featuredMovie.id : true));

    const grid = document.getElementById('top-rated-movies');
    grid.innerHTML = '';

    const isMobile = isMobileView();
    const initialCount = isMobile ? 4 : 6;

    const visible = list.slice(0, initialCount);
    const hidden = list.slice(initialCount);

    state.topRatedMovies = visible;
    state.mobileBuffer.topRated = hidden;
    state.ui.expanded.topRated = !isMobile;

    visible.forEach(movie => grid.appendChild(createMovieCard(movie)));

    hideLoading('top-rated-loading');
    document.getElementById('top-rated-container').style.display = 'block';

    const btn = document.getElementById('btn-see-more');
    if (btn) btn.style.display = (isMobile && hidden.length > 0) ? 'block' : 'none';
  } else {
    console.error('Aucun film trouvé pour la section top rated');
    hideLoading('top-rated-loading');
    document.getElementById('top-rated-loading').textContent = 'Erreur: Aucun film trouvé';
  }
}

export async function loadMysteryMovies() {
  console.log('Chargement des films Mystery...');
  ensureMobileState();

  const data = await fetchMovies('/titles/?genre=Mystery&sort_by=-imdb_score&page_size=6');

  if (data && data.results) {
    const grid = document.getElementById('mystery-movies');
    grid.innerHTML = '';

    const isMobile = isMobileView();
    const initialCount = isMobile ? 4 : 6;

    const visible = data.results.slice(0, initialCount);
    const hidden = data.results.slice(initialCount);
    state.mysteryMovies = visible;
    state.mobileBuffer.mystery = hidden;
    state.ui.expanded.mystery = !isMobile;

    visible.forEach(movie => grid.appendChild(createMovieCard(movie)));

    hideLoading('mystery-loading');
    document.getElementById('mystery-container').style.display = 'block';

    const btn = document.getElementById('mystery-see-more');
    if (btn) btn.style.display = (isMobile && hidden.length > 0) ? 'block' : 'none';
  } else {
    console.error('Aucun film Mystery trouvé');
    hideLoading('mystery-loading');
    document.getElementById('mystery-loading').textContent = 'Erreur: Aucun film Mystery trouvé';
  }
}
