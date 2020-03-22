const fetchData = async (searchInput) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b78408a8',
      s: searchInput
    }
  });

  console.log(response.data);
};

const getMoviesData = event => {
  fetchData(event.target.value);
};

const movieSearchInput = document.querySelector('#movie-search');

movieSearchInput.addEventListener('input', debounce(getMoviesData, 500));