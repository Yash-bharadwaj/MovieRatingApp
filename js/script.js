const global = {
    currentPage : window.location.pathname,
    search: {
      term : '',
      type: '',
      page: 1,
      totalPages: 1,
      totalResults: 0
    },
    api:{
      key: 'a0a67704154e554ef2ec546967b053c0',
      url: 'https://api.themoviedb.org/3/'
    }
};

function highlightActivePageLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link)=>{
        if (link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
}
async function displayPopularMovie(){
    const { results } = await fetchAPIData('/movie/popular');

    results.forEach((movie)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = 
        `
        
          <a href="movie-details.html?id=${movie.id}">
           ${
               movie.poster_path
               ? ` <img
               src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
               class="card-img-top"
               alt="${movie.title}"
             />`
              
             :
             `
             <img
             src="../images/no-image.jpg"
             class="card-img-top"
             alt="${movie.title}"
           />`
            

           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>
        
        `;
        document.querySelector('#popular-movies').appendChild(div);
    });
}


async function displayPopularShows(){
    const { results } = await fetchAPIData('/tv/popular');

    results.forEach((show)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = 
        `
        
          <a href="tv-details.html?id=${show.id}">
           ${
               show.poster_path
               ? ` <img
               src="https://image.tmdb.org/t/p/w500${show.poster_path}"
               class="card-img-top"
               alt="${show.name}"
             />`
              
             :
             `
             <img
             src="../images/no-image.jpg"
             class="card-img-top"
             alt="${show.name}"
           />`
            

           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date:${show.first_air_date}</small>
            </p>
          </div>
        
        `;
        document.querySelector('#popular-shows').appendChild(div);
    });

}

async function displayShowDetails(){
  const showId = window.location.search.split('=')[1];
  const show = await fetchAPIData(`/tv/${showId}`);
  
  
  addBackDrop('tv',show.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
      show.poster_path
      ? ` <img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
     
    :
    `
    <img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
  />`
   

  }
  </div>
  <div>
  <h2>${show.name}</h2>
  <p>
    <i class="fas fa-star text-primary"></i>
    ${show.vote_average.toFixed(1)} / 10
  </p>
  <p class="text-muted">Release Date: ${show.last_air_date}</p>
  <p>
  ${show.overview}
  </p>
  <h5>Genres</h5>
  <ul class="list-group">
  ${show.genres.map((genre)=> `<li>${genre.name}</li>`).join('')}
  </ul>
  <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
</div>
</div>
<div class="details-bottom">
<h2>Show Info</h2>
<ul>
  <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
  <li>
    <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
  </li>
  <li><span class="text-secondary">Status:</span> ${show.status}</li>
</ul>
<h4>Production Companies</h4>
<div class="list-group">${show.production_companies.map((company)=>`<span>${company.name}</span>`).join(', ')}.</div>
</div>

</div>
  
  `;
  document.querySelector('#show-details').appendChild(div);


}

async function displySlider(){
  const {results } = await fetchAPIData('/movie/now_playing')
  
  results.forEach((movie)=>{
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
  div.innerHTML = `
  
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
          
  `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
  

}

function initSwiper(){
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

async function displayMovieDetails(){
  const movieId = window.location.search.split('=')[1];
  

  const movie = await fetchAPIData(`/movie/${movieId}`);

  // overlaybackdrop 
  addBackDrop('movie',movie.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
      movie.poster_path
      ? ` <img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />`
     
    :
    `
    <img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${movie.title}"
  />`
   

  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
     ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre)=> `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addComasToNumber(movie.budget)}</li>
    <li><span class="text-secondary">Revenue:</span> $${addComasToNumber(movie.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
  ${movie.production_companies.map((company)=>`<span>${company.name}</span>`).join(', ')}.
  </div>
</div>
  
  `;
  document.querySelector('#movie-details').appendChild(div);
}

function showSpinner (){
    document.querySelector('.spinner').classList.add('.show');
}
function hideSpinner (){
    document.querySelector('.spinner').classList.remove('.show');
}

function addBackDrop(type,backdroppath){
  const div = document.createElement('div')
  div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdroppath})`;
div.style.backgroundSize = 'cover';
div.style.backgroundPosition = 'center';
div.style.backgroundRepeat = 'no-repeat';
div.style.height = '100vh';
  div.style.width = '100vw';
  div.style.position = 'absolute';
  div.style.top = '0';
  div.style.left = '0';
  div.style.zIndex = '-1';
  div.style.opacity = '0.1';

  if(type === 'movie'){
    document.querySelector('#movie-details').appendChild(div);
  }else{
    document.querySelector('#show-details').appendChild(div);
  }

}

async function fetchAPIData(endpoint) {
    const apiKey = global.api.key;
    const API_URL = global.api.url;
    showSpinner();
  
    const response = await fetch(`${API_URL}${endpoint}?api_key=${apiKey}`);
    const data = await response.json();
    hideSpinner();
    return data;
 
}
async function searchAPIData() {
    const apiKey = global.api.key;
    const API_URL = global.api.url;
    showSpinner();
  
    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${apiKey}&query=${global.search.term}&page=${global.search.page}`);
    const data = await response.json();

    hideSpinner();
    
  
    return data;
 
}



function addComasToNumber(number){
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

async function searchData(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.term = urlParams.get('search-term');
  global.search.type = urlParams.get('type');
  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;
    if (results.length === 0) {
      customAlert('No results found');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';
  } else {
    customAlert('Please enter a search term');
  }
}

function displaySearchResults(results){

  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach((result)=>{
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = 
    `
    
      <a href="${global.search.type}.html?id=${result.id}">
       ${
           result.poster_path
           ? ` <img
           src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
           class="card-img-top"
           alt="${global.search.type === 'movie' ? result.title : result.name}"
         />`
          
         :
         `
         <img
         src="../images/no-image.jpg"
         class="card-img-top"
         alt="${global.search.type === 'movie' ? result.title : result.name}"
       />`
        

       }
      </a>
      <div class="card-body">
        <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release:${global.search.type === 'movie' ? result.release_date : result.first_air_date}</small>
        </p>
      </div>
    
    `;
    document.querySelector('#search-results-heading').innerHTML = `
     <h2>${results.length} of ${global.search.totalResults} Result for ${global.search.term}</h2>
    `;
    
    document.querySelector('#search-results').appendChild(div);
});

displayPagination();

}

function displayPagination(){
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>

  `;
  document.querySelector('#pagination').appendChild(div);
  if (global.search.page === 1){
    document.querySelector('#prev').disabled = true ; }
  if (global.search.page === global.search.totalPages){
    document.querySelector('#next').disabled = true ; }

    document.querySelector('#next').addEventListener('click',async ()=>{
      global.search.page++;
      const {results , total_pages} = await searchAPIData();
      displaySearchResults(results);
    });
    document.querySelector('#prev').addEventListener('click',async ()=>{
      global.search.page-- ;
      const {results , total_pages} = await searchAPIData();
      displaySearchResults(results);
    });
}

function customAlert(message,classname='error'){
  const alertEl = document.createElement('div')
  alertEl.classList.add('alert',classname);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  setTimeout(() => alertEl.remove(), 3000);
}

function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
           displySlider();
           displayPopularMovie();
            break;
        case '/movie-details.html':
          displayMovieDetails();
            break;
        case '/search.html':
            searchData();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/tv-details.html':
          displayShowDetails();
            break;
    }

    highlightActivePageLink();
}

document.addEventListener('DOMContentLoaded',init);