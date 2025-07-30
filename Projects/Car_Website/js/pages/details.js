        // Car data that matches listings.html with additional detail fields
        const cars = [
            {
                id: 1,
                make: 'Audi',
                model: 'A1',
                year: 2023,
                price: 45990,
                mileage: 15000,
                transmission: 'automatic',
                fuel: 'gasoline',
                location: 'Los Angeles, CA',
                image: 'carimages/Audi A1 white.png',
                images: [
                    'carimages/Audi A1 white.png',
                    'carimages/Audi A1 p2.png',
                    'carimages/Audi A1 p3.png',
                    'carimages/Audi A1 p4.png',
                ],
                badge: 'certified',
                seller: 'dealer',
                engine: '2.0L Turbo 4-Cylinder',
                doors: 4,
                color: 'Alpine White',
                vin: 'WBA8E1C55NCE12345',
                bodyType: 'Sedan',
                drivetrain: 'RWD',
                fuelEconomy: '26/36 mpg',
                description: 'This stunning Audi A1 represents the perfect blend of luxury, performance, and technology. With only 15,000 carefully driven miles, this vehicle has been meticulously maintained and comes with a comprehensive warranty. The Alpine White exterior paired with black leather interior creates an elegant and timeless appearance. Features include premium sound system, navigation, heated seats, and advanced safety features. This is an exceptional opportunity to own a nearly-new BMW at a great value.'
            },
            {
                id: 2,
                make: 'Porsche',
                model: 'Macan',
                year: 2022,
                price: 63000,
                mileage: 10600,
                transmission: 'automatic',
                fuel: 'gasoline',
                location: 'New York, NY',
                image: 'carimages/Macan.webp',
                images: [
                    'carimages/Macan.webp',
                    'carimages/Macan p2.png',
                    'carimages/Macan p3.png',
                    'carimages/Macan p4.png',
                ],
                badge: 'new-arrival',
                seller: 'private',
                engine: '2.0L 4-Cylinder',
                doors: 4,
                color: 'Ice Blue',
                vin: '19XFC2F69NE012345',
                bodyType: 'Hatchback',
                drivetrain: 'FWD',
                fuelEconomy: '28/37 mpg',
                description: 'Excellent condition 2022 Porsche Macan. This reliable and fuel-efficient vehicle has been adult-owned and garage-kept. The manual transmission provides an engaging driving experience while maintaining excellent fuel economy. Recent maintenance includes oil change, tire rotation, and multi-point inspection. Clean title, no accidents, non-smoker vehicle. Perfect for a first car or daily commuter.'
            },
            {
                id: 3,
                make: 'Toyota',
                model: 'Camry',
                year: 2021,
                price: 32900,
                mileage: 22000,
                transmission: 'automatic',
                fuel: 'hybrid',
                location: 'Chicago, IL',
                image: 'carimages/toyota camry GREY.png',
                images: [
                    'carimages/toyota camry GREY.png',
                    'carimages/toyota camry p2.png',
                    'carimages/toyota camry p3.png',
                    'carimages/toyota camry p4.png'
                ],
                badge: 'negotiable',
                seller: 'dealer',
                engine: '2.5L Hybrid 4-Cylinder',
                doors: 4,
                color: 'Grey',
                vin: '4T1G11AK5MU012345',
                bodyType: 'Sedan',
                drivetrain: 'FWD',
                fuelEconomy: '51/53 mpg',
                description: 'Fuel-efficient 2021 Toyota Camry Hybrid with excellent gas mileage and Toyota\'s renowned reliability. This vehicle features the latest Toyota Safety Sense 2.0, premium audio system, and comfortable cloth interior. Perfect for long commutes or road trips with its exceptional fuel economy. Well-maintained with full service records available. Price is negotiable for serious buyers.'
            },
            {
                id: 4,
                make: 'Mercedes',
                model: 'A200',
                year: 2023,
                price: 52800,
                mileage: 5200,
                transmission: 'automatic',
                fuel: 'gasoline',
                location: 'Miami, FL',
                image: 'carimages/mercedes A200 sedan.png',
                images: [
                    'carimages/mercedes A200 sedan.png',
                    'carimages/mercedes p2.png',
                    'carimages/mercedes p3.png',
                    'carimages/mercedes p4.png'
                ],
                badge: 'certified',
                seller: 'certified',
                engine: '2.0L Turbo 4-Cylinder',
                doors: 4,
                color: 'Mountain Grey',
                vin: 'W1KCG8DB5PA012345',
                bodyType: 'Sedan',
                drivetrain: 'RWD',
                fuelEconomy: '23/32 mpg',
                description: 'Pristine 2023 Mercedes-Benz A200 with incredibly low mileage. This luxury sedan offers the perfect combination of comfort, technology, and performance. Features include MBUX infotainment system, premium leather interior, ambient lighting, and advanced driver assistance systems. Certified pre-owned with remaining factory warranty. This vehicle has been garage-kept and shows like new.'
            },
            {
                id: 5,
                make: 'Ford',
                model: 'Mustang',
                year: 2020,
                price: 38750,
                mileage: 18500,
                transmission: 'manual',
                fuel: 'gasoline',
                location: 'Dallas, TX',
                image: 'carimages/ford mustang GREY.png',
                images: [
                    'carimages/ford mustang GREY.png',
                    'carimages/mustang p2.png',
                    'carimages/mustang p3.png',
                    'carimages/mustang p4.png',
                ],
                badge: 'negotiable',
                seller: 'private',
                engine: '5.0L V8',
                doors: 2,
                color: 'Grey',
                vin: '1FA6P8TH4L5012345',
                bodyType: 'Coupe',
                drivetrain: 'RWD',
                fuelEconomy: '16/25 mpg',
                description: 'Powerful 2020 Ford Mustang GT with the legendary 5.0L V8 engine and 6-speed manual transmission. This American muscle car delivers thrilling performance with its 460 horsepower. Well-maintained by an enthusiast owner with all service records. Features include performance package, premium sound system, and racing stripes. Perfect for weekend drives and car shows. Open to reasonable offers.'
            },
            {
                id: 6,
                make: 'BMW',
                model: 'iX1',
                year: 2022,
                price: 41200,
                mileage: 12800,
                transmission: 'automatic',
                fuel: 'gasoline',
                location: 'Seattle, WA',
                image: 'carimages/bmw iX1.png',
                images: [
                    'carimages/bmw iX1.png',
                    'carimages/BMW p2.png',
                    'carimages/BMW p3.png',
                    'carimages/BMW p4.png'
                ],
                badge: 'certified',
                seller: 'dealer',
                engine: '2.0L Turbo 4-Cylinder',
                doors: 4,
                color: 'Brilliant Black',
                vin: 'WAUENAF40NA012345',
                bodyType: 'Sedan',
                drivetrain: 'AWD',
                fuelEconomy: '24/31 mpg',
                description: 'Sophisticated 2022 Audi A4 with Quattro all-wheel drive for superior handling in all conditions. This luxury sedan features premium interior materials, virtual cockpit display, and advanced infotainment system. Excellent condition with comprehensive maintenance records. Perfect balance of performance, luxury, and practicality. Certified pre-owned with extended warranty available.'
            },
            {
                id: 7,
                make: 'Toyota',
                model: 'Corolla Cross',
                year: 2023,
                price: 24500,
                mileage: 3200,
                transmission: 'automatic',
                fuel: 'gasoline',
                location: 'Phoenix, AZ',
                image: 'carimages/toyota corolla cross.png',
                images: [
                    'carimages/toyota corolla cross.png',
                    'carimages/toyota cross p2.png',
                    'carimages/toyota cross p3.png',
                    'carimages/toyota cross p4.png'
                ],
                badge: 'new-arrival',
                seller: 'dealer',
                engine: '2.0L 4-Cylinder',
                doors: 4,
                color: 'Sonic silver',
                vin: '5YFS4RCE5PP012345',
                bodyType: 'Sedan',
                drivetrain: 'FWD',
                fuelEconomy: '32/41 mpg',
                description: 'Nearly new 2023 Toyota Corolla with extremely low mileage. This reliable and efficient vehicle is perfect for anyone seeking dependable transportation with excellent fuel economy. Features include Toyota Safety Sense 2.0, touchscreen infotainment, and comfortable interior. Still under full factory warranty with many years of worry-free driving ahead.'
            },
            {
                id: 8,
                make: 'Range Rover',
                model: 'SV',
                year: 2025,
                price: 31200,
                mileage: 16800,
                transmission: 'automatic',
                fuel: 'hybrid',
                location: 'Denver, CO',
                image: 'carimages/range rover beige.png',
                images: [
                    'carimages/range rover beige.png',
                    'carimages/range rover p2.png',
                    'carimages/range rover p3.png',
                    'carimages/range rover p4.png'
                ],
                badge: 'certified',
                seller: 'certified',
                engine: '2.0L Hybrid 4-Cylinder',
                doors: 4,
                color: 'Batumi Gold',
                vin: '1HGCV3F18MA012345',
                bodyType: 'Sedan',
                drivetrain: 'FWD',
                fuelEconomy: '48/47 mpg',
                description: 'Outstanding 2021 Honda Accord Hybrid combining efficiency with performance. This midsize sedan offers spacious interior, advanced safety features, and impressive fuel economy. Well-maintained with complete service history. Features include Honda Sensing suite, premium audio, and comfortable seating for five. Certified pre-owned with additional warranty coverage.'
            }
        ];

        // Global variables
        let currentCar = null;
        let currentImageIndex = 0;
        let isLoggedIn = false;
        let currentUser = null;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing page...');
            try {
                initTheme();
                initScrollProgress();
                initMobileNav();
                initAuth();
                loadCarDetails();
                initPhotoGallery();
                initContactForm();
                console.log('Page initialization complete');
            } catch (error) {
                console.error('Error during page initialization:', error);
                alert('There was an error loading the page. Please try again.');
            }
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

        // Load car details from URL parameter
        function loadCarDetails() {
            const urlParams = new URLSearchParams(window.location.search);
            const carId = parseInt(urlParams.get('id'));
            
            console.log('Loading car details for ID:', carId);
            
            if (!carId || isNaN(carId)) {
                console.log('No valid car ID found, redirecting to listings');
                alert('No car selected. Redirecting to listings page.');
                window.location.href = 'listings.html';
                return;
            }

            currentCar = cars.find(car => car.id === carId);
            
            if (!currentCar) {
                console.log('Car not found with ID:', carId);
                alert('Car not found. Redirecting to listings page.');
                window.location.href = 'listings.html';
                return;
            }

            console.log('Found car:', currentCar);
            populateCarDetails();
            populateSimilarCars();
        }

        function populateCarDetails() {
            // Update page title
            document.title = `${currentCar.year} ${currentCar.make} ${currentCar.model} - AutoDeal`;
            
            // Update breadcrumb
            document.getElementById('breadcrumbCar').textContent = `${currentCar.year} ${currentCar.make} ${currentCar.model}`;
            
            // Update car info
            document.getElementById('carTitle').textContent = `${currentCar.year} ${currentCar.make} ${currentCar.model}`;
            document.getElementById('mainPrice').textContent = `$${currentCar.price.toLocaleString()}`;
            document.getElementById('cashPrice').textContent = `$${currentCar.price.toLocaleString()}`;
            
            // Calculate monthly payment (60 months @ 4.9% APR)
            const monthlyPayment = calculateMonthlyPayment(currentCar.price, 4.9, 60);
            document.getElementById('monthlyPayment').textContent = `$${monthlyPayment}/mo`;
            
            document.getElementById('carLocation').textContent = currentCar.location;
            document.getElementById('carDescription').textContent = currentCar.description;
            
            // Update seller type
            const sellerType = currentCar.seller === 'dealer' ? 'Authorized Dealer' :
                              currentCar.seller === 'certified' ? 'Certified Dealer' :
                              'Private Seller';
            document.getElementById('sellerType').textContent = sellerType;

            // Populate specifications
            populateSpecifications();
            
            // Load images
            loadcarimages();
        }

        function populateSpecifications() {
            const specs = [
                { label: 'Make', value: currentCar.make },
                { label: 'Model', value: currentCar.model },
                { label: 'Year', value: currentCar.year },
                { label: 'Mileage', value: `${currentCar.mileage.toLocaleString()} miles` },
                { label: 'Engine', value: currentCar.engine },
                { label: 'Transmission', value: capitalizeFirst(currentCar.transmission) },
                { label: 'Fuel Type', value: capitalizeFirst(currentCar.fuel) },
                { label: 'Body Type', value: currentCar.bodyType },
                { label: 'Drivetrain', value: currentCar.drivetrain },
                { label: 'Doors', value: currentCar.doors },
                { label: 'Color', value: currentCar.color },
                { label: 'Fuel Economy', value: currentCar.fuelEconomy },
                { label: 'VIN', value: currentCar.vin }
            ];

            const specGrid = document.getElementById('specGrid');
            specGrid.innerHTML = specs.map(spec => `
                <div class="spec-item">
                    <span class="spec-label">${spec.label}</span>
                    <span class="spec-value">${spec.value}</span>
                </div>
            `).join('');
        }

        function loadcarimages() {
            const mainPhoto = document.getElementById('mainPhoto');
            const thumbnailsContainer = document.getElementById('photoThumbnails');
            
            // Use images array if available, otherwise fallback to single image
            const carimages = currentCar.images || [currentCar.image];
            
            if (!carimages || carimages.length === 0) {
                console.error('No images found for car:', currentCar);
                mainPhoto.src = 'https://via.placeholder.com/600x400?text=No+Image+Available';
                return;
            }
            
            // Set main image
            mainPhoto.src = carimages[0];
            mainPhoto.alt = `${currentCar.year} ${currentCar.make} ${currentCar.model}`;
            
            // Create thumbnails
            thumbnailsContainer.innerHTML = carimages.map((image, index) => `
                <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(${index})">
                    <img src="${image}" alt="Photo ${index + 1}">
                </div>
            `).join('');
        }

        function changeMainImage(index) {
            const mainPhoto = document.getElementById('mainPhoto');
            const thumbnails = document.querySelectorAll('.thumbnail');
            
            // Use images array if available, otherwise fallback to single image
            const carimages = currentCar.images || [currentCar.image];
            
            if (!carimages || index >= carimages.length) {
                console.error('Invalid image index:', index);
                return;
            }
            
            // Update main image
            mainPhoto.src = carimages[index];
            currentImageIndex = index;
            
            // Update active thumbnail
            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }

        function populateSimilarCars() {
            const similarCars = cars.filter(car => 
                car.id !== currentCar.id && 
                (car.make === currentCar.make || car.bodyType === currentCar.bodyType)
            ).slice(0, 4);

            const similarCarsGrid = document.getElementById('similarCarsGrid');
            similarCarsGrid.innerHTML = similarCars.map(car => createSimilarCarCard(car)).join('');
        }

        function createSimilarCarCard(car) {
            const badgeClass = car.badge === 'new-arrival' ? 'new-arrival' : 
                              car.badge === 'negotiable' ? 'negotiable' : 
                              'certified';
            
            const badgeText = car.badge === 'new-arrival' ? 'New Arrival' :
                             car.badge === 'negotiable' ? 'Negotiable' :
                             'Certified';

            const carImage = car.images ? car.images[0] : car.image;

            return `
                <div class="car-card">
                    <div class="car-image">
                        <img src="${carImage}" alt="${car.year} ${car.make} ${car.model}">
                        <div class="car-badge ${badgeClass}">${badgeText}</div>
                    </div>
                    <div class="car-info">
                        <h4>${car.year} ${car.make} ${car.model}</h4>
                        <p class="car-price">${car.price.toLocaleString()}</p>
                        <p class="car-details">${car.mileage.toLocaleString()} miles • ${capitalizeFirst(car.transmission)} • ${capitalizeFirst(car.fuel)}</p>
                        <p class="car-location">📍 ${car.location}</p>
                        <a href="details.html?id=${car.id}" class="btn btn-primary btn-small">View Details</a>
                    </div>
                </div>
            `;
        }

        // Photo Gallery Functions
        function initPhotoGallery() {
            // Could add keyboard navigation, swipe gestures, etc.
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    navigateImage(-1);
                } else if (e.key === 'ArrowRight') {
                    navigateImage(1);
                }
            });
        }

        function navigateImage(direction) {
            const carimages = currentCar.images || [currentCar.image];
            const newIndex = currentImageIndex + direction;
            if (newIndex >= 0 && newIndex < carimages.length) {
                changeMainImage(newIndex);
            }
        }

        // Contact Form Functions
        function initContactForm() {
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', handleContactSubmission);

            // Pre-fill form if user is logged in
            if (isLoggedIn && currentUser) {
                document.getElementById('senderName').value = currentUser.username;
                document.getElementById('senderEmail').value = currentUser.email || '';
            }
        }

        function handleContactSubmission(e) {
            e.preventDefault();
            
            if (!isLoggedIn) {
                showAlert('error', 'Please log in to contact the seller.');
                openModal('loginModal');
                return;
            }

            const formData = {
                name: document.getElementById('senderName').value,
                email: document.getElementById('senderEmail').value,
                phone: document.getElementById('senderPhone').value,
                message: document.getElementById('inquiryMessage').value,
                carId: currentCar.id,
                carTitle: `${currentCar.year} ${currentCar.make} ${currentCar.model}`
            };

            // Simulate sending message
            setTimeout(() => {
                showAlert('success', 'Message sent successfully! The seller will contact you soon.');
                document.getElementById('contactForm').reset();
            }, 1000);
        }

        function showAlert(type, message) {
            const alertElement = document.getElementById(type === 'success' ? 'successAlert' : 'errorAlert');
            alertElement.textContent = message;
            alertElement.style.display = 'block';
            
            // Hide after 5 seconds
            setTimeout(() => {
                alertElement.style.display = 'none';
            }, 5000);
        }

        // Utility Functions
        function calculateMonthlyPayment(principal, annualRate, months) {
            const monthlyRate = annualRate / 100 / 12;
            const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                           (Math.pow(1 + monthlyRate, months) - 1);
            return Math.round(payment);
        }

        function capitalizeFirst(str) {
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