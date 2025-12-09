<template>
  <div>
    <HeroBanner />

    <section class="section">
      <h2>Sök skräckfilmer (TMDb)</h2>

      <!--
        Sökformulär:
        - @submit.prevent hindrar sidladdning
        - searchMovies() anropas när användaren söker
      -->
      <form class="search" @submit.prevent="searchMovies">
      <!-- Binder textfältet till söktermen -->
        <input
          v-model="query"
          type="text"
          placeholder="Sök t.ex. 'The Conjuring'"
        />
        <button type="submit">Sök</button>
      </form>

      <!-- Felmeddelande vid API-fel -->
      <p v-if="error" class="error">{{ error }}</p>
      <!-- Laddningsmeddelande medan API-svaret väntar -->
      <p v-if="loading">Laddar filmer...</p>

    <!-- Lista av filmer från TMDb.
        Varje resultat renderas som en TmdbMovieCard.-->
      <div v-if="movies.length" class="grid">
      <!-- Viktigt för Vues renderings-optimisering -->
      <!-- Skickar varje film till card-komponenten -->
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

/*
  Reaktiva variabler för sökterm, resultat, felmeddelande och laddningsstatus.
*/
const query = ref("");
const movies = ref([]);
const loading = ref(false);
const error = ref("");

/*
  API-nyckeln hämtas från Vite-miljövariabel.
  Krävs för alla anrop till TMDb:s API.
*/
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

/*
  Funktion som söker filmer via TMDb:s API.

  1. Validera att API-nyckel finns
  2. Bygg URL med query-parametrar
  3. Hämta resultat
  4. Hantera fel och visa till användaren
*/
async function searchMovies() {
  if (!apiKey) {
    error.value = "Ingen TMDb-nyckel satt.";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    // Bygger API-requesten dynamiskt
    const url = new URL("https://api.themoviedb.org/3/search/movie");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query.value);
    url.searchParams.set("include_adult", "false"); // Uteslut vuxenmaterial
    url.searchParams.set("language", "sv-SE"); // Svenska resultat om möjligt

    // Skicka anropet
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fel vid anrop till TMDb");
    // Tolka JSON-svaret
    const data = await res.json();
    // Spara filmresultaten – fall tillbaka på tom lista om något saknas
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
