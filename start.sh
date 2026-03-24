#!/bin/bash

# Kill background processes on exit
trap "kill 0" EXIT

echo "🚀 Starting Software Mocker..."

# Start Server
echo "📂 Starting Backend (Port 5000)..."
cd server && node server.js &

# Start Client
echo "📂 Starting Frontend (Port 5173)..."
cd client && npm run dev
