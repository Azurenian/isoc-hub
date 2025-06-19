@echo off
setlocal

echo [1] Pulling from GitHub...
git pull || exit /b

echo [2] Pushing code to Apps Script...
clasp push || exit /b

echo [3] Creating new project version...
clasp version "Sync %DATE% %TIME%" || exit /b

echo [4] Redeploying version to existing deployment...
clasp redeploy AKfycbzh9oljDWjhmmIGy00DuOFzAp0041kITSxfub-BIqem4eEnixzB6wv5QeFB0szt2rrv --versionNumber LATEST --description "Auto-sync" || exit /b

echo ✅ Full sync + deploy complete!
pause
