import os, re, zipfile
here = os.path.dirname(os.path.abspath(__file__))
frag = open(os.path.join(here, "dialyse.html"), encoding="utf-8").read()
i = frag.index("</style>") + len("</style>")
head, body = frag[:i], frag[i:]
page = ('<!doctype html>\n<html lang="da">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        '<style>:root{color-scheme:light}html{-webkit-text-size-adjust:100%}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n'
        + head + '\n</head>\n<body>\n' + body + '\n</body>\n</html>\n')
readme = """# Dialyse Øvebank – udgivelse på GitHub Pages

Statisk side uden server og uden byggetrin. Hele testen ligger i én fil: `index.html`
(2094 spørgsmål, 12 faste prøver à 25 spørgsmål).

## Sådan lægger du den på GitHub Pages

1. Opret et repository på GitHub (fx `dialyse`), eller brug dit eksisterende site-repo.
2. Upload filerne:
   - nyt repo: læg `index.html` og `.nojekyll` i roden;
   - eksisterende site: læg dem i en undermappe, fx `dialyse/index.html`.
3. Gå til *Settings → Pages*. Under *Build and deployment* vælg *Deploy from a branch*,
   branch `main`, mappe `/ (root)`, og tryk *Save*.
4. Efter 1-2 minutter åbner siden på:
   - nyt repo: `https://BRUGERNAVN.github.io/dialyse/`
   - undermappe: `https://BRUGERNAVN.github.io/REPO/dialyse/`
5. Eget domæne: *Settings → Pages → Custom domain*.

Fra kommandolinjen:

    git init && git add index.html .nojekyll && git commit -m "Dialyse Øvebank"
    git branch -M main
    git remote add origin https://github.com/BRUGERNAVN/dialyse.git
    git push -u origin main

## Noter
- Siden henter skrifttyper fra Google Fonts. Uden internet bruges systemskrift, og alt virker stadig.
- Fremgang og valg gemmes i browserens localStorage, pr. domæne og pr. enhed.
- Spørgsmålene er lavet ud fra lærebogen *Dialyse* (4. udgave, 2023). Bogen selv er ikke med.
  Siden er et øvelsesværktøj og ikke til klinisk beslutningstagning.

## Kildefiler (mappen `source/`)
- `q/` spørgsmål pr. emne (`s01.json` ... `s29.json`, nogle kapitler er delt i a/b/c)
- `template.html` siden, `build.py` samler data og side til `dialyse.html`,
  `make_zip.py` laver `index.html` og zip-filen
- Genbyg: `python3 build.py && python3 make_zip.py`
"""
out = os.path.join(here, "dialyse-site.zip")
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("dialyse-site/index.html", page)
    z.writestr("dialyse-site/.nojekyll", "")
    z.writestr("dialyse-site/README.md", readme)
    for f in ("template.html", "build.py", "make_zip.py", "RAPPORT.md"):
        z.write(os.path.join(here, f), "dialyse-site/source/" + f)
    for f in sorted(os.listdir(os.path.join(here, "q"))):
        z.write(os.path.join(here, "q", f), "dialyse-site/source/q/" + f)
open(os.path.join(here, "index.html"), "w", encoding="utf-8").write(page)
print("ok", os.path.getsize(out) // 1024, "KB")
