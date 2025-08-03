const express = require('express');
const path = require('path');
const router = express.Router();
const session = require('express-session');
const { getUserByLogin, createUser } = require('../database');

// настройка сессий
router.use(session({
    secret: 'testkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Для production установите secure: true с HTTPS
}));

// проверка статуса авторизации
router.get('/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, username: req.session.user.username });
    } else {
        res.json({ authenticated: false });
    }
});

// логин
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByLogin(username);
        
        if (!user) {
            return res.json({ success: false, message: 'Пользователь не найден!' });
        }
        
        if (user.password !== password) {
            return res.json({ success: false, message: 'Неверный пароль!' });
        }

        req.session.user = { username: user.login };
        res.json({ success: true, username: user.login });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера при входе!' });
    }
});

// регистрация
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const loginInUse = await getUserByLogin(username);
        
        if (loginInUse) {
            return res.json({ success: false, message: 'Логин уже занят!' });
        }

        const newUser = await createUser(username, password);
        
        req.session.user = { username: newUser.login };
        res.json({ success: true, username: newUser.login });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера при регистрации!' });
    }
});

// выход 
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

// Главная страница профиля
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/profile.html'));
});

module.exports = router;