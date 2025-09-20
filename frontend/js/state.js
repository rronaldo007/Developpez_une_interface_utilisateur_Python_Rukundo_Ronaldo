export const state = {
  featuredMovie: null,
  topRatedMovies: [],
  mysteryMovies: [],
  availableGenres: [],
  moviesById: new Map(),
  cursors: {
    topRated: { page: 1, pageSize: 6, hasMore: true },
    mystery:  { page: 1, pageSize: 6, hasMore: true },
    dynamic:  { page: 1, pageSize: 6, hasMore: true, genre: null, displayName: null }
  },
  ui: {
    isMobile: window.matchMedia('(max-width: 600px)').matches,
    expanded: { topRated: false, mystery: false, dynamic: false },
  },
  mobileBuffer: {
    topRated: [],
    mystery: [],
    dynamic: [],
  }
};
