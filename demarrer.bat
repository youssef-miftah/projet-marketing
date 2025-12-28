@echo off
echo ========================================
echo   Recycled Tech - Script de demarrage
echo ========================================
echo.

echo [1/4] Creation des fichiers .env...
if not exist "backend\.env" (
    copy "backend\env.example.txt" "backend\.env" >nul
    echo   [OK] Fichier backend\.env cree
) else (
    echo   [INFO] Fichier backend\.env existe deja
)

if not exist "frontend\.env.local" (
    copy "frontend\env.example.txt" "frontend\.env.local" >nul
    echo   [OK] Fichier frontend\.env.local cree
) else (
    echo   [INFO] Fichier frontend\.env.local existe deja
)

echo.
echo [2/4] Installation des dependances backend...
cd backend
if not exist "node_modules" (
    call npm install
) else (
    echo   [INFO] Dependances backend deja installees
)
cd ..

echo.
echo [3/4] Installation des dependances frontend...
cd frontend
if not exist "node_modules" (
    call npm install
) else (
    echo   [INFO] Dependances frontend deja installees
)
cd ..

echo.
echo ========================================
echo   Configuration terminee !
echo ========================================
echo.
echo IMPORTANT: Editez les fichiers suivants avant de demarrer:
echo   - backend\.env (ajoutez votre URL MongoDB)
echo   - frontend\.env.local (verifiez NEXT_PUBLIC_API_URL)
echo.
echo Pour demarrer l'application:
echo   1. Terminal 1: cd backend ^&^& npm run dev
echo   2. Terminal 2: cd backend ^&^& npm run seed (optionnel)
echo   3. Terminal 3: cd frontend ^&^& npm run dev
echo.
pause

