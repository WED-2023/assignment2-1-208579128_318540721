<template>
  <div>
    <div class="background-container"></div>
    <div class="container">
      <h1 class="title">Search Recipes</h1>
      <b-form @submit.prevent="searchRecipes">
        <b-form-input
          v-model="query"
          placeholder="Search for recipes..."
          class="mr-sm-2 mb-2"
        ></b-form-input>
        <b-form-group label="Time (in minutes):" class="mb-2">
          <b-form-input type="number" v-model="maxTime" placeholder="Max time"></b-form-input>
        </b-form-group>
        <b-form-group label="Minimum Likes:" class="mb-2">
          <b-form-input type="number" v-model="minLikes" placeholder="Minimum likes"></b-form-input>
        </b-form-group>
        <b-form-checkbox v-model="isVegan" class="mb-2">Vegan</b-form-checkbox>
        <b-form-checkbox v-model="isVegetarian" class="mb-2">Vegetarian</b-form-checkbox>
        <b-form-checkbox v-model="isGlutenFree" class="mb-2">Gluten-free</b-form-checkbox>
        <b-form-group label="Results per page:" class="mb-2">
          <b-form-select v-model="resultsPerPage" :options="[5, 10, 15]"></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="outline-success">Search</b-button>
      </b-form>

      <div v-if="loading" class="mt-3">Loading...</div>
      <div v-else-if="error" class="mt-3">Error: {{ error }}</div>
      <div v-else-if="recipes.length > 0" class="recipes-grid mt-3">
        <RecipePreview
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
          @updateLastViewed="handleLastViewedUpdate"
        />
      </div>
      <div v-else class="mt-3">No results found.</div>
    </div>
  </div>
</template>

<script>
import { searchRecipesComplex } from '@/services/recipes';
import RecipePreview from '@/components/RecipePreview.vue';

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      query: '',
      recipes: [],
      maxTime: null,
      minLikes: null,
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      resultsPerPage: 5,
      loading: false,
      error: null
    };
  },
  methods: {
    async searchRecipes() {
      this.loading = true;
      this.error = null;
      try {
        const params = {
          query: this.query,
          number: this.resultsPerPage,
          maxReadyTime: this.maxTime,
          minLikes: this.minLikes,
          diet: this.isVegan ? 'vegan' : (this.isVegetarian ? 'vegetarian' : undefined),
          intolerances: this.isGlutenFree ? 'gluten' : undefined,
          addRecipeInformation: true,
          fillIngredients: true
        };
        const response = await searchRecipesComplex(params);
        this.recipes = response.results.map(recipe => ({
          ...recipe,
          vegan: recipe.vegan,
          vegetarian: recipe.vegetarian,
          glutenFree: recipe.glutenFree,
          readyInMinutes: recipe.readyInMinutes,
          aggregateLikes: recipe.aggregateLikes
        }));
        sessionStorage.setItem('lastSearch', this.query);
      } catch (error) {
        this.error = 'Failed to fetch recipes. Please try again.';
        console.error('Error fetching recipes:', error);
      } finally {
        this.loading = false;
      }
    },
    handleLastViewedUpdate(lastViewed) {
      // Update last viewed recipes in localStorage
      localStorage.setItem('lastViewedRecipes', JSON.stringify(lastViewed));
    }
  },
  mounted() {
    this.query = sessionStorage.getItem('lastSearch') || '';
    if (this.query) {
      this.searchRecipes();
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  position: relative;
  filter: none;
  background: rgba(255, 255, 255, 0.8);
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  filter: none;
}

@media (max-width: 800px) {
  .recipes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .recipes-grid {
    grid-template-columns: 1fr;
  }
}
</style>