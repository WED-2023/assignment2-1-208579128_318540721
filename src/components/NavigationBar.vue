<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar-custom">
      <b-navbar-brand href="#">RecipeApp</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" exact class="nav-link">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/search" class="nav-link">Search</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/about" class="nav-link">About</router-link>
          </b-nav-item>
          <!-- New nav item for Family Recipes -->
          <!-- <b-nav-item>
            <router-link to="/family-recipes" class="nav-link">My Family Recipes</router-link>
          </b-nav-item> -->
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="!$root.store.username">
            <b-navbar-text class="mr-2">Hello Guest</b-navbar-text>
            <b-nav-item>
              <router-link to="/login" class="nav-link">Login</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/register" class="nav-link">Register</router-link>
            </b-nav-item>
          </template>
          <template v-else>
            <b-navbar-text class="mr-2">{{ $root.store.username }}</b-navbar-text>
            <b-nav-item-dropdown right>
              <template #button-content>
                Personal Area
              </template>
              <b-dropdown-item>
                <router-link to="/favorites" class="dropdown-item">My Favorite Recipes</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/my-recipes" class="dropdown-item">My Recipes</router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/family-recipes" class="dropdown-item">My Family Recipes</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item>
              <a @click="logout" class="nav-link">Disconnect</a>
            </b-nav-item>
            <b-nav-item>
              <a @click="showCreateRecipeModal = true" class="nav-link">New Recipe</a>
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Create Recipe Modal -->
    <CreateRecipeModal
      v-if="showCreateRecipeModal"
      :isVisible="showCreateRecipeModal"
      @close="showCreateRecipeModal = false"
      @save-recipe="saveRecipe"
    />
  </div>
</template>

<script>
import CreateRecipeModal from "../components/CreateRecipeModal.vue";

export default {
  components: {
    CreateRecipeModal,
  },
  data() {
    return {
      showCreateRecipeModal: false,
    };
  },
  methods: {
    saveRecipe(recipe) {
      let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
      recipe.id = Date.now(); // Simple unique ID generation
      recipes.push(recipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));
      this.$root.toast("Success", "Recipe saved successfully!", "success");
      this.showCreateRecipeModal = false; // Close the modal
    },
    logout() {
      this.$root.store.username = null;
    }
  }
};
</script>

<style scoped>
.navbar-custom {
  background-image: url('@/assets/navbar-background.png');
  background-size: cover;
  padding: 1rem 2rem;
}
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}
.navbar-nav .nav-link {
  font-size: 1.1rem;
}

</style>
