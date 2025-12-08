<template>
  <table class="table" v-if="movies.length">
    <thead>
      <tr>
        <th class="col-thumb"></th>
        <th>Titel</th>
        <th>Betyg</th>
        <th>Läskig?</th>
        <th>Har sett?</th>
        <th>Åtgärder</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.id">
        <td class="col-thumb">
          <img
            v-if="posters[movie.id]"
            :src="posters[movie.id]"
            :alt="movie.title"
            class="thumb"
          />
        </td>
        <td>{{ movie.title }}</td>
        <td>{{ movie.rating }}</td>
        <td>{{ movie.isScary ? "Ja" : "Nej" }}</td>
        <td>{{ movie.seen ? "Ja" : "Nej" }}</td>
        <td>
          <button class="btn-danger" @click="$emit('request-delete', movie)">
            Radera
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <p v-else>Inga filmer hittades.</p>
</template>

<script setup>
const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
  posters: {
    type: Object,
    default: () => ({}),
  },
});

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
