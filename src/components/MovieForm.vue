<template>
  <form class="form" @submit.prevent="handleSubmit">
    <!-- Titel -->
    <div class="form__field">
      <label for="title">Titel</label>
      <input
        id="title"
        v-model="form.title"
        required
        placeholder="Skriv in filmtitel..."
      />
    </div>

    <!-- Betyg -->
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

    <!-- Är filmen läskig? -->
    <div class="form__field">
      <span class="label">Är filmen läskig?</span>
      <div class="radio-group">
        <label class="radio-option">
          <input
            type="radio"
            name="isScary"
            :value="true"
            v-model="form.isScary"
          />
          <span>Ja</span>
        </label>
        <label class="radio-option">
          <input
            type="radio"
            name="isScary"
            :value="false"
            v-model="form.isScary"
          />
          <span>Nej</span>
        </label>
      </div>
    </div>

    <!-- Har sett? -->
    <div class="form__field">
      <span class="label">Har sett filmen?</span>
      <div class="radio-group">
        <label class="radio-option">
          <input
            type="radio"
            name="seen"
            :value="true"
            v-model="form.seen"
          />
          <span>Ja</span>
        </label>
        <label class="radio-option">
          <input
            type="radio"
            name="seen"
            :value="false"
            v-model="form.seen"
          />
          <span>Nej</span>
        </label>
      </div>
    </div>

    <!-- Submit -->
    <button type="submit" class="submit">
      Lägg till film
    </button>
  </form>
</template>

<script setup>
import { reactive } from "vue";

const emit = defineEmits(["add-movie"]);

const form = reactive({
  title: "",
  rating: 7.0,
  isScary: true,
  seen: false,
});

function reset() {
  form.title = "";
  form.rating = 7.0;
  form.isScary = true;
  form.seen = false;
}

function handleSubmit() {
  emit("add-movie", {
    title: form.title.trim(),
    rating: Number(form.rating),
    isScary: !!form.isScary,
    seen: !!form.seen,
  });
  reset();
}
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem 1rem;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}

.form__field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
}

label,
.label {
  font-weight: 500;
}

input[type="text"],
input[type="number"] {
  padding: 0.45rem 0.6rem;
  border-radius: 0.45rem;
  border: 1px solid #374151;
  background: #020617;
  color: #f9fafb;
}

.radio-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.radio-option {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
}

.submit {
  padding: 0.55rem 1.2rem;
  border-radius: 0.7rem;
  border: none;
  background: #22c55e;
  color: #020617;
  font-weight: 600;
  cursor: pointer;
  justify-self: flex-start;
}

.submit:hover {
  filter: brightness(1.05);
}
</style>
