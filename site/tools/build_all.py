#!/usr/bin/env python3
"""Bygger alle bøger: books/<bog>/src/{config.json,data/sNN.json,chapters.json} -> books/<bog>/book.js, og shared/books.js (forsidens liste).
Spørgsmåls-id'er er stabile og gemmes i data/*.json: brugerens fremgang er knyttet til dem.
Ny bog: kopiér en eksisterende mappe, ret config.json, læg spørgsmål i src/data/, kør dette script."""
import json, os, random
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bdir = os.path.join(root, "books")
def load(p): return json.load(open(p, encoding="utf-8"))

def build(slug):
    d = os.path.join(bdir, slug); src = os.path.join(d, "src"); cfg = load(os.path.join(src, "config.json"))
    chp = {c["n"]: c for c in load(os.path.join(src, "chapters.json"))} if os.path.exists(os.path.join(src, "chapters.json")) else {}
    sheets, problems, ids = [], [], set()
    for sc in cfg["sheets"]:
        n = sc["n"]; rows = load(os.path.join(src, "data", "s%02d.json" % n)); out = []
        for r in rows:
            if r["id"] in ids: problems.append((n, r["id"], "dublet-id")); continue
            ids.add(r["id"])
            if len(r["w"]) < 1: problems.append((n, r["id"], "for få forkerte svar"))
            if r.get("lvl") not in ("K", "U", "D"): problems.append((n, r["id"], "mangler niveau"))
            o = {"id": r["id"], "q": r["q"], "a": r["a"], "w": r["w"], "p": r["p"], "l": r.get("lvl", "U"), "t": r.get("type", "fakta")}
            if r.get("why"): o["x"] = r["why"]
            out.append(o)
        pages = sc.get("pages") or "%d–%d" % (min(r["p"] for r in out), max(r["p"] for r in out))
        sh = {"n": n, "title": sc["title"], "pages": pages, "q": out}
        if n in chp: sh["goals"] = chp[n].get("goals", []); sh["keys"] = chp[n].get("keypoints", [])
        sheets.append(sh)
    by = {s["n"]: s for s in sheets}
    sc = cfg["sets"]; rng = random.Random(2026)
    pool = [s["n"] for s in sheets if s["n"] not in sc.get("excludeSheets", [])]
    # prøver bruger kerne (K) først, derefter udvidet (U); detaljer (D) kommer aldrig med
    queues = {}
    for n in pool:
        k = [q for q in by[n]["q"] if q["l"] == "K"]; u = [q for q in by[n]["q"] if q["l"] == "U"]
        rng.shuffle(k); rng.shuffle(u); queues[n] = u + k      # pop() tager fra enden: K først
    sets = []
    for k in range(sc["count"]):
        skip = {pool[(k * sc["skipPerSet"] + j) % len(pool)] for j in range(sc["skipPerSet"])}
        picks = []; used = set()
        def take(n):
            q = queues[n].pop(); used.add(n)
            picks.append({"id": q["id"], "s": n, "q": q["q"], "right": q["a"], "wrongs": rng.sample(q["w"], min(2, len(q["w"]))), "p": q["p"], "l": q["l"], "why": q.get("x", "")})
        for n in pool:
            if n in skip or not queues[n] or len(picks) >= sc["perSet"]: continue
            take(n)
        while len(picks) < sc["perSet"]:
            rest = [n for n in pool if n not in used and queues[n]]
            if not rest: break
            take(rng.choice(rest))
        rng.shuffle(picks)
        sets.append({"name": "Prøve %d" % (k + 1), "kind": "set", "items": picks})
    if os.path.exists(os.path.join(src, "q", "exams.json")):
        offs = []
        for e in load(os.path.join(src, "q", "exams.json")):
            items = []
            for j, r in enumerate(e["items"]):
                it = {"id": "ex:%s:%d" % (e["id"], r["n"]), "s": 0, "q": r["q"], "right": r["a"], "wrongs": r["w"], "p": 0, "nostat": True, "src": e["name"]}
                if r.get("note"): it["note"] = r["note"]
                items.append(it)
            offs.append({"name": e["name"], "kind": "official", "items": items})
        sets = offs + sets
    tl = load(os.path.join(src, "q", cfg["timeline"])) if cfg.get("timeline") else []
    total = sum(len(s["q"]) for s in sheets)
    meta = dict(cfg["meta"]); meta["setCount"] = sc["count"]; meta["setsVer"] = cfg.get("setsVer", "1")
    data = {"meta": meta, "sheets": sheets, "sets": sets, "timeline": tl}
    js = "window.BOOK=" + json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + ";\n"
    open(os.path.join(d, "book.js"), "w", encoding="utf-8").write(js)
    allids = [it["id"] for st in sets if st["kind"] == "set" for it in st["items"]]
    assert len(set(allids)) == len(allids), "spørgsmål gentages mellem prøver"
    lv = {"K": 0, "U": 0, "D": 0}
    for s in sheets:
        for q in s["q"]: lv[q["l"]] = lv.get(q["l"], 0) + 1
    with open(os.path.join(d, "RAPPORT.md"), "w", encoding="utf-8") as f:
        f.write("# Rapport: %s\n\n| Nr | Emne | Sider | Spørgsmål | K | U | D |\n|---|---|---|---|---|---|---|\n" % meta["title"])
        for s in sheets:
            c = {"K": 0, "U": 0, "D": 0}
            for q in s["q"]: c[q["l"]] += 1
            f.write("| %d | %s | %s | %d | %d | %d | %d |\n" % (s["n"], s["title"], s["pages"], len(s["q"]), c["K"], c["U"], c["D"]))
        f.write("| | **I alt** | | **%d** | %d | %d | %d |\n" % (total, lv["K"], lv["U"], lv["D"]))
    print("%-16s spørgsmål %4d (K%d U%d D%d) · tidslinje %3d · prøver %2d · %4d KB · problemer %d" % (slug, total, lv["K"], lv["U"], lv["D"], len(tl), len(sets), len(js.encode()) // 1024, len(problems)))
    for p in problems[:30]: print("   ", p)
    return {"slug": slug, "title": meta["title"], "sub": meta["sub"], "accent": meta["accent"], "icon": meta["icon"], "count": total, "order": meta.get("order", 99), "ids": sorted(ids)}

entries = []
for slug in sorted(os.listdir(bdir)):
    if os.path.exists(os.path.join(bdir, slug, "src", "config.json")): entries.append(build(slug))
entries.sort(key=lambda e: e["order"])
open(os.path.join(root, "shared", "books.js"), "w", encoding="utf-8").write("window.BOOKS=" + json.dumps(entries, ensure_ascii=False, separators=(",", ":")) + ";\n")
print("bøger:", [e["slug"] for e in entries])
