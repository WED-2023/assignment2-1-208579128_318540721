<template>
    <div class="family-recipes">
      <b-container class="my-5">
        <b-row>
          <!-- Lasagna Card -->
          <b-col md="4">
            <b-card class="mb-3">
              <b-card-title>Lasagna</b-card-title>
              <b-card-text>
                Delicious layers of pasta, meat sauce, and cheese baked to perfection.
              </b-card-text>
              <b-button @click="showModal('lasagna')" variant="primary">View Recipe</b-button>
            </b-card>
          </b-col>
          
          <!-- Chocolate Cake Card -->
          <b-col md="4">
            <b-card class="mb-3">
              <b-card-title>Chocolate Cake</b-card-title>
              <b-card-text>
                Moist and rich chocolate cake topped with creamy frosting.
              </b-card-text>
              <b-button @click="showModal('chocolateCake')" variant="primary">View Recipe</b-button>
            </b-card>
          </b-col>
          
          <!-- Chicken Stir Fry Card -->
          <b-col md="4">
            <b-card class="mb-3">
              <b-card-title>Chicken Stir Fry</b-card-title>
              <b-card-text>
                A quick and flavorful stir fry with tender chicken and crisp vegetables.
              </b-card-text>
              <b-button @click="showModal('chickenStirFry')" variant="primary">View Recipe</b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
  
      <!-- Lasagna Modal -->
      <b-modal id="lasagnaModal" title="Lasagna Recipe" v-model="modals.lasagna">
        <p><strong>Ingredients:</strong></p>
        <ul>
          <li>12 lasagna noodles</li>
          <li>1 lb ground beef</li>
          <li>2 cups ricotta cheese</li>
          <li>2 cups shredded mozzarella cheese</li>
          <li>1/2 cup grated Parmesan cheese</li>
          <li>2 jars pasta sauce</li>
          <li>1 egg</li>
          <li>Salt and pepper to taste</li>
        </ul>
        <p><strong>Instructions:</strong></p>
        <ol>
          <li>Preheat oven to 375°F (190°C).</li>
          <li>Cook noodles according to package instructions.</li>
          <li>In a large skillet, cook beef until browned. Drain fat.</li>
          <li>Mix ricotta cheese, egg, salt, and pepper in a bowl.</li>
          <li>Spread a thin layer of sauce in a baking dish. Layer noodles, cheese mixture, beef, and mozzarella. Repeat layers.</li>
          <li>Top with remaining mozzarella and Parmesan.</li>
          <li>Bake for 45 minutes or until cheese is bubbly and golden.</li>
          <li>Let stand 15 minutes before serving.</li>
        </ol>
      </b-modal>
  
      <!-- Chocolate Cake Modal -->
      <b-modal id="chocolateCakeModal" title="Chocolate Cake Recipe" v-model="modals.chocolateCake">
        <p><strong>Ingredients:</strong></p>
        <ul>
          <li>1 and 3/4 cups all-purpose flour</li>
          <li>1 and 1/2 cups granulated sugar</li>
          <li>3/4 cup unsweetened cocoa powder</li>
          <li>1 and 1/2 tsp baking powder</li>
          <li>1 and 1/2 tsp baking soda</li>
          <li>1 tsp salt</li>
          <li>2 large eggs</li>
          <li>1 cup whole milk</li>
          <li>1/2 cup vegetable oil</li>
          <li>2 tsp vanilla extract</li>
          <li>1 cup boiling water</li>
        </ul>
        <p><strong>Instructions:</strong></p>
        <ol>
          <li>Preheat oven to 350°F (175°C). Grease and flour two 9-inch round baking pans.</li>
          <li>In a large bowl, stir together flour, sugar, cocoa, baking powder, baking soda, and salt.</li>
          <li>Add eggs, milk, oil, and vanilla; beat on medium speed for 2 minutes.</li>
          <li>Stir in boiling water (batter will be thin).</li>
          <li>Pour batter into prepared pans.</li>
          <li>Bake 30 to 35 minutes or until a toothpick inserted in center comes out clean.</li>
          <li>Cool 10 minutes; remove from pans to wire racks. Cool completely.</li>
          <li>Frost with your favorite chocolate frosting.</li>
        </ol>
      </b-modal>
  
      <!-- Chicken Stir Fry Modal -->
      <b-modal id="chickenStirFryModal" title="Chicken Stir Fry Recipe" v-model="modals.chickenStirFry">
        <p><strong>Ingredients:</strong></p>
        <ul>
          <li>1 lb chicken breast, cut into strips</li>
          <li>2 cups broccoli florets</li>
          <li>1 red bell pepper, sliced</li>
          <li>1 yellow bell pepper, sliced</li>
          <li>2 cloves garlic, minced</li>
          <li>1/4 cup soy sauce</li>
          <li>2 tbsp olive oil</li>
          <li>1 tbsp cornstarch</li>
          <li>1/2 cup chicken broth</li>
          <li>1 tsp ginger, minced</li>
          <li>Salt and pepper to taste</li>
        </ul>
        <p><strong>Instructions:</strong></p>
        <ol>
          <li>Heat olive oil in a large skillet over medium-high heat.</li>
          <li>Add chicken strips; cook until browned and cooked through. Remove from skillet.</li>
          <li>Add garlic and ginger to skillet; cook for 1 minute.</li>
          <li>Add broccoli and bell peppers; cook until tender-crisp.</li>
          <li>In a small bowl, mix chicken broth, soy sauce, and cornstarch.</li>
          <li>Return chicken to skillet. Pour in broth mixture; cook until sauce has thickened.</li>
          <li>Season with salt and pepper to taste. Serve hot over rice.</li>
        </ol>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    name: "FamilyRecipes",
    data() {
      return {
        modals: {
          lasagna: false,
          chocolateCake: false,
          chickenStirFry: false
        }
      };
    },
    methods: {
      showModal(recipe) {
        this.modals[recipe] = true;
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  .family-recipes {
    padding: 20px;
  }
  </style>
  