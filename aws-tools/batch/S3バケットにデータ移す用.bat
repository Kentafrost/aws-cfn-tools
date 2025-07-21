@echo off
rem これでベースは完成

rem バックアップするzipファイルを指定 基本的にパスはダブルクオーテーション必要みたい
set backup_folder="C:\Users\kenta\OneDrive\デスクトップ\自主課題 練習中\バッチテスト用\テスト.zip"
set LOG_PATH="C:\Users\kenta\OneDrive\デスクトップ\自主課題 練習中\バッチテスト用\ログ名"

rem zipフォルダーのコピーをS3バケットへ移す。
aws s3 cp %backup_folder% s3://tetsazlauobvo

rem S3バケットの中身を見る
aws s3 ls s3://tetsazlauobvo

rem この場合、log.batが%0, %LOG_PATH%が%1 ログ用バッチを呼び出す。
call log.bat %LOG_PATH%

pause
