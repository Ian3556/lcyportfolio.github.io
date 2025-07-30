        // Global variables
        let isLoggedIn = false;
        let currentUser = null;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            initScrollProgress();
            initMobileNav();
            initAuth();
            initAnimations();
        });

        // Theme Toggle Functionality
        function initTheme() {
            const themeToggle = document.getElementById('themeToggle');
            const body = document.body;
            
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                body.classList.add('dark-mode');
                themeToggle.textContent = '☀️';
            }

            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                const isDark = body.classList.contains('dark-mode');
                themeToggle.textContent = isDark ? '☀️' : '🌙';
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }

        // Scroll Progress Bar
        function initScrollProgress() {
            const progressCar = document.querySelector('.progress-car');
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                const maxPosition = window.innerWidth - 40;
                const carPosition = (scrollPercent / 100) * maxPosition;
                
                progressCar.style.left = `${carPosition}px`;
            });
        }

        // Mobile Navigation
        function initMobileNav() {
            const hamburger = document.getElementById('hamburger');
            const mobileNav = document.getElementById('mobileNav');

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileNav.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
                    hamburger.classList.remove('active');
                    mobileNav.classList.remove('active');
                }
            });
        }

        // Authentication Functions
        function initAuth() {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                isLoggedIn = true;
                updateAuthUI();
            }

            const loginButtons = document.querySelectorAll('.btn-login');
            const signupButtons = document.querySelectorAll('.btn-signup');
            const logoutButtons = document.querySelectorAll('.btn-logout');

            loginButtons.forEach(btn => {
                btn.addEventListener('click', () => openModal('loginModal'));
            });

            signupButtons.forEach(btn => {
                btn.addEventListener('click', () => openModal('signupModal'));
            });

            logoutButtons.forEach(btn => {
                btn.addEventListener('click', logout);
            });

            initModals();
        }

        function initModals() {
            const loginModal = document.getElementById('loginModal');
            const signupModal = document.getElementById('signupModal');
            const closeLogin = document.getElementById('closeLogin');
            const closeSignup = document.getElementById('closeSignup');
            const loginForm = document.getElementById('loginForm');
            const signupForm = document.getElementById('signupForm');

            closeLogin.addEventListener('click', () => closeModal('loginModal'));
            closeSignup.addEventListener('click', () => closeModal('signupModal'));

            window.addEventListener('click', (e) => {
                if (e.target === loginModal) closeModal('loginModal');
                if (e.target === signupModal) closeModal('signupModal');
            });

            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleLogin();
            });

            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleSignup();
            });
        }

        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'block';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        function handleLogin() {
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                currentUser = user;
                isLoggedIn = true;
                localStorage.setItem('currentUser', JSON.stringify(user));
                updateAuthUI();
                closeModal('loginModal');
                alert('Login successful!');
            } else {
                alert('Invalid username or password!');
            }
        }

        function handleSignup() {
            const username = document.getElementById('signupUsername').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (users.find(u => u.username === username)) {
                alert('Username already exists!');
                return;
            }

            const newUser = { username, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            currentUser = newUser;
            isLoggedIn = true;
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            updateAuthUI();
            closeModal('signupModal');
            alert('Account created successfully!');
        }

        function logout() {
            isLoggedIn = false;
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateAuthUI();
            alert('Logged out successfully!');
        }

        function updateAuthUI() {
            const authButtons = document.querySelectorAll('.auth-buttons');
            const userMenus = document.querySelectorAll('.user-menu');
            const usernameSpans = document.querySelectorAll('#username');

            if (isLoggedIn && currentUser) {
                authButtons.forEach(el => el.style.display = 'none');
                userMenus.forEach(el => el.style.display = 'flex');
                usernameSpans.forEach(el => el.textContent = currentUser.username);
            } else {
                authButtons.forEach(el => el.style.display = 'flex');
                userMenus.forEach(el => el.style.display = 'none');
            }
        }

        // Animations
        function initAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe animated elements
            document.querySelectorAll('.value-card, .process-step, .team-member, .stat-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }

        // Handle window resize
        window.addEventListener('resize', function() {
            const hamburger = document.getElementById('hamburger');
            const mobileNav = document.getElementById('mobileNav');
            
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });