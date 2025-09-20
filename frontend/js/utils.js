export function truncateText(text, maxLength) {
  if (!text) return 'Aucune description disponible';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function showLoading(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.style.display = 'block';
}

export function hideLoading(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.style.display = 'none';
}

export function isMobile() {
  return window.matchMedia('(max-width: 600px)').matches;
}

