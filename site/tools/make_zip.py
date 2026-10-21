#!/usr/bin/env python3
"""Pakker hele sitet til ovebank-site.zip (ligger i mappen over site/)."""
import os, zipfile
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(root, "ovebank-site.zip")
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in ("__pycache__", ".git")]
        for f in fn:
            if f.endswith(".zip"): continue
            p = os.path.join(dp, f)
            z.write(p, "ovebank-site/" + os.path.relpath(p, root))
print("ok", os.path.getsize(out) // 1024, "KB")
