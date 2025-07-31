@echo off
chcp 65001 >nul
echo 正在尝试关闭 Redis...
taskkill /F /IM redis-server.exe >nul 2>&1

echo 正在尝试关闭 Redis CLI（如果存在）...
taskkill /F /IM redis-cli.exe >nul 2>&1

echo 正在尝试关闭 RabbitMQ（beam.smp 进程）...
taskkill /F /IM erl.exe >nul 2>&1
taskkill /F /IM werl.exe >nul 2>&1
taskkill /F /IM beam.smp >nul 2>&1

echo 正在尝试关闭 Elasticsearch（Java）...
taskkill /F /IM java.exe >nul 2>&1

echo 所有相关服务已尝试关闭。
pause
