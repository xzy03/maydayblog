@echo off
chcp 65001 >nul
echo 正在启动 Redis...
start "Redis Server" cmd /k "cd /d E:\software\Redis-5.0.14.1 && redis-server.exe redis.windows.conf"

echo 正在启动 Redis CLI 客户端...
start "Redis CLI" cmd /k "cd /d E:\software\Redis-5.0.14.1 && redis-cli.exe -h 127.0.0.1 -p 6379"

echo 正在启动 RabbitMQ...
start "RabbitMQ" cmd /k "cd /d E:\software\RabbitMQ Server\rabbitmq_server-4.1.1\sbin && rabbitmq-server.bat"

echo 正在启动 Elasticsearch...
start "Elasticsearch" cmd /k "cd /d E:\software\elasticsearch-7.17.12\bin && elasticsearch.bat"

echo 所有服务已启动！
pause
