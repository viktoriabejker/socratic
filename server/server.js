const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

// подключаем роуты
app.use('/', require('./routes/index'));
app.use('/catalog', require('./routes/catalog'));
app.use('/profile', require('./routes/profile'));

// запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});