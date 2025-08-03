document.addEventListener('DOMContentLoaded', () => {
    // инициализация элементов формы логина  
    const loginForm = document.getElementById('login-form');
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');
    const showRegisterBtn = document.getElementById('show-register-btn');
    
    // инициализация элементов формы регистрации 
    const registerForm = document.getElementById('register-form');
    const registerUsername = document.getElementById('register-username');
    const registerPassword = document.getElementById('register-password');
    const registerConfirmPassword = document.getElementById('register-confirm-password');
    const registerBtn = document.getElementById('register-btn');
    const registerError = document.getElementById('register-error');
    const showLoginBtn = document.getElementById('show-login-btn');

    // инициализация элементов профиля 
    const profileInfo = document.getElementById('profile-info');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');

    // назначение обработчиков событий формы логина
    loginBtn.addEventListener('click', login);
    showRegisterBtn.addEventListener('click', showRegisterForm);

    // назначение обработчиков событий формы регистрации
    registerBtn.addEventListener('click', register);
    showLoginBtn.addEventListener('click', showLoginForm);

    // назначение обработчиков событий профиля
    logoutBtn.addEventListener('click', logout);

    // проверка статуса входа
    checkAuthStatus();

    function checkAuthStatus() {
        fetch('/profile/check-auth')
            .then(response => response.json())
            .then(data => {
                if (data.authenticated) {
                    showProfile(data.username);
                } else {
                    showLoginForm();
                }
            })
            .catch(error => {
                console.error('Error checking auth status:', error);
                showLoginForm();
                showError('Ошибка при проверке статуса авторизации', loginError);
            });
    }

    // отображение профиля
    function showProfile(username) {
        // скрываем лишнее
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        
        // показываем профиль
        usernameDisplay.textContent = username;
        profileInfo.style.display = 'block';
    }

    // отображение формы логина
    function showLoginForm() {
        // скрываем лишнее
        profileInfo.style.display = 'none';
        registerForm.style.display = 'none';
        
        // показываем форму логина
        loginUsername.value = '';
        loginPassword.value = '';
        loginError.textContent = '';
        loginForm.style.display = 'block';
    }

    // отображение формы регистрации
    function showRegisterForm() {
        // скрываем лишнее
        profileInfo.style.display = 'none';
        loginForm.style.display = 'none';
        
        // показываем форму регистрации
        registerUsername.value = '';
        registerPassword.value = '';
        registerConfirmPassword.value = '';
        registerError.textContent = '';
        registerForm.style.display = 'block';
    }

    // функция логина
    function login() {
        const username = loginUsername.value;
        const password = loginPassword.value;

        if (!username || !password) {
            showError('Заполните все поля!', loginError);
            return;
        }

        fetch('/profile/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showProfile(data.username);
            } else {
                showError(data.message || 'Неверный логин или пароль!', loginError);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Произошла ошибка при входе!', loginError);
        });
    }

    // функция регистрации
    function register() {
        const username = registerUsername.value;
        const password = registerPassword.value;
        const confirmPassword = registerConfirmPassword.value;

        if (!username || !password || !confirmPassword) {
            showError('Заполните все поля!', registerError);
            return;
        }

        if (password !== confirmPassword) {
            showError('Пароли не совпадают!', registerError);
            return;
        }

        fetch('/profile/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showProfile(data.username);
            } else {
                showError(data.message || 'Ошибка регистрации!', registerError);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Произошла ошибка при регистрации!', registerError);
        });
    }

    // функция выхода
    function logout() {
        fetch('/profile/logout', {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showLoginForm();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError('Произошла ошибка при выходе!', loginError);
        });
    }

    // функция отображения ошибки
    function showError(message, errorElement) {
        if (errorElement) { errorElement.textContent = message; }
    }
});