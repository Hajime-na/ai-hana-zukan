import base64
import json
import os
from pathlib import Path
from typing import Any

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

try:
    from openai import OpenAI
    _api_key = os.getenv("OPENAI_API_KEY", "")
    _openai_client = OpenAI(api_key=_api_key) if _api_key else None
except ImportError:
    _openai_client = None

OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")

app = FastAPI(title="AI花図鑑")

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"
ORDERS_DIR = BASE_DIR / "orders"
ORDERS_DIR.mkdir(exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


# ── Pydantic models ──────────────────────────────────────────────────────────

class PromotionRequest(BaseModel):
    flower: str = "バラ"
    purpose: str = "店頭POP"
    tone: str = "やさしい"


class GenerateCopyRequest(BaseModel):
    flower_name: str = ""
    flower_features: str = ""
    flower_language: str = ""
    care_summary: str = ""
    purpose: str = "店頭POP"
    tone: str = "やさしい"
    shop_name: str = ""
    period: str = ""
    current_main_title: str = ""
    current_subtitle: str = ""
    current_note: str = ""
    user_request: str = ""


class SaveOrderRequest(BaseModel):
    order_id: str
    order_data: dict[str, Any] = {}
    png_data_url: str = ""


# ── Helpers ──────────────────────────────────────────────────────────────────

def _fallback_copy(req: GenerateCopyRequest) -> dict:
    flower = req.flower_name or "季節の花"
    lang = req.flower_language.split("・")[0] if req.flower_language else "美しさ"
    tone_phrase = f"{req.tone}雰囲気" if req.tone in ["やさしい", "かわいい"] else req.tone
    feature_short = req.flower_features[:30] if req.flower_features else ""
    return {
        "main_title": f"{flower} フェア",
        "subtitle": f"{lang}を贈る、{tone_phrase}の花選び。",
        "note": f"{flower}入荷しました。{feature_short}",
        "instagram_text": f"{flower}の季節感を店頭で。\n#{flower} #花のある暮らし #フラワーギフト",
        "pop_text": f"{flower}入荷しました。\nご自宅用にも贈りものにもおすすめです。",
        "fallback": True,
        "message": "AI APIに接続できなかったため、ローカル生成文を表示しています。",
    }


# ── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
def read_index():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/info")
def api_info():
    return {
        "name": "AI花図鑑 + 花屋向け販促支援",
        "message": "花の特徴・管理・花言葉をもとに、販促文とポスター文字入れを支援します。",
        "ai_enabled": _openai_client is not None,
        "model": OPENAI_MODEL if _openai_client else None,
    }


@app.post("/api/suggestions")
def create_suggestions(request: PromotionRequest):
    flower = request.flower.strip() or "季節の花"
    purpose = request.purpose.strip() or "店頭POP"
    tone = request.tone.strip() or "やさしい"
    return {
        "purpose": purpose,
        "flower": flower,
        "tone": tone,
        "suggestions": [
            {"label": "図鑑ベース", "text": f"{flower}の魅力が伝わる、{tone}雰囲気の{purpose}文です。"},
            {"label": "店頭向け", "text": f"{flower}入荷しました。\n季節の贈りものや、ご自宅の彩りにおすすめです。"},
            {"label": "SNS向け", "text": f"{flower}のやわらかな表情を店頭でご覧ください。\n#{flower} #花のある暮らし #フラワーギフト"},
        ],
    }


@app.post("/api/generate-copy")
def generate_copy(request: GenerateCopyRequest):
    if _openai_client is None:
        return _fallback_copy(request)

    is_revision = bool(request.user_request.strip())

    if is_revision:
        prompt = f"""花屋さんのポスター文章を修正してください。

現在のメインタイトル: {request.current_main_title}
現在のサブタイトル: {request.current_subtitle}
現在の補足文: {request.current_note}
修正リクエスト: {request.user_request}

以下のJSON形式のみで返してください。説明文は不要です。
{{
  "main_title": "修正後のメインタイトル（15文字以内）",
  "subtitle": "修正後のサブタイトル（25文字以内）",
  "note": "修正後の補足文（60文字以内）",
  "instagram_text": "Instagram投稿文（ハッシュタグ付き）",
  "pop_text": "店頭POP文（簡潔に）"
}}"""
    else:
        prompt = f"""花屋さんの販促文を生成してください。

花名: {request.flower_name}
特徴: {request.flower_features}
花言葉: {request.flower_language}
育て方メモ: {request.care_summary}
用途: {request.purpose}
雰囲気: {request.tone}

以下のJSON形式のみで返してください。説明文は不要です。
{{
  "main_title": "メインタイトル（15文字以内）",
  "subtitle": "サブタイトル（25文字以内）",
  "note": "補足文（60文字以内）",
  "instagram_text": "Instagram投稿文（ハッシュタグ付き）",
  "pop_text": "店頭POP文（簡潔に）"
}}"""

    try:
        response = _openai_client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": "あなたは花屋さんの販促文ライターです。指定されたJSON形式のみで返答してください。"},
                {"role": "user", "content": prompt},
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
            max_tokens=500,
        )
        data = json.loads(response.choices[0].message.content)
        return {
            "main_title": data.get("main_title", ""),
            "subtitle": data.get("subtitle", ""),
            "note": data.get("note", ""),
            "instagram_text": data.get("instagram_text", ""),
            "pop_text": data.get("pop_text", ""),
        }
    except Exception:
        return _fallback_copy(request)


@app.post("/api/save-order")
def save_order(request: SaveOrderRequest):
    try:
        order_id = request.order_id.strip()
        if not order_id:
            return {"ok": False, "error": "order_id is required"}

        json_file = f"order_{order_id}.json"
        png_file = f"poster_{order_id}.png"

        with open(ORDERS_DIR / json_file, "w", encoding="utf-8") as f:
            json.dump(request.order_data, f, ensure_ascii=False, indent=2)

        saved_png = False
        if request.png_data_url:
            raw = request.png_data_url
            if "," in raw:
                raw = raw.split(",", 1)[1]
            (ORDERS_DIR / png_file).write_bytes(base64.b64decode(raw))
            saved_png = True

        return {
            "ok": True,
            "order_id": order_id,
            "json_file": json_file,
            "png_file": png_file if saved_png else None,
        }
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.get("/api/orders")
def list_orders():
    try:
        orders = []
        for json_path in sorted(ORDERS_DIR.glob("order_*.json"), reverse=True):
            try:
                with open(json_path, encoding="utf-8") as f:
                    data = json.load(f)
                order_id = data.get("order_id", json_path.stem.replace("order_", ""))
                png_file = f"poster_{order_id}.png"
                orders.append({
                    "order_id": order_id,
                    "created_at": data.get("created_at", ""),
                    "flower_name": data.get("flower_name", ""),
                    "shop_name": data.get("shop_name", ""),
                    "main_title": data.get("main_title", ""),
                    "poster_size": data.get("poster_size", ""),
                    "image_usage": data.get("image_usage", ""),
                    "json_file": json_path.name,
                    "png_file": png_file if (ORDERS_DIR / png_file).exists() else None,
                })
            except Exception:
                continue
        return {"orders": orders}
    except Exception as e:
        return {"orders": [], "error": str(e)}
