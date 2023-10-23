#h1Деплой приложения
Чтобы запустить наша приложение необходимо выполнить следующие шаги:
На своем устройстве скачать docker и docker compose:
Вся необходимая документация: https://docs.docker.com/desktop/
Далее для запуска необходимо создать отдельный каталог
В этом каталоге:
1.Положить в папку файл db.sql
2.Положить в папку prometheus.yml 
Перейти в консоли в созданный каталог с помощью команд cd
запустить команду ## docker-compose up -d --force-recreate
Ваша ссылка на сам сайт: http://localhost:8097/
Вход - admin@mail.ru password:admin

ссылка на метрики: http://localhost:3000/
Вход admin admin
Пропустить ввод пароля
Во вкладке dashbords хранятся метрики
В случае возникновения ошибок с datasource перейти в:
connection->datasource->prometheus
Set datasource http://prometheus:9090 
save and Test!


