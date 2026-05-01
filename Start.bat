@echo off
title Infographic Video Generator
color 0B
echo ==========================================
echo        Infographic Video Generator        
echo ==========================================
echo.
echo [1/3] Clearing previous background processes...
for /f "tokens=5" %%a in ('netstat -aon ^| find "3434" ^| find "LISTENING"') do taskkill /f /pid %%a >nul 2>&1

echo [2/4] Cleaning up temp files...
if exist "temp\*" (
    del /q /s "temp\*" >nul 2>&1
)

echo [3/4] Checking system requirements...
call npm install --no-audit --no-fund

echo.
echo [4/4] Starting server... Please wait, the browser will open automatically.
echo.

:: Start the Next.js server forcefully on port 3434
start /B npm run dev -- -p 3434

:: Wait for exactly 6 seconds to ensure local server is ready
timeout /t 6 /nobreak > NUL

:: Open the browser directly to the specified port
start http://localhost:3434

echo ==========================================
echo Generator is running!
echo Please DO NOT close this black window while using the app.
echo You can close it when you are completely done.
echo ==========================================
pause
