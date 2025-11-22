
// tmdbConfig.js
export const API_KEY = "99d517c941d9e862f49bfa4a0d89b350";
export const BASE_URL = "https://api.themoviedb.org/3";

// Build full URL with API key
export function tmdbUrl(path) {
  return `${BASE_URL}${path}?api_key=${API_KEY}`;
}