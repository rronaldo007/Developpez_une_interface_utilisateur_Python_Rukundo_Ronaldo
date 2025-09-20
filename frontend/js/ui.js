export function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.className = 'movie-card';
  movieCard.dataset.movieId = movie.id;

  movieCard.innerHTML = `
    <img src="${movie.image_url}"
         alt="${movie.title}"
         onerror="this.src=''">
    <div class="movie-overlay">
      <button class="movie-details-btn" onclick="showMovieDetails(${movie.id})">Détails</button>
      <div class="movie-title">${movie.title}</div>
    </div>
  `;

  return movieCard;
}
