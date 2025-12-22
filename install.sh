#!/bin/bash

# Travel Bucket List App - Installation Script
echo "🌍 Installing Travel Bucket List App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 To start the app, run:"
    echo "   npm start"
    echo ""
    echo "🌐 The app will open at http://localhost:3000"
else
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
