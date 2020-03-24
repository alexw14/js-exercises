const createAutoComplete = ({ root, renderOption, onOptionSelect, setInputValue, fetchData }) => {

  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const getData = async (event) => {
    const dataItems = await fetchData(event.target.value);
    if (!dataItems.length) {
      dropdown.classList.remove('is-active');
      return;
    }
    // clear search results
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    // iterate and populate search results
    for (let item of dataItems) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = setInputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener('input', debounce(getData, 500));

  // Global event listener for closing drop down when user clicks out of it
  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });

}