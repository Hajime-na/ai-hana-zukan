from pathlib import Path

import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


BASE_DIR = Path(__file__).resolve().parent
FLOWERS_PATH = BASE_DIR / "flowers.json"

app = FastAPI(title="AI花図鑑", description="花屋向けの花検索・販促文作成支援ツール")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")


def load_flowers() -> list[dict]:
    with FLOWERS_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


@app.get("/")
def index() -> FileResponse:
    return FileResponse(BASE_DIR / "static" / "index.html")


@app.get("/api/flowers")
def get_flowers() -> list[dict]:
    return load_flowers()


@app.get("/api/flowers/search")
def search_flowers(q: str) -> list[dict]:
    keyword = q.strip().lower()
    if not keyword:
        return []

    flowers = load_flowers()
    return [
        flower
        for flower in flowers
        if keyword in flower["name"].lower()
        or keyword in flower.get("reading", "").lower()
        or keyword in flower.get("english_name", "").lower()
    ]


@app.get("/api/flowers/{flower_id}")
def get_flower(flower_id: str) -> dict:
    for flower in load_flowers():
        if flower["id"] == flower_id:
            return flower
    raise HTTPException(status_code=404, detail="Flower not found")
