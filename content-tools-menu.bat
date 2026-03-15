@echo off
setlocal
chcp 65001 >nul

set "ROOT_DIR=%~dp0.."
cd /d "%ROOT_DIR%"

:menu
cls
echo ===============================================
echo Cfn Mapping Tools Menu
echo ===============================================
echo.
echo [1] Cfn mapping (cfn:map)
echo [2] 終了
echo.
set /p CHOICE=選択肢を入力してください ^(1-2^): 

if "%CHOICE%"=="1" goto run_cfn_mapping
if "%CHOICE%"=="2" goto end

echo.
echo [WARN] 1-2 の数字を入力してください。
timeout /t 2 >nul
goto menu

:run_cfn_mapping
call npm run cfn:map
goto wait_and_back

:wait_and_back
echo.
echo All processes have completed. Returning to menu in 5 seconds...
timeout /t 5 >nul
goto menu

:end
echo.
echo Bye.
endlocal
exit /b 0
