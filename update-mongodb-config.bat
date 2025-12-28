@echo off
echo ========================================
echo   Mise a jour MongoDB - admin/admin123
echo ========================================
echo.

echo Mise a jour de backend\.env avec les nouveaux identifiants...
echo.

(
echo # Configuration du serveur
echo PORT=5000
echo NODE_ENV=development
echo.
echo # MongoDB
echo MONGODB_URI=mongodb+srv://admin:admin123@cluster0.kdju6qb.mongodb.net/recycled-tech?appName=Cluster0
echo.
echo # JWT Secret
echo JWT_SECRET=your-super-secret-jwt-key-change-in-production
echo JWT_EXPIRE=7d
echo.
echo # CORS
echo FRONTEND_URL=http://localhost:3000
) > backend\.env

echo [OK] Fichier backend\.env mis a jour
echo.

echo Configuration MongoDB:
echo ----------------------------------------
type backend\.env | findstr /i "MONGODB_URI"
echo ----------------------------------------
echo.

echo ========================================
echo   Prochaines etapes
echo ========================================
echo.
echo 1. Verifiez que votre IP est autorisee dans MongoDB Atlas:
echo    - Allez dans "Network Access"
echo    - Ajoutez "Allow Access from Anywhere" (0.0.0.0/0)
echo.
echo 2. Le serveur backend devrait redemarrer automatiquement
echo    (nodemon detecte les changements)
echo.
echo 3. Vous devriez voir:
echo    "✅ MongoDB connecte : cluster0.kdju6qb.mongodb.net"
echo.
pause

