@echo off
echo ▶ Windows 최적화 스크립트 시작 (게임 & 개발 환경 전용)
echo.

:: Windows Search 중지
sc stop "WSearch"
sc config "WSearch" start= disabled

:: SysMain 중지
sc stop "SysMain"
sc config "SysMain" start= disabled

:: Xbox Game Bar 중지
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\GameDVR" /v "AppCaptureEnabled" /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d 0 /f

:: OneDrive 시작 시 실행 차단
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "OneDrive" /t REG_SZ /d "" /f

:: Discord 시작 시 실행 차단
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "Discord" /t REG_SZ /d "" /f

:: Teams 자동 실행 제거
reg delete "HKCU\Software\Microsoft\Office\Teams\LoggedInOnce" /f

echo.
echo ✅ 최적화 완료! 시스템 재시작 후 적용됩니다.
pause
