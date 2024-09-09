// src/services/recipes.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import axios from 'axios';

const API_KEY = '99ab614dbe09428a9d9c23702a187dbb'; 
const BASE_URL = 'https://api.spoonacular.com/recipes';



// Function to get a list of recipe previews
export async function getRecipesPreview(amount = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/random`, {
      params: {
        number: amount, // The number of recipes to fetch
        apiKey: API_KEY,
      },
    });

    console.log('API response:', response.data);
    console.log('API response:', response);
    console.log('API response:', response.data.recipes);
  
    // Return the fetched recipes
    return {
      status: 200,
      //data: { recipes: response.data.recipes },
      data: { recipes: response.data.recipes },
    };
  } catch (error) {
    console.error('Error fetching recipe previews:', error);
    return { status: error.response.status, data: { message: error.message } };
  }
}

// Function to get full recipe details by ID
export async function mockGetRecipeFullDetails(recipeId) {
  try {
    const response = await axios.get(`${BASE_URL}/${recipeId}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });

    // Return the full recipe details
    return { data: { recipe: response.data } };
  } catch (error) {
    console.error('Error fetching full recipe details:', error);
    return null;
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

  

