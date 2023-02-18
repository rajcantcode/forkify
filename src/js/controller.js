import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkview from './views/bookmarkview.js';

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

    // Update results view to mark selected search results
    resultsView.updateData(model.getSearchResultsPage());

    // Load recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);

    // UPDATING bookmarks view
    bookmarkview.updateData(model.state.bookmarks);

    // controlServings();
  } catch (err) {
    console.error(err);
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
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Load pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

// Controller for Pagination
const controlPagination = function (goToPage) {
  // Load new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render new buttons
  paginationView.render(model.state.search);
};

// Control servings
const controlServings = function (newServing) {
  // Update the recipes servings
  model.updateRecipeServings(newServing);

  // Render new recipe view, after updating servings
  recipeView.updateData(model.state.recipe);
};

// Controller for bookmarks
const controlAddBookmark = function () {
  // Bookmark the recipe, if it is NOT bookmarked
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);

  // REMOVE from bookmarks, if it is already bookmarked
  else if (model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id);

  // UPDATE Recipe view
  recipeView.updateData(model.state.recipe);

  // RENDER bookmarks
  bookmarkview.render(model.state.bookmarks);
}

const controlBookmarks = function () {
  bookmarkview.render(model.state.bookmarks);
}

const init = function () {
  bookmarkview.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearhResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
