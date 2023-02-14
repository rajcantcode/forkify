import * as model from './model.js';
import recipeView from './views/recipeView.js';

// Polyfilling
import 'core-js/stable';
// Polyfilling async await
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// First api call
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
    console.error(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
