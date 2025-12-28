@echo off
echo ========================================
echo   Correction Authentification MongoDB
echo ========================================
echo.

echo PROBLEME: "bad auth : authentication failed"
echo.
echo Cela signifie que le nom d'utilisateur ou le mot de passe
echo dans votre URL MongoDB est incorrect.
echo.

echo SOLUTION:
echo   1. Allez sur https://cloud.mongodb.com/
echo   2. Menu "Database Access"
echo   3. Verifiez ou creez un nouvel utilisateur
echo   4. Mettez a jour backend\.env avec les bons identifiants
echo.

echo Votre URL actuelle dans backend\.env:
echo ----------------------------------------
type backend\.env | findstr /i "MONGODB_URI"
echo ----------------------------------------
echo.

echo Format attendu:
echo mongodb+srv://USERNAME:PASSWORD@cluster0.kdju6qb.mongodb.net/recycled-tech?appName=Cluster0
echo.

echo Voulez-vous ouvrir MongoDB Atlas maintenant? (O/N)
set /p reponse=
if /i "%reponse%"=="O" (
    start https://cloud.mongodb.com/
)

echo.
echo ========================================
echo   Instructions pour creer un utilisateur
echo ========================================
echo.
echo 1. Dans MongoDB Atlas, allez dans "Database Access"
echo 2. Cliquez sur "Add New Database User"
echo 3. Username: admin (ou autre)
echo 4. Password: admin123 (ou autre - simple, sans caracteres speciaux)
echo 5. Permissions: Atlas Admin
echo 6. Cliquez sur "Add User"
echo 7. Mettez a jour backend\.env avec les nouveaux identifiants
echo.
pause

