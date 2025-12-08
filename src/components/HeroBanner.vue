<template>
  <section class="hero">
    <div class="hero__content">
      <h1>Skräckfilmsarkivet</h1>
      <p>
        Utforska läskiga filmer, betygsätt dem och håll koll på dina favoriter.
        Backend drivs av Fastify + PostgreSQL, bilder och info från TMDb.
      </p>
    </div>
    <div class="hero__image" role="img" aria-label="Skräckfilmsbanner"></div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 2rem;
}
.hero__content h1 {
  font-size: clamp(2rem, 3vw, 2.8rem);
  margin-bottom: 0.5rem;
}
.hero__content p {
  max-width: 34rem;
  line-height: 1.6;
}
.hero__image {
  min-height: 180px;
  border-radius: 1rem;
  background-image: url("/hero.jpg");
  background-size: cover;
  background-position: center;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6);
}
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
