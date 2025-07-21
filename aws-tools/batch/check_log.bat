@echo off

rem move to current directory
cd /d %~dp0
set file_name=.\test.txt
set bucket=s3://tetsazlauobvo

set year=%date:~0,4%
set month=%date:~5,2%
set day=%date:~8,2%

set time=%time: =0%
set hour=%time:~0,2%
set minute=%time:~3,2%
set second=%time:~6,2%

aws logs filter-log-events --log-group-name '/aws/imagebuilder/test1' --filter-pattern Error --start-time 1697907324331 --end-time 1707609605 --output text
aws logs filter-log-events --log-group-name '/aws/imagebuilder/test1' --filter-pattern Error --output text
echo %year%-%month%-%day% %hour%:%minute%:%second% 異常終了しました >> ログ.txt

aws s3 cp %file_name% %bucket%

set timeout_second=60

echo **********************************
echo %timeout_second%秒の待機時間です。ボタン押下して以降の処理に移行することも可能です。
echo **********************************

timeout %timeout_second% > nul

set PYTHONIOENCODING=UTF-8
set PYTHONUTF8=1

setlocal enabledelayedexpansion

find /i "START" %file_name%
if %ERRORLEVEL% == 0 (

    find /i "[ERROR]" %file_name%
    if !ERRORLEVEL! == 0 (
        echo エラー発生

    ) else (
        find /i "END" %file_name%
        if !ERRORLEVEL! == 0 (
            echo 正常終了しました。

        ) else (
            echo エラーは発生しませんでしたが、ENDがありません。
        )
    )
)

pause
exit
