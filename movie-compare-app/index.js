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
  dropdown.classList.add('is-active');
  for (let movie of moviesData) {
    const option = document.createElement('a');
    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${movie.Poster}" />
      ${movie.Title}
    `;
    resultsWrapper.appendChild(option);
  }
};

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