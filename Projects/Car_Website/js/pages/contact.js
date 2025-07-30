        // Global variables
        let isLoggedIn = false;
        let currentUser = null;
        let formSubmitted = false;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            initScrollProgress();
            initMobileNav();
            initAuth();
            initContactForm();
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
                prefillContactForm();
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
            prefillContactForm();
        }

        function logout() {
            isLoggedIn = false;
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateAuthUI();
            clearContactForm();
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

        function prefillContactForm() {
            if (currentUser && !formSubmitted) {
                document.getElementById('fullName').value = currentUser.username;
                document.getElementById('emailAddress').value = currentUser.email || '';
            }
        }

        function clearContactForm() {
            document.getElementById('contactForm').reset();
            clearAllValidation();
        }

        // Contact Form Validation
        function initContactForm() {
            const form = document.getElementById('contactForm');
            const inputs = form.querySelectorAll('input, select, textarea');

            // Real-time validation
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        validateField(input);
                    }
                });
            });

            // Form submission
            form.addEventListener('submit', handleFormSubmission);

            // Pre-fill form if user is logged in
            if (isLoggedIn) {
                prefillContactForm();
            }
        }

        function validateField(field) {
            const fieldName = field.name;
            const fieldValue = field.value.trim();
            const fieldGroup = field.closest('.form-group');
            const errorElement = document.getElementById(fieldName + 'Error');
            const successElement = document.getElementById(fieldName + 'Success');

            // Clear previous states
            fieldGroup.classList.remove('error', 'success');
            errorElement.classList.remove('show');
            successElement.classList.remove('show');

            let isValid = true;
            let errorMessage = '';

            // Validation rules
            switch (fieldName) {
                case 'fullName':
                    if (!fieldValue) {
                        errorMessage = 'Full name is required';
                        isValid = false;
                    } else if (fieldValue.length < 2) {
                        errorMessage = 'Full name must be at least 2 characters long';
                        isValid = false;
                    } else if (!/^[a-zA-Z\s'-]+$/.test(fieldValue)) {
                        errorMessage = 'Full name can only contain letters, spaces, hyphens, and apostrophes';
                        isValid = false;
                    }
                    break;

                case 'emailAddress':
                    if (!fieldValue) {
                        errorMessage = 'Email address is required';
                        isValid = false;
                    } else if (!isValidEmail(fieldValue)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;

                case 'phoneNumber':
                    if (fieldValue && !isValidPhone(fieldValue)) {
                        errorMessage = 'Please enter a valid phone number';
                        isValid = false;
                    }
                    break;

                case 'subject':
                    if (!fieldValue) {
                        errorMessage = 'Please select a subject';
                        isValid = false;
                    }
                    break;

                case 'message':
                    if (!fieldValue) {
                        errorMessage = 'Message is required';
                        isValid = false;
                    } else if (fieldValue.length < 10) {
                        errorMessage = 'Message must be at least 10 characters long';
                        isValid = false;
                    } else if (fieldValue.length > 1000) {
                        errorMessage = 'Message cannot exceed 1000 characters';
                        isValid = false;
                    }
                    break;
            }

            // Apply validation result
            if (!isValid) {
                fieldGroup.classList.add('error');
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            } else if (fieldValue) {
                fieldGroup.classList.add('success');
                successElement.textContent = '✓ Looks good!';
                successElement.classList.add('show');
            }

            return isValid;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPhone(phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
            return phoneRegex.test(phone.replace(/[\s\-\(\)\.]/g, ''));
        }

        function validateForm() {
            const form = document.getElementById('contactForm');
            const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
            const phoneField = form.querySelector('input[name="phoneNumber"]');
            
            let isValid = true;

            // Validate required fields
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });

            // Validate optional phone field if filled
            if (phoneField && phoneField.value.trim()) {
                if (!validateField(phoneField)) {
                    isValid = false;
                }
            }

            return isValid;
        }

        function handleFormSubmission(e) {
            e.preventDefault();

            if (formSubmitted) {
                return;
            }

            const isValid = validateForm();
            
            if (!isValid) {
                // Scroll to first error
                const firstError = document.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const formLoading = document.getElementById('formLoading');
            const formSuccess = document.getElementById('formSuccess');

            submitBtn.disabled = true;
            formLoading.classList.add('show');

            // Simulate form submission
            setTimeout(() => {
                formSubmitted = true;
                formLoading.classList.remove('show');
                formSuccess.classList.add('show');
                
                // Reset form after success
                setTimeout(() => {
                    document.getElementById('contactForm').reset();
                    clearAllValidation();
                    formSuccess.classList.remove('show');
                    submitBtn.disabled = false;
                    formSubmitted = false;
                }, 5000);

                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 2000);
        }

        function clearAllValidation() {
            const formGroups = document.querySelectorAll('.form-group');
            const errorMessages = document.querySelectorAll('.error-message');
            const successMessages = document.querySelectorAll('.success-message');

            formGroups.forEach(group => {
                group.classList.remove('error', 'success');
            });

            errorMessages.forEach(msg => {
                msg.classList.remove('show');
                msg.textContent = '';
            });

            successMessages.forEach(msg => {
                msg.classList.remove('show');
                msg.textContent = '';
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