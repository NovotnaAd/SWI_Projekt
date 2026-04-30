@echo off
title Boujee Eshop Starter
echo ==================================================
echo   🚀 Startuji Boujee Eshop (Windows verze)
echo ==================================================

:: 1. Kontrola Javy
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [CHYBA] Java neni nainstalovana nebo neni v PATH.
    echo Prosim nainstaluj JDK 17.
    pause
    exit /b
)

:: 2. Kontrola Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [CHYBA] Node.js neni nainstalovany.
    echo Prosim nainstaluj Node.js z https://nodejs.org/
    pause
    exit /b
)

:: 3. Instalace frontend zavislosti (pokud chybi)
if not exist "frontend\node_modules\" (
    echo [INFO] Instaluji frontend zavislosti (npm install)...
    cd frontend && call npm install && cd ..
)

:: 4. Kontrola databaze (predpokladame port 3306)
echo [INFO] Kontroluji, zda bezi databaze na portu 3306...
netstat -an | findstr :3306 >nul
if %errorlevel% neq 0 (
    echo [VAROVANI] Na portu 3306 nic nebezi. 
    echo Ujisti se, ze mas zapnutou MariaDB nebo MySQL!
    pause
)

:: 5. SPUSTENI
echo [INFO] Startuji Backend a Frontend v novych oknech...

:: Spusti backend v novem okne
start "Boujee BACKEND" cmd /k "cd backend && mvn spring-boot:run"

:: Spusti frontend v novem okne
start "Boujee FRONTEND" cmd /k "cd frontend && npm run dev"

echo ==================================================
echo   ✨ Hotovo! Sleduj nove otevrena okna.
echo ==================================================
