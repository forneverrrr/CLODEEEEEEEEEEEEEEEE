#!/usr/bin/env python3
"""
Случайная обрезка пикселей: берёт картинки 1024x1024 из input/,
для каждой делает ОДИН случайный кроп — ширина и высота независимо
выбираются в диапазоне MIN_SIZE..MAX_SIZE (например 1018x1023),
позиция кропа тоже случайная. Складывает в output/.
"""

import random
from pathlib import Path
from PIL import Image

INPUT_DIR = Path(__file__).parent / "input"
OUTPUT_DIR = Path(__file__).parent / "output"
MIN_SIZE = 1018
MAX_SIZE = 1023

SUPPORTED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".bmp"}


def random_crop(img: Image.Image) -> Image.Image:
    w = random.randint(MIN_SIZE, MAX_SIZE)
    h = random.randint(MIN_SIZE, MAX_SIZE)
    x = random.randint(0, img.width - w)
    y = random.randint(0, img.height - h)
    return img.crop((x, y, x + w, y + h))


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

        cropped = random_crop(img)
        out_path = OUTPUT_DIR / f"{img_path.stem}_{cropped.width}x{cropped.height}{img_path.suffix}"
        cropped.save(out_path)
        print(f"{img_path.name}: {cropped.width}x{cropped.height}")

    print(f"\nГотово. Результаты в {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
