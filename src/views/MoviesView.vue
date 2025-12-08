<template>
  <section>
    <h1>Administrera skräckfilmer (Fastify-API)</h1>
    <p class="lead">
      Här hämtas data från min Fastify-webbtjänst på Render. Det går att lägga
      till och radera filmer via Fetch-anrop.
    </p>

    <MovieForm @add-movie="handleAddMovie" />

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="loading">Laddar filmer...</p>

<MovieTable
  v-if="!loading"
  :movies="movies"
  :posters="posters"
  @request-delete="requestDeleteMovie"
/>

<div
  v-if="movieToDelete"
  class="confirm"
>
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
import { ref, onMounted } from "vue";
import MovieForm from "../components/MovieForm.vue";
import MovieTable from "../components/MovieTable.vue";

const API_BASE = "https://fastify-laboration2-2.onrender.com";
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

const movies = ref([]);
const posters = ref({}); 
const loading = ref(false);
const error = ref("");

const movieToDelete = ref(null);

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

async function handleAddMovie(newMovie) {
  try {
    const res = await fetch(`${API_BASE}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    });
    if (!res.ok) throw new Error("Fel vid skapande");
    await loadMovies();          // laddar både filmer + posters
  } catch (err) {
    console.error(err);
    error.value = "Kunde inte skapa film.";
  }
}

function requestDeleteMovie(movie) {
  movieToDelete.value = movie;
}

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

function cancelDeleteMovie() {
  movieToDelete.value = null;
}


async function loadPostersForMovies() {
  posters.value = {};
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
      if (first?.poster_path) {
        posters.value[m.id] =
          `https://image.tmdb.org/t/p/w154${first.poster_path}`;
      }
    } catch (e) {
      console.warn("Kunde inte hämta poster för", m.title);
    }
  }
}


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

.confirm {
  margin-top: 1rem;
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
