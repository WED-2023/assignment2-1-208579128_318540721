// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {

  // Shuffle the recipes array to ensure randomness
  const shuffledRecipes = recipe_preview.sort(() => 0.5 - Math.random());


  // Ensure that the amount does not exceed the total number of recipes
  const maxAmount = Math.min(amount, shuffledRecipes.length);

  // Select a random subset of recipes based on the requested amount
  const selectedRecipes = shuffledRecipes.slice(0, maxAmount).map((recipe, index) => ({
    ...recipe,
  }));

  // Return an object containing the selected recipes
  return {
    status: 200, 
    data: { recipes: selectedRecipes } };
}

export function mockGetRecipeFullDetails(recipeId) {

  // Ensure recipeId is an integer
  const id = parseInt(recipeId, 10);

  // Find the recipe with the matching ID
  const selected_recipe = recipe_full_view.find(recipe => recipe.id === id);

  if (selected_recipe) {
    return { data: { recipe: selected_recipe } };
  } else {
    return null; // Handle the case where the recipe is not found
  }
}
export function mockGetRecipesPreviewByIds(recipeIds = []) {
  // Filter the recipe previews to include only those with matching IDs
  const selectedRecipes2 = recipe_preview.filter(recipe => recipeIds.includes(recipe.id));
  console.log(selectedRecipes2)

  // Return an object containing the selected recipes
  return { data: { recipes: selectedRecipes2 } };
}

  

