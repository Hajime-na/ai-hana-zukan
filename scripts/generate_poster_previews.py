#!/usr/bin/env python3
"""
generate_poster_previews.py  (v1.0-rc9)

static/posters/ の元画像から SAMPLE 透かし入り縮小プレビューを生成し、
poster_templates.json を自動更新します。

使い方:
    python scripts/generate_poster_previews.py          # 未生成のみ処理
    python scripts/generate_poster_previews.py --force  # 全て再生成
"""

import json
import math
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Pillow が必要です: pip install Pillow")

# ── パス定義 ──────────────────────────────────────────────
SCRIPT_DIR   = Path(__file__).parent
PROJECT_DIR  = SCRIPT_DIR.parent
POSTERS_DIR  = PROJECT_DIR / "static" / "posters"
PREVIEW_DIR  = PROJECT_DIR / "static" / "posters_preview"
TEMPLATES_JSON = PROJECT_DIR / "static" / "poster_templates.json"

MAX_LONG_SIDE = 1000   # 縮小後の長辺上限 (px)
JPEG_QUALITY  = 82

# Windows / Linux フォント候補（英数字のみ使用なので英語フォントで十分）
FONT_CANDIDATES = [
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\calibri.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]


# ── ユーティリティ ────────────────────────────────────────

def get_poster_id(template_id: str) -> str:
    """'img-0036' → 'HP-0036'"""
    m = re.search(r"(\d+)$", template_id)
    return f"HP-{int(m.group(1)):04d}" if m else f"HP-{template_id}"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()


def resize_image(img: Image.Image) -> Image.Image:
    w, h = img.size
    long_side = max(w, h)
    if long_side <= MAX_LONG_SIDE:
        return img.copy()
    scale = MAX_LONG_SIDE / long_side
    return img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)


# ── SAMPLE 透かし焼き込み ─────────────────────────────────

def burn_sample_watermark(img: Image.Image) -> Image.Image:
    """斜め45°の SAMPLE タイルを画像全体に焼き込む（RGBA合成）"""
    rgba = img.convert("RGBA")
    w, h = rgba.size

    font_size  = max(32, round(min(w, h) * 0.058))
    font       = load_font(font_size, bold=True)
    text       = "SAMPLE"

    # テキストサイズ計測
    tmp_draw  = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    bbox      = tmp_draw.textbbox((0, 0), text, font=font)
    text_w    = bbox[2] - bbox[0]
    text_h    = bbox[3] - bbox[1]

    tile_w = round(text_w * 2.0)
    tile_h = round(text_h * 2.8)
    angle  = -30

    # 対角線より大きな正方形キャンバスに敷き詰め → 回転 → クロップ
    diag   = round(math.sqrt(w * w + h * h)) + max(tile_w, tile_h) * 2
    canvas = Image.new("RGBA", (diag, diag), (0, 0, 0, 0))
    draw   = ImageDraw.Draw(canvas)

    cx, cy = diag // 2, diag // 2
    for row in range(-diag // tile_h - 2, diag // tile_h + 3):
        for col in range(-diag // tile_w - 2, diag // tile_w + 3):
            x = cx + col * tile_w - text_w // 2
            y = cy + row * tile_h - text_h // 2
            draw.text((x, y), text, font=font, fill=(255, 255, 255, 60))

    rotated = canvas.rotate(angle, expand=False, center=(cx, cy))

    left = cx - w // 2
    top  = cy - h // 2
    tile_layer = rotated.crop((left, top, left + w, top + h))

    result = Image.alpha_composite(rgba, tile_layer)
    return result.convert("RGB")


# ── poster_id ラベル焼き込み ──────────────────────────────

def _avg_brightness(img: Image.Image, box) -> float:
    """指定領域の平均輝度 (0-255)"""
    region = img.crop(box).convert("RGB")
    pixels = list(region.getdata())
    if not pixels:
        return 128.0
    total = sum(0.299 * r + 0.587 * g + 0.114 * b for r, g, b in pixels)
    return total / len(pixels)


def burn_poster_id(img: Image.Image, poster_id: str) -> Image.Image:
    """右下に '[SAMPLE] HP-XXXX' を小さく焼き込む"""
    rgba = img.convert("RGBA")
    w, h = rgba.size

    font_size = max(10, round(min(w, h) * 0.018))
    font      = load_font(font_size)
    text      = f"[SAMPLE] {poster_id}"

    draw = ImageDraw.Draw(rgba)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw   = bbox[2] - bbox[0]
    th   = bbox[3] - bbox[1]

    margin = round(font_size * 1.6)
    tx = w - margin - tw
    ty = h - margin - th

    # 背景輝度で文字色を決定
    brightness = _avg_brightness(rgba, (max(0, tx - 4), max(0, ty - 4),
                                        min(w, tx + tw + 4), min(h, ty + th + 4)))
    if brightness < 140:
        text_fill = (255, 255, 255, 170)
        bg_fill   = (0,   0,   0,   72)
    else:
        text_fill = (30,  30,  30,  150)
        bg_fill   = (255, 255, 255, 110)

    pad = round(font_size * 0.4)
    r   = round(font_size * 0.3)
    try:
        draw.rounded_rectangle(
            [tx - pad, ty - pad, tx + tw + pad, ty + th + pad],
            radius=r, fill=bg_fill,
        )
    except AttributeError:
        draw.rectangle(
            [tx - pad, ty - pad, tx + tw + pad, ty + th + pad],
            fill=bg_fill,
        )
    draw.text((tx, ty), text, font=font, fill=text_fill)

    return rgba.convert("RGB")


# ── 1テンプレート処理 ─────────────────────────────────────

def process_template(template: dict, force: bool) -> str | None:
    """
    プレビュー画像を生成して保存し、preview URL を返す。
    スキップした場合も既存 URL を返す。
    エラー時は None。
    """
    tid        = template.get("id", "")
    poster_id  = get_poster_id(tid)
    source_url = template.get("source_image") or template.get("image", "")

    # 元画像パス（source_image か image の元々の値）
    if source_url.startswith("/static/posters_preview/"):
        # image がすでに preview を指していたら source_image を使う
        source_url = template.get("source_image", "")
    if not source_url:
        print(f"  SKIP [{poster_id}] source_image が未設定")
        return None

    source_path  = PROJECT_DIR / source_url.lstrip("/")
    preview_name = f"{poster_id}_preview.jpg"
    preview_path = PREVIEW_DIR / preview_name
    preview_url  = f"/static/posters_preview/{preview_name}"

    if preview_path.exists() and not force:
        print(f"  SKIP [{poster_id}] 既存: {preview_name}")
        return preview_url

    if not source_path.exists():
        print(f"  SKIP [{poster_id}] 元画像なし: {source_path.name}")
        return None

    print(f"  [{poster_id}] {source_path.name} → {preview_name}")
    try:
        with Image.open(source_path) as raw:
            img = raw.convert("RGB")
        img = resize_image(img)
        img = burn_sample_watermark(img)
        img = burn_poster_id(img, poster_id)
        img.save(preview_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
        return preview_url
    except Exception as e:
        print(f"  ERROR [{poster_id}] {e}")
        return None


# ── メイン ────────────────────────────────────────────────

def main():
    force = "--force" in sys.argv

    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    with open(TEMPLATES_JSON, encoding="utf-8") as f:
        data = json.load(f)

    templates = data.get("templates", [])
    print(f"テンプレート数: {len(templates)}  (--force={force})\n")

    updated = False
    for t in templates:
        tid       = t.get("id", "")
        poster_id = get_poster_id(tid)

        # poster_id フィールドを設定
        if t.get("poster_id") != poster_id:
            t["poster_id"] = poster_id
            updated = True

        # source_image を元の image URL で確定（まだ posters_preview でない場合）
        original_image = t.get("image", "")
        if original_image and not original_image.startswith("/static/posters_preview/"):
            if t.get("source_image") != original_image:
                t["source_image"] = original_image
                updated = True

        # プレビュー生成
        preview_url = process_template(t, force)

        if preview_url:
            if t.get("preview_image") != preview_url:
                t["preview_image"] = preview_url
                updated = True
            # image フィールドをプレビューに向け替える
            if t.get("image") != preview_url:
                t["image"] = preview_url
                updated = True

    if updated:
        with open(TEMPLATES_JSON, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"\nposter_templates.json を更新しました")

    generated = list(PREVIEW_DIR.glob("HP-*_preview.jpg"))
    print(f"\n完了: {len(generated)} ファイル in {PREVIEW_DIR.relative_to(PROJECT_DIR)}")


if __name__ == "__main__":
    main()
