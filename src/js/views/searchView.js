class SearchView {
    #parentEl = document.querySelector('.search');

    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInputField();
        return query;
    }

    #clearInputField() {
        this.#parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }

}

export default new SearchView();