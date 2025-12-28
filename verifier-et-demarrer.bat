@echo off
echo ========================================
echo   Verification et Demarrage
echo ========================================
echo.

echo [1/4] Verification des dependances backend...
cd backend
if not exist "node_modules" (
    echo   [WARN] Dependances manquantes, installation...
    call npm install
) else (
    echo   [OK] Dependances backend installees
)
cd ..

echo.
echo [2/4] Verification des dependances frontend...
cd frontend
if not exist "node_modules" (
    echo   [WARN] Dependances manquantes, installation...
    call npm install
) else (
    echo   [OK] Dependances frontend installees
)
cd ..

echo.
echo [3/4] Verification des fichiers .env...
if not exist "backend\.env" (
    echo   [ERREUR] Fichier backend\.env manquant!
    echo   Executez d'abord: configurer-env.bat
    pause
    exit /b 1
) else (
    echo   [OK] Fichier backend\.env existe
)

if not exist "frontend\.env.local" (
    echo   [ERREUR] Fichier frontend\.env.local manquant!
    echo   Executez d'abord: configurer-env.bat
    pause
    exit /b 1
) else (
    echo   [OK] Fichier frontend\.env.local existe
)

echo.
echo [4/4] Demarrage des serveurs...
echo.
echo Les 3 terminaux vont s'ouvrir.
echo ATTENDEZ que chaque terminal affiche "ready" ou "demarre" avant d'ouvrir le navigateur!
echo.
pause

echo.
echo Demarrage du backend...
start "Backend - Recycled Tech" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo Creation des donnees initiales...
start "Seed - Recycled Tech" cmd /k "cd /d %~dp0backend && npm run seed"

timeout /t 3 /nobreak >nul

echo.
echo Demarrage du frontend...
start "Frontend - Recycled Tech" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo   Serveurs en cours de demarrage...
echo ========================================
echo.
echo IMPORTANT:
echo   1. Regardez les 3 fenetres de terminal
echo   2. Attendez de voir:
echo      - Backend: "Serveur demarre sur le port 5000"
echo      - Frontend: "ready started server on 0.0.0.0:3000"
echo   3. Ensuite, ouvrez: http://localhost:3000
echo.
echo Appuyez sur une touche pour fermer ce script...
pause >nul

