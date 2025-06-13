rem This is a script to upload zipfile that contains codes for AWS S3

rem How to invoke this script
rem 1. set the path to directory where this script is located
rem 2. And then run this script below

rem .\lambda_upload.bat

@echo off
rem How to compress files as a zip file
rem If you're using Windows11...
powershell -Command "Compress-Archive -Path .\Plan1\apse2\lambda\main.py -DestinationPath .\Plan1\apse2\s3_access_lambda.zip -Force"
powershell -Command "Compress-Archive -Path .\Plan2\apse2\lambda\main.py -DestinationPath .\Plan2\apse2\api_lambda.zip -Force"
powershell -Command "Compress-Archive -Path .\Plan3\lambda\main.py -DestinationPath .\Plan3\error_sendmsg.zip -Force"
powershell -Command "Compress-Archive -Path .\Plan5\lambda\main.py -DestinationPath .\Plan5\ec2_check_instances.zip -Force"

aws s3 cp .\Plan1\apse2\s3_access_lambda.zip s3://code-apse2-bucket1313/test/
aws s3 cp .\Plan2\apse2\api_lambda.zip s3://code-apse2-bucket1313/test/
aws s3 cp .\Plan3\error_sendmsg.zip s3://code-apse2-bucket1313/test/
aws s3 cp .\Plan5\ec2_check_instances.zip s3://code-apse2-bucket1313/test/

rem If you'd like to check all files in a S3 bucket for storing all zip files for Lambda functions.
aws s3 ls s3://code-apse2-bucket1313/test/
