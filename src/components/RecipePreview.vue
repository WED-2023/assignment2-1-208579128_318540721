<template>
  <div :class="['recipe-preview', { 'clicked': recipe.clicked }]">
    <!-- Wrap the image and details inside the router-link for navigation -->
    <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id }}" tag="div">
      <img :src="recipe.image" alt="recipe image" @mouseover="onHover" @mouseleave="onLeave">
      <div class="recipe-details">
        <h3>{{ recipe.title }}</h3>
        <p>Time: {{ recipe.readyInMinutes }} mins</p>
        <p>Likes: {{ recipe.aggregateLikes }}</p>
        <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</p>
        <p>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
        <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>
      </div>
    </router-link>
    <b-button 
      :variant="recipe.favorite ? 'danger' : 'primary'" 
      @click.stop="toggleFavorite" 
      class="favorite-button"
    >
      {{ recipe.favorite ? 'Remove from Favorites' : 'Add to Favorites' }}
    </b-button>
  </div>
</template>


<script>
export default {
  props: {
    recipe: Object
  },
  methods: {
    handleClick() {
      this.$emit('previewClick', this.recipe.id);
      this.recipe.clicked = true;
      localStorage.setItem(`clicked_${this.recipe.id}`, 'true');

      // Update last viewed list
      let lastViewed = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
      lastViewed = lastViewed.filter(id => id !== this.recipe.id); // Remove if it exists
      lastViewed.unshift(this.recipe.id); // Add to the front
      if (lastViewed.length > 3) lastViewed.pop(); // Keep only the last 3
      localStorage.setItem('lastViewedRecipes', JSON.stringify(lastViewed));

      //this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.id } });
    },
    toggleFavorite() {
      this.recipe.favorite = !this.recipe.favorite;
      let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      
      if (this.recipe.favorite) {
        favorites.push(this.recipe);
      } else {
        favorites = favorites.filter(r => r.id !== this.recipe.id);
      }

      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    },
    onHover(event) {
      event.target.style.cursor = 'pointer';
    },
    onLeave(event) {
      event.target.style.cursor = 'default';
    }
  },
  mounted() {
    this.recipe.favorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]').some(r => r.id === this.recipe.id);
  }
};
</script>

<style scoped>
.recipe-preview {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 300px; /* Fixed width */
  height: 580px; /* Fixed height */
  overflow: hidden; /* Hide overflow content */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.recipe-preview img {
  width: 100%;
  height: auto;
  max-height: 200px; /* Ensure the image fits within the fixed height */
  object-fit: cover; /* Crop the image to fit within the bounds */
}

.recipe-details {
  flex: 1;
}

.favorite-button {
  margin-top: 10px;
}

.clicked {
  background-color: rgb(192, 192, 144);
}

.favorite {
  background-color: red;
  color: white;
}
</style>
