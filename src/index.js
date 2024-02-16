import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';


const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('click', () => {
  try {
    fetchBreeds().then(data => renderSelect(data));
  } catch (error) {
    console.log(error);
  }
});

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
}

breedSelect.addEventListener('change', e => {
  fetchCatByBreed(e.target.value).then(data => renderCat(data[0]));
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
          <h2>${name}</h2>
          <img src="${url}" alt="${name}" />
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
      </div>`
  );
}
