@echo off
setlocal
set "ROOT=%~dp0"
set "ANDROID_DIR=%ROOT%android"
set "WEB_DIR=%ROOT%www"
set "ASSET_DIR=%ANDROID_DIR%\app\src\main\assets\www"
if not exist "%ASSET_DIR%" mkdir "%ASSET_DIR%"
robocopy "%WEB_DIR%" "%ASSET_DIR%" /MIR >nul
if errorlevel 8 (
  echo Failed to copy the I2P web app into Android assets.
  exit /b 1
)
where gradle >nul 2>nul
if errorlevel 1 (
  echo Gradle 9.6.0 is required. Install Gradle and make sure "gradle" is on PATH.
  exit /b 1
)
cd /d "%ANDROID_DIR%"
gradle --no-daemon :app:assembleDebug
if errorlevel 1 exit /b 1
echo.
echo APK created:
echo %ANDROID_DIR%\app\build\outputs\apk\debug\app-debug.apk
endlocal
