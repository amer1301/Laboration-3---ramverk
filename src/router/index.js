import { createRouter, createWebHistory } from "vue-router";

/*
  Import av vy-komponenter.
  Dessa representerar hela sidor i applikationen och visas beroende
  på vilken route användaren navigerar till.
*/
import HomeView from "../views/HomeView.vue";
import MoviesView from "../views/MoviesView.vue";
import AboutView from "../views/AboutView.vue";
import TmdbMovieView from "../views/TmdbMovieView.vue";

/*
  Skapar en router-instans med HTML5-historik (clean URLs utan #).
  createWebHistory() gör att URL:er ser ut som:
  - /           (startsida)
  - /movies     (lista från API)
  - /tmdb/123   (detaljsida från TMDb)
*/
const router = createRouter({
  history: createWebHistory(),

  /*
    Alla definierade routes för applikationen.
    Varje route mappar en URL-path till en komponent.
  */
  routes: [
    { path: "/", name: "home", component: HomeView }, /* Startsida – visas när användaren går till "/" */
    { path: "/movies", name: "movies", component: MoviesView },  /* Lista över filmer från egen Fastify-backend. URL: /movies */
    { path: "/about", name: "about", component: AboutView }, /* Informationssida om Vue / projektet. URL: /about */

    /*
      Detaljerad vy för en film hämtad från TMDb.
      /tmdb/:id betyder att "id" är en URL-parameter.
      
      props: true → gör att TmdbMovieView automatiskt får "id"
      som en prop istället för att behöva läsa den från useRoute().
      
      Exempel:
      /tmdb/123 → props.id = "123"
    */
    { path: "/tmdb/:id", name: "tmdb-movie", component: TmdbMovieView, props: true },
  ],
});

/*
  Exporterar router-instansen så att main.js kan använda den
  när Vue-applikationen skapas.
*/
export default router;
