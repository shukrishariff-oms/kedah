@echo off
echo Starting InfoKedah Project...

:: 1. Start Backend in a new window
echo [OK] Starting Django Backend...
start "InfoKedah Backend" cmd /c "cd backend && venv\Scripts\python manage.py runserver"

:: 2. Start Frontend in a new window
echo [OK] Starting Vite Frontend...
start "InfoKedah Frontend" cmd /c "cd frontend && npm.cmd run dev"

:: 3. Wait a few seconds for servers to initialize
echo [OK] Waiting for servers to start...
timeout /t 5

:: 4. Open in browser
start http://localhost:5173
start http://localhost:8000/admin

echo.
echo ======================================================
echo  PROJECT STARTED SUCCESSFULLY!
echo  - Frontend: http://localhost:5173
echo  - Admin: http://localhost:8000/admin (User: admin)
echo ======================================================
echo.
pause
