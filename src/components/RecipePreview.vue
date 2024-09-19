<template>
  <div :class="['recipe-preview', { 'clicked': isClicked }]" @click="handleClick">
    <img :src="recipe.image" alt="recipe image" @mouseover="onHover" @mouseleave="onLeave">
    <div class="recipe-details">
      <h3>{{ recipe.title }}</h3>
      <p>Time: {{ recipe.readyInMinutes }} mins</p>
      <p>Likes: {{ recipe.aggregateLikes }}</p>
      <p>Vegan: {{ recipe.vegan ? 'Yes' : 'No' }}</p>
      <p>Vegetarian: {{ recipe.vegetarian ? 'Yes' : 'No' }}</p>
      <p>Gluten-free: {{ recipe.glutenFree ? 'Yes' : 'No' }}</p>
    </div>

    <!-- Add to Favorites Button -->
    <b-button 
      @click.stop="addToFavorite" 
      class="favorite-button"
      variant="primary"
    >
      Add to Favorites
    </b-button>

    <!-- Remove from Favorites Button -->
    <b-button 
      @click.stop="removeFromFavorite" 
      class="remove-favorite-button"
      variant="danger"
    >
      Remove from Favorites
    </b-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RecipePreview',
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isClicked: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('previewClick', this.recipe.id);
      this.isClicked = true;
      localStorage.setItem(`clicked_${this.recipe.id}`, 'true');

      // Update last viewed list
      let lastViewed = JSON.parse(localStorage.getItem('lastViewedRecipes')) || [];
      lastViewed = lastViewed.filter(r => r.id !== this.recipe.id);
      lastViewed.unshift(this.recipe);
      if (lastViewed.length > 3) lastViewed.pop();
      localStorage.setItem('lastViewedRecipes', JSON.stringify(lastViewed));

      // Emit an event to notify parent component about the change in last viewed recipes
      this.$emit('updateLastViewed', lastViewed);

      // Programmatic navigation
      this.$router.push({ name: 'recipe', params: { id: this.recipe.id } });
    },
    
    // Add to Favorites
    async addToFavorite() {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          alert('Please log in to add favorites.');
          return;
        }

        // Add to favorites
        await axios.post('http://localhost:80/recipes/favorites', {
          username: username,
          recipeId: this.recipe.id
        });

        alert('Recipe added to favorites!');
        this.$emit('favoriteToggled', this.recipe.id, true);
      } catch (error) {
        console.error('Error adding to favorites:', error);
        alert('An error occurred while adding to favorites. Please try again.');
      }
    },

    // Remove from Favorites
    async removeFromFavorite() {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          alert('Please log in to remove favorites.');
          return;
        }

        // Remove from favorites
        console.log("The receipe:", this.recipe)
        await axios.delete(`http://localhost:80/recipes/favorites/${username}/${this.recipe.id}`);

        alert('Recipe removed from favorites!');
        this.$emit('favoriteToggled', this.recipe.id, false);
      } catch (error) {
        console.error('Error removing from favorites:', error);
        alert('An error occurred while removing from favorites. Please try again.');
      }
    },

    onHover(event) {
      event.target.style.cursor = 'pointer';
    },

    onLeave(event) {
      event.target.style.cursor = 'default';
    }
  },
  mounted() {
    this.isClicked = localStorage.getItem(`clicked_${this.recipe.id}`) === 'true';
  }
};
</script>

<style scoped>
.recipe-preview {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
  width: 300px;
  height: 580px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.recipe-preview img {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
}

.recipe-details {
  flex: 1;
}

.favorite-button, .remove-favorite-button {
  margin-top: 10px;
}

.clicked {
  background-color: rgb(192, 192, 144);
}
</style>
