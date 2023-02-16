import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// Polyfilling
import 'core-js/stable';
// Polyfilling async await
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}
// Controller to control recipes
const controlRecipes = async function () {
  try {
    // Get id from window object
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Show spinner until image is loaded
    recipeView.renderSpinner();

    // Load recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.error(err);
    recipeView.renderError();
  }
};

// Controller for search results
const controlSearhResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.state.search.results);
  }
  catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearhResults);
}
init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
