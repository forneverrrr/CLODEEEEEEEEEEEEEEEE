#!/usr/bin/env bash
# Batch resize/convert images, with optional text or image watermark.
# Requires ImageMagick (convert/mogrify or the `magick` wrapper).
set -euo pipefail

usage() {
	cat <<'EOF'
Usage: batch_resize.sh -i INPUT_DIR -o OUTPUT_DIR [options]

Required:
  -i DIR        Input directory with images
  -o DIR        Output directory (created if missing)

Options:
  -s SIZE       Target size, e.g. 1024x1024 (default: 1024x1024)
  -m MODE       fit | fill (default: fill)
                  fit  - resize to fit within SIZE, keep aspect ratio, no crop
                  fill - resize+crop to fill SIZE exactly, no distortion
  -f FORMAT     Output format/extension, e.g. jpg, png, webp (default: keep original)
  -q QUALITY    JPEG/WebP quality 1-100 (default: 90)
  -t TEXT       Watermark text to stamp in the bottom-right corner
  -w IMAGE      Watermark image (PNG with transparency recommended) to overlay bottom-right
  -h            Show this help
EOF
}

INPUT_DIR=""
OUTPUT_DIR=""
SIZE="1024x1024"
MODE="fill"
FORMAT=""
QUALITY="90"
WM_TEXT=""
WM_IMAGE=""

while getopts "i:o:s:m:f:q:t:w:h" opt; do
	case "$opt" in
		i) INPUT_DIR="$OPTARG" ;;
		o) OUTPUT_DIR="$OPTARG" ;;
		s) SIZE="$OPTARG" ;;
		m) MODE="$OPTARG" ;;
		f) FORMAT="$OPTARG" ;;
		q) QUALITY="$OPTARG" ;;
		t) WM_TEXT="$OPTARG" ;;
		w) WM_IMAGE="$OPTARG" ;;
		h) usage; exit 0 ;;
		*) usage; exit 1 ;;
	esac
done

if [[ -z "$INPUT_DIR" || -z "$OUTPUT_DIR" ]]; then
	echo "Error: -i and -o are required" >&2
	usage
	exit 1
fi

if ! [[ "$SIZE" =~ ^[0-9]+x[0-9]+$ ]]; then
	echo "Error: -s must look like 1024x1024" >&2
	exit 1
fi

if [[ "$MODE" != "fit" && "$MODE" != "fill" ]]; then
	echo "Error: -m must be 'fit' or 'fill'" >&2
	exit 1
fi

if command -v magick >/dev/null 2>&1; then
	CONVERT=(magick)
elif command -v convert >/dev/null 2>&1; then
	CONVERT=(convert)
else
	echo "Error: ImageMagick not found. Install it first (e.g. apt install imagemagick / brew install imagemagick)." >&2
	exit 1
fi

mkdir -p "$OUTPUT_DIR"

shopt -s nullglob nocaseglob
files=("$INPUT_DIR"/*.{jpg,jpeg,png,webp,bmp,tiff,tif})
shopt -u nocaseglob

if [[ ${#files[@]} -eq 0 ]]; then
	echo "No images found in $INPUT_DIR"
	exit 0
fi

echo "Found ${#files[@]} image(s). Processing..."

for src in "${files[@]}"; do
	base="$(basename "$src")"
	name="${base%.*}"
	ext="${base##*.}"
	out_ext="${FORMAT:-$ext}"
	dest="$OUTPUT_DIR/${name}.${out_ext}"

	args=("$src")

	if [[ "$MODE" == "fit" ]]; then
		args+=(-resize "${SIZE}")
	else
		args+=(-resize "${SIZE}^" -gravity center -extent "${SIZE}")
	fi

	args+=(-quality "$QUALITY")

	if [[ -n "$WM_IMAGE" ]]; then
		if [[ ! -f "$WM_IMAGE" ]]; then
			echo "Error: watermark image not found: $WM_IMAGE" >&2
			exit 1
		fi
		"${CONVERT[@]}" "${args[@]}" \
			\( "$WM_IMAGE" -resize 15% \) \
			-gravity southeast -geometry +20+20 -composite \
			"$dest"
	elif [[ -n "$WM_TEXT" ]]; then
		"${CONVERT[@]}" "${args[@]}" \
			-gravity southeast -pointsize 28 -fill white -stroke black -strokewidth 1 \
			-annotate +20+20 "$WM_TEXT" \
			"$dest"
	else
		"${CONVERT[@]}" "${args[@]}" "$dest"
	fi

	echo "  $base -> $dest"
done

echo "Done. Output in: $OUTPUT_DIR"
