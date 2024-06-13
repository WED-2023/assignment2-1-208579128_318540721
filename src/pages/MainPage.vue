<template>
  <div class="container">
    <NavigationBar />
    <h1 class="title">Main Page</h1>
    <b-button variant="primary" @click="$bvModal.show('create-recipe-modal')">Create Recipe</b-button>
    <RecipePreviewList title="Randome Recipes" class="RandomRecipes center" />
    <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to view this</router-link>
    {{ !$root.store.username }}
    <RecipePreviewList
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
    <CreateRecipeModal @save-recipe="saveRecipe" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import CreateRecipeModal from "../components/CreateRecipeModal";

export default {
  components: {
    RecipePreviewList,
    CreateRecipeModal
  },
  methods: {
    saveRecipe(recipe) {
      let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
      recipe.id = Date.now(); // Simple unique ID generation
      recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      this.$root.toast("Success", "Recipe saved successfully!", "success");
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
