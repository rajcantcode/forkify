import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import View from './View.js';

class ResultView extends View {
    _parentEl = document.querySelector('.results');
    _errorMsg = `No recipes found for your query! Please try again :)`;
    _successMsg = ``;

    _generateMarkup() {
        // console.log(this._data);
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new ResultView();
