<template>
  <div>
    <h1>Recipe Search</h1>
    <b-form @submit.prevent="searchRecipes">
      <b-form-input v-model="query" placeholder="Search for recipes..." class="mb-2"></b-form-input>
      
      <b-form-group label="Cuisine:">
        <b-form-select v-model="selectedCuisine" :options="cuisineOptions"></b-form-select>
      </b-form-group>
      
      <b-form-group label="Diet:">
        <b-form-select v-model="selectedDiet" :options="dietOptions"></b-form-select>
      </b-form-group>
      
      <b-form-group label="Intolerances:">
        <b-form-select v-model="selectedIntolerances" :options="intoleranceOptions" multiple></b-form-select>
      </b-form-group>
      
      <b-form-group label="Results per page:">
        <b-form-select v-model="resultsPerPage" :options="[5, 10, 15]"></b-form-select>
      </b-form-group>
      
      <b-button type="submit" variant="primary">Search</b-button>
    </b-form>

    <div v-if="loading">Loading...</div>
    <div v-else-if="recipes.length > 0">
      <h2>Search Results</h2>
      <b-form-group label="Sort by:">
        <b-form-select v-model="sortBy" :options="sortOptions" @change="sortRecipes"></b-form-select>
      </b-form-group>
      <div v-for="recipe in recipes" :key="recipe.id">
        <RecipePreview :recipe="recipe" />
      </div>
    </div>
    <div v-else-if="hasSearched">No results found.</div>
  </div>
</template>

<script>
import { searchRecipes } from '@/services/recipes';
import RecipePreview from '@/components/RecipePreview.vue';

export default {
  components: { RecipePreview },
  data() {
    return {
      query: '',
      selectedCuisine: '',
      selectedDiet: '',
      selectedIntolerances: [],
      resultsPerPage: 5,
      recipes: [],
      loading: false,
      hasSearched: false,
      sortBy: 'popularity',
      cuisineOptions: [
        { value: '', text: 'All Cuisines' },
        { value: 'italian', text: 'Italian' },
        { value: 'mexican', text: 'Mexican' },
        // Add more cuisines as needed
      ],
      dietOptions: [
        { value: '', text: 'No Specific Diet' },
        { value: 'vegetarian', text: 'Vegetarian' },
        { value: 'vegan', text: 'Vegan' },
        // Add more diets as needed
      ],
      intoleranceOptions: [
        { value: 'dairy', text: 'Dairy' },
        { value: 'egg', text: 'Egg' },
        { value: 'gluten', text: 'Gluten' },
        // Add more intolerances as needed
      ],
      sortOptions: [
        { value: 'popularity', text: 'Popularity' },
        { value: 'time', text: 'Preparation Time' },
      ],
    };
  },
  methods: {
    async searchRecipes() {
      this.loading = true;
      this.hasSearched = true;
      try {
        const response = await searchRecipes({
          query: this.query,
          cuisine: this.selectedCuisine,
          diet: this.selectedDiet,
          intolerances: this.selectedIntolerances.join(','),
          number: this.resultsPerPage,
        });
        this.recipes = response.results;
        this.sortRecipes();
        localStorage.setItem('lastSearch', JSON.stringify({
          query: this.query,
          cuisine: this.selectedCuisine,
          diet: this.selectedDiet,
          intolerances: this.selectedIntolerances,
          resultsPerPage: this.resultsPerPage,
        }));
      } catch (error) {
        console.error('Error searching recipes:', error);
      } finally {
        this.loading = false;
      }
    },
    sortRecipes() {
      this.recipes.sort((a, b) => {
        if (this.sortBy === 'popularity') {
          return b.aggregateLikes - a.aggregateLikes;
        } else if (this.sortBy === 'time') {
          return a.readyInMinutes - b.readyInMinutes;
        }
      });
    },
  },
  mounted() {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    if (lastSearch) {
      this.query = lastSearch.query;
      this.selectedCuisine = lastSearch.cuisine;
      this.selectedDiet = lastSearch.diet;
      this.selectedIntolerances = lastSearch.intolerances;
      this.resultsPerPage = lastSearch.resultsPerPage;
      this.searchRecipes();
    }
  },
};
</script>
