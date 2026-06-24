# Deploy the calorie app.
# Commits whatever you've changed (normally src/App.jsx) and pushes to GitHub,
# which makes Vercel build and publish the new version automatically.
#
# How to use:
#   1. Edit  src\App.jsx  in this folder.
#   2. Right-click this file -> "Run with PowerShell"  (or run  .\deploy.ps1  in a terminal).

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host "Checking for changes..." -ForegroundColor Cyan
$changes = git status --porcelain
if (-not $changes) {
    Write-Host "Nothing to deploy - no files have changed since the last push." -ForegroundColor Yellow
    Read-Host "Press Enter to close"
    exit 0
}

Write-Host "These files will be deployed:" -ForegroundColor Cyan
git status --short

$stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git add -A
git commit -m "Update app ($stamp)" | Out-Null

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "Done. Vercel is now building the new version." -ForegroundColor Green
Write-Host "Give it about a minute, then refresh the app on your phone." -ForegroundColor Green
Read-Host "Press Enter to close"
