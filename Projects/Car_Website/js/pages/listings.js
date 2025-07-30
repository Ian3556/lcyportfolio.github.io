        // Sample car data
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
                image: 'carimages/Audi A1 White.png',
                badge: 'certified',
                seller: 'dealer'
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
                badge: 'new-arrival',
                seller: 'private'
            },
            {
                id: 3,
                make: 'Toyota',
                model: 'Camry',
                year: 2021,
                price: 32900,
                mileage: 22000,
                transmission: 'manual',
                fuel: 'hybrid',
                location: 'Chicago, IL',
                image: 'carimages/toyota camry GREY.png',
                badge: 'negotiable',
                seller: 'dealer'
            },
            {
                id: 4,
                make: 'Mercedes',
                model: 'A200 Sedan',
                year: 2024,
                price: 53800,
                mileage: 5200,
                transmission: 'automatic',
                fuel: 'gasoline',
                location: 'Miami, FL',
                image: 'carimages/mercedes A200 sedan.png',
                badge: 'certified',
                seller: 'certified'
            },
            {
                id: 5,
                make: 'Ford',
                model: 'Mustang',
                year: 2020,
                price: 38750,
                mileage: 35000,
                transmission: 'manual',
                fuel: 'gasoline',
                location: 'Dallas, TX',
                image: 'carimages/ford mustang GREY.png',
                badge: 'negotiable',
                seller: 'private'
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
                badge: 'certified',
                seller: 'dealer'
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
                badge: 'certified',
                seller: 'dealer'
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
                badge: 'new-arrival',
                seller: 'certified'
            }
        ];

        // Global variables
        let filteredCars = [...cars];
        let currentPage = 1;
        let carsPerPage = 8;
        let isGridView = true;
        let isLoggedIn = false;
        let currentUser = null;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            initScrollProgress();
            initMobileNav();
            initAuth();
            initFilters();
            initViewToggle();
            initSorting();
            loadCarsFromURL();
            renderCars();
            initPagination();
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

        // Filter Functions
        function initFilters() {
            // Range sliders
            const mileageRange = document.getElementById('mileageRange');
            const priceRange = document.getElementById('priceRange');
            const mileageValue = document.getElementById('mileageValue');
            const priceValue = document.getElementById('priceValue');

            mileageRange.addEventListener('input', (e) => {
                mileageValue.textContent = parseInt(e.target.value).toLocaleString();
            });

            priceRange.addEventListener('input', (e) => {
                priceValue.textContent = parseInt(e.target.value).toLocaleString();
            });

            // Apply filters button
            document.getElementById('applyFilters').addEventListener('click', applyFilters);
            document.getElementById('clearFilters').addEventListener('click', clearFilters);
        }

        function applyFilters() {
            showLoading();
            
            setTimeout(() => {
                const filters = getFilterValues();
                filteredCars = cars.filter(car => {
                    return (
                        (!filters.make || car.make.toLowerCase() === filters.make) &&
                        (!filters.model || car.model.toLowerCase() === filters.model) &&
                        (!filters.yearMin || car.year >= filters.yearMin) &&
                        (!filters.yearMax || car.year <= filters.yearMax) &&
                        (car.mileage <= filters.mileage) &&
                        (car.price <= filters.price) &&
                        (!filters.location || car.location.toLowerCase().includes(filters.location.toLowerCase())) &&
                        (filters.transmission.length === 0 || filters.transmission.includes(car.transmission)) &&
                        (filters.fuel.length === 0 || filters.fuel.includes(car.fuel)) &&
                        (filters.seller.length === 0 || filters.seller.includes(car.seller))
                    );
                });

                currentPage = 1;
                renderCars();
                hideLoading();
            }, 500);
        }

        function clearFilters() {
            // Reset all filter inputs
            document.getElementById('makeFilter').value = '';
            document.getElementById('modelFilter').value = '';
            document.getElementById('yearMin').value = '';
            document.getElementById('yearMax').value = '';
            document.getElementById('mileageRange').value = 100000;
            document.getElementById('priceRange').value = 50000;
            document.getElementById('locationFilter').value = '';
            
            // Reset checkboxes
            document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });

            // Reset range display values
            document.getElementById('mileageValue').textContent = '100,000';
            document.getElementById('priceValue').textContent = '50,000';

            // Reset filtered cars
            filteredCars = [...cars];
            currentPage = 1;
            renderCars();
        }

        function getFilterValues() {
            const transmission = Array.from(document.querySelectorAll('input[type="checkbox"][value="automatic"], input[type="checkbox"][value="manual"], input[type="checkbox"][value="cvt"]'))
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            const fuel = Array.from(document.querySelectorAll('input[type="checkbox"][value="gasoline"], input[type="checkbox"][value="hybrid"], input[type="checkbox"][value="electric"], input[type="checkbox"][value="diesel"]'))
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            const seller = Array.from(document.querySelectorAll('input[type="checkbox"][value="dealer"], input[type="checkbox"][value="private"], input[type="checkbox"][value="certified"]'))
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            return {
                make: document.getElementById('makeFilter').value,
                model: document.getElementById('modelFilter').value,
                yearMin: parseInt(document.getElementById('yearMin').value) || null,
                yearMax: parseInt(document.getElementById('yearMax').value) || null,
                mileage: parseInt(document.getElementById('mileageRange').value),
                price: parseInt(document.getElementById('priceRange').value),
                location: document.getElementById('locationFilter').value,
                transmission,
                fuel,
                seller
            };
        }

        // View Toggle
        function initViewToggle() {
            const gridViewBtn = document.getElementById('gridView');
            const listViewBtn = document.getElementById('listView');

            gridViewBtn.addEventListener('click', () => {
                isGridView = true;
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
                renderCars();
            });

            listViewBtn.addEventListener('click', () => {
                isGridView = false;
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
                renderCars();
            });
        }

        // Sorting
        function initSorting() {
            document.getElementById('sortSelect').addEventListener('change', (e) => {
                sortCars(e.target.value);
                renderCars();
            });
        }

        function sortCars(sortBy) {
            switch (sortBy) {
                case 'price-low':
                    filteredCars.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredCars.sort((a, b) => b.price - a.price);
                    break;
                case 'year-new':
                    filteredCars.sort((a, b) => b.year - a.year);
                    break;
                case 'year-old':
                    filteredCars.sort((a, b) => a.year - b.year);
                    break;
                case 'mileage-low':
                    filteredCars.sort((a, b) => a.mileage - b.mileage);
                    break;
                case 'mileage-high':
                    filteredCars.sort((a, b) => b.mileage - a.mileage);
                    break;
                default:
                    // Relevance - reset to original order
                    filteredCars = cars.filter(car => filteredCars.includes(car));
            }
        }

        // Load cars from URL parameters
        function loadCarsFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            
            if (urlParams.has('make')) {
                document.getElementById('makeFilter').value = urlParams.get('make');
            }
            if (urlParams.has('model')) {
                document.getElementById('modelFilter').value = urlParams.get('model');
            }
            if (urlParams.has('year')) {
                document.getElementById('yearMin').value = urlParams.get('year');
            }
            if (urlParams.has('location')) {
                document.getElementById('locationFilter').value = urlParams.get('location');
            }

            // Apply filters if any URL parameters exist
            if (urlParams.toString()) {
                applyFilters();
            }
        }

        // Render cars
        function renderCars() {
            const container = document.getElementById('carListings');
            const resultsCount = document.getElementById('resultsCount');
            
            // Update results count
            resultsCount.textContent = filteredCars.length;

            // Update container class
            container.className = isGridView ? 'listings-grid' : 'listings-list';

            // Calculate pagination
            const startIndex = (currentPage - 1) * carsPerPage;
            const endIndex = startIndex + carsPerPage;
            const carsToShow = filteredCars.slice(startIndex, endIndex);

            // Render cars
            container.innerHTML = carsToShow.map(car => createCarCard(car)).join('');

            // Update pagination
            updatePagination();
        }

        function createCarCard(car) {
            const badgeClass = car.badge === 'new-arrival' ? 'new-arrival' : 
                              car.badge === 'negotiable' ? 'negotiable' : 
                              'certified';
            
            const badgeText = car.badge === 'new-arrival' ? 'New Arrival' :
                             car.badge === 'negotiable' ? 'Negotiable' :
                             'Certified';

            const viewClass = isGridView ? '' : 'list-view';

            return `
                <div class="car-card ${viewClass}">
                    <div class="car-image">
                        <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}">
                        <div class="car-badge ${badgeClass}">${badgeText}</div>
                    </div>
                    <div class="car-info">
                        <h3>${car.year} ${car.make} ${car.model}</h3>
                        <p class="car-price">$${car.price.toLocaleString()}</p>
                        <p class="car-details">${car.mileage.toLocaleString()} miles • ${capitalizeFirst(car.transmission)} • ${capitalizeFirst(car.fuel)}</p>
                        <p class="car-location">📍 ${car.location}</p>
                        <div class="car-actions">
                            <a href="details.html?id=${car.id}" class="btn btn-primary btn-small">View Details</a>
                            <button class="btn btn-outline btn-small" onclick="contactSeller(${car.id})">Contact Seller</button>
                        </div>
                    </div>
                </div>
            `;
        }

        function capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        function contactSeller(carId) {
            if (!isLoggedIn) {
                alert('Please log in to contact sellers.');
                openModal('loginModal');
                return;
            }
            
            const car = cars.find(c => c.id === carId);
            alert(`Contact information for ${car.year} ${car.make} ${car.model}:\n\nThis feature would normally open a contact form or provide seller details.`);
        }

        // Pagination
        function initPagination() {
            document.getElementById('prevPage').addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderCars();
                    scrollToTop();
                }
            });

            document.getElementById('nextPage').addEventListener('click', () => {
                const totalPages = Math.ceil(filteredCars.length / carsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderCars();
                    scrollToTop();
                }
            });
        }

        function updatePagination() {
            const totalPages = Math.ceil(filteredCars.length / carsPerPage);
            const prevBtn = document.getElementById('prevPage');
            const nextBtn = document.getElementById('nextPage');

            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Loading state
        function showLoading() {
            document.getElementById('loadingState').style.display = 'block';
            document.getElementById('carListings').style.display = 'none';
        }

        function hideLoading() {
            document.getElementById('loadingState').style.display = 'none';
            document.getElementById('carListings').style.display = isGridView ? 'grid' : 'flex';
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