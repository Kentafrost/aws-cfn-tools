@echo off

rem move to current directory
cd /d %~dp0

setlocal

set backup_folder=".\\s3_upload_test.zip"
set LOG_PATH=".\\log\\s3\\ÉçÉO"

aws s3 cp %backup_folder% s3://tetsazlauobvo
aws s3 ls s3://tetsazlauobvo

call log.bat %LOG_PATH%

pause
