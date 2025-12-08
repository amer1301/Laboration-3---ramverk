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
      @delete-movie="handleDeleteMovie"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieForm from "../components/MovieForm.vue";
import MovieTable from "../components/MovieTable.vue";

const API_BASE = "https://fastify-laboration2-2.onrender.com";

const movies = ref([]);
const loading = ref(false);
const error = ref("");

async function loadMovies() {
  loading.value = true;
  error.value = "";
  try {
    const res = await fetch(`${API_BASE}/movies`);
    if (!res.ok) throw new Error("Fel vid hämtning");
    movies.value = await res.json();
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
    await loadMovies();
  } catch (err) {
    console.error(err);
    error.value = "Kunde inte skapa film.";
  }
}

async function handleDeleteMovie(id) {
  if (!confirm("Vill du verkligen radera filmen?")) return;

  try {
    const res = await fetch(`${API_BASE}/movies/${id}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 204) throw new Error("Fel vid radering");
    await loadMovies();
  } catch (err) {
    console.error(err);
    error.value = "Kunde inte radera film.";
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
</style>
