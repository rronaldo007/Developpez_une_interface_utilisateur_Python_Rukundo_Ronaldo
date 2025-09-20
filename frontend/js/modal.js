import { fetchMovieDetails } from './api.js';

export async function showMovieDetails(movieId) {
  console.log('Chargement des détails pour le film ID:', movieId);

  const movie = await fetchMovieDetails(movieId);
  if (!movie) {
    alert('Erreur lors du chargement des détails du film');
    return;
  }

  document.getElementById('modal-title').textContent = movie.title || 'Titre indisponible';

  const year = movie.year || movie.date_published?.split('-')[0] || 'N/A';
  const genres = Array.isArray(movie.genres) ? movie.genres.join(', ') : (movie.genres || 'N/A');
  const rating = movie.rated || 'N/A';
  const duration = movie.duration ? `${movie.duration} minutes` : 'N/A';
  const countries = Array.isArray(movie.countries) ? movie.countries.join(' / ') : (movie.countries || 'N/A');

  document.getElementById('modal-year-genres').textContent = `${year} - ${genres}`;
  document.getElementById('modal-rating-duration').textContent = `${rating} - ${duration} (${countries})`;
  document.getElementById('modal-imdb-score').textContent = `IMDB score: ${movie.imdb_score || 'N/A'}/10`;

  const boxOffice = movie.worldwide_gross_income
    ? (typeof movie.worldwide_gross_income === 'string'
        ? movie.worldwide_gross_income
        : `${parseFloat(movie.worldwide_gross_income).toFixed(1)}M`)
    : 'N/A';
  document.getElementById('modal-box-office').textContent = `Recettes au box-office: ${boxOffice}`;

  const directors = Array.isArray(movie.directors) ? movie.directors.join(', ') : (movie.directors || 'N/A');
  document.getElementById('modal-directors-list').textContent = directors;

  const description = movie.long_description || movie.description || 'Aucune description disponible';
  document.getElementById('modal-description-text').textContent = description;

  const actors = Array.isArray(movie.actors) ? movie.actors.join(', ') : (movie.actors || 'N/A');
  document.getElementById('modal-actors-list').textContent = actors;

  const modalImg = document.getElementById('modal-poster-img');
  modalImg.src = movie.image_url || 'https://via.placeholder.com/250x370/ddd/666?text=No+Image';
  modalImg.alt = movie.title || 'Affiche du film';

  document.getElementById('movie-modal').classList.add('active');
}

export function setupModal() {
  const modal = document.getElementById('movie-modal');
  const closeBtn = document.getElementById('modal-close');
  const closeBtnBottom = document.getElementById('modal-close-btn');

  function closeModal() {
    modal.classList.remove('active');
  }

  closeBtn.addEventListener('click', closeModal);
  closeBtnBottom.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

window.showMovieDetails = showMovieDetails;
