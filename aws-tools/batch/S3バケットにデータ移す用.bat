@echo off
rem ����Ńx�[�X�͊���

rem �o�b�N�A�b�v����zip�t�@�C�����w�� ��{�I�Ƀp�X�̓_�u���N�I�[�e�[�V�����K�v�݂���
set backup_folder="C:\Users\kenta\OneDrive\�f�X�N�g�b�v\����ۑ� ���K��\�o�b�`�e�X�g�p\�e�X�g.zip"
set LOG_PATH="C:\Users\kenta\OneDrive\�f�X�N�g�b�v\����ۑ� ���K��\�o�b�`�e�X�g�p\���O��"

rem zip�t�H���_�[�̃R�s�[��S3�o�P�b�g�ֈڂ��B
aws s3 cp %backup_folder% s3://tetsazlauobvo

rem S3�o�P�b�g�̒��g������
aws s3 ls s3://tetsazlauobvo

rem ���̏ꍇ�Alog.bat��%0, %LOG_PATH%��%1 ���O�p�o�b�`���Ăяo���B
call log.bat %LOG_PATH%

pause
