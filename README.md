# Laboration 3 - ramverk

En filmapplikation byggd med Vue 3, Vue Router och Vite. Projektet demonstrerar komponentbaserad utveckling, API-integration (TMDb), formulärhantering och dynamisk navigering.

## Movie App – Vue 3 + Vite

📦 **Installation & uppstart**

Projektet är skapat med Vite och startas enkelt:

npm install
npm run dev

**Bygg projektet för produktion:**

npm run build


**Förhandsgranska bygget:**

npm run preview

🧱 **Projektstruktur**

Applikationen är uppbyggd med flera Vue-komponenter och vyer som strukturerar gränssnittet och funktionaliteten.

🔹 **Komponenter**
NavBar.vue
Huvudnavigationen med länkar till startsida, filmsida och ”Om”-sida. Använder <RouterLink> från Vue Router.

HeroBanner.vue
Hero-sektion som introducerar projektet och visas på startsidan. Ger en visuell ingång till applikationen.

TmdbMovieCard.vue
Kort som representerar en film hämtad från TMDb. Visar poster, titel och beskrivning och länkar vidare till en filmvy.

MovieTable.vue
Tabell som listar manuellt tillagda filmer. Använder v-for, props och tydlig datastruktur för att visa tabellrader.

MovieForm.vue
Formulär för att lägga till filmer till det lokala registret. Använder v-model, validering och emit-event för att skicka datan uppåt.

SiteFooter.vue
En enkel och ren sidfot med grundläggande projektreferenser.

🔹 **Vyer**
HomeView.vue
Startsidan. Innehåller hero-sektionen och ett sökfält som låter användaren söka filmer via TMDb. Resultaten visas via TmdbMovieCard.

MoviesView.vue
Administrativ vy där användaren kan:
* Lägga till filmer via MovieForm
* Lista dem i MovieTable
* Hantera det lokala filmregistret

TmdbMovieView.vue
Detaljerad sida för en film hämtad från TMDb. Visar titel, poster, tagline, betyg och övrig metadata.

AboutView.vue
En sida där du berättar om projektet, syftet och dina tankar kring utvecklingen.

🚀 Funktionalitet

🌐 Vue Router för navigering mellan sidor

🔎 Sökning mot TMDb API

🧩 Modulär komponentstruktur

📝 Formulärvalidering och lokal datahantering

🎨 Egen styling per komponent (scoped CSS)
