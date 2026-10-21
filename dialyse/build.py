import json, os, random

here = os.path.dirname(os.path.abspath(__file__))
titles = {
 1:"Akut nyreinsufficiens",2:"Kronisk nyreinsufficiens",3:"Valg af dialysebehandling",4:"Biofysik og dialyseprincipper",
 5:"Peritonealdialyse",6:"PD-katetre",7:"Hæmodialyse",8:"Hjemmehæmodialyse",9:"Vaskulære adgangsveje",10:"Dialysedosis",
 11:"Renal anæmi",12:"Knogle- og mineralmetabolisme",13:"Blodtryk",14:"Hjerte-kar-sygdom",15:"Ernæring",
 16:"Hormoner og graviditet",17:"Seksuel dysfunktion",18:"Fysisk træning",19:"Dosering af medicin",20:"Dialyse ved diabetes",
 21:"Børn i peritonealdialyse",22:"Børn i hæmodialyse",23:"Plasmaferese og aferese",24:"Forgiftninger",
 25:"Recipient- og donorudredning",26:"Nyretransplantation",27:"Maksimal medicinsk uræmibehandling (MMU)",
 28:"Palliation",29:"Socialrådgivning",
}
files = {5: ["s05a", "s05b"], 7: ["s07a", "s07b", "s07c"], 9: ["s09a", "s09b"]}

def clean(r):
    return [x.replace(" (tekst) ", " ").replace("(tekst)", "").strip() if isinstance(x, str) else x for x in r]

def norm(q): return " ".join(q.split())

sheets, problems, seen = [], [], set()
for n in range(1, 30):
    rows = []
    for f in files.get(n, ["s%02d" % n]):
        rows += json.load(open(os.path.join(here, "q", f + ".json"), encoding="utf-8"))
    out = []
    for r in rows:
        r = clean(r)
        if len(r) < 5:
            problems.append((n, r[0], "for få felter")); continue
        q, right, wrongs, p = r[0], r[1], r[2:-1], r[-1]
        opts = [right] + wrongs
        if len(set(o.strip().lower() for o in opts)) != len(opts):
            problems.append((n, q, "dublet i svarmuligheder"))
        if len(wrongs) < 2: problems.append((n, q, "under 3 svarmuligheder"))
        if not isinstance(p, int): problems.append((n, q, "sidetal mangler"))
        k = norm(q) + "|" + right
        if k in seen:
            problems.append((n, q, "dublet-spørgsmål (droppet)")); continue
        seen.add(k); out.append(r)
    ps = [r[-1] for r in out]
    sheets.append({"n": n, "title": titles[n], "pages": "%d–%d" % (min(ps), max(ps)), "q": out})

rng = random.Random(2026)
NSETS = 12
queues = {}
for sh in sheets:
    idx = list(range(len(sh["q"]))); rng.shuffle(idx); queues[sh["n"]] = idx
sets = []
for k in range(NSETS):
    skip = {(k * 4 + j) % 29 + 1 for j in range(4)}
    picks = []
    for n in sorted(queues):
        if n in skip: continue
        i = queues[n].pop()
        r = sheets[n - 1]["q"][i]
        picks.append({"id": "%d:%d" % (n, i), "s": n, "q": r[0], "right": r[1], "wrongs": rng.sample(r[2:-1], 2), "p": r[-1]})
    rng.shuffle(picks)
    sets.append({"name": "Prøve %d" % (k + 1), "kind": "set", "items": picks})

data = "const DATA=" + json.dumps({"sheets": sheets, "sets": sets}, ensure_ascii=False, separators=(",", ":")) + ";"
tpl = open(os.path.join(here, "template.html"), encoding="utf-8").read()
html = tpl.replace("__DATA__", data.replace("</", "<\\/"))
open(os.path.join(here, "dialyse.html"), "w", encoding="utf-8").write(html)

total = sum(len(s["q"]) for s in sheets)
print("spørgsmål i alt:", total, "· KB:", len(html.encode()) // 1024)
print("problemer:", len(problems))
for p in problems: print("  ", p)
with open(os.path.join(here, "RAPPORT.md"), "w", encoding="utf-8") as f:
    f.write("# Rapport: Dialyse Øvebank\n\nKilde: lærebogen Dialyse, 4. udgave 2023 (ISBN 9788794454599).\n\n| Kap. | Emne | Sider | Spørgsmål |\n|---|---|---|---|\n")
    for sh in sheets: f.write("| %d | %s | %s | %d |\n" % (sh["n"], sh["title"], sh["pages"], len(sh["q"])))
    f.write("| | **I alt** | | **%d** |\n\nFaste prøver: %d prøver à 25 spørgsmål (ingen spørgsmål gentages mellem prøverne).\n" % (total, NSETS))
allids = [it["id"] for st in sets for it in st["items"]]
print("sæt:", len(sets), [len(x["items"]) for x in sets], "unikke", len(set(allids)), "af", len(allids))
