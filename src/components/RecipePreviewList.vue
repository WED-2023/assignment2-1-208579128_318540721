<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipesWithClickedState" :key="r.id">
        <RecipePreview
          class="recipePreview"
          :recipe="r"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
import { mockGetRecipesPreview } from "../services/recipes.js";


export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: false
    },
    recipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      recipesWithClickedState: []
    };
  },
  watch: {
    recipes: {
      immediate: true,
      handler(newRecipes) {
        this.updateRecipes(newRecipes);
      }
    }
  },
  methods: {
    updateRecipes(newRecipes) {
      const updatedRecipes = newRecipes.map(recipe => ({
        ...recipe,
        clicked: localStorage.getItem(`clicked_${recipe.id}`) === 'true',
        favorite: localStorage.getItem(`favorite_${recipe.id}`) === 'true'
      }));
      this.recipesWithClickedState = updatedRecipes;

    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
