<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__field">
      <label for="title">Titel</label>
      <input id="title" v-model="form.title" required />
    </div>

    <div class="form__field">
      <label for="rating">Betyg (0–10)</label>
      <input
        id="rating"
        v-model.number="form.rating"
        type="number"
        step="0.1"
        min="0"
        max="10"
        required
      />
    </div>

    <div class="form__field form__checkbox">
      <label for="isScary">Är filmen läskig?</label>
      <input id="isScary" v-model="form.isScary" type="checkbox" />
    </div>

    <button type="submit">Lägg till film</button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["add-movie"]);

const form = reactive({
  title: "",
  rating: 7.0,
  isScary: true,
});

function reset() {
  form.title = "";
  form.rating = 7.0;
  form.isScary = true;
}

function handleSubmit() {
  emit("add-movie", {
    title: form.title.trim(),
    rating: Number(form.rating),
    isScary: !!form.isScary,
  });
  reset();
}
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem 1rem;
  align-items: end;
  margin-bottom: 1.5rem;
}
.form__field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
}
.form__checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}
input {
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid #374151;
  background: #020617;
  color: #f5f5f5;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  border: none;
  background: #22c55e;
  color: #020617;
  font-weight: 600;
  cursor: pointer;
}
</style>
