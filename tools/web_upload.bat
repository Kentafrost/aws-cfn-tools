rem This is a script to upload zipfile that contains codes for AWS S3

rem How to invoke this script
rem 1. set the path to directory where this script is located
rem 2. And then run this script below

rem .\lambda_upload.bat

@echo off
rem file path
set FILEPATH=s3://web-apse2-bucket1313
set LocalPath=.\Plan2\apse2\web

rem upload all files in the specific directory
aws s3 cp %LocalPath% %FILEPATH% --recursive --profile default --region ap-southeast-2

rem If you'd like to check all files in a S3 bucket for storing all zip files for Lambda functions.
aws s3 ls %FILEPATH% --profile default --region ap-southeast-2

endlocal