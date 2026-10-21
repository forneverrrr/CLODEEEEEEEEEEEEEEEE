import json, glob, os, sys

here = os.path.dirname(os.path.abspath(__file__))
titles = {
 1:("Skole","5–10"),2:("Uddannelse","11–16"),3:("Dagtilbud","17–20"),4:("Det danske arbejdsmarked","21–29"),
 5:("Dansk erhvervsliv","30–33"),6:("Det danske velfærdssamfund","34–39"),7:("Familieliv","40–45"),
 8:("Forenings- og fritidsliv","46–51"),9:("Sundhed og sygdom","52–56"),10:("Ligestilling","57–60"),
 11:("Demokrati og grundloven","61–66"),12:("Det danske retssamfund","67–70"),13:("Folketing og regering","71–75"),
 14:("Det lokale selvstyre","76–80"),15:("Folkestyret i praksis – valg og partier","81–87"),
 16:("Borgernes rettigheder og pligter","88–91"),17:("Religion og kirke","92–95"),18:("Danmark og omverdenen","96–103"),
 19:("Danmarks geografi og befolkning","104–106"),20:("Danmarks historie før 1945","107–114"),
 21:("Danmarks historie efter 1945","115–121"),22:("Dansk kultur","122–126"),23:("Traditioner og mærkedage","127–131"),
 24:("Danmarks forsvars- og sikkerhedspolitik","132–137"),
 25:("Diskrimination, antisemitisme, hadforbrydelser og ekstremisme","138–141"),26:("Klima","142–146"),
 27:("Ordliste","147–155"),
}

# rettelser: (start af oprindeligt spørgsmål) -> nyt spørgsmål
patch = {
 "Hvor mange procent stemte ja til EF i 1972-folkeafstemningen?": ["Hvor mange procent stemte ja til EF-medlemskab ved folkeafstemningen?","63,4 procent","67 procent","50 procent","85 procent",118],
 "Hvor mange procent stemte ja til EF i 1972?": ["Hvor mange procent stemte ja til EF-medlemskab ved folkeafstemningen?","63,4 procent","67 procent","50 procent","84 procent",118],
 "Hvor mange medlemmer har hvert regionsråd?": ["Hvor mange medlemmer er der i hvert regionsråd?","41","19","55","179",83],
 "Hvem bestemmer, hvem der skal danne regering?": ["Hvem afgør, hvilken regering der kan sidde?","Folketinget","Kongen alene","Domstolene","Regionerne",72],
 "Hvor findes det, hvor man kan finde oversigt over idrætsforeninger lokalt?": ["Hvor kan man finde en oversigt over lokale idrætsforeninger?","I den enkelte kommune","Hos politiet","Hos Folketinget","Hos skolen",48],
 "Hvilke fag undervises der i i folkeskolen, og hvad hedder faget madlavning?": ["Hvad hedder faget madlavning i folkeskolen?","Madkundskab","Husholdning","Køkkenfag","Ernæringslære",6],
 "Hvad har det offentlige støttet, så mange kan klare sig selv som ældre?": ["Hvad er formålet med folkepensionen?","At ældre kan klare sig selv, når de ikke arbejder mere","At børn kan gå gratis i skole","At arbejdsløse får dagpenge","At studerende får SU",37],
 "Hvad begyndte fastetiden for 40 dage før påske?": ["Hvad markerede fastelavn oprindeligt?","Begyndelsen på den kristne fastetid","Slutningen på julen","Begyndelsen på sommeren","Påskedag",128],
 "Hvilke fire partier er i den nuværende regering ifølge teksten?": None,
}

def norm(q): return " ".join(q.split())

sheets = []
problems = []
seen = set()
for n in range(1, 28):
    rows = json.load(open(os.path.join(here, "q", "s%02d.json" % n), encoding="utf-8"))
    if n == 21:
        rows += json.load(open(os.path.join(here, "q", "s21b.json"), encoding="utf-8"))
    out = []
    for r in rows:
        key = next((k for k in patch if r[0].startswith(k)), None)
        if key and patch[key]:
            r = patch[key]
        if len(r) < 5:
            problems.append((n, r[0], "for få felter")); continue
        q, right, wrongs, p = r[0], r[1], r[2:-1], r[-1]
        opts = [right] + wrongs
        if len(set(o.strip().lower() for o in opts)) != len(opts):
            problems.append((n, q, "dublet i svarmuligheder"))
        if len(wrongs) < 2:
            problems.append((n, q, "under 3 svarmuligheder"))
        if not isinstance(p, int):
            problems.append((n, q, "sidetal mangler"))
        k = norm(q) + "|" + right
        if k in seen:
            problems.append((n, q, "dublet-spørgsmål (droppet)")); continue
        seen.add(k)
        out.append(r)
    sheets.append({"n": n, "title": titles[n][0], "pages": titles[n][1], "q": out})

import random
rng = random.Random(2026)
NSETS = 12
queues = {}
for sh in sheets:
    if sh["n"] == 27: continue
    idx = list(range(len(sh["q"]))); rng.shuffle(idx); queues[sh["n"]] = idx
sets = []
for k in range(NSETS):
    skip = k % 26 + 1
    picks = []
    for n in sorted(queues):
        if n == skip: continue
        i = queues[n].pop()
        r = sh_q = sheets[n-1]["q"][i]
        wr = r[2:-1]; wr = rng.sample(wr, 2)
        picks.append({"id": "%d:%d" % (n, i), "s": n, "q": r[0], "right": r[1], "wrongs": wr, "p": r[-1]})
    rng.shuffle(picks)
    sets.append({"name": "Prøve %d" % (k + 1), "kind": "set", "items": picks})
off = json.load(open(os.path.join(here, "q", "official2025.json"), encoding="utf-8"))
items = []
for j, r in enumerate(off):
    items.append({"id": "off:%d" % j, "s": 0, "q": r[0], "right": r[1], "wrongs": r[2:-1], "p": r[-1], "nostat": True,
                  "src": "Officiel prøve 27. maj 2025 · bogen s. %d" % r[-1]})
sets.insert(0, {"name": "Officiel prøve, maj 2025", "kind": "official", "items": items})

tl = json.load(open(os.path.join(here, "q", "timeline.json"), encoding="utf-8"))
tl_seen = {}
for e in tl:
    if len(e) != 4: problems.append(("tl", e, "forkert længde"))

data = "const DATA=" + json.dumps({"sheets": sheets, "timeline": tl, "sets": sets}, ensure_ascii=False, separators=(",", ":")) + ";"
tpl = open(os.path.join(here, "template.html"), encoding="utf-8").read()
html = tpl.replace("__DATA__", data.replace("</", "<\\/"))
outp = os.path.join(here, "medborgerprove.html")
open(outp, "w", encoding="utf-8").write(html)

total = sum(len(s["q"]) for s in sheets)
print("spørgsmål i alt:", total, "· tidslinje:", len(tl), "· filstørrelse KB:", len(html.encode()) // 1024)
for s in sheets: print("  %2d %-60s %3d" % (s["n"], s["title"][:60], len(s["q"])))
print("problemer:", len(problems))
for p in problems: print("  ", p)

# rapport
with open(os.path.join(here, "RAPPORT.md"), "w", encoding="utf-8") as f:
    f.write("# Rapport: medborgerprøven øvebank\n\nKilde: Læremateriale til medborgerskabsprøven (aug. 2026), 156 sider.\n\n")
    f.write("| Nr | Emne | Sider | Spørgsmål |\n|---|---|---|---|\n")
    for sh in sheets: f.write("| %d | %s | %s | %d |\n" % (sh["n"], sh["title"], sh["pages"], len(sh["q"])))
    f.write("| | **I alt** | | **%d** |\n\n" % total)
    f.write("Faste prøver: officiel maj 2025 + %d prøver à 25 spørgsmål (ingen spørgsmål gentages mellem prøverne).\n" % NSETS)
print("sæt:", len(sets), [len(x["items"]) for x in sets])
# ingen overlap
allids = [it["id"] for st in sets if st["kind"]=="set" for it in st["items"]]
print("unikke spørgsmål i prøver:", len(set(allids)), "af", len(allids))
