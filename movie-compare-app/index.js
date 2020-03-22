const fetchData = async (searchInput) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b78408a8',
      s: searchInput
    }
  });

  console.log(response.data);
};

const input = document.querySelector('#movie-search');

let timeoutId;
const getMoviesData = event => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    fetchData(event.target.value);
  }, 1000);
};

input.addEventListener('input', getMoviesData);