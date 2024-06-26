import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import About from "./pages/About.vue";
import MyRecipes from "./pages/MyRecipes.vue"
import FamilyRecipes from "./pages/FamilyRecipes.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/my-recipes",
    name: "MyRecipes",
    component: MyRecipes
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: () => import('./pages/RecipeViewPage'),
    props: true,

  },
  // {
  //   path: "   ",
  //   name: "recipe",
  //   component: () => import("./pages/RecipeViewPage"),
  // },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/family-recipes",
    name: "Family Recipes",
    component: FamilyRecipes
  },
];

export default routes;