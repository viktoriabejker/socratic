document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error loading posts:', error);
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '<p>Ошибка загрузки ленты!</p>';
    }
});

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>Пока тут пусто</p>';
        return;
    }
    
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        
        const titleElement = document.createElement('div');
        titleElement.className = 'post-title';
        titleElement.textContent = post.label;
        
        const timeElement = document.createElement('div');
        timeElement.className = 'post-time';
        const postDate = new Date(post.time);
        timeElement.textContent = postDate.toLocaleString();
        
        const textElement = document.createElement('div');
        textElement.className = 'post-text';
        textElement.textContent = post.text;
        
        postElement.appendChild(titleElement);
        postElement.appendChild(timeElement);
        postElement.appendChild(textElement);
        
        postsContainer.appendChild(postElement);
    });
}