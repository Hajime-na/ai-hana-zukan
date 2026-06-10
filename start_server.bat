@echo off
REM Hana poster server dedicated port: 8001
REM Do not change to 8011. 8011 is reserved for BloomAtmos.
cd /d C:\Users\hana\hanapro
"C:\Users\hana\AppData\Local\Programs\Python\Python311\python.exe" scripts/sync_poster_templates.py
start "" /min "C:\Users\hana\AppData\Local\Programs\Python\Python311\Scripts\uvicorn.exe" main:app --host 127.0.0.1 --port 8001
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8001/"
