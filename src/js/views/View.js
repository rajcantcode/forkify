import icons from 'url:../../img/icons.svg';

export default class View {
    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    updateData(data) {
        // if (!data || (Array.isArray(data) && data.length === 0))
        //     return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        const newDom = document.createRange().createContextualFragment(markup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        // console.log();
        const curElements = Array.from(this._parentEl.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            // console.log(curEl, newEl.isEqualNode(curEl));
            // console.log(newEl, newEl.firstChild?.nodeValue);

            // Update changed TEXT
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
            ) {
                curEl.textContent = newEl.textContent;
            }

            // Update changed ATTRIBUTES
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name, attr.value);
                });
            }
        });
    }

    _clear() {
        this._parentEl.innerHTML = '';
    }

    renderSpinner() {
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}.svg#icon-loader"></use>
          </svg>
        </div>
        `;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMsg) {
        const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}.svg#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }

    renderSuccess(message = this._successMsg) {
        const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}.svg#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>`;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }
}
