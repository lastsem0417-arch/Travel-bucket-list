@echo off
echo 🌍 Installing Travel Bucket List App...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Show Node.js version
echo ✅ Node.js is installed
node --version

:: Install dependencies
echo 📦 Installing dependencies...
npm install

:: Check if installation was successful
if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
    echo.
    echo 🚀 To start the app, run:
    echo    npm start
    echo.
    echo 🌐 The app will open at http://localhost:3000
    pause
) else (
    echo ❌ Installation failed. Please check the error messages above.
    pause
    exit /b 1
)
