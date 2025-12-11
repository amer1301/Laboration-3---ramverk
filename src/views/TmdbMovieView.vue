<template>
<!-- Visa bara innehållet om filmen har laddats -->
  <section v-if="movie">
    <button class="back" @click="goBack">← Tillbaka</button>

    <div class="layout">
      <div class="poster" v-if="posterUrl">
        <img :src="posterUrl" :alt="movie.title" />
      </div>

      <div class="info">
        <h1>{{ movie.title }}</h1>
        <p class="meta">
          {{ year }} · Betyg på TMDb: {{ movie.vote_average?.toFixed(1) ?? "–" }}
        </p>
        <p class="tagline" v-if="movie.tagline">{{ movie.tagline }}</p>
        <p class="overview">
          {{ movie.overview || "Ingen beskrivning tillgänglig." }}
        </p>

        <div class="sub">
          <p v-if="movie.runtime">Längd: {{ movie.runtime }} min</p>
          <p v-if="movie.genres?.length">
            Genrer:
            {{ movie.genres.map((g) => g.name).join(", ") }}
          </p>
        </div>

        <form class="add-form" @submit.prevent="addToMyList">
  <h2>Lägg till i min skräckfilmslista</h2>

  <div class="field">
    <label for="rating">Mitt betyg (0–10)</label>
    <input
      id="rating"
      type="number"
      min="0"
      max="10"
      step="0.1"
      v-model.number="rating"
      required
    />
  </div>

  <div class="field">
    <span class="label">Har sett filmen?</span>
    <div class="radio-group">
      <label class="radio-option">
        <input
          type="radio"
          name="seen"
          :value="true"
          v-model="seen"
        />
        <span>Ja</span>
      </label>
      <label class="radio-option">
        <input
          type="radio"
          name="seen"
          :value="false"
          v-model="seen"
        />
        <span>Nej</span>
      </label>
    </div>
  </div>

  <!-- Visa “läskig?” endast om användaren har sett filmen -->
  <div class="field" v-if="seen">
    <span class="label">Jag tycker att filmen är läskig</span>
    <div class="radio-group">
      <label class="radio-option">
        <input
          type="radio"
          name="isScary"
          :value="true"
          v-model="isScary"
        />
        <span>Ja</span>
      </label>
      <label class="radio-option">
        <input
          type="radio"
          name="isScary"
          :value="false"
          v-model="isScary"
        />
        <span>Nej</span>
      </label>
    </div>
  </div>

<!-- Submit-knapp med laddningsstatus -->
  <button type="submit" :disabled="saving">
    {{ saving ? "Lägger till..." : "Lägg till i min lista" }}
  </button>

  <p v-if="error" class="error">{{ error }}</p>
  <p v-if="success" class="success">
    Filmen lades till! Du skickas snart till listan…
  </p>
</form>
      </div>
    </div>
  </section>

<!-- Om filmen inte hunnit laddas visas fallback-text -->
  <p v-else>Laddar film...</p>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Hämtar routing-verktyg: nuvarande route + router-navigation
const route = useRoute();
const router = useRouter();

// API-nyckel + backend-URL
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const fastifyBase = "https://fastify-laboration2-2.onrender.com";

// Reaktiva states för filmdata och formuläret
const movie = ref(null);
const rating = ref(7.0);
const seen = ref(false);
const isScary = ref(true);
const saving = ref(false);
const error = ref("");
const success = ref(false);

// Bygger fullständig URL till filmaffischen
const posterUrl = computed(() =>
  movie.value?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
    : null
);

// Hämtar utgivningsåret
const year = computed(() =>
  movie.value?.release_date ? movie.value.release_date.slice(0, 4) : "Okänt"
);

// Gå till föregående sida
function goBack() {
  router.back();
}

// Hämtar filmens info från TMDb baserat på id i URL
async function loadMovie() {
  try {
    const id = route.params.id;
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);
    url.searchParams.set("api_key", tmdbApiKey);
    url.searchParams.set("language", "sv-SE");

    const res = await fetch(url);
    if (!res.ok) throw new Error("TMDb error");
    movie.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = "Kunde inte hämta film från TMDb.";
  }
}


// Skickar filmen till Fastify-API:t och lägger in den i databasen
async function addToMyList() {
  if (!movie.value) return;

  saving.value = true;
  error.value = "";
  success.value = false;

  try {
    const res = await fetch(`${fastifyBase}/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: movie.value.title,
        rating: rating.value,
        // Om användaren inte har sett filmen: sätt isScary = false
        isScary: seen.value ? isScary.value : false,
        seen: seen.value,
      }),
    });

    // Hantera eventuella backend-fel
    if (!res.ok) {
      const text = await res.text();
      console.error("POST /movies error:", res.status, text);
      throw new Error(text || "Fel vid skapande");
    }

    success.value = true;

// Skicka användaren tillbaka till listan efter en kort delay
    setTimeout(() => {
      router.push("/movies");
    }, 800);
  } catch (err) {
    console.error(err);
    error.value = "Kunde inte lägga till filmen i listan.";
  } finally {
    saving.value = false;
  }
}

onMounted(loadMovie);

</script>

<style scoped>
.back {
  margin-bottom: 1rem;
  background: none;
  border: none;
  color: #e5e7eb;
  cursor: pointer;
}
.layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: 2rem;
}
.poster img {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
}
.info h1 {
  margin-bottom: 0.25rem;
}
.meta {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.75rem;
}
.tagline {
  font-style: italic;
  opacity: 0.9;
  margin-bottom: 0.75rem;
}
.overview {
  line-height: 1.6;
  margin-bottom: 0.75rem;
}
.sub {
  font-size: 0.9rem;
  opacity: 0.85;
  margin-bottom: 1.5rem;
}
.add-form {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1px solid #1f2937;
  background: #020617;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}
.field--row {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
input[type="number"] {
  max-width: 120px;
  padding: 0.3rem 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid #374151;
  background: #020617;
  color: #f9fafb;
}
button[type="submit"] {
  margin-top: 0.5rem;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  border: none;
  background: #22c55e;
  color: #020617;
  font-weight: 600;
  cursor: pointer;
}
.error {
  color: #f97373;
  margin-top: 0.5rem;
}
.success {
  color: #4ade80;
  margin-top: 0.5rem;
}
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
