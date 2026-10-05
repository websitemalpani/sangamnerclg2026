$ErrorActionPreference = "Stop"

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$mediaRoot = Join-Path $projectRoot "public\media"
$mediaExtensions = @(".pdf", ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif")
$textExtensions = @(".html", ".css", ".js", ".jsx", ".ts", ".tsx", ".json", ".md")

New-Item -ItemType Directory -Force -Path $mediaRoot | Out-Null

$mediaFiles = Get-ChildItem -LiteralPath $projectRoot -Recurse -File | Where-Object {
  $extension = $_.Extension.ToLowerInvariant()
  $relative = $_.FullName.Substring($projectRoot.Length + 1)
  $mediaExtensions -contains $extension -and
    $relative -notlike "node_modules\*" -and
    $relative -notlike ".next\*" -and
    $relative -notlike "public\media\*"
} | Sort-Object { if ($_.FullName -like "$projectRoot\public\*") { 1 } else { 0 } }

$moved = 0
$deduplicated = 0

foreach ($file in $mediaFiles) {
  $relative = $file.FullName.Substring($projectRoot.Length + 1)
  if ($relative -like "public\*") {
    $relative = $relative.Substring("public\".Length)
  }

  $destination = Join-Path $mediaRoot $relative
  $destinationDirectory = Split-Path -Parent $destination
  New-Item -ItemType Directory -Force -Path $destinationDirectory | Out-Null

  if (Test-Path -LiteralPath $destination) {
    $sourceHash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash
    $destinationHash = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash
    if ($sourceHash -ne $destinationHash) {
      throw "Media collision with different content: $relative"
    }
    Remove-Item -LiteralPath $file.FullName
    $deduplicated++
  } else {
    Move-Item -LiteralPath $file.FullName -Destination $destination
    $moved++
  }
}

$assetImages = Get-ChildItem -LiteralPath (Join-Path $mediaRoot "assets") -File -ErrorAction SilentlyContinue |
  Where-Object { $mediaExtensions -contains $_.Extension.ToLowerInvariant() }

$textFiles = Get-ChildItem -LiteralPath $projectRoot -Recurse -File | Where-Object {
  $relative = $_.FullName.Substring($projectRoot.Length + 1)
  $textExtensions -contains $_.Extension.ToLowerInvariant() -and
    $relative -notlike "node_modules\*" -and
    $relative -notlike ".next\*" -and
    $relative -notlike "public\media\*"
}

$updated = 0
foreach ($file in $textFiles) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  $next = $content
  $next = [regex]::Replace($next, '(?<!media/)(?:\.\./|/)*images/', '/media/images/')
  $next = [regex]::Replace($next, '(?<!media/)(?:\.\./|/)*pdf/', '/media/pdf/')
  $next = [regex]::Replace($next, '(?<!media/)(?:\.\./|/)*web/uploads/', '/media/web/uploads/')

  foreach ($asset in $assetImages) {
    $escapedName = [regex]::Escape($asset.Name)
    $next = [regex]::Replace($next, "(?<!media/)(?:\.\./|/)*assets/$escapedName", "/media/assets/$($asset.Name)")
  }

  if ($next -cne $content) {
    [System.IO.File]::WriteAllText($file.FullName, $next, [System.Text.UTF8Encoding]::new($false))
    $updated++
  }
}

Write-Output "Moved: $moved"
Write-Output "Deduplicated: $deduplicated"
Write-Output "References updated: $updated"
