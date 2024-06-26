<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="ingredients-box">
          <h3>Ingredients:</h3>
          <ul>
            <li v-for="(ingredient, index) in recipe.extendedIngredients" :key="index">
              {{ ingredient.original }}
            </li>
          </ul>
        </div>
        <div class="instructions-box">
          <h3>Instructions:</h3>
          <ol>
            <li v-for="(instruction, index) in recipe.analyzedInstructions" :key="index">
              {{ instruction }}
            </li>
          </ol>
        </div>
        <div class="summary-box mt-4">
          <h3>Summary:</h3>
          <p>{{ recipe.summary }}</p>
        </div>
        <div class="additional-details mt-4">
          <p>Time: {{ recipe.readyInMinutes }} mins</p>
          <p>Likes: {{ recipe.aggregateLikes }}</p>
          <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</p>
          <p>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
          <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      const response = mockGetRecipeFullDetails(this.id);

      if (!response || !response.data || !response.data.recipe) {
        console.error('Recipe not found or invalid response structure:', response);
        this.$router.replace("/NotFound");
        return;
      }

      const {
        analyzedInstructions,
        instructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        summary
      } = response.data.recipe;

      const _recipe = {
        instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        summary
      };

      this.recipe = _recipe;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      this.$router.replace("/NotFound");
    }
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.recipe-header {
  text-align: center;
}

.recipe-body {
  margin-top: 20px;
}

.ingredients-box {
  margin-bottom: 20px;
}

.instructions-box {
  margin-bottom: 20px;
}

.summary-box {
  margin-top: 20px;
}

.additional-details {
  margin-top: 20px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

ol {
  list-style-type: decimal;
  padding-left: 20px;
}

h3 {
  margin-bottom: 10px;
}

p {
  line-height: 1.6;
}
</style>
