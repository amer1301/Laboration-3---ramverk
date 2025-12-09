<template>
  <section>
    <h1>Administrera skräckfilmer (Fastify-API)</h1>
    <p class="lead">
      Här hämtas data från min Fastify-webbtjänst på Render. Det går att lägga
      till och radera filmer via Fetch-anrop.
    </p>

    <MovieForm @add-movie="handleAddMovie" />

    <!-- Felmeddelande visas vid API-fel -->
    <p v-if="error" class="error">{{ error }}</p>
    <!-- Laddningsindikator -->
    <p v-if="loading">Laddar filmer...</p>

      <!--
      Två-kolumnslayout:
      - Filmer som inte är sedda (att se)
      - Filmer som användaren markerat som sedda
      -->
    <div v-if="!loading" class="columns">
      <section class="column">
        <h2>Filmer jag ska se</h2>
        <MovieTable
          :movies="plannedMovies"
          :posters="posters"
          :show-scary-column="false"
          :show-seen-column="false"
          @request-delete="requestDeleteMovie"
        />
      </section>

      <section class="column">
        <h2>Filmer jag har sett</h2>
        <MovieTable
          :movies="seenMovies"
          :posters="posters"
          :show-scary-column="true"
          :show-seen-column="false"
          @request-delete="requestDeleteMovie"
        />
      </section>
    </div>

    <!-- Bekräftelseruta vid radering.
      Visas när användaren valt att radera en film. -->
    <div v-if="movieToDelete" class="confirm">
      <p>
        Vill du verkligen radera
        <strong>{{ movieToDelete.title }}</strong>?
      </p>
      <button class="confirm__danger" @click="confirmDeleteMovie">
        Ja, radera
      </button>
      <button class="confirm__cancel" @click="cancelDeleteMovie">
        Avbryt
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import MovieForm from "../components/MovieForm.vue";
import MovieTable from "../components/MovieTable.vue";

/* Bas-URL till Fastify-API:t samt TMDb-nyckeln för posterhämtning.*/
const API_BASE = "https://fastify-laboration2-2.onrender.com";
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

/*
  Reaktiv state:
  - movies: lista från backend-API:t
  - posters: poster-URL:er hämtade från TMDb per film
  - loading/error: UI-styrning
  - movieToDelete: används av bekräftelsedialogen
*/
const movies = ref([]);
const posters = ref({});
const loading = ref(false);
const error = ref("");
const movieToDelete = ref(null);

/*
  computed-listor:
  - plannedMovies = filmer som inte är sedda
  - seenMovies = filmer som är markerade som sedda
*/
const seenMovies = computed(() =>
  movies.value.filter((m) => m.seen)
);
const plannedMovies = computed(() =>
  movies.value.filter((m) => !m.seen)
);

/*
  Funktion för att hämta alla filmer från Fastify-API:t.
  Körs även direkt vid mount.
*/
async function loadMovies() {
  loading.value = true;
  error.value = "";
  try {
    const res = await fetch(`${API_BASE}/movies`);
    if (!res.ok) throw new Error("Fel vid hämtning");
    movies.value = await res.json();
    await loadPostersForMovies();
  } catch (err) {
    console.error(err);
    error.value = "Kunde inte hämta filmer från API:t.";
  } finally {
    loading.value = false;
  }
}

/*
  Hämtar posterbilder från TMDb genom att söka på varje films titel.
  Resultaten sparas i posters-objektet i formatet:
  posters[id] = "bild-url"
*/
async function loadPostersForMovies() {
  posters.value = {};
  // Ingen posterhämtning om ingen API-nyckel finns
  if (!TMDB_KEY) return;

  for (const m of movies.value) {
    try {
      const url = new URL("https://api.themoviedb.org/3/search/movie");
      url.searchParams.set("api_key", TMDB_KEY);
      url.searchParams.set("query", m.title);
      url.searchParams.set("include_adult", "false");
      url.searchParams.set("language", "sv-SE");

      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const first = data.results?.[0];
      // Om TMDb hittar en poster, spara den per film-ID
      if (first?.poster_path) {
        posters.value[m.id] =
          `https://image.tmdb.org/t/p/w154${first.poster_path}`;
      }
    } catch (e) {
      console.warn("Kunde inte hämta poster för", m.title);
    }
  }
}

/*
  Skickas in i MovieForm-komponenten.
  Skapar en ny film via POST mot Fastify-API:t.
*/
async function handleAddMovie(newMovie) {
  try {
    const res = await fetch(`${API_BASE}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
    if (!res.ok) throw new Error("Fel vid skapande");
    await loadMovies();
  } catch (err) {
    console.error(err);
    error.value = "Kunde inte skapa film.";
  }
}

/*
  Sätt film som användaren vill radera.
  Detta visar bekräftelserutan i UI:t.
*/
function requestDeleteMovie(movie) {
  movieToDelete.value = movie;
}

/*
  Bekräftar radering och skickar DELETE mot API:t.
*/
async function confirmDeleteMovie() {
  if (!movieToDelete.value) return;
  const id = movieToDelete.value.id;

  try {
    const res = await fetch(`${API_BASE}/movies/${id}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 204) throw new Error("Fel vid radering");
    movieToDelete.value = null;
    await loadMovies();
  } catch (err) {
    console.error(err);
    error.value = "Kunde inte radera film.";
  }
}

/*
  Avbryt radering → stänger dialogen
*/
function cancelDeleteMovie() {
  movieToDelete.value = null;
}

/*
  Kör loadMovies() direkt när vyn monteras.
*/
onMounted(loadMovies);
</script>

<style scoped>
.lead {
  margin: 0.3rem 0 1rem;
  max-width: 36rem;
}

.error {
  color: #f97373;
  margin-bottom: 0.5rem;
}

.columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  align-items: flex-start;
  margin-top: 1.5rem;
}

.column h2 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.confirm {
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #b91c1c;
  background: #111827;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.confirm__danger,
.confirm__cancel {
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
}

.confirm__danger {
  background: #ef4444;
  color: white;
}

.confirm__cancel {
  background: transparent;
  color: #e5e7eb;
}
</style>
