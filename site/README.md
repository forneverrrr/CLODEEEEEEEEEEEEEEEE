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
1. `cp -r books/dialyse books/NY-BOG` og slet `book.js` og `RAPPORT.md` i den nye mappe.
2. I `books/NY-BOG/src/q/` ligger spørgsmålene: `s01.json`, `s02.json` ... Hver række er
   `["Spørgsmål","rigtigt svar","forkert 1","forkert 2",("forkert 3"),sidetal]`.
3. Ret `books/NY-BOG/src/config.json`: `slug`, titel, kapitler (`sheets`), grupper og ikoner (`meta`), tekster på da/ru.
4. Ret farver i `books/NY-BOG/theme.css`.
5. Kør `python3 tools/build_all.py`. Det laver `book.js` og opdaterer `shared/books.js` (forsidens liste).
6. Upload mappen `books/NY-BOG/` og `shared/books.js`. De andre bøger berøres ikke.

## Data og tid
- Alt gemmes i browserens localStorage under nøglen `nordstudy-v1`, pr. domæne og pr. enhed.
- Eksportér/importér fremgang som fil på siden Statistik. Lav en eksport før du skifter domæne eller enhed.
- Uret: start/pause øverst. Efter 2 minutter uden aktivitet sættes det automatisk på pause.
- Svage spørgsmål: fejl og »Ikke sikker«-markerede svar vender tilbage straks i samme omgang, derefter efter 10 min/1 dag/3 dage.
  Efter 3 rene rigtige svar i træk forlader spørgsmålet køen.
- Synkronisering mellem enheder kræver en server. Al lager-kode ligger samlet i `shared/core.js` (objektet `Store`),
  så en server kan sættes ind senere uden at ændre resten.
