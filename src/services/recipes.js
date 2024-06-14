// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


export function mockGetRecipesPreview(amount = 1) {
  // Shuffle the recipes array to ensure randomness
  const shuffledRecipes = recipe_preview.sort(() => 0.5 - Math.random());

  // Ensure that the amount does not exceed the total number of recipes
  const maxAmount = Math.min(3, shuffledRecipes.length);

  // Select a random subset of recipes based on the requested amount
  const selectedRecipes = shuffledRecipes.slice(0, maxAmount).map((recipe, index) => ({
    ...recipe,
  }));

  // Return an object containing the selected recipes
  return { data: { recipes: selectedRecipes } };
}

export function mockGetRecipeFullDetails(recipeId) {
  // For simplicity, we can return an empty object since full recipe details are not provided
  return { data: { recipe: {} } };
}
export function mockGetRecipesPreviewByIds(recipeIds = []) {
  // Filter the recipe previews to include only those with matching IDs
  const selectedRecipes2 = recipe_preview.filter(recipe => recipeIds.includes(recipe.id));
  console.log(selectedRecipes2)

  // Return an object containing the selected recipes
  return { data: { recipes: selectedRecipes2 } };
}

  
