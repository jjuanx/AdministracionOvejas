# Alias para DevTunnel
$devtunnelPath = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Microsoft.devtunnel_Microsoft.Winget.Source_8wekyb3d8bbwe\devtunnel.exe"

function devtunnel {
    & $devtunnelPath @args
}

Write-Host "DevTunnel alias creado. Ahora puedes usar 'devtunnel' directamente." -ForegroundColor Green
