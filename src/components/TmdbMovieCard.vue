<template>
  <RouterLink
    :to="{ name: 'tmdb-movie', params: { id: movie.id } }"
    class="card-link"
  >
    <article class="card">
      <img
        v-if="posterUrl"
        :src="posterUrl"
        :alt="movie.title"
        loading="lazy"
      />
      <div class="card__body">
        <h3>{{ movie.title }}</h3>
        <p class="card__meta">
          {{ year }} · Betyg: {{ movie.vote_average?.toFixed(1) ?? "–" }}
        </p>
        <p class="card__overview">
          {{ movie.overview || "Ingen beskrivning tillgänglig." }}
        </p>
      </div>
    </article>
  </RouterLink>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  movie: { type: Object, required: true },
});

const IMG_BASE = "https://image.tmdb.org/t/p/w342";

const posterUrl = computed(() =>
  props.movie.poster_path ? `${IMG_BASE}${props.movie.poster_path}` : null
);

const year = computed(() =>
  props.movie.release_date ? props.movie.release_date.slice(0, 4) : "Okänt"
);
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
}
.card-link:hover .card {
  transform: translateY(-4px);
}
.card {
  transition: transform 0.15s ease-out;
}
.card img {
  width: 100%;
  display: block;
}
.card__body {
  padding: 0.75rem 0.9rem 1rem;
}
.card__meta {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}
.card__overview {
  font-size: 0.85rem;
  line-height: 1.5;
  max-height: 6.5rem;
  overflow: hidden;
}
</style>
