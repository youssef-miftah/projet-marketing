@echo off
echo ========================================
echo   Verification de Node.js
echo ========================================
echo.

echo Verification de Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [ERREUR] Node.js n'est pas installe!
    echo.
    echo SOLUTION:
    echo   1. Allez sur https://nodejs.org/
    echo   2. Telechargez la version LTS
    echo   3. Installez Node.js
    echo   4. Redemarrez votre ordinateur
    echo   5. Relancez ce script
    echo.
    echo Voulez-vous ouvrir le site de Node.js maintenant? (O/N)
    set /p reponse=
    if /i "%reponse%"=="O" (
        start https://nodejs.org/
    )
    pause
    exit /b 1
) else (
    echo [OK] Node.js est installe
    node --version
)

echo.
echo Verification de npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] npm n'est pas installe!
    pause
    exit /b 1
) else (
    echo [OK] npm est installe
    npm --version
)

echo.
echo ========================================
echo   Node.js est pret!
echo ========================================
echo.
echo Vous pouvez maintenant executer start-all.bat
echo.
pause

