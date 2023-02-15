import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
// In model, we only write code which is required for business logic

export const state = {
    recipe: {},
};

export const loadRecipe = async function (id) {
    try {
        // Load recipe
        const data = await getJSON(`${API_URL}/${id}`)

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
