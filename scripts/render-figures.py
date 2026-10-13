#!/usr/bin/env python3
"""Render selected source slides as site images with Poppler's pdftoppm."""

from pathlib import Path
import subprocess

PAGES = {
    1: (50, 55),
    2: (50, 123),
    3: (25, 56),
    4: (50, 55),
    5: (58, 98),
    6: (19, 69),
}

ROOT = Path(__file__).resolve().parent.parent

for lecture, pages in PAGES.items():
    source = ROOT / "slides" / f"lecture{lecture:02}.pdf"
    output_dir = ROOT / "public" / "slides" / "figures" / f"lecture{lecture:02}"
    output_dir.mkdir(parents=True, exist_ok=True)
    selected_names = {f"page-{page:03}.png" for page in pages}
    for old_image in output_dir.glob("page-*.png"):
        if old_image.name not in selected_names:
            old_image.unlink()
    for page in pages:
        destination = output_dir / f"page-{page:03}"
        subprocess.run(
            [
                "pdftoppm", "-f", str(page), "-l", str(page),
                "-scale-to-x", "1200", "-scale-to-y", "-1",
                "-singlefile", "-png", str(source), str(destination),
            ],
            check=True,
        )
        if not destination.with_suffix(".png").is_file():
            raise RuntimeError(f"Missing rendered slide: {source.name}, page {page}")
        print(f"Rendered {source.name} page {page}")
