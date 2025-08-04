const { Pool } = require('pg');

// конфигурация подключения к PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'socratic',
    password: 'admin',
    port: 5432,
});

// проверка существования пользователя по логину
async function getUserByLogin(login) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error getting user function:', error);
        throw error;
    }
}

// создание нового пользователя
async function createUser(login, password) {
    try {
        const result = await pool.query(
            'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *',
            [login, password]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// получение всех постов из базы данных
async function getPosts() {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY time DESC');
        return result.rows;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
}

module.exports = {
    pool,
    getUserByLogin,
    createUser,
    getPosts
};