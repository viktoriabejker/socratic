const express = require('express');
const path = require('path');
const router = express.Router();
const { getPosts } = require('../database');

router.get('/', async (req, res) => {
    try {
        const posts = await getPosts();
        res.sendFile(path.join(__dirname, '../../public/pages/index.html'));
    } catch (error) {
        console.error('Error loading posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/api/posts', async (req, res) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;