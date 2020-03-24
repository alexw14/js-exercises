const fetchData = async (searchInput) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b78408a8',
      s: searchInput
    }
  });
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};

const getMoviesData = async (event) => {
  const moviesData = await fetchData(event.target.value);
  if (!moviesData.length) {
    dropdown.classList.remove('is-active');
    return;
  }
  // clear search results
  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  // iterate and populate search results
  for (let movie of moviesData) {
    const option = document.createElement('a');
    const imgSrc = movie.Poster !== "N/A" ? movie.Poster : '';
    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;
    option.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
      movieSearchInput.value = movie.Title;
      getSelectedMovieData(movie);
    });
    resultsWrapper.appendChild(option);
  }
};

const getSelectedMovieData = async (movie) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b78408a8',
      i: movie.imdbID
    }
  });
  document.querySelector('.movie-summary').innerHTML = renderMovieTemplate(response.data);
}

const renderMovieTemplate = (movieData) => {
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieData.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieData.Title}</h1>
          <h4>${movieData.Genre}</h4>
          <p>${movieData.Plot}</p>
        </div>
      </div>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieData.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieData.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieData.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieData.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieData.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
}

const root = document.querySelector('.movie-search');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const movieSearchInput = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

movieSearchInput.addEventListener('input', debounce(getMoviesData, 500));

// Global event listener for closing drop down when user clicks out of it
document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});