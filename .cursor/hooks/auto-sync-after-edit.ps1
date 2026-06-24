# Cursor 文件编辑后触发后台同步（不阻塞编辑器）
$null = [Console]::In.ReadToEnd()
$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "../..")
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList "scripts/auto-sync-github.mjs --once" -WorkingDirectory $projectRoot.Path
exit 0
