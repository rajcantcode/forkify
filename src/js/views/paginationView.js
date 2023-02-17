import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentEl = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goTo = +btn.dataset.goto
            // console.log(goTo);
            handler(goTo);
        })
    }

    _generateMarkup() {
        console.log(this._data.results);
        const curPage = this._data.curPage;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );
        console.log(numPages);

        // If page 1 and other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateNextBtnMarkup(curPage);
        }
        // If page 1 is last page
        if (curPage === numPages && numPages == 1) {
            return ``;
        }
        // In between pages from 1 to numPages
        if (curPage < numPages) {
            return `${this._generatePrevBtnMarkup(curPage)}${this._generateNextBtnMarkup(curPage)}`;
        }
        // Last page
        if (curPage === numPages && numPages > 1) {
            return this._generatePrevBtnMarkup(curPage);
        }
    }

    _generatePrevBtnMarkup(curPage) {
        return `
        <button data-goto ="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `
    }

    _generateNextBtnMarkup(curPage) {
        return `<button data-goto ="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }


}
export default new PaginationView();
