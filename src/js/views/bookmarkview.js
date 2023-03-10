import View from './View';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
    _parentEl = document.querySelector('.bookmarks__list');
    _errorMsg = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
    _successMsg = ``;

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }
    _generateMarkup() {
        // console.log(this._data);
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }


}

export default new BookmarkView();