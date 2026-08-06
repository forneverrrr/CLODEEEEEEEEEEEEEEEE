#!/usr/bin/env python3
"""Extract the exact last frame of a video segment so it can be used as the
start image for the next chained segment. Requires ffmpeg on PATH.

Usage:
  python chain_frame.py segment_01.mp4 --out segment_01_lastframe.png
  python chain_frame.py segment_01.mp4 --preview   # just opens/saves for a look, no chaining yet
"""
import argparse
import subprocess
import sys
from pathlib import Path


def get_duration(video_path: Path) -> float:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", str(video_path)],
        capture_output=True, text=True, check=True,
    )
    return float(result.stdout.strip())


def extract_last_frame(video_path: Path, out_path: Path, back_off: float = 0.05):
    duration = get_duration(video_path)
    ts = max(0.0, duration - back_off)
    subprocess.run(
        ["ffmpeg", "-y", "-ss", str(ts), "-i", str(video_path),
         "-frames:v", "1", "-q:v", "2", str(out_path)],
        check=True, capture_output=True,
    )


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("video", type=Path)
    parser.add_argument("--out", type=Path, default=None,
                         help="Output image path (default: <video>_lastframe.png)")
    parser.add_argument("--preview", action="store_true",
                         help="Just extract and print the path, don't assume chaining")
    args = parser.parse_args()

    if not args.video.exists():
        print(f"error: {args.video} not found", file=sys.stderr)
        sys.exit(1)

    out_path = args.out or args.video.with_name(args.video.stem + "_lastframe.png")
    extract_last_frame(args.video, out_path)
    print(f"last frame saved: {out_path}")
    if args.preview:
        print("preview mode — open this file and look at it before using it as a next start image")


if __name__ == "__main__":
    main()
