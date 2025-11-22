
const input = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const selectCategory = document.getElementById('genre');
const sort = document.getElementById('sort');



import { tmdbUrl } from "../configs/tmdbConfig.js";

let movies = [];
//function to check if the device is mobile//
function isMobil(){
  return window.innerWidth <= 768;
}

//fecth popular movies from tmdb//
async function loadPopular() {
  try {
    const response = await fetch(tmdbUrl("/movie/popular"));
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}
loadPopular()
//fetch top rated movies from tmdb//
async function loadTopRated() {
  try {
    const response = await fetch(tmdbUrl("/movie/top_rated"));
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
}
loadTopRated()

//fech upcoming movies from tmdb//
async function loadUpcoming() {
  try { 
    const response = await fetch(tmdbUrl("/movie/upcoming"));
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }

}
loadUpcoming()

//fetch all categories from tmdb on mobile//
async function loadAllMobileMovies() {
  const popular = await loadPopular();
  const topRated = await loadTopRated();
  const upcoming = await loadUpcoming(); // use as trending

  displayMobileMovies({
    trending: upcoming,
    popular: popular,
    topRated: topRated
  });
}
loadAllMobileMovies();

//fetch trending movies from tdmb//
async function getTrendingMovies() {
  try {
    const response = await fetch(tmdbUrl("/trending/movie/week"));
    const data = await response.json();

    movies = data.results.map(m => ({
      ...m,
      isPopular: m.popularity > 200 // generate our own popular tag
    }));

    displayMovies(movies);

  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
}
getTrendingMovies();

//display movies function for deskstop//
function displayMovies(moviesToDisplay) {
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = '';

  if (!moviesToDisplay.length) {
    movieList.innerHTML = '<p>No movies found.</p>';
    return;
  }

  moviesToDisplay.forEach(movie => {
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const movieCard = `
      <div class="movie-card">
        <div class="poster">
          <img src="${poster}" alt="${movie.title}">
        </div>

        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>

          <p class="movie-meta">${movie.overview.substring(0, 100)}...</p>

          <p class="movie-temp">⭐ ${movie.vote_average}</p>

          <p class="popular-tag">${movie.isPopular ? "🔥 Popular" : ""}</p>
        </div>
      </div>
    `;

    movieList.innerHTML += movieCard;
  });
}

//display movies function for mobile//
function displayMobileMovies({ trending, popular, topRated }) {
  if (!isMobil()) return;

  const mobileTrendingRow = document.getElementById('trendingRow');
  const mobilePopularRow = document.getElementById('popularRow');
  const mobiletopRatedRow = document.getElementById('topRatedRow');

  // TRENDING / UPCOMING
  console.log("Trending row:", mobileTrendingRow);

  mobileTrendingRow.innerHTML = "";
  trending.forEach(movie => {
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  mobileTrendingRow.innerHTML += `
    <div class="mobile-movie-card">
      <div class="poster">
        <img src="${poster}" alt="${movie.title}">
      </div>
      <div class="movie-title">${movie.title}</div>
    </div>
  `;
});


  // POPULAR
  mobilePopularRow.innerHTML = "";
  popular.forEach(movie => {
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  mobilePopularRow.innerHTML += `
    <div class="mobile-movie-card">
      <div class="poster">
        <img src="${poster}" alt="${movie.title}">
      </div>
      <div class="movie-title">${movie.title}</div>
    </div>
  `;
});


  // TOP RATED
  mobiletopRatedRow.innerHTML = "";
  topRated.slice(0, 10).forEach(movie => {
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  mobiletopRatedRow.innerHTML += `
    <div class="mobile-movie-card">
      <div class="poster">
        <img src="${poster}" alt="${movie.title}">
      </div>
      <div class="movie-title">${movie.title}</div>
    </div>
  `;
});




// //filter movies with categories //
// function filterByCategory(movie){
//   const selectedCategory = selectCategory.value;
//   return selectedCategory === 'all' ? true : movie.category.toLowerCase() === selectedCategory.toLowerCase();
// } 


// //filter movie by input// 
// function filterByInput (movie){
//   const textsearch = input.value.toLowerCase().trim();
//   return textsearch === "" ? true : movie.movie_title.toLowerCase().includes(textsearch);
// }

// //filter by popular and newer //
// function filterBypopular(movie) {
//   const sorted = sort.value;
//   return sorted === "Popular" ? movie.isPopular === true : sorted === "Newest" ? movie.isPopular === false : true;
// }

// //function that combine all filters //
// function filterAll (){
//   let masterFilter = movies
//   .filter(filterByCategory)
//   .filter(filterByInput)
//   .filter(filterBypopular)

//   displayMovies(masterFilter)
// }

// input.addEventListener('input', filterAll)
// sort.addEventListener('change', filterAll)
// selectCategory.addEventListener('change', filterAll)

// filterAll();

//hero section animation//
let featuredMovies = [];
async function loadHeroMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=99d517c941d9e862f49bfa4a0d89b350`
  );

  const data = await res.json();
  featuredMovies = data.results.slice(0, 5); // pick top 5 movies
  showHero(0);
}

let currentHero = 0;

const heroTitle = document.querySelector('.hero-title');
const heroDesc = document.querySelector('.hero-description');
const heroBg = document.querySelector('.hero-background');

function showHero(index) {
  const movie = featuredMovies[index];

  const title = movie.title;
  const description = movie.overview.substring(0, 150) + "...";
  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  heroTitle.textContent = title;
  heroDesc.textContent = description;

  heroBg.innerHTML = `
    <img src="${backdrop}" alt="${title}">
  `;
}


function nextHero() {
  currentHero = (currentHero + 1) % featuredMovies.length;
  showHero(currentHero);
}

// initial display
loadHeroMovies();

// rotate every 8 seconds
setInterval(nextHero, 8000);

}


