import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MoviesView from "../views/MoviesView.vue";
import AboutView from "../views/AboutView.vue";
import TmdbMovieView from "../views/TmdbMovieView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/movies", name: "movies", component: MoviesView },
    { path: "/about", name: "about", component: AboutView },
    { path: "/tmdb/:id", name: "tmdb-movie", component: TmdbMovieView, props: true },
  ],
});

export default router;
