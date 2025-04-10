# Образовательная платформа

Образовательная платформа с функциями групп, расписания и видеозвонков.

## Функциональность

- Авторизация и регистрация пользователей
- Создание групп и управление участниками
- Работа с расписанием
- Видеозвонки между участниками
- Личный профиль
- Новостная лента

## Технологии

- **Backend**: Java, Spring Boot
- **Frontend**: React, TypeScript, Redux
- **Стили**: SCSS модули
- **Коммуникация**: RESTful API, WebRTC

## Установка и запуск

### Требования

- Java 17+
- Node.js 16+
- npm 8+
- Maven

### Автоматический запуск (рекомендуется)

#### Windows

```
./build-and-run.bat
```

#### Linux/macOS

```
bash build-and-run.sh
```

### Ручной запуск

1. Соберите фронтенд:

```
cd client
npm install
npm run build
```

2. Скопируйте собранные файлы в ресурсы Java:

```
mkdir -p ../src/main/resources/static
cp -r build/* ../src/main/resources/static/
```

3. Соберите и запустите бэкенд:

```
cd ..
./mvnw clean package
java -jar target/hakatonovertask-0.0.1-SNAPSHOT.jar
```

4. Откройте браузер и перейдите по адресу: [http://localhost:8097](http://localhost:8097)

## Разработка

### Режим разработки фронтенда

```
cd client
npm start
```

В режиме разработки фронтенд будет доступен по адресу [http://localhost:3000](http://localhost:3000)

### Режим разработки бэкенда

```
./mvnw spring-boot:run
```

Бэкенд будет доступен по адресу [http://localhost:8097](http://localhost:8097)

## Дополнительная информация

- Проект использует SPA (Single Page Application) архитектуру
- Авторизация происходит с использованием JWT токенов
- Реализована система групп с разными ролями пользователей
- Видеосвязь работает через WebRTC

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


