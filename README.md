# Socratic

## База данных
Используется база данных PostreSQL

Конфигурация подключения к базе данных находится в файле socratic/server/database.js

### Таблицы:

**users** - используется для хранения информации о зарегистрированных пользователях

Поля:

1) login - логин пользователя, уникальный идентификатор пользователя на сайте

2) password - пароль для входа в аккаунт под введенным логином

**posts** - используется для хранения информации о постах на главной странице

1) post - уникальный идентификатор поста

2) time - дата и время публикации поста

3) label - заголовок поста

4) text - содержимое поста (текст)

5) image - содержимое поста (изображение)

> CREATE TABLE users (\
    login VARCHAR(30) PRIMARY KEY NOT NULL,\
    password VARCHAR(30) NOT NULL\
);\
CREATE TABLE posts (\
	post SERIAL PRIMARY KEY,\
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
	label VARCHAR(255) NOT NULL,\
	text TEXT NOT NULL,\
	image VARCHAR(255)\
)