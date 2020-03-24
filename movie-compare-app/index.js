const fetchMovieData = async (searchInput) => {
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

const getSelectedMovieData = async (movie, summaryElement) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b78408a8',
      i: movie.imdbID
    }
  });
  summaryElement.innerHTML = renderMovieTemplate(response.data);
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

const autoCompleteConfig = {
  renderOption: (movie) => {
    const imgSrc = movie.Poster !== "N/A" ? movie.Poster : '';
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },
  setInputValue: (movie) => {
    return movie.Title;
  },
  fetchData: fetchMovieData
}

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect: (movie) => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    getSelectedMovieData(movie, document.querySelector('#left-summary'));
  }
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect: (movie) => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    getSelectedMovieData(movie, document.querySelector('#right-summary'));
  }
});
