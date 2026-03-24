@echo off
echo 🚀 Starting Software Mocker...

start cmd /k "cd server && node server.js"
start cmd /k "cd client && npm run dev"

echo Backend and Frontend are starting in separate windows...
pause
