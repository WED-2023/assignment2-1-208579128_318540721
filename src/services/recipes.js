// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import axios from 'axios';


const API_KEY = '99ab614dbe09428a9d9c23702a187dbb'; 
const BASE_URL = 'https://api.spoonacular.com/recipes';



// Function to get a list of recipe previews
export async function getRecipesPreview(amount = 1) {
  try {
    // Call your backend server (localhost:80)
    const response = await axios.get(`http://localhost:80/recipes/recipePreviews`, {
      params: { number: amount },
    });

    console.log('API response:', response.data);

    // Return the fetched recipe previews
    return {
      status: 200,
      data: { recipes: response.data.data },  // response.data is now the array of recipes
    };
  } catch (error) {
    console.error('Error fetching recipe previews:', error);
    return {
      status: error.response ? error.response.status : 500,
      data: { message: error.message },
    };
  }
}


// Function to get a list of recipe previews or full recipe information
export async function mockGetRecipeFullDetails(recipeId) {
  try {
    // Call your backend server (localhost:80)
    const response = await axios.get(`http://localhost:80/recipes/recipe/${recipeId}`);

    console.log('API response:', response.data);

    // Return the fetched recipe details
    return {
      status: 200,
      data: { recipes: response.data.recipes},  // Access the recipe data
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return {
      status: error.response ? error.response.status : 500,
      data: { message: error.message },
    };
  }
}

// Function to get multiple recipes by IDs
export function getRecipesPreviewByIds(recipeIds = []) {
  // Filter the recipe previews to include only those with matching IDs
  const selectedRecipes2 = recipe_preview.filter(recipe => recipeIds.includes(recipe.id));
  console.log(selectedRecipes2)

  // Return an object containing the selected recipes
  return { data: { recipes: selectedRecipes2 } };
}

export async function searchRecipesComplex(params) {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        ...params,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
}
export async function searchRecipes(params) {
  try {
    const response = await axios.get('http://localhost:80/recipes/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error in searchRecipes:', error);
    throw error;
  }
}

  

