"""static/posters/ の画像を poster_templates.json に自動登録するスクリプト"""
import os, json, re

POSTERS_DIR = r"C:\Users\hana\hanapro\static\posters"
TEMPLATES_FILE = r"C:\Users\hana\hanapro\static\poster_templates.json"

SEASON_INFO = {
    "春": {
        "categories": ["春"],
        "season": "春",
        "gradient": "linear-gradient(135deg, #fde8ed 0%, #f0a8b8 50%, #fff0f3 100%)",
        "poster_type": "elegant",
    },
    "夏": {
        "categories": ["夏"],
        "season": "夏",
        "gradient": "linear-gradient(135deg, #e3f2fd 0%, #1976d2 50%, #b3e5fc 100%)",
        "poster_type": "bold",
    },
    "秋": {
        "categories": ["秋"],
        "season": "秋",
        "gradient": "linear-gradient(135deg, #fff3e0 0%, #e65100 50%, #ff8f00 100%)",
        "poster_type": "elegant",
    },
    "冬": {
        "categories": ["冬"],
        "season": "冬",
        "gradient": "linear-gradient(135deg, #eceff1 0%, #90a4ae 50%, #ffffff 100%)",
        "poster_type": "elegant",
    },
    "母の日": {
        "categories": ["母の日", "ギフト"],
        "season": "母の日",
        "gradient": "linear-gradient(135deg, #fce4ec 0%, #f48fb1 55%, #fff9c4 100%)",
        "poster_type": "elegant",
    },
    "ギフト": {
        "categories": ["ギフト"],
        "season": "ギフト",
        "gradient": "linear-gradient(135deg, #fff8e1 0%, #ffb74d 50%, #fff3e0 100%)",
        "poster_type": "elegant",
    },
    "開店祝い": {
        "categories": ["開店祝い"],
        "season": "開店祝い",
        "gradient": "linear-gradient(135deg, #e8f5e9 0%, #66bb6a 50%, #fffde7 100%)",
        "poster_type": "elegant",
    },
}

with open(TEMPLATES_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

existing_images = {t.get("image") for t in data["templates"] if t.get("image")}
existing_ids = {t["id"] for t in data["templates"]}

new_templates = []
counter = len(data["templates"]) + 1

for fname in sorted(os.listdir(POSTERS_DIR)):
    if not fname.endswith(".png"):
        continue

    img_path = f"/static/posters/{fname}"
    if img_path in existing_images:
        continue

    stem = fname[:-4]
    stem_clean = re.sub(r"_+", "_", stem).strip("_")

    season = None
    rest = stem_clean
    for s in sorted(SEASON_INFO.keys(), key=len, reverse=True):
        if stem_clean.startswith(s + "_"):
            season = s
            rest = stem_clean[len(s) + 1:]
            break
    if not season:
        continue

    m = re.match(r"(.+?)(\d+)$", rest)
    flower = m.group(1) if m else rest
    num_str = m.group(2) if m else "001"
    num = int(num_str)

    info = SEASON_INFO[season]
    tpl_id = f"img-{counter:04d}"
    while tpl_id in existing_ids:
        counter += 1
        tpl_id = f"img-{counter:04d}"

    template = {
        "id": tpl_id,
        "title": f"{flower} {num:03d}",
        "short_label": f"{flower}{num}",
        "gradient": info["gradient"],
        "image": img_path,
        "categories": info["categories"],
        "season": info["season"],
        "tags": [flower, season],
        "poster_allowed": True,
        "featured": False,
        "default_main_title": f"{flower}フェア",
        "default_subtitle": f"旬の{flower}をあなたへ。",
        "default_note": f"{flower}入荷中。ご自宅用にも贈りものにもどうぞ。",
        "poster_type": info["poster_type"],
        "poster_design": "photo-full",
        "poster_position": "bottom-left",
        "flower_match": flower,
    }

    new_templates.append(template)
    existing_ids.add(tpl_id)
    existing_images.add(img_path)
    counter += 1

print(f"新規追加: {len(new_templates)} 件")
for t in new_templates:
    print(f"  {t['id']} : {t['image']}")

data["templates"].extend(new_templates)

with open(TEMPLATES_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("poster_templates.json 更新完了")
