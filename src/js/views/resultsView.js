import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultView extends View {
    _parentEl = document.querySelector('.results');
    _errorMsg = `No recipes found for your query! Please try again :)`;
    _successMsg = ``;

    _generateMarkup() {
        console.log(this._data);
        return this._data.map(recipe => this._generateMarkupPreview(recipe)).join('');

    }

    _generateMarkupPreview(result) {
        const id = window.location.hash.slice(1);
        return `
        <li class="preview">
            <a class="preview__link ${result.id === id ? 'preview-link-active' : ''}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>`;
    }
}

export default new ResultView();
