<template>
 <!--
    Huvudnavigationen för appen.
    Består av:
    - Brand-text
    - En hamburgermenyn (på mobil)
    - Navigation med RouterLink-länkar
  -->
  <header class="nav">
    <div class="nav__brand">Horror Hub</div>
    <button class="nav__toggle" @click="isOpen = !isOpen">☰</button>

    <nav class="nav__links" :class="{ 'nav__links--open': isOpen }">
      <RouterLink to="/" class="nav__link" @click="close">Start</RouterLink>
      <RouterLink to="/movies" class="nav__link" @click="close">Filmer (API)</RouterLink>
      <RouterLink to="/about" class="nav__link" @click="close">Om Vue</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

/*
  isOpen styr om mobilmenyn visas eller inte.
  true = synlig, false = dold.
*/
const isOpen = ref(false);

/*
  close() används när man klickar på en länk
  så att menyn stängs på mobila enheter.
*/
const close = () => (isOpen.value = false);
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5em 1em;
  background: #090914;
  border-bottom: 1px solid #262636;
}

.nav__brand {
  font-weight: 700;
  font-size: 1.2em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav__links {
  display: flex;
  gap: 1rem;
}

.nav__link {
  text-decoration: none;
  color: #f5f5f5;
  padding: 0.75em 1em;
  border-radius: 999px;
  font-size: 1.2em;
}

.nav__link.router-link-active {
  background: #e11d48;
}

.nav__toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #f5f5f5;
}

@media (max-width: 640px) {
  .nav__toggle {
    display: block;
  }
  .nav__links {
    position: absolute;
    top: 56px;
    right: 0;
    left: 0;
    flex-direction: column;
    background: #090914;
    padding: 0.75rem 1rem;
    display: none;
  }
  .nav__links--open {
    display: flex;
  }
}
</style>
