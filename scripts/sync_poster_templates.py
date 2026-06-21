#!/usr/bin/env python3
"""
scripts/sync_poster_templates.py

poster_master.csv を正として:
  1. 元画像から SAMPLE 透かし入り縮小プレビューを生成
  2. static/poster_templates.json を再生成

使い方:
    python scripts/sync_poster_templates.py           # 未生成のみ処理
    python scripts/sync_poster_templates.py --force   # プレビューを全て再生成
"""

import csv
import json
import math
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Pillow が必要です: pip install Pillow")

PROJECT_DIR    = Path(__file__).parent.parent
MASTER_CSV     = PROJECT_DIR / "poster_master.csv"
POSTERS_DIR    = PROJECT_DIR / "static" / "posters"
PREVIEW_DIR    = PROJECT_DIR / "static" / "posters_preview"
TEMPLATES_JSON = PROJECT_DIR / "static" / "poster_templates.json"

CATEGORIES_ORDER = ["春", "夏", "秋", "冬", "母の日", "ギフト", "開店祝い", "他"]

SEASON_GRADIENT = {
    "春":     "linear-gradient(135deg, #fde8ed 0%, #f0a8b8 50%, #fff0f3 100%)",
    "夏":     "linear-gradient(135deg, #e3f2fd 0%, #1976d2 50%, #b3e5fc 100%)",
    "秋":     "linear-gradient(135deg, #fff3e0 0%, #e65100 50%, #ff8f00 100%)",
    "冬":     "linear-gradient(135deg, #eceff1 0%, #90a4ae 50%, #ffffff 100%)",
    "母の日": "linear-gradient(135deg, #fce4ec 0%, #f48fb1 55%, #fff9c4 100%)",
    "ギフト": "linear-gradient(135deg, #fff8e1 0%, #ffb74d 50%, #fff3e0 100%)",
    "開店祝い": "linear-gradient(135deg, #e8f5e9 0%, #66bb6a 50%, #fffde7 100%)",
    "他":     "linear-gradient(135deg, #fdfbf7 0%, #c8b89a 50%, #f7f3ec 100%)",
}

MAX_LONG_SIDE = 1000
JPEG_QUALITY  = 82
FORCE         = "--force" in sys.argv

FONT_CANDIDATES = [
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\calibri.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]


# ── 画像ユーティリティ ────────────────────────────────────────

def _load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()


def _resize(img: Image.Image) -> Image.Image:
    w, h = img.size
    long_side = max(w, h)
    if long_side <= MAX_LONG_SIDE:
        return img.copy()
    scale = MAX_LONG_SIDE / long_side
    return img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)


def _burn_sample(img: Image.Image) -> Image.Image:
    """斜め 30° タイルの SAMPLE 透かし"""
    rgba = img.convert("RGBA")
    w, h = rgba.size

    font_size = max(28, round(min(w, h) * 0.046))
    font      = _load_font(font_size)
    text      = "SAMPLE"

    tmp = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    bb  = tmp.textbbox((0, 0), text, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]

    tile_w = round(tw * 2.8)
    tile_h = round(th * 3.8)

    diag   = round(math.sqrt(w * w + h * h)) + max(tile_w, tile_h) * 2
    canvas = Image.new("RGBA", (diag, diag), (0, 0, 0, 0))
    draw   = ImageDraw.Draw(canvas)
    cx, cy = diag // 2, diag // 2

    for row in range(-diag // tile_h - 2, diag // tile_h + 3):
        for col in range(-diag // tile_w - 2, diag // tile_w + 3):
            x = cx + col * tile_w - tw // 2
            y = cy + row * tile_h - th // 2
            draw.text((x, y), text, font=font, fill=(255, 255, 255, 42))

    rotated    = canvas.rotate(-30, expand=False, center=(cx, cy))
    tile_layer = rotated.crop((cx - w // 2, cy - h // 2,
                               cx - w // 2 + w, cy - h // 2 + h))
    return Image.alpha_composite(rgba, tile_layer).convert("RGB")


def _avg_brightness(img: Image.Image, box) -> float:
    from PIL import ImageStat
    region = img.crop(box).convert("L")
    stat = ImageStat.Stat(region)
    return stat.mean[0] if stat.mean else 128.0


def _burn_poster_id(img: Image.Image, poster_id: str) -> Image.Image:
    """右下に [SAMPLE] HP-XXXX を焼き込む"""
    rgba = img.convert("RGBA")
    w, h = rgba.size

    font_size = max(10, round(min(w, h) * 0.018))
    font      = _load_font(font_size)
    text      = f"[SAMPLE] {poster_id}"

    draw = ImageDraw.Draw(rgba)
    bb   = draw.textbbox((0, 0), text, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]

    margin = round(font_size * 1.6)
    tx = w - margin - tw
    ty = h - margin - th

    br = _avg_brightness(rgba, (max(0, tx - 4), max(0, ty - 4),
                                min(w, tx + tw + 4), min(h, ty + th + 4)))
    text_fill = (255, 255, 255, 170) if br < 140 else (30, 30, 30, 150)
    bg_fill   = (0, 0, 0, 72)       if br < 140 else (255, 255, 255, 110)

    pad, r = round(font_size * 0.4), round(font_size * 0.3)
    try:
        draw.rounded_rectangle([tx - pad, ty - pad, tx + tw + pad, ty + th + pad],
                               radius=r, fill=bg_fill)
    except AttributeError:
        draw.rectangle([tx - pad, ty - pad, tx + tw + pad, ty + th + pad],
                       fill=bg_fill)
    draw.text((tx, ty), text, font=font, fill=text_fill)
    return rgba.convert("RGB")


def generate_preview(source_path: Path, preview_path: Path, poster_id: str) -> None:
    with Image.open(source_path) as raw:
        img = raw.convert("RGB")
    img = _resize(img)
    img = _burn_sample(img)
    img = _burn_poster_id(img, poster_id)
    img.save(preview_path, "JPEG", quality=JPEG_QUALITY, optimize=True)


# ── メイン ────────────────────────────────────────────────────

def main() -> None:
    if not MASTER_CSV.exists():
        sys.exit(f"poster_master.csv が見つかりません: {MASTER_CSV}")

    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    templates         = []
    skipped           = 0
    generated         = 0
    kept              = 0
    registered_sources: set[Path] = set()

    with open(MASTER_CSV, encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            poster_id  = row["poster_id"].strip()
            source_rel = row.get("source_path", "").strip()

            source_path  = (PROJECT_DIR / source_rel) if source_rel else None
            if source_path:
                registered_sources.add(source_path.resolve())
            preview_name = f"{poster_id}_preview.jpg"
            preview_path = PREVIEW_DIR / preview_name
            preview_url  = f"/static/posters_preview/{preview_name}"

            # プレビュー生成判定
            if FORCE or not preview_path.exists():
                if source_path and source_path.exists():
                    print(f"  [{poster_id}] {source_path.name} → {preview_name}")
                    try:
                        generate_preview(source_path, preview_path, poster_id)
                        generated += 1
                    except Exception as e:
                        print(f"  ERROR [{poster_id}] {e}")
                        if not preview_path.exists():
                            skipped += 1
                            continue
                else:
                    if not preview_path.exists():
                        print(f"  SKIP [{poster_id}] 元画なし・プレビューなし: {source_rel}")
                        skipped += 1
                        continue
                    print(f"  KEEP [{poster_id}] 既存プレビュー使用（元画なし）")
                    kept += 1
            else:
                kept += 1

            # JSON エントリ構築
            num_m   = re.search(r"(\d+)$", poster_id)
            tpl_id  = f"img-{int(num_m.group(1)):04d}" if num_m else f"img-{poster_id}"
            season  = row["season"].strip()

            categories = [c.strip() for c in row["categories"].split(";") if c.strip()]
            tags       = [t.strip() for t in row["tags"].split(";") if t.strip()]
            source_url = ("/" + source_rel.replace("\\", "/")) if source_rel else ""

            templates.append({
                "id":                  tpl_id,
                "poster_id":           poster_id,
                "title":               row["title"].strip(),
                "short_label":         row["short_label"].strip(),
                "gradient":            SEASON_GRADIENT.get(season, SEASON_GRADIENT["春"]),
                "image":               preview_url,
                "preview_image":       preview_url,
                "source_image":        source_url,
                "categories":          categories,
                "season":              season,
                "tags":                tags,
                "poster_allowed":      row["poster_allowed"].strip().lower() == "true",
                "featured":            row["featured"].strip().lower() == "true",
                "default_main_title":  row["default_main_title"].strip(),
                "default_subtitle":    row["default_subtitle"].strip(),
                "default_note":        row["default_note"].strip(),
                "poster_type":         row["poster_type"].strip(),
                "poster_design":       row["poster_design"].strip(),
                "poster_position":     row["poster_position"].strip(),
                "flower_match":        row["flower_match"].strip(),
                "has_embedded_title":  (row.get("has_embedded_title") or "").strip().lower() == "true",
                "embedded_title":      (row.get("embedded_title") or "").strip(),
                "safe_fit_mode":       (row.get("safe_fit_mode") or "").strip(),
            })

    # static/posters/ に存在するが poster_master.csv 未登録の画像を検出
    if POSTERS_DIR.exists():
        IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}
        unlisted = sorted(
            p for p in POSTERS_DIR.iterdir()
            if p.suffix.lower() in IMAGE_EXTS and p.resolve() not in registered_sources
        )
        if unlisted:
            print("\n未登録画像があります：")
            for p in unlisted:
                print(f"  - static/posters/{p.name}")

    out = {
        "categories_order": CATEGORIES_ORDER,
        "templates": templates,
    }
    with open(TEMPLATES_JSON, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"\n完了:")
    print(f"  生成: {generated} 件  /  既存: {kept} 件  /  スキップ: {skipped} 件")
    print(f"  poster_templates.json: {len(templates)} エントリ")
    print(f"  {TEMPLATES_JSON}")


if __name__ == "__main__":
    main()
