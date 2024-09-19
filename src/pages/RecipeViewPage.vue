<template>
  <div v-if="recipe" class="recipe-view">
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />

    <!-- Render Ingredients if they exist -->
    <h3 v-if="recipe.extendedIngredients">Ingredients:</h3>
    <ul v-if="recipe.extendedIngredients && recipe.extendedIngredients.length">
      <li v-for="ingredient in recipe.extendedIngredients" :key="ingredient.id">
        {{ ingredient.amount }} {{ ingredient.unit }} of {{ ingredient.nameClean || ingredient.name }} 
        ({{ ingredient.original || ingredient.name }})
      </li>
    </ul>

    <!-- Render Instructions differently based on the recipe source -->
    <h3>Instructions:</h3>
    <div v-if="recipe.analyzedInstructions && recipe.analyzedInstructions.length">
      <ol>
        <li v-for="step in recipe.analyzedInstructions[0]?.steps" :key="step.number">
          {{ step.step }}
        </li>
      </ol>
    </div>
    <div v-else>
      <p v-html="recipe.instructions.split('\n\n').join('<br/><br/>')"></p>
    </div>

    <!-- Additional Information -->
    <h3>Additional Information</h3>
    <ul>
      <li>Ready in: {{ recipe.readyInMinutes || recipe.ready_in_minutes }} minutes</li>
      <li v-if="recipe.servings">Servings: {{ recipe.servings }}</li>
      <li v-if="recipe.healthScore">Health Score: {{ recipe.healthScore }}</li>
      <li v-if="recipe.aggregate_likes">Likes: {{ recipe.aggregate_likes }}</li>
      <li>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</li>
      <li>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</li>
      <li>Gluten-Free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</li>
    </ul>
  </div>

  <div v-else>
    <p>Loading recipe details...</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RecipeViewPage",
  props: ["id"], // Accept the id prop
  data() {
    return {
      recipe: null,
      errorMessage: "",
    };
  },
  async created() {
    try {
      // Single API call, let the server handle which data to return
      const response = await axios.get(`http://localhost:80/recipes/recipe/${this.id}`);
      
      if (response.data.success) {
        this.recipe = response.data.data;
      } else {
        this.errorMessage = response.data.message;
      }
    } catch (error) {
      this.errorMessage = "Failed to load recipe. Please try again.";
    }
  },
};
</script>

<style scoped>
.recipe-view {
  margin: 20px;
}

.recipe-image {
  width: 100%;
  max-width: 400px;
}

ul {
  list-style-type: none;
  padding: 0;
}

h3 {
  margin-top: 20px;
}
</style>
