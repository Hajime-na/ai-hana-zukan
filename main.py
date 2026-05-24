from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


app = FastAPI(title="AI花図鑑")

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


class PromotionRequest(BaseModel):
    flower: str = "バラ"
    purpose: str = "店頭POP"
    tone: str = "やさしい"


@app.get("/")
def read_index():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/info")
def api_info():
    return {
        "name": "AI花図鑑 + 花屋向け販促支援",
        "message": "花の特徴・管理・花言葉をもとに、販促文とポスター文字入れを支援します。",
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
            {
                "label": "図鑑ベース",
                "text": f"{flower}の魅力が伝わる、{tone}雰囲気の{purpose}文です。",
            },
            {
                "label": "店頭向け",
                "text": f"{flower}入荷しました。\n季節の贈りものや、ご自宅の彩りにおすすめです。",
            },
            {
                "label": "SNS向け",
                "text": f"{flower}のやわらかな表情を店頭でご覧ください。\n#{flower} #花のある暮らし #フラワーギフト",
            },
        ],
    }
