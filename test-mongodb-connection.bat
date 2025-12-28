@echo off
echo ========================================
echo   Test de connexion MongoDB
echo ========================================
echo.

echo Verification de l'URL MongoDB dans backend\.env...
echo.

if not exist "backend\.env" (
    echo [ERREUR] Fichier backend\.env n'existe pas!
    echo Executez d'abord: configurer-env.bat
    pause
    exit /b 1
)

echo Contenu de backend\.env:
echo ----------------------------------------
type backend\.env | findstr /i "MONGODB_URI"
echo ----------------------------------------
echo.

echo ========================================
echo   Instructions pour resoudre le probleme
echo ========================================
echo.
echo 1. Allez sur https://cloud.mongodb.com/
echo 2. Connectez-vous
echo 3. Cliquez sur "Network Access" (menu de gauche)
echo 4. Cliquez sur "Add IP Address" (bouton vert)
echo 5. Cliquez sur "Allow Access from Anywhere"
echo 6. Cliquez sur "Confirm"
echo 7. Attendez 30 secondes
echo 8. Relancez: npm run dev
echo.
echo ========================================
echo.
echo Voulez-vous ouvrir MongoDB Atlas maintenant? (O/N)
set /p reponse=
if /i "%reponse%"=="O" (
    start https://cloud.mongodb.com/
)

pause

