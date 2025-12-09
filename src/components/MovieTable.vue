<template>
<!-- Tabell som listar filmer. -->
  <table class="table" v-if="movies.length">
    <thead>
      <tr>
        <th class="col-thumb"></th>
        <th>Titel</th>
        <th>Betyg</th>
        <!-- Dessa kolumner kan döljas via props -->
        <th v-if="showScaryColumn">Läskig?</th>
        <th v-if="showSeenColumn">Har sett?</th>
        <th>Åtgärder</th>
      </tr>
    </thead>
    <tbody>
    <!-- Loopar igenom alla filmer via props.movies.
        :key="movie.id" gör att Vue kan optimera renderingen. -->
      <tr v-for="movie in movies" :key="movie.id">
        <td class="col-thumb">
    <!--Visar miniaffisch om det finns en poster för det specifika film-ID:t.
        posters-objektet mappas så att posters[id] = bild-url -->
          <img
            v-if="posters[movie.id]"
            :src="posters[movie.id]"
            :alt="movie.title"
            class="thumb"
          />
        </td>
        <td>{{ movie.title }}</td>
        <td>{{ movie.rating }}</td>

        <!-- Visas endast om kolumnerna är aktiverade via props -->
        <td v-if="showScaryColumn">{{ movie.isScary ? "Ja" : "Nej" }}</td>
        <td v-if="showSeenColumn">{{ movie.seen ? "Ja" : "Nej" }}</td>
        <td>
    <!-- När användaren klickar på Radera-knappen emit:ar komponenten 
    "request-delete" och skickar med hela filmobjektet till föräldern.
    Föräldern (MoviesView.vue) hanterar sedan dialog + DELETE API-anrop. -->
          <button class="btn-danger" @click="$emit('request-delete', movie)">
            Radera
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Meddelande vid tom lista -->
  <p v-else>Inga filmer hittades.</p>
</template>

<script setup>

/*
  Props:
  - movies: array av filmobjekt från databasen
  - posters: objekt där nyckeln är filmens ID och värdet är poster-URL
  - showScaryColumn / showSeenColumn: boolean för att visa/dölja kolumner
*/
const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
  posters: {
    type: Object,
    default: () => ({}),
  },
  showScaryColumn: {
    type: Boolean,
    default: true,
  },
  showSeenColumn: {
    type: Boolean,
    default: true,
  },
});

/*
  Komponentens enda event:
  - "request-delete" skickas när användaren klickar på Radera.
  Föräldern avgör vad som faktiskt ska hända (t.ex. öppna modal eller API-anrop).
*/
defineEmits(["request-delete"]);
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  border-bottom: 1px solid #1f2937;
  padding: 0.45rem 0.4rem;
  text-align: left;
  vertical-align: middle;
}

th {
  background: #020617;
}

.col-thumb {
  width: 50px;
}

.thumb {
  width: 40px;
  border-radius: 4px;
  display: block;
}

.btn-danger {
  padding: 0.3rem 0.7rem;
  border-radius: 0.5rem;
  border: none;
  background: #ef4444;
  color: #f9fafb;
  cursor: pointer;
  font-size: 0.8rem;
}

.btn-danger:hover {
  filter: brightness(1.05);
}
</style>
