# Makes a small (960px) grid thumbnail from each project's hero image, saved as
# src/img/thumbs/<page>.jpg. Run it after adding a project or changing a hero:
#   powershell -ExecutionPolicy Bypass -File tools\make-thumbs.ps1
# (Without a thumbnail the grid just uses the full-size hero, which also works.)
$site = Split-Path $PSScriptRoot -Parent
Add-Type -AssemblyName System.Drawing
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
New-Item -ItemType Directory -Force "$site\src\img\thumbs" | Out-Null

foreach ($f in Get-ChildItem "$site\src\projects" -Filter *.njk) {
  $t = Get-Content $f.FullName -Raw -Encoding UTF8
  $folder = [regex]::Match($t, '(?m)^folder:\s*(\S+)').Groups[1].Value
  $img = [regex]::Match($t, '(?m)^hero:\s*\{\s*img:\s*"?([^",}]+)"?').Groups[1].Value.Trim()
  if (-not $img) { continue }
  $src = if ($img.StartsWith('/')) { "$site\src$($img -replace '/', '\')" } else { "$site\src\img\projects\$folder\$img.jpg" }
  $dst = "$site\src\img\thumbs\$($f.BaseName).jpg"

  $im = [System.Drawing.Image]::FromFile($src)
  $w = [Math]::Min(960, $im.Width); $h = [int]($im.Height * $w / $im.Width)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($im, 0, 0, $w, $h)
  $p = New-Object System.Drawing.Imaging.EncoderParameters 1
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]82)
  $bmp.Save($dst, $enc, $p)
  $g.Dispose(); $bmp.Dispose(); $im.Dispose()
  "$($f.BaseName).jpg  <-  $($src.Substring($site.Length + 1))"
}
