import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
// In model, we only write code which is required for business logic

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        curPage: 1,
        resultsPerPage: RES_PER_PAGE
    },
};

export const loadRecipe = async function (id) {
    try {
        // Load recipe
        const data = await getJSON(`${API_URL}${id}`);

        let { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
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
        const data = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            };
        });
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
    })
    state.recipe.servings = newServings
}
