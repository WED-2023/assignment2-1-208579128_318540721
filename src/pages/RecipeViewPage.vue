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
            <li v-for="(step, index) in recipe.analyzedInstructions[0].steps" :key="index">
              <p><strong>Step {{ step.number }}:</strong> {{ step.step }}</p>
              
              <div v-if="step.ingredients.length">
                <strong>Ingredients:</strong>
                <ul>
                  <li v-for="ingredient in step.ingredients" :key="ingredient.id">
                    {{ ingredient.name }} <img :src="`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`" alt="ingredient image" />
                  </li>
                </ul>
              </div>
              
              <div v-if="step.equipment.length">
                <strong>Equipment:</strong>
                <ul>
                  <li v-for="equipment in step.equipment" :key="equipment.id">
                    {{ equipment.name }} <img :src="`https://spoonacular.com/cdn/equipment_100x100/${equipment.image}`" alt="equipment image" />
                  </li>
                </ul>
              </div>

              <div v-if="step.length">
                <p><strong>Time:</strong> {{ step.length.number }} {{ step.length.unit }}</p>
              </div>
            </li>
          </ol>
        </div>
        <div class="summary-box mt-4">
          <h3>Summary:</h3>
          <p v-html="formattedSummary"></p>
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
      recipe: null,
      formattedSummary: ''
    };
  },
  async created() {
    try {
      console.log(this.id);
      const response = await mockGetRecipeFullDetails(this.id);

      if (!response || !response.data || !response.data.recipe) {
        this.$router.replace("/NotFound");
        return;
      }

      const {
        analyzedInstructions,
        extendedIngredients,
        image,
        title,
        summary
      } = response.data.recipe;

      this.recipe = {
        analyzedInstructions,
        extendedIngredients,
        image,
        title,
        summary
      };

      this.formattedSummary = this.formatSummary(summary);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      this.$router.replace("/NotFound");
    }
  },
  methods: {
    formatSummary(summary) {
      // Simple parsing and formatting for demonstration
      // You may need to adjust this based on the actual content structure
      return summary
        .replace(/@.*?\./, '') // Remove source references
        .replace(/<\/b>/g, '</strong>') // Convert <b> to <strong>
        .replace(/<b>/g, '<strong>'); // Convert <b> to <strong>
    }
  }
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

img {
  max-width: 100px;
  margin-left: 10px;
}
</style>
