@echo off

set year=%date:~0,4%
set month=%date:~5,2%
set day=%date:~8,2%

set hour=%time:~0,2%
set minute=%time:~3,2%
set second=%time:~6,2%


set logname=%year%%month%%day%
set filename=%logname%

echo %logname%

set CURRENT_DIRECTORY=%~dP0

set logfile="%CURRENT_DIRECTORY%ÉçÉOñº"
echo %logfile%

pause