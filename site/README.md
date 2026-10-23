# Øvebank: flere bøger, ét sted

Statisk side, ingen server, ingen byggetrin ved visning. Alle stier er relative, så den virker både på GitHub Pages
og i en undermappe på et eget domæne (fx `https://nordindsigt.info/ovebank/`).

## Filer

    index.html            forside: kort for alle bøger, samlet status, tid i dag
    book.html?b=<bog>     bogens side (start, emner, prøver, tidslinje)
    stats.html            statistik: tid, svage emner, fejljournal, eksport/import
    shared/               fælles motor og design (core.js, app.js, hub.js, stats.js, core.css, i18n.js, books.js)
    books/<bog>/          book.js (data, genereres), theme.css (bogens egen stil), src/ (kilder)
    tools/build_all.py    bygger alle bøger og forsidens liste

## Lægge på nordindsigt.info eller GitHub Pages
1. Upload hele indholdet (inkl. `.nojekyll`) til en mappe på sitet, fx `ovebank/`.
2. Åbn `.../ovebank/index.html`. Det er alt. Ingen database.
3. GitHub Pages: læg filerne i repoet, *Settings, Pages, Deploy from a branch*.

## Tilføje en ny bog (uden at røre forsiden eller motoren)
1. `cp -r books/dialyse books/NY-BOG`, slet `book.js`, `RAPPORT.md`, `src/data/`, `src/chapters.json`, `src/removed.json`.
2. Læg spørgsmål i `books/NY-BOG/src/data/s01.json`, `s02.json` ... (ét kapitel pr. fil). Hvert spørgsmål:
   `{"id":"1:0","q":"…","a":"rigtigt","w":["forkert","forkert"],"p":13,"lvl":"K","type":"fakta","why":"forklaring"}`
   - `id` er STABILT (fremgangen er knyttet til det). Ret aldrig et id; ved ændret betydning giv et nyt id.
   - `lvl`: K kerne / U udvidet / D detalje (D kommer kun med i »hele bogen« og efter valg).
   - `type`: fakta / forståelse / anvendelse. `why`: 1-2 sætninger fra kilden (påkrævet for K og U).
3. `src/chapters.json`: `[{"n":1,"goals":["Efter kapitlet kan du …"],"keypoints":["…"]}]`.
4. Ret `src/config.json` (slug, titel, kapitler, grupper/ikoner, tekster da/ru) og `theme.css` (farver).
5. `python3 tools/build_all.py` laver `book.js` og opdaterer `shared/books.js` (forsidens liste).
6. Upload `books/NY-BOG/` og `shared/books.js`. De andre bøger berøres ikke.
Instruktion til at lade en AI lave spørgsmålene (med regler for kvalitet): se `COWORK-INSTRUKTSIYA-v2.md` i denne mappe.

## Revision af spørgsmål uden at miste fremgang
Rediger kun i `src/data/*.json` og behold `id`. Slettede spørgsmål forsvinder fra tællere, men deres statistik ligger stadig i browserens lager (markeret som forældreløs), og kommer tilbage, hvis id'et genindføres. `src/removed.json` er loggen over slettede spørgsmål.

## Data og tid
- Alt gemmes i browserens localStorage under nøglen `nordstudy-v1`, pr. domæne og pr. enhed.
- Eksportér/importér fremgang som fil på siden Statistik. Lav en eksport før du skifter domæne eller enhed.
- Uret: start/pause øverst. Efter 2 minutter uden aktivitet sættes det automatisk på pause.
- Svage spørgsmål: fejl og »Ikke sikker«-markerede svar vender tilbage straks i samme omgang, derefter efter 10 min/1 dag/3 dage.
  Efter 3 rene rigtige svar i træk forlader spørgsmålet køen.
- Synkronisering mellem enheder kræver en server. Al lager-kode ligger samlet i `shared/core.js` (objektet `Store`),
  så en server kan sættes ind senere uden at ændre resten.
