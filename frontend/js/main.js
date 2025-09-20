import { API_BASE_URL } from './config.js';
import { loadAvailableGenres, setupCategorySelector } from './dynamicCategory.js';
import { setupModal } from './modal.js';
import { setupButtons } from './buttons.js';
import { loadFeaturedMovie, loadTopRatedMovies, loadMysteryMovies } from './sections.js';
import { hideLoading } from './utils.js';

async function init() {
  console.log('=== Initialisation de JustStreamIt - Navigation et Sections ===');

  try {
    const testResponse = await fetch(`${API_BASE_URL}/titles/`);
    if (!testResponse.ok) {
      throw new Error('API non accessible. Vérifiez que OCMovies-API est en cours d\'exécution.');
    }

    await loadFeaturedMovie();

    await Promise.all([
      loadTopRatedMovies(),
      loadMysteryMovies()
    ]);

    setupButtons();
    setupModal();

    console.log('=== Navigation et sections initialisées avec succès! ===');

  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    hideLoading('hero-loading');
    hideLoading('top-rated-loading');
    hideLoading('mystery-loading');
    document.getElementById('hero-loading').textContent = 'Erreur: API non accessible. Vérifiez que OCMovies-API est lancé.';
    document.getElementById('top-rated-loading').textContent = 'Erreur: API non accessible.';
    document.getElementById('mystery-loading').textContent = 'Erreur: API non accessible.';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('=== Démarrage forcé de JustStreamIt ===');

  console.log('DEBUT: Chargement des genres...');
  await loadAvailableGenres();
  console.log('FIN: Genres chargés');

  setupCategorySelector();

  await init();
});
