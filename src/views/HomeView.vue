<template>
  <div>
    <HeroBanner />

    <section class="section">
      <h2>Sök skräckfilmer (TMDb)</h2>
      <form class="search" @submit.prevent="searchMovies">
        <input
          v-model="query"
          type="text"
          placeholder="Sök t.ex. 'The Conjuring'"
        />
        <button type="submit">Sök</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="loading">Laddar filmer...</p>

      <div v-if="movies.length" class="grid">
        <TmdbMovieCard
          v-for="m in movies"
          :key="m.id"
          :movie="m"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeroBanner from "../components/HeroBanner.vue";
import TmdbMovieCard from "../components/TmdbMovieCard.vue";

const query = ref("The Conjuring");
const movies = ref([]);
const loading = ref(false);
const error = ref("");

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

async function searchMovies() {
  if (!apiKey) {
    error.value = "Ingen TMDb-nyckel satt.";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query.value);
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("language", "sv-SE");

    const res = await fetch(url);
    if (!res.ok) throw new Error("Fel vid anrop till TMDb");
    const data = await res.json();
    movies.value = data.results || [];
  } catch (err) {
    error.value = "Kunde inte hämta filmer just nu.";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  searchMovies();
});
</script>

<style scoped>
.section {
  margin-top: 2rem;
}
.search {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.search input {
  flex: 1 1 220px;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid #374151;
  background: #020617;
  color: #f5f5f5;
}
.search button {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  background: #e11d48;
  color: #f5f5f5;
  cursor: pointer;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 1rem;
}
.error {
  color: #f97373;
}
</style>
