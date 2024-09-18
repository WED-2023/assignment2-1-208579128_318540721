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
          @previewClick="handlePreviewClick"
          @updateLastViewed="updateLastViewed"
        />
      </b-col>
    </b-row>
    <div v-if="showLastViewed">
      <h4>Last Viewed Recipes</h4>
      <b-row>
        <b-col v-for="r in lastViewedRecipes" :key="r.id">
          <RecipePreview
            class="recipePreview"
            :recipe="r"
            @previewClick="handlePreviewClick"
            @updateLastViewed="updateLastViewed"
          />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

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
    },
    showLastViewed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recipesWithClickedState: [],
      lastViewedRecipes: []
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
    },
    handlePreviewClick(recipeId) {
      const clickedRecipe = this.recipesWithClickedState.find(r => r.id === recipeId);
      if (clickedRecipe) {
        clickedRecipe.clicked = true;
        this.$forceUpdate(); // Force Vue to re-render
      }
    },
    updateLastViewed(lastViewed) {
      this.lastViewedRecipes = lastViewed;
      localStorage.setItem('lastViewedRecipes', JSON.stringify(lastViewed));
    }
  },
  mounted() {
    this.lastViewedRecipes = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
