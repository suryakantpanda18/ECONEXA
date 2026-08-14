$src = "C:\Users\surya\.gemini\antigravity\scratch\econexa"
$zip = "C:\Users\surya\.gemini\antigravity\scratch\econexa\econexa-complete-project.zip"

if (Test-Path $zip) { Remove-Item $zip -Force }

$items = Get-ChildItem -Path $src | Where-Object { 
    $_.Name -ne "econexa-complete-project.zip" -and 
    $_.Name -ne "__pycache__" -and 
    $_.Name -ne "fix-nav.ps1" -and 
    $_.Name -ne "make-zip.ps1"
}

Compress-Archive -Path $items.FullName -DestinationPath $zip -Force
Write-Host "Created: $zip"
