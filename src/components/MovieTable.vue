<template>
  <table class="table" v-if="movies.length">
    <thead>
      <tr>
        <th>Titel</th>
        <th>Betyg</th>
        <th>Läskig?</th>
        <th>Åtgärder</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.id">
        <td>{{ movie.title }}</td>
        <td>{{ movie.rating }}</td>
        <td>{{ movie.isScary ? "Ja" : "Nej" }}</td>
        <td>
          <button @click="$emit('delete-movie', movie.id)">Radera</button>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>Inga filmer hittades.</p>
</template>

<script setup>
defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

defineEmits(["delete-movie"]);
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
  padding: 0.5rem 0.4rem;
  text-align: left;
}
th {
  background: #020617;
}
button {
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;
}
</style>
