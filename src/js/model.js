import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';
// In model, we only write code which is required for business logic

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        curPage: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key }),
    };
};

export const loadRecipe = async function (id) {
    try {
        // Load recipe
        const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
        state.recipe = createRecipeObject(data);

        // Checking if the loaded recipe is bookmarked already
        state.recipe.bookmarked = state.bookmarks.some(
            bookmark => bookmark.id === id
        );
        console.log(state.recipe);
    } catch (err) {
        console.error(`${err} 💥💥💥💥`);
        throw err;
    }
};

// Function for loading searh results
export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key }),
            };
        });
        state.search.curPage = 1;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Pagination
export const getSearchResultsPage = function (page = state.search.curPage) {
    state.search.curPage = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
};

// Update recipe servings
export const updateRecipeServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    });
    state.recipe.servings = newServings;
};

// Add bookmarks to local storage
const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// Add bookmarks
export const addBookmark = function (recipe) {
    // Push recipe in bookmarks array
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
};

// Delete bookmarks
export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
    state.bookmarks.splice(index, 1);
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmarks();
};

// GET bookmarks from localstorage
const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
};
init();
console.log(state.bookmarks);

// UPLOAD recipe
export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(el => el.trim);
                if (ingArr.length !== 3) {
                    throw new Error(
                        'Wrong ingredient format. Please use the correct format :)'
                    );
                }
                const [quantity, unit, description] = ingArr;
                return { quantity: quantity ? +quantity : null, unit, description };
            });
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };
        const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
        console.log(data);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
};

// CLEAR local storage
const clearBookmarks = function () {
    localStorage.clear('bookmarks');
};
