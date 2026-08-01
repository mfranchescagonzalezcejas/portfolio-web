#!/usr/bin/env bash
set -euo pipefail

# The measured screen slot is 216 CSS px; 432w covers its 2x DPR target.
readonly ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly MEDIA_ROOT="$ROOT/public/inkscroller/screenshots"
readonly WIDTHS=(216 432)
readonly FORMATS=(avif webp)
readonly SOURCES=(
  "dark/en/home.jpg"
  "dark/en/explore.jpg"
  "dark/en/library.jpg"
  "dark/en/story-detail.jpg"
  "dark/reader.jpg"
  "dark/reader-2.jpg"
  "dark/en/reader-settings.jpg"
  "light/en/home.jpg"
  "light/en/explore.jpg"
  "light/en/library.jpg"
  "light/en/story-detail.jpg"
  "light/reader.jpg"
  "light/reader-2.jpg"
  "light/en/reader-settings-vertical-en.jpg"
  "dark/es/home.jpg"
  "dark/es/explore.jpg"
  "dark/es/library.jpg"
  "dark/es/story-detail.jpg"
  "dark/es/reader-settings.jpg"
  "light/es/home.jpg"
  "light/es/explore.jpg"
  "light/es/library.jpg"
  "light/es/story-detail.jpg"
  "light/es/reader-settings-vertical.jpg"
)

fail() { printf 'error: %s\n' "$*" >&2; exit 1; }

require_encoder() {
  command -v magick >/dev/null || fail "ImageMagick (magick) is required"
  local format
  for format in AVIF WEBP; do
    magick -list format | grep -Eq "^[[:space:]]*${format}[* ] .* rw\+" ||
      fail "ImageMagick lacks a writable ${format} encoder"
  done
}

output_path() {
  local source="$1" width="$2" format="$3"
  printf '%s/%s-%sw.%s' "$MEDIA_ROOT" "${source%.jpg}" "$width" "$format"
}

verify_output() {
  local source="$1" width="$2" format="$3" output
  output="$(output_path "$source" "$width" "$format")"
  [[ -f "$output" ]] || fail "missing derivative: ${output#$ROOT/}"
  [[ "$(magick identify -format '%w' "$output")" == "$width" ]] ||
    fail "wrong width for ${output#$ROOT/}"
  [[ "$(magick identify -format '%m' "$output")" == "${format^^}" ]] ||
    fail "wrong format for ${output#$ROOT/}"
  [[ -z "$(magick identify -format '%[profile:*]' "$output")" ]] ||
    fail "metadata profile retained in ${output#$ROOT/}"
}

require_encoder
[[ "${1:-}" == "" || "${1:-}" == "--check" ]] || fail "usage: $0 [--check]"

expected=0
for source in "${SOURCES[@]}"; do
  input="$MEDIA_ROOT/$source"
  [[ -f "$input" ]] || fail "missing source: ${input#$ROOT/}"
  for width in "${WIDTHS[@]}"; do
    [[ "$(magick identify -format '%w' "$input")" -ge "$width" ]] ||
      fail "source is too narrow for ${width}w: ${input#$ROOT/}"
    for format in "${FORMATS[@]}"; do
      expected=$((expected + 1))
      output="$(output_path "$source" "$width" "$format")"
      if [[ "${1:-}" == "--check" ]]; then
        verify_output "$source" "$width" "$format"
      else
        [[ ! -e "$output" ]] || fail "refusing to overwrite: ${output#$ROOT/}"
        magick "$input" -auto-orient -strip -resize "${width}x>" "$output" ||
          fail "conversion failed: ${output#$ROOT/}"
        verify_output "$source" "$width" "$format"
      fi
    done
  done
done

actual="$(find "$MEDIA_ROOT" -type f \( -name '*-216w.avif' -o -name '*-216w.webp' -o -name '*-432w.avif' -o -name '*-432w.webp' \) | wc -l | tr -d ' ')"
[[ "$actual" == "$expected" ]] || fail "expected ${expected} derivatives, found ${actual}"
printf 'verified %s InkScroller derivatives\n' "$expected"
