<template>
<!-- Hero-sektionen som visas överst på startsidan -->
  <section class="hero">
    <div class="hero__content">
      <h1>Skräckfilmsarkivet</h1>
      <p>
        Utforska läskiga filmer, betygsätt dem och håll koll på dina favoriter.
        Backend drivs av Fastify + PostgreSQL, bilder och info från TMDb.
      </p>
      <p>I enlighet med uppgiftsbeskrivningen för laboration 3 i kursen 
      Fullstack-utveckling med ramverk D2255, så har jag valt att skapa en
      applikation i form av ett arkiv för skräckfilmer. Ett av mina fritids-
      intressen är att kolla skräckfilm, just för att 98% av alla skräckfilmer
      varken är läskiga eller bra, så är det fantastiskt när man väl hittar en
      som man gillar. Därför har jag skapat detta arkivet för att hålla koll på 
      vilka filmer som jag vill se, har sett samt vilka som faktiskt var bra/läskiga.</p>
    </div>

    <!-- Hero-bild med backdrop från Hereditary -->
    <div
      class="hero__image"
      role="img"
      aria-label="Skräckfilmsbanner från filmen Hereditary"
    ></div>
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
  font-size: clamp(2rem, 3vw, 2.8rem); /* Responsiv text direkt */
  margin-bottom: 0.5rem;
}

.hero__content p {
  max-width: 34rem;
  line-height: 1.6;
}

.hero__image {
  min-height: 400px;
  border-radius: 1rem;
  background-image: url("https://image.tmdb.org/t/p/original/lHV8HHlhwNup2VbpiACtlKzaGIQ.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6);
}

/* Mobilanpassning */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>

