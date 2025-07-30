        // Cursor Trail System
        class CursorTrail {
            constructor() {
                this.cursor = document.querySelector('.custom-cursor');
                this.trails = [];
                this.isMoving = false;
                this.lastX = 0;
                this.lastY = 0;
                this.speed = 0;
                
                this.init();
            }
            
            init() {
                document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
                document.addEventListener('mousedown', () => this.handleMouseDown());
                document.addEventListener('mouseup', () => this.handleMouseUp());
                
                // Add hover effects for interactive elements
                const interactiveElements = document.querySelectorAll('a, button, .demo-card, .interactive-card');
                interactiveElements.forEach(el => {
                    el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
                    el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
                });
                
                // Special effects for certain elements
                const specialElements = document.querySelectorAll('.hover-special');
                specialElements.forEach(el => {
                    el.addEventListener('mouseenter', () => this.enableParticleMode());
                    el.addEventListener('mouseleave', () => this.disableParticleMode());
                });
                
                const clickElements = document.querySelectorAll('.click-special');
                clickElements.forEach(el => {
                    el.addEventListener('click', (e) => this.createBurst(e.clientX, e.clientY));
                });
            }
            
            handleMouseMove(e) {
                const x = e.clientX;
                const y = e.clientY;
                
                // Update cursor position
                this.cursor.style.left = x + 'px';
                this.cursor.style.top = y + 'px';
                
                // Calculate speed
                const dx = x - this.lastX;
                const dy = y - this.lastY;
                this.speed = Math.sqrt(dx * dx + dy * dy);
                
                // Create trail based on speed
                if (this.speed > 1) {
                    this.createTrail(x, y);
                    
                    // Extra trails for fast movement
                    if (this.speed > 5) {
                        setTimeout(() => this.createTrail(x - dx * 0.3, y - dy * 0.3), 50);
                    }
                    if (this.speed > 10) {
                        setTimeout(() => this.createTrail(x - dx * 0.6, y - dy * 0.6), 100);
                    }
                }
                
                this.lastX = x;
                this.lastY = y;
            }
            
            handleMouseDown() {
                this.cursor.classList.add('click');
            }
            
            handleMouseUp() {
                this.cursor.classList.remove('click');
            }
            
            createTrail(x, y) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                
                // Random trail type
                const trailTypes = ['trail-1', 'trail-2', 'trail-3'];
                const randomType = trailTypes[Math.floor(Math.random() * trailTypes.length)];
                trail.classList.add(randomType);
                
                // Add some randomness to position
                const offsetX = (Math.random() - 0.5) * 10;
                const offsetY = (Math.random() - 0.5) * 10;
                
                trail.style.left = (x + offsetX) + 'px';
                trail.style.top = (y + offsetY) + 'px';
                
                document.body.appendChild(trail);
                
                // Remove after animation
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 800);
            }
            
            enableParticleMode() {
                this.particleMode = true;
                document.addEventListener('mousemove', this.createParticles);
            }
            
            disableParticleMode() {
                this.particleMode = false;
                document.removeEventListener('mousemove', this.createParticles);
            }
            
            createParticles = (e) => {
                if (!this.particleMode) return;
                
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        const particle = document.createElement('div');
                        particle.className = 'particle-trail';
                        
                        const offsetX = (Math.random() - 0.5) * 20;
                        const offsetY = (Math.random() - 0.5) * 20;
                        
                        particle.style.left = (e.clientX + offsetX) + 'px';
                        particle.style.top = (e.clientY + offsetY) + 'px';
                        
                        document.body.appendChild(particle);
                        
                        setTimeout(() => {
                            if (particle.parentNode) {
                                particle.parentNode.removeChild(particle);
                            }
                        }, 1200);
                    }, i * 50);
                }
            }
            
            createBurst(x, y) {
                const colors = ['#00ffff', '#ff6b6b', '#ffd93d', '#40e0d0', '#ff8e8e'];
                
                for (let i = 0; i < 12; i++) {
                    setTimeout(() => {
                        const burst = document.createElement('div');
                        burst.style.position = 'fixed';
                        burst.style.width = '8px';
                        burst.style.height = '8px';
                        burst.style.borderRadius = '50%';
                        burst.style.pointerEvents = 'none';
                        burst.style.zIndex = '10001';
                        
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        burst.style.background = color;
                        burst.style.boxShadow = `0 0 10px ${color}`;
                        
                        const angle = (i / 12) * Math.PI * 2;
                        const distance = 50 + Math.random() * 50;
                        const endX = x + Math.cos(angle) * distance;
                        const endY = y + Math.sin(angle) * distance;
                        
                        burst.style.left = x + 'px';
                        burst.style.top = y + 'px';
                        burst.style.transform = 'translate(-50%, -50%)';
                        
                        document.body.appendChild(burst);
                        
                        // Animate burst
                        burst.animate([
                            { 
                                transform: 'translate(-50%, -50%) scale(1)',
                                opacity: 1,
                                left: x + 'px',
                                top: y + 'px'
                            },
                            { 
                                transform: 'translate(-50%, -50%) scale(0)',
                                opacity: 0,
                                left: endX + 'px',
                                top: endY + 'px'
                            }
                        ], {
                            duration: 800,
                            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                        }).onfinish = () => {
                            if (burst.parentNode) {
                                burst.parentNode.removeChild(burst);
                            }
                        };
                    }, i * 30);
                }
            }
        }
        
        // Initialize cursor trail when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new CursorTrail();
        });
        
        // Mobile Navigation Toggle
        document.querySelector('.nav-toggle').addEventListener('click', () => {
            const navMenu = document.querySelector('#nav-menu');
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            document.querySelector('.nav-toggle').setAttribute('aria-expanded', isExpanded);
        });
        // Theme Toggle
        const toggleSwitch = document.querySelector('#theme-toggle');
        const body = document.body;

        function switchTheme() {
            if (toggleSwitch.checked) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                sessionStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                sessionStorage.setItem('theme', 'dark');
            }
            updateAnimations();
        }

         const neonText = document.querySelector('.neon-text');
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'];
        let colorIndex = 0;
        
        function changeColor() {
            const currentColor = colors[colorIndex];
            neonText.style.textShadow = `
                0 0 5px ${currentColor},
                0 0 10px ${currentColor},
                0 0 15px ${currentColor},
                0 0 20px ${currentColor},
                0 0 35px ${currentColor},
                0 0 40px ${currentColor},
                0 0 50px ${currentColor},
                0 0 75px ${currentColor}
            `;
            colorIndex = (colorIndex + 1) % colors.length;
        }
        
        // Change color every 9 seconds
        setInterval(changeColor, 9000);
        
        // Add click interaction for intensity boost
        neonText.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            this.style.filter = 'brightness(1.5)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
            }, 300);
        });
        
        // Random spark generation
        function createRandomSpark() {
            const sparksContainer = document.querySelector('.sparks');
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.top = Math.random() * 100 + '%';
            spark.style.left = Math.random() * 100 + '%';
            spark.style.animationDelay = Math.random() * 2 + 's';
            sparksContainer.appendChild(spark);
            
            // Remove spark after animation
            setTimeout(() => {
                spark.remove();
            }, 2000);
        }
        
        // Create random sparks periodically
        setInterval(createRandomSpark, 1500);

        // Apply saved theme on page load
        window.addEventListener('load', function() {
            const savedTheme = sessionStorage.getItem('theme') || 'dark';
            if (savedTheme === 'light') {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                toggleSwitch.checked = true;
            } else {
                body.classList.add('dark-mode');
                toggleSwitch.checked = false;
            }
            
            // Initialize animations after theme is set
            setTimeout(() => {
                updateAnimations();
                initScrollAnimations();
            }, 100);
        });

        toggleSwitch.addEventListener('change', switchTheme);

        // Enhanced Progress Bar Animation
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-line span');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
            });
        }

        // Enhanced Circular Progress Animation
        const skills = [
            { percentage: 85, labelId: 'skill-percentage-1' },
            { percentage: 70, labelId: 'skill-percentage-2' },
            { percentage: 65, labelId: 'skill-percentage-3' },
            { percentage: 70, labelId: 'skill-percentage-4' },
            { percentage: 80, labelId: 'skill-percentage-5' },
            { percentage: 85, labelId: 'skill-percentage-6' }
        ];

        function animateCircularBars() {
            const radius = 50;
            const circumference = 2 * Math.PI * radius;

            document.querySelectorAll('.circular-fg').forEach((circle, index) => {
                const skill = skills[index];
                const label = document.getElementById(skill.labelId);
                
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = circumference;
                circle.style.stroke = `url(#gradient${index + 1})`;

                let start = null;
                const duration = 2000;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const offset = circumference - (skill.percentage / 100 * circumference) * progress;
                    
                    circle.style.strokeDashoffset = offset;
                    label.textContent = Math.round(skill.percentage * progress) + '%';
                    
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    }
                }
                requestAnimationFrame(step);
            });
        }

        function updateAnimations() {
            setTimeout(() => {
                animateProgressBars();
                animateCircularBars();
            }, 500);
        }

        // Scroll animations
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        
                        // Trigger skill animations when skills section is visible
                        if (entry.target.id === 'skill') {
                            updateAnimations();
                        }
                    }
                });
            }, observerOptions);

            // Observe sections
            document.querySelectorAll('section, .slide-down, .slide-left, .image-box').forEach(el => {
                observer.observe(el);
            });
        }

        // Scroll to top functionality
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            const scrollTop = document.querySelector('.scroll-top');
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const target = document.querySelector(href);
                console.log('Clicked link:', href); // Debug: Log the href
                console.log('Target element:', target); // Debug: Log the target
                if (target) {
                    console.log('Scrolling to:', target); // Debug: Confirm target exists
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu after clicking
                    const navMenu = document.querySelector('#nav-menu');
                    navMenu.classList.remove('active');
                    document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
                } else {
                    console.error('Target not found for:', href); // Debug: Log if target is missing
                }
            });
        });
        // Add loading animation
        document.addEventListener('DOMContentLoaded', function() {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Enhanced keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const navMenu = document.querySelector('#nav-menu');
                navMenu.classList.remove('active');
                document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
            }
        });

        // Performance optimization - debounce scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Optimize scroll event with debouncing
        const debouncedScrollHandler = debounce(() => {
            const scrollTop = document.querySelector('.scroll-top');
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        }, 10);

        window.addEventListener('scroll', debouncedScrollHandler);

        // Form submission handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simulate form submission (in real implementation, you'd send to a server)
            const submitBtn = document.querySelector('.submit-btn');
            const successMessage = document.getElementById('successMessage');
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                successMessage.classList.add('show');
                
                // Reset button
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
                
                console.log('Form submitted:', { name, email, subject, message });
            }, 2000);
        });

        // Add floating animation to info items
        const infoItems = document.querySelectorAll('.info-item');
        infoItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });

        // Add focus effects to form inputs
        const formControls = document.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });

        // Social links hover effects
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe contact section elements
        document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
            observer.observe(el);
        });

   