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

// Global event listener for closing drop down when user clicks out of it
document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});