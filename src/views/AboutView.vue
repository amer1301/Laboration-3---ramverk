<template>
  <section>
    <h1>Mina tankar om Vue.js</h1>

    <p>
      Här sammanfattar jag mina erfarenheter av att arbeta med Vue.js under projektet.
      Jag beskriver hur jag kom igång, vad som fungerat bra och vilka utmaningar jag stött på,
      samt hur jag ser på att arbeta vidare med Vue i framtiden.
    </p>

    <ul class="list">
      <li>
        <strong>Projektstart med Vite + Vue:</strong><br>
        Jag kom snabbt igång genom att skapa ett nytt Vite-projekt med Vue. Jag använda mig 
        till en början av instruktionsvideo:rna som Malin lagt upp i Canvas för att komma igång.
        Installationen var enkel och utvecklingsmiljön startade direkt. Vite gav
        en snabb, smidig och modern bas att bygga vidare på.
      </li>

      <li>
        <strong>Vad som gått bra och mindre bra:</strong><br>
        Jag tyckte komponentstrukturen i Vue var lätt att förstå, och att arbeta
        med props, router och templates gick bra efter att ha läst på lite mer 
        om det. Det som varit mer utmanande var att hantera API-data på rätt sätt samt 
        att få full koll på hur reaktivitet fungerar i alla situationer. I mitt projekt 
        har jag arbetat en hel del med att hämta och visa data från TMDb:s API, och detta 
        blev också en av de mest lärorika delarna av arbetet. I HomeView.vue hämtar jag 
        sökresultat från API:et och lagrar dem i reaktiva variabler som movies, loading 
        och error. Genom att använda ref() uppdateras gränssnittet automatiskt när värdena 
        ändras, till exempel när sökningen startar, när resultatet kommer in eller när något 
        går fel. Det gjorde det enkelt att visa olika tillstånd i UI, såsom laddning eller felmeddelanden.
        I TmdbMovieView.vue hämtar jag detaljer om en enskild film baserat på filmens ID i URL:en. 
        Även här använder jag reaktiva variabler och låter Vue Router styra vilken film som ska 
        visas. När jag uppdaterar variabeln movie med API-datan, uppdateras hela vyn automatiskt 
        utan att jag behöver göra något extra. Det var tydligt att Vues reaktiva system gör 
        mycket av arbetet åt mig. Det som var lite utmanande i början var att förstå exakt 
        varför UI uppdaterades ibland och inte andra gånger, särskilt när jag glömde använda 
        .value eller när jag försökte ändra vanliga variabler som inte är reaktiva. När jag 
        väl förstod skillnaden mellan ref(), reactive(), och hur computed() fungerar, blev 
        det mycket tydligare hur dataflödet hänger ihop.
      </li>

      <li>
        <strong>Tankar om att fortsätta med Vue:</strong><br>
        Jag vill gärna fortsätta arbeta med Vue. Det känns som ett flexibelt och
        modernt ramverk, och jag är nyfiken på att lära mig mer.
      </li>
    </ul>

    <p>
      Sammanfattningsvis har arbetet med Vue varit både roligt och lärorikt,
      och jag känner att jag fått en bra grund att bygga vidare på.
    </p>
  </section>
</template>


<script setup></script>

<style scoped>
.list {
  margin-top: 1rem;
  padding-left: 1.25rem;
  line-height: 1.6;
}
</style>
