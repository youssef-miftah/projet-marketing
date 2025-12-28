@echo off
echo ========================================
echo   Configuration MongoDB
echo ========================================
echo.
echo Votre URL MongoDB Atlas:
echo mongodb+srv://youssefmiftah7_db_user:^<db_password^>@cluster0.kdju6qb.mongodb.net/?appName=Cluster0
echo.
echo IMPORTANT: Vous devez remplacer ^<db_password^> par votre vrai mot de passe!
echo.
pause

echo.
echo Ouverture du fichier backend\.env dans Notepad...
echo.
echo Modifiez la ligne MONGODB_URI avec:
echo.
echo MONGODB_URI=mongodb+srv://youssefmiftah7_db_user:VOTRE_MOT_DE_PASSE@cluster0.kdju6qb.mongodb.net/recycled-tech?appName=Cluster0
echo.
echo (N'oubliez pas d'ajouter /recycled-tech avant le ?)
echo.

if exist "backend\.env" (
    notepad "backend\.env"
) else (
    echo Le fichier backend\.env n'existe pas!
    echo Executez d'abord demarrer.bat
    pause
    exit
)

echo.
echo ========================================
echo   Configuration terminee!
echo ========================================
echo.
echo N'oubliez pas de:
echo   1. Remplacer ^<db_password^> par votre vrai mot de passe
echo   2. Ajouter /recycled-tech avant le ?
echo.
pause

