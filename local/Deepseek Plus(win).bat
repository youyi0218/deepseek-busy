@echo off
chcp 65001>nul&cls
set n=0
:a
if %n%==1 goto b
cls&echo|set /p="加载中"
ping -n 2 127.1>nul
echo|set /p="."
ping -n 2 127.1>nul
echo|set /p="."
ping -n 2 127.1>nul
echo|set /p="."
ping -n 2 127.1>nul
set/a n+=1
goto a
:b
cls
echo 请输入问题:
set/p q=
cls
set i=0
:c
if %i%==2 goto d
echo|set /p="."
ping -n 2 127.1>nul
echo|set /p="."
ping -n 2 127.1>nul
echo|set /p="."
ping -n 2 127.1>nul
cls
set/a i+=1
goto c
:d
echo|set /p="<think>"
echo|set /p="因为我是0B的模型，"
ping -n 2 127.1>nul
echo|set /p="我什么也"
ping -n 2 127.1>nul
echo|set /p="不知道，"
ping -n 2 127.1>nul
echo|set /p="所以"
ping -n 2 127.1>nul
echo|set /p="我应该"
ping -n 2 127.1>nul
echo|set /p="输出"
ping -n 2 127.1>nul
echo ^</think^>
ping -n 2 127.1>nul
echo 服务器繁忙，请稍后重试。
pause>nul 