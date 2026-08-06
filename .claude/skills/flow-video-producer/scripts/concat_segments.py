#!/usr/bin/env python3
"""Concatenate chained Flow segments into one seamless reel. Since each
segment starts from the previous one's real last frame, no transition is
needed — a straight concat is correct. Requires ffmpeg on PATH.

Usage:
  python concat_segments.py segment_01.mp4 segment_02.mp4 segment_03.mp4 --out reel.mp4
"""
import argparse
import subprocess
import tempfile
from pathlib import Path


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("segments", type=Path, nargs="+")
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()

    for seg in args.segments:
        if not seg.exists():
            raise SystemExit(f"error: {seg} not found")

    with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False) as f:
        for seg in args.segments:
            f.write(f"file '{seg.resolve()}'\n")
        list_path = Path(f.name)

    subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(list_path),
         "-c", "copy", str(args.out)],
        check=True,
    )
    list_path.unlink()
    print(f"reel saved: {args.out}")


if __name__ == "__main__":
    main()
