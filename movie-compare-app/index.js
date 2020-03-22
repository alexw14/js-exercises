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
input.addEventListener('input', (event) => {
  fetchData(event.target.value);
});