@echo off
setlocal

echo [1/2] Pulling from GitHub...
git pull

if %errorlevel% neq 0 (
    echo Git pull failed.
    exit /b %errorlevel%
)

echo [2/2] Pushing to Google Apps Script using Clasp...

:: Temporarily override CLASPRC to use local copy
set "CLASPRC=%~dp0.clasp\.clasprc.json"

clasp push

if %errorlevel% neq 0 (
    echo Clasp push failed.
    exit /b %errorlevel%
)

echo ✅ Sync completed successfully.
pause