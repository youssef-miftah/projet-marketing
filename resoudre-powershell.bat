@echo off
echo ========================================
echo   Resolution du probleme PowerShell
echo ========================================
echo.

echo PROBLEME: PowerShell bloque l'execution de npm
echo.

echo SOLUTION RAPIDE:
echo.
echo Option 1: Utiliser CMD au lieu de PowerShell
echo   - Appuyez sur Windows+R
echo   - Tapez: cmd
echo   - Naviguez vers le projet et utilisez npm
echo.
echo Option 2: Autoriser l'execution de scripts PowerShell
echo   1. Ouvrez PowerShell EN TANT QU'ADMINISTRATEUR
echo   2. Tapez: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
echo   3. Tapez: Y pour confirmer
echo   4. Fermez et rouvrez PowerShell
echo.
echo Option 3: Utiliser les scripts .bat (deja fonctionnel)
echo   - Double-cliquez sur start-all.bat
echo   - Les scripts .bat fonctionnent sans probleme
echo.

echo ========================================
echo   Instructions pour Option 2
echo ========================================
echo.
echo 1. Cliquez sur le menu Demarrer
echo 2. Tapez "PowerShell"
echo 3. Clic droit sur "Windows PowerShell"
echo 4. Choisissez "Executer en tant qu'administrateur"
echo 5. Tapez: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
echo 6. Tapez: Y
echo 7. Fermez PowerShell
echo 8. Rouvrez PowerShell normalement
echo.

echo Voulez-vous ouvrir PowerShell en tant qu'administrateur maintenant? (O/N)
set /p reponse=
if /i "%reponse%"=="O" (
    powershell -Command "Start-Process powershell -Verb RunAs"
)

pause

