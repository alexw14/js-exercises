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

let leftMovie;
let rightMovie;
const getSelectedMovieData = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'b78408a8',
      i: movie.imdbID
    }
  });
  summaryElement.innerHTML = renderMovieTemplate(response.data);
  if (side === "left") leftMovie = response.data;
  if (side === "right") rightMovie = response.data;
  if (leftMovie && rightMovie) {
    getMovieComparison();
  }
}

const getMovieComparison = () => {
  const leftSideStats = document.querySelectorAll('#left-summary .notification');
  const rightSideStats = document.querySelectorAll('#right-summary .notification');
  leftSideStats.forEach((leftStat, idx) => {
    const rightStat = rightSideStats[idx];
    // retrieve value from data-value attribute
    const leftSideValue = parseInt(leftStat.dataset.value);
    const rightSideValue = parseInt(rightStat.dataset.value);
    if (rightSideValue > leftSideValue) {
      leftStat.classList.add('is-warning');
      leftStat.classList.remove('is-primary');
      rightStat.classList.add('is-primary');
      rightStat.classList.remove('is-warning')
    } else {
      leftStat.classList.add('is-primary');
      leftStat.classList.remove('is-warning');
      rightStat.classList.add('is-warning');
      rightStat.classList.remove('is-primary');
    }
  });
}

const renderMovieTemplate = (movieData) => {
  const dollars = parseInt(movieData.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
  const metascore = parseInt(movieData.Metascore);
  const imdbRating = parseFloat(movieData.imdbRating);
  const imdbVotes = parseInt(movieData.imdbVotes.replace(/,/g, ''));
  const awards = movieData.Awards.split(' ').reduce((prev, curr) => {
    const value = parseInt(curr);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

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
    <article class="notification is-primary" data-value=${awards}>
      <p class="title">${movieData.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary" data-value=${dollars}>
      <p class="title">${movieData.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary" data-value=${metascore}>
      <p class="title">${movieData.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary" data-value=${imdbRating}>
      <p class="title">${movieData.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary" data-value=${imdbVotes}>
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
    getSelectedMovieData(movie, document.querySelector('#left-summary'), 'left');
  }
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect: (movie) => {
    document.querySelector('.tutorial').classList.add('is-hidden');
    getSelectedMovieData(movie, document.querySelector('#right-summary'), 'right');
  }
});
