$viewDir = "js\views"
$files = Get-ChildItem "$viewDir\*.js"
$pattern = "window\.dispatchEvent\(new CustomEvent\('navigate', \{detail:'([^']+)'\}\)\)"
$replacement = 'EcoRouter.navigate(''#$1'')'

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $newContent = [regex]::Replace($content, $pattern, $replacement)
    if ($newContent -ne $content) {
        Set-Content $f.FullName -Value $newContent -NoNewline
        Write-Host "Fixed: $($f.Name)"
    }
}
Write-Host "All done."
