@echo off
echo ========================================
echo   Mise a jour de l'URL MongoDB
echo ========================================
echo.

echo Votre URL MongoDB actuelle:
echo ----------------------------------------
type backend\.env | findstr /i "MONGODB_URI"
echo ----------------------------------------
echo.

echo ========================================
echo   Instructions
echo ========================================
echo.
echo 1. Allez sur https://cloud.mongodb.com/
echo 2. Menu "Database Access"
echo 3. Creez un nouvel utilisateur:
echo    - Username: admin
echo    - Password: admin123
echo    - Permissions: Atlas Admin
echo 4. Ouvrez backend\.env avec Notepad
echo 5. Remplacez l'URL par:
echo    mongodb+srv://admin:admin123@cluster0.kdju6qb.mongodb.net/recycled-tech?appName=Cluster0
echo 6. Sauvegardez
echo.

echo Voulez-vous ouvrir backend\.env avec Notepad maintenant? (O/N)
set /p reponse=
if /i "%reponse%"=="O" (
    notepad backend\.env
)

echo.
echo Voulez-vous ouvrir MongoDB Atlas? (O/N)
set /p reponse2=
if /i "%reponse2%"=="O" (
    start https://cloud.mongodb.com/
)

pause

