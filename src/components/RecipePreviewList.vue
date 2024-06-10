<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
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
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const amountToFetch = 5;
        const response = await mockGetRecipesPreview(amountToFetch);

        const recipes = response.data.recipes.map(recipe => ({
          ...recipe,
          clicked: localStorage.getItem(`clicked_${recipe.id}`) === 'true',
          favorite: localStorage.getItem(`favorite_${recipe.id}`) === 'true'
        }));

        this.recipes = recipes;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
