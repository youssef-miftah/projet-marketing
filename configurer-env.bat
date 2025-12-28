@echo off
echo ========================================
echo   Configuration des fichiers .env
echo ========================================
echo.

echo [1/2] Configuration backend\.env...
(
echo # Configuration du serveur
echo PORT=5000
echo NODE_ENV=development
echo.
echo # MongoDB
echo MONGODB_URI=mongodb+srv://youssefmiftah7_db_user:OD43NmxewLXIIx5U@cluster0.kdju6qb.mongodb.net/recycled-tech?appName=Cluster0
echo.
echo # JWT Secret
echo JWT_SECRET=your-super-secret-jwt-key-change-in-production
echo JWT_EXPIRE=7d
echo.
echo # CORS
echo FRONTEND_URL=http://localhost:3000
) > backend\.env

echo   [OK] Fichier backend\.env configure avec votre URL MongoDB
echo.

echo [2/2] Configuration frontend\.env.local...
(
echo # URL de l'API Backend
echo NEXT_PUBLIC_API_URL=http://localhost:5000/api
) > frontend\.env.local

echo   [OK] Fichier frontend\.env.local configure
echo.

echo ========================================
echo   Configuration terminee !
echo ========================================
echo.
echo Les fichiers .env sont maintenant configures avec:
echo   - Votre URL MongoDB Atlas
echo   - Configuration backend et frontend
echo.
echo Prochaine etape: Double-cliquez sur start-all.bat
echo.
pause

