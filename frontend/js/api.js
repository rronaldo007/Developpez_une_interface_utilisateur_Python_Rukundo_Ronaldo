import { API_BASE_URL } from './config.js';

async function fetchJSON(url) {
  try {
    console.log(`Fetching: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log('API Response:', data);
    return data;
  } catch (err) {
    console.error('Erreur API:', err);
    return null;
  }
}

export async function fetchMovies(endpoint) {
  return fetchJSON(`${API_BASE_URL}${endpoint}`);
}

export async function fetchMovieDetails(movieId) {
  return fetchMovies(`/titles/${movieId}`);
}

export async function fetchGenres() {
  return fetchJSON(`${API_BASE_URL}/genres/`);
}
