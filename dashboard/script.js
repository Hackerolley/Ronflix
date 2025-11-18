
const input = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const selectCategory = document.getElementById('genre');
const sort = document.getElementById('sort');

let movies = [];
// Fetch movies from a local JSON file
fetch('movies.json')
    .then(response => response.json())
    .then(data => {
        movies = data;
        console.log(movies);
        
        displayMovies(movies);
    })
    .catch(error => console.error('Error fetching movie data:', error));
    
function displayMovies(moviesToDisplay) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
    if (moviesToDisplay.length === 0) {
      movieList.innerHTML = '<p>No movies found.</p>';
      return;
    }
    moviesToDisplay.forEach(movie => {
      const movieCard =`<div class="movie-card">
        <div class="poster">
          <img src="${movie.poster_image}" alt="${movie.movie_title}" />
        </div>
        <div class="movie-info">
          <div class="category">${movie.category}</div>
          <div class="isPopular">${movie.isPopular ? '🔥 Popular' : ''}</div>
          <h3 class="movie-title">${movie.movie_title}</h3>
          <p class="movie-meta">${movie.movie_meta}</p>
          <p class="movie-temp">Rating: ★★★☆☆</p>
        </div>
    </div>`;
      movieList.innerHTML += movieCard;
    })
  }


//filter movies with categories //
function filterByCategory(movie){
  const selectedCategory = selectCategory.value;
  return selectedCategory === 'all' ? true : movie.category.toLowerCase() === selectedCategory.toLowerCase();
} 


//filter movie by input// 
function filterByInput (movie){
  const textsearch = input.value.toLowerCase().trim();
  return textsearch === "" ? true : movie.movie_title.toLowerCase().includes(textsearch);
}

//filter by popular and newer //
function filterBypopular(movie) {
  const sorted = sort.value;
  return sorted === "Popular" ? movie.isPopular === true : sorted === "Newest" ? movie.isPopular === false : true;
}

//function that combine all filters //
function filterAll (){
  let masterFilter = movies
  .filter(filterByCategory)
  .filter(filterByInput)
  .filter(filterBypopular)

  displayMovies(masterFilter)
}

input.addEventListener('input', filterAll)
sort.addEventListener('change', filterAll)
selectCategory.addEventListener('change', filterAll)

filterAll();

//hero section animation//
const featuredMovies = [
  {
    title: "Avengers: Endgame",
    description: "The epic conclusion to the Infinity Saga.",
    image: "https://i.ibb.co/NtbRgx3/avengers.jpg",
    video: "" // optional video
  },
  {
    title: "The Batman",
    description: "Dark and thrilling new Batman story.",
    image: "https://i.ibb.co/F6T1mD5/batman.jpg",
    video: ""
  },
  {
    title: "Frozen 2",
    description: "Anna and Elsa return in this magical adventure.",
    image: "https://i.ibb.co/2y4S6k3/frozen2.jpg",
    video: ""
  }
];

let currentHero = 0;

const heroTitle = document.querySelector('.hero-title');
const heroDesc = document.querySelector('.hero-description');
const heroBg = document.querySelector('.hero-background');

function showHero(index) {
  const movie = featuredMovies[index];

  heroTitle.textContent = movie.title;
  heroDesc.textContent = movie.description;

  if (movie.video) {
    heroBg.innerHTML = `<video src="${movie.video}" autoplay muted loop></video>`;
  } else {
    heroBg.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`;
  }
}

function nextHero() {
  currentHero = (currentHero + 1) % featuredMovies.length;
  showHero(currentHero);
}

// initial display
showHero(currentHero);

// rotate every 8 seconds
setInterval(nextHero, 8000);











