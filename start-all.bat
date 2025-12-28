@echo off
echo ========================================
echo   Demarrage de l'application
echo ========================================
echo.

echo [ETAPE 1/5] Verification des dependances backend...
cd backend
if not exist "node_modules" (
    echo   [WARN] Dependances manquantes, installation en cours...
    call npm install
    if errorlevel 1 (
        echo   [ERREUR] Echec de l'installation des dependances backend!
        pause
        exit /b 1
    )
    echo   [OK] Dependances backend installees
) else (
    echo   [OK] Dependances backend deja installees
)
cd ..

echo.
echo [ETAPE 2/5] Verification des dependances frontend...
cd frontend
if not exist "node_modules" (
    echo   [WARN] Dependances manquantes, installation en cours...
    call npm install
    if errorlevel 1 (
        echo   [ERREUR] Echec de l'installation des dependances frontend!
        pause
        exit /b 1
    )
    echo   [OK] Dependances frontend installees
) else (
    echo   [OK] Dependances frontend deja installees
)
cd ..

echo.
echo [ETAPE 3/5] Verification des fichiers .env...
if not exist "backend\.env" (
    echo   [ERREUR] Fichier backend\.env manquant!
    echo   Executez d'abord: configurer-env.bat
    pause
    exit /b 1
)
if not exist "frontend\.env.local" (
    echo   [ERREUR] Fichier frontend\.env.local manquant!
    echo   Executez d'abord: configurer-env.bat
    pause
    exit /b 1
)
echo   [OK] Fichiers .env configures

echo.
echo [ETAPE 4/5] Demarrage du backend...
start "Backend - Recycled Tech" cmd /k "cd /d %~dp0backend && echo Demarrage du backend... && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo [ETAPE 5/5] Demarrage du frontend...
start "Frontend - Recycled Tech" cmd /k "cd /d %~dp0frontend && echo Demarrage du frontend... && npm run dev"

echo.
echo [BONUS] Creation des donnees initiales (seed)...
start "Seed - Recycled Tech" cmd /k "cd /d %~dp0backend && timeout /t 3 /nobreak >nul && npm run seed"

echo.
echo ========================================
echo   Application en cours de demarrage...
echo ========================================
echo.
echo Les 3 terminaux vont s'ouvrir automatiquement.
echo.
echo Une fois pret, ouvrez: http://localhost:3000
echo.
echo Appuyez sur une touche pour fermer ce script...
pause >nul

