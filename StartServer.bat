@echo off
for /f "tokens=2 delims=: " %%f in ('nslookup %computername% ^| findstr /c:"Address:" ^| findstr /v /c:"#"') do set ipv4=%%f
if "%ipv4%" == "" (
    echo Visit your new website http://127.0.0.1:8000/hauptverzeichnis/home/home.html
) else (
echo Visit your new website http://%ipv4%:8000/hauptverzeichnis/home/home.html
)
node server.js