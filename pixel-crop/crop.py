#!/usr/bin/env python3
"""
Случайная обрезка пикселей: берёт картинки 1024x1024 из input/,
для каждой создаёт N копий со случайным квадратным кропом размером
от MIN_SIZE до MAX_SIZE (позиция кропа тоже случайная), складывает в output/.
"""

import random
from pathlib import Path
from PIL import Image

INPUT_DIR = Path(__file__).parent / "input"
OUTPUT_DIR = Path(__file__).parent / "output"
COPIES_PER_IMAGE = 20
MIN_SIZE = 1018
MAX_SIZE = 1023

SUPPORTED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".bmp"}


def random_crop(img: Image.Image) -> Image.Image:
    size = random.randint(MIN_SIZE, MAX_SIZE)
    max_x = img.width - size
    max_y = img.height - size
    x = random.randint(0, max_x)
    y = random.randint(0, max_y)
    return img.crop((x, y, x + size, y + size))


def main():
    OUTPUT_DIR.mkdir(exist_ok=True)
    images = sorted(p for p in INPUT_DIR.iterdir() if p.suffix.lower() in SUPPORTED_EXTS)

    if not images:
        print(f"Нет картинок в {INPUT_DIR}")
        return

    for img_path in images:
        img = Image.open(img_path)
        if img.width < MAX_SIZE or img.height < MAX_SIZE:
            print(f"Пропуск {img_path.name}: размер {img.width}x{img.height} меньше {MAX_SIZE}")
            continue

        stem = img_path.stem
        for i in range(1, COPIES_PER_IMAGE + 1):
            cropped = random_crop(img)
            out_path = OUTPUT_DIR / f"{stem}_crop{i:02d}_{cropped.width}x{cropped.height}{img_path.suffix}"
            cropped.save(out_path)

        print(f"{img_path.name}: создано {COPIES_PER_IMAGE} обрезанных копий")

    print(f"\nГотово. Результаты в {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
