import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

breedSelect.addEventListener('click', () => {
  try {
    loader.classList.remove('hidden');
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
  loader.classList.add('hidden');
}

breedSelect.addEventListener('change', e => {
  fetchCatByBreed(e.target.value)
    .then(data => renderCat(data[0]))
    .catch(() => {
      showError();
      Notiflix.Loading.remove();
    });
    catInfo.innerHTML = '';
});


function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
          <h2>${name}</h2>
          <img class="image" src="${url}" alt="${name}" />
          <p><strong>Description:</p>
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
      </div>`
  );
}
loader.classList.add('hidden');
Notiflix.Loading.remove();

function showError() {
  loader.classList.add('hidden');
  Notiflix.Report.failure(
    'Error',
    'Upps something went wrong. Try another cat'
  );
}
