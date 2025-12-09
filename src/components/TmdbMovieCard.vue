<template>
  <!--
    Ett klickbart kort som länkar till en detaljerad filmsida.
    RouterLink används för att navigera till "tmdb-movie"-routen,
    där filmens ID skickas som URL-parameter.
  -->
  <RouterLink
    :to="{ name: 'tmdb-movie', params: { id: movie.id } }"
    class="card-link"
  >
    <article class="card">

  <!-- Filmens posterbild (om sådan finns).
      loading="lazy" gör att bilden endast laddas om den blir synlig i 
      viewporten, vilket förbättrar prestanda. -->
      <img
        v-if="posterUrl"
        :src="posterUrl"
        :alt="movie.title"
        loading="lazy"
      />
      <div class="card__body">
        <h3>{{ movie.title }}</h3>

  <!-- Metadata: filmens år + TMDb-betyg.
      vote_average kan saknas → fallback "–" -->
        <p class="card__meta">
          {{ year }} · Betyg: {{ movie.vote_average?.toFixed(1) ?? "–" }}
        </p>

  <!-- Kort sammanfattning av filmen.
      Om overview saknas visas en fallback-text. -->
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


/*
  Komponenten tar emot ett TMDb-filmobjekt som prop.
  Det innehåller data såsom:
  - title
  - poster_path
  - overview
  - release_date
  - vote_average
*/
const props = defineProps({
  movie: { type: Object, required: true },
});

/*
  Bas-URL för TMDb-bilder.
  w342 som storlek för affischer.
*/
const IMG_BASE = "https://image.tmdb.org/t/p/w342";

/*
  posterUrl genereras dynamiskt:
  - Om poster_path finns → bygg URL
  - Om inte → returnera null (då visas ingen bild)
*/
const posterUrl = computed(() =>
  props.movie.poster_path ? `${IMG_BASE}${props.movie.poster_path}` : null
);

/*
  Plockar ut året från release_date.
  release_date är i formatet "YYYY-MM-DD",
  så slice(0, 4) ger årtalet.
*/
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
