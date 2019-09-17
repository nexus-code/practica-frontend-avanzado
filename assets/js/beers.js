import {
    toggleClass,
    renderLoader
} from './ui.js';
import api from './api.js';

const templateBeer = ({
    principal,
    name,
    image,
    summary,
    id
}) => `
  <a href="/detail/${id}">
    <div class="card ${principal ? 'principal' : 'secondary close'}">
      <header class="card-header">
        <h2>${name}</h2>
      </header>
      <div class="card-content">
        <div class="card-content-image">
          <img src="${image ? image.medium : '/src/images/default.jpg'}">
        </div>
        <div class="card-content-text">
          <p>${summary}
          </p>
          <div class="rating-container">
            <button class="icon">
              <i class="fas fa-star"></i>
            </button>
            <button class="icon">
              <i class="far fa-star"></i>
            </button>
            <button class="icon">
              <i class="far fa-star"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </a>
`;

const renderBeers = (element, beers) => {
    const htmlBeers = beers.slice(0, 6).map((beer, index) => {
        if (index < 2) {
            return templateBeer({
                ...beer,
                principal: true
            });
        }
        return templateBeer({
            ...beer,
            principal: false
        });
    }).join('');
    element.innerHTML = `
    <div class="beer-section">
      ${htmlBeers}
    </div>
  `;
    // codigo para manejar los header
    const headers = document.querySelectorAll('.card.secondary .card-header');
    headers.forEach(header => {
        const element = header.parentNode;
        header.addEventListener('click', evt => {
            evt.preventDefault();
            toggleClass(element, 'close');
        });
    });
};

const {
    getBeers
} = api();

const renderBeersDOM = async text => {
    try {
        renderLoader('hide', 'beer');
        const mainSection = document.querySelector('main');
        const items = await getBeers(text);
        renderBeers(mainSection, items);
    } catch (err) {
        console.error(err);
    } finally {
        renderLoader('beer', 'hide');
    }
};

export {
    renderBeersDOM
};
