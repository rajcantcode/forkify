import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
    _parentEl = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _successMsg = 'Recipe uploaded successfully :)';
    _html = this._parentEl.innerHTML;

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        if (this._overlay.classList.contains('hidden')) {
            super._clear();
            this._parentEl.insertAdjacentHTML('afterbegin', this._html);
        }
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerUpload(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('In event listener');
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }
    _generateMarkup() { }
}

export default new AddRecipeView();
