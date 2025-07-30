        // Global variables
        let currentStep = 1;
        let totalSteps = 3;
        let isLoggedIn = false;
        let currentUser = null;
        let uploadedFiles = [];
        let formData = {};

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            initScrollProgress();
            initMobileNav();
            initAuth();
            initSellForm();
            populateYearDropdown();
            initFileUpload();
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
                showSellForm();
            } else {
                showLoginRequired();
            }

            const loginButtons = document.querySelectorAll('.btn-login');
            const signupButtons = document.querySelectorAll('.btn-signup');
            const logoutButtons = document.querySelectorAll('.btn-logout');
            const showLoginBtn = document.getElementById('showLogin');
            const showSignupBtn = document.getElementById('showSignup');

            loginButtons.forEach(btn => {
                btn.addEventListener('click', () => openModal('loginModal'));
            });

            signupButtons.forEach(btn => {
                btn.addEventListener('click', () => openModal('signupModal'));
            });

            logoutButtons.forEach(btn => {
                btn.addEventListener('click', logout);
            });

            if (showLoginBtn) {
                showLoginBtn.addEventListener('click', () => openModal('loginModal'));
            }

            if (showSignupBtn) {
                showSignupBtn.addEventListener('click', () => openModal('signupModal'));
            }

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
                showSellForm();
                prefillUserData();
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
            showSellForm();
            prefillUserData();
        }

        function logout() {
            isLoggedIn = false;
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateAuthUI();
            showLoginRequired();
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

        function showLoginRequired() {
            document.getElementById('loginRequired').style.display = 'block';
            document.getElementById('sellForm').style.display = 'none';
        }

        function showSellForm() {
            document.getElementById('loginRequired').style.display = 'none';
            document.getElementById('sellForm').style.display = 'block';
        }

        function prefillUserData() {
            if (currentUser) {
                document.getElementById('contactName').value = currentUser.username;
                document.getElementById('contactEmail').value = currentUser.email || '';
            }
        }

        // Initialize sell form
        function initSellForm() {
            const nextBtn = document.getElementById('nextBtn');
            const prevBtn = document.getElementById('prevBtn');
            const previewBtn = document.getElementById('previewBtn');
            const submitBtn = document.getElementById('submitBtn');

            nextBtn.addEventListener('click', nextStep);
            prevBtn.addEventListener('click', prevStep);
            previewBtn.addEventListener('click', showPreview);
            submitBtn.addEventListener('click', submitListing);
        }

        // Populate year dropdown
        function populateYearDropdown() {
            const yearSelect = document.getElementById('year');
            const currentYear = new Date().getFullYear();
            
            for (let year = currentYear; year >= 1990; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
        }

        // File upload functionality
        function initFileUpload() {
            const fileUpload = document.getElementById('fileUpload');
            const photoUpload = document.getElementById('photoUpload');
            const uploadedFiles = document.getElementById('uploadedFiles');

            fileUpload.addEventListener('click', () => {
                photoUpload.click();
            });

            fileUpload.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUpload.classList.add('dragover');
            });

            fileUpload.addEventListener('dragleave', () => {
                fileUpload.classList.remove('dragover');
            });

            fileUpload.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUpload.classList.remove('dragover');
                handleFiles(e.dataTransfer.files);
            });

            photoUpload.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
        }

        function handleFiles(files) {
            const maxFiles = 10;
            const maxSize = 5 * 1024 * 1024; // 5MB

            for (let i = 0; i < files.length; i++) {
                if (uploadedFiles.length >= maxFiles) {
                    alert(`Maximum ${maxFiles} files allowed.`);
                    break;
                }

                const file = files[i];
                
                if (file.size > maxSize) {
                    alert(`File ${file.name} is too large. Maximum size is 5MB.`);
                    continue;
                }

                if (!file.type.startsWith('image/')) {
                    alert(`File ${file.name} is not an image.`);
                    continue;
                }

                uploadedFiles.push(file);
                displayUploadedFile(file);
            }
        }

        function displayUploadedFile(file) {
            const uploadedFilesContainer = document.getElementById('uploadedFiles');
            const fileDiv = document.createElement('div');
            fileDiv.className = 'uploaded-file';
            fileDiv.innerHTML = `
                <span class="uploaded-file-name">${file.name}</span>
                <span class="remove-file" onclick="removeFile('${file.name}')">✕</span>
            `;
            uploadedFilesContainer.appendChild(fileDiv);
        }

        function removeFile(fileName) {
            uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
            
            const fileElements = document.querySelectorAll('.uploaded-file');
            fileElements.forEach(el => {
                if (el.querySelector('.uploaded-file-name').textContent === fileName) {
                    el.remove();
                }
            });
        }

        // Form navigation
        function nextStep() {
            if (validateCurrentStep()) {
                saveCurrentStepData();
                currentStep++;
                updateStepUI();
            }
        }

        function prevStep() {
            currentStep--;
            updateStepUI();
        }

        function showPreview() {
            if (validateCurrentStep()) {
                saveCurrentStepData();
                generatePreview();
                currentStep = 'preview';
                updateStepUI();
            }
        }

        function updateStepUI() {
            // Update step indicators
            const steps = document.querySelectorAll('.step');
            steps.forEach((step, index) => {
                const stepNum = index + 1;
                if (stepNum < currentStep || (currentStep === 'preview' && stepNum <= totalSteps)) {
                    step.classList.add('completed');
                    step.classList.remove('active');
                } else if (stepNum === currentStep) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });

            // Update form steps
            const formSteps = document.querySelectorAll('.form-step');
            formSteps.forEach((step, index) => {
                const stepNum = index + 1;
                if (stepNum === currentStep || (currentStep === 'preview' && step.dataset.step === 'preview')) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });

            // Update navigation buttons
            const nextBtn = document.getElementById('nextBtn');
            const prevBtn = document.getElementById('prevBtn');
            const previewBtn = document.getElementById('previewBtn');
            const submitBtn = document.getElementById('submitBtn');

            if (currentStep === 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'block';
                previewBtn.style.display = 'none';
                submitBtn.style.display = 'none';
            } else if (currentStep === totalSteps) {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'none';
                previewBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            } else if (currentStep === 'preview') {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'none';
                previewBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
                previewBtn.style.display = 'none';
                submitBtn.style.display = 'none';
            }
        }

        function validateCurrentStep() {
            clearErrors();
            let isValid = true;

            if (currentStep === 1) {
                // Validate Step 1
                const required = ['make', 'model', 'year', 'mileage', 'vin', 'color', 'bodyType', 'transmission', 'fuelType', 'drivetrain', 'doors'];
                required.forEach(field => {
                    const input = document.getElementById(field);
                    if (!input.value.trim()) {
                        showError(field, 'This field is required');
                        isValid = false;
                    }
                });

                // Validate VIN
                const vin = document.getElementById('vin').value;
                if (vin && vin.length !== 17) {
                    showError('vin', 'VIN must be exactly 17 characters');
                    isValid = false;
                }

                // Validate mileage
                const mileage = document.getElementById('mileage').value;
                if (mileage && (mileage < 0 || mileage > 999999)) {
                    showError('mileage', 'Please enter a valid mileage');
                    isValid = false;
                }

            } else if (currentStep === 2) {
                // Validate Step 2
                if (uploadedFiles.length === 0) {
                    showError('photos', 'Please upload at least one photo');
                    isValid = false;
                }

                const description = document.getElementById('description').value;
                if (!description.trim()) {
                    showError('description', 'Description is required');
                    isValid = false;
                } else if (description.length < 50) {
                    showError('description', 'Description must be at least 50 characters');
                    isValid = false;
                }

                const location = document.getElementById('location').value;
                if (!location.trim()) {
                    showError('location', 'Location is required');
                    isValid = false;
                }

            } else if (currentStep === 3) {
                // Validate Step 3
                const required = ['price', 'contactName', 'contactEmail', 'contactPhone'];
                required.forEach(field => {
                    const input = document.getElementById(field);
                    if (!input.value.trim()) {
                        showError(field, 'This field is required');
                        isValid = false;
                    }
                });

                // Validate price
                const price = document.getElementById('price').value;
                if (price && (price < 0 || price > 999999)) {
                    showError('price', 'Please enter a valid price');
                    isValid = false;
                }

                // Validate email
                const email = document.getElementById('contactEmail').value;
                if (email && !isValidEmail(email)) {
                    showError('contactEmail', 'Please enter a valid email address');
                    isValid = false;
                }
            }

            return isValid;
        }

        function showError(fieldName, message) {
            const errorElement = document.getElementById(fieldName + 'Error');
            const inputElement = document.getElementById(fieldName);
            
            if (errorElement) {
                errorElement.textContent = message;
            }
            
            if (inputElement) {
                inputElement.closest('.form-group').classList.add('error');
            }
        }

        function clearErrors() {
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(el => el.textContent = '');
            
            const errorGroups = document.querySelectorAll('.form-group.error');
            errorGroups.forEach(group => group.classList.remove('error'));
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function saveCurrentStepData() {
            const form = document.getElementById('carListingForm');
            const formData = new FormData(form);
            
            for (let [key, value] of formData.entries()) {
                formData[key] = value;
            }
        }

        function generatePreview() {
            const form = document.getElementById('carListingForm');
            const formData = new FormData(form);
            
            // Update preview title
            const make = formData.get('make');
            const model = formData.get('model');
            const year = formData.get('year');
            document.getElementById('previewTitle').textContent = `${year} ${capitalizeFirst(make)} ${model}`;

            // Vehicle details
            const vehicleDetails = [
                { label: 'Make', value: capitalizeFirst(make) },
                { label: 'Model', value: model },
                { label: 'Year', value: year },
                { label: 'Mileage', value: `${parseInt(formData.get('mileage')).toLocaleString()} miles` },
                { label: 'VIN', value: formData.get('vin') },
                { label: 'Color', value: formData.get('color') },
                { label: 'Body Type', value: capitalizeFirst(formData.get('bodyType')) },
                { label: 'Transmission', value: capitalizeFirst(formData.get('transmission')) },
                { label: 'Fuel Type', value: capitalizeFirst(formData.get('fuelType')) },
                { label: 'Drivetrain', value: formData.get('drivetrain').toUpperCase() },
                { label: 'Engine', value: formData.get('engine') || 'Not specified' },
                { label: 'Doors', value: formData.get('doors') }
            ];

            document.getElementById('vehiclePreview').innerHTML = vehicleDetails.map(item => `
                <div class="preview-item">
                    <span class="preview-label">${item.label}</span>
                    <span class="preview-value">${item.value}</span>
                </div>
            `).join('');

            // Pricing and contact
            const price = parseInt(formData.get('price'));
            const negotiable = formData.get('negotiable') ? 'Yes' : 'No';
            const urgentSale = formData.get('urgentSale') ? 'Yes' : 'No';
            const sellerType = capitalizeFirst(formData.get('sellerType'));

            const pricingDetails = [
                { label: 'Price', value: `$${price.toLocaleString()}` },
                { label: 'Negotiable', value: negotiable },
                { label: 'Urgent Sale', value: urgentSale },
                { label: 'Seller Type', value: sellerType },
                { label: 'Contact Name', value: formData.get('contactName') },
                { label: 'Email', value: formData.get('contactEmail') },
                { label: 'Phone', value: formData.get('contactPhone') },
                { label: 'Location', value: formData.get('location') }
            ];

            document.getElementById('pricingPreview').innerHTML = pricingDetails.map(item => `
                <div class="preview-item">
                    <span class="preview-label">${item.label}</span>
                    <span class="preview-value">${item.value}</span>
                </div>
            `).join('');

            // Description
            document.getElementById('descriptionPreview').textContent = formData.get('description');
        }

        function submitListing() {
            const form = document.getElementById('carListingForm');
            const formData = new FormData(form);
            
            // Simulate form submission
            setTimeout(() => {
                document.getElementById('sellForm').style.display = 'none';
                document.getElementById('successMessage').classList.add('show');
                
                // Reset form
                form.reset();
                uploadedFiles = [];
                document.getElementById('uploadedFiles').innerHTML = '';
                currentStep = 1;
                updateStepUI();
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1000);
        }

        function capitalizeFirst(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1);
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