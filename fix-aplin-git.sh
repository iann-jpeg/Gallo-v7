#!/bin/bash

# Aplin cPanel Git Fix Script
echo "🚀 Aplin Deployment Helper"
echo "=========================="

# Check current git status
echo "📊 Checking git status..."
git status

echo ""
echo "🔧 Choose your action:"
echo "1. Commit local changes and pull"
echo "2. Stash changes and pull"
echo "3. Force reset (⚠️  DANGER: loses local changes)"
echo "4. Just show the commands"

read -p "Enter choice (1-4): " choice

case $choice in
    1)
        echo "📝 Committing local changes..."
        git add -A
        git commit -m "Local changes before pulling updates - $(date)"
        echo "⬇️ Pulling latest changes..."
        git pull origin master
        echo "✅ Done!"
        ;;
    2)
        echo "📦 Stashing local changes..."
        git stash
        echo "⬇️ Pulling latest changes..."
        git pull origin master
        echo "📤 Reapplying stashed changes..."
        git stash pop
        echo "✅ Done!"
        ;;
    3)
        echo "⚠️  WARNING: This will permanently delete local changes!"
        read -p "Are you sure? (y/N): " confirm
        if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
            echo "🔄 Resetting to remote state..."
            git reset --hard HEAD
            git pull origin master
            echo "✅ Done!"
        else
            echo "❌ Cancelled"
        fi
        ;;
    4)
        echo "📋 Commands to run in Aplin cPanel Terminal:"
        echo ""
        echo "Option 1 - Commit and pull:"
        echo "git add -A"
        echo "git commit -m 'Local changes before pulling'"
        echo "git pull origin master"
        echo ""
        echo "Option 2 - Stash and pull:"
        echo "git stash"
        echo "git pull origin master"
        echo "git stash pop"
        echo ""
        echo "Option 3 - Force reset (⚠️ DANGER):"
        echo "git reset --hard HEAD"
        echo "git pull origin master"
        ;;
    *)
        echo "❌ Invalid choice"
        ;;
esac
