// Main JavaScript file for 1Mind Trusted Dealer Website
class WebsiteManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupCustomCursor();
        this.setupTypewriter();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupColorPalette();
    }

    // Preloader functionality
    setupPreloader() {
        const preloader = document.querySelector('.preloader');
        const preloaderBar = document.querySelector('.preloader-bar');
        
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // Hide preloader after a short delay
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 500);
                }, 500);
            }
            preloaderBar.style.width = progress + '%';
        }, 100);

        // Hide preloader after maximum 3 seconds
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 500);
            }
        }, 3000);
    }

    // Custom cursor functionality
    setupCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        
        if (!cursor) return;

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .partner-card, .benefit-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.opacity = '0.8';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.opacity = '1';
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    }

    // Typewriter effect
    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach((element, index) => {
            const text = element.getAttribute('data-text');
            const delay = parseInt(element.getAttribute('data-delay')) || 0;
            
            element.textContent = '';
            
            // Check if screen is mobile
            const isMobile = window.innerWidth <= 768;
            
            setTimeout(() => {
                this.typeText(element, text, isMobile ? 50 : 100);
            }, delay);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const isMobile = window.innerWidth <= 768;
        
        // For mobile, adjust white-space handling
        if (isMobile && text.length > 20) {
            element.style.whiteSpace = 'normal';
            element.style.wordWrap = 'break-word';
            element.style.overflowWrap = 'break-word';
        }
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }

    // Navigation functionality
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Scroll animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .partner-card, .benefit-card, .b2b-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });

        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero-bg');
        
        if (heroSection && heroBg) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroBg.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        if (type === 'success') {
            notification.style.background = 'var(--accent-green)';
        } else {
            notification.style.background = '#ff4444';
        }

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Color palette functionality
    setupColorPalette() {
        const colorOptions = document.querySelectorAll('.color-option');
        const body = document.body;
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'orange';
        this.switchTheme(savedTheme);
        
        // Set active option
        colorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.color === savedTheme) {
                option.classList.add('active');
            }
        });
        
        // Add click event listeners
        colorOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const color = option.dataset.color;
                
                // Update active state
                colorOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Switch theme
                this.switchTheme(color);
                
                // Save preference
                localStorage.setItem('theme', color);
            });
        });
    }

    switchTheme(theme) {
        const body = document.body;
        
        // Remove existing theme classes
        body.removeAttribute('data-theme');
        
        // Add new theme class (except for default orange)
        if (theme !== 'orange') {
            body.setAttribute('data-theme', theme);
        }
        
        // Update custom cursor color based on theme
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.background = this.getThemeGradient(theme);
        }
    }

    getThemeGradient(theme) {
        const gradients = {
            orange: 'linear-gradient(135deg, #FF8C00, #FF4500)',
            purple: 'linear-gradient(135deg, #8A2BE2, #9370DB)',
            yellow: 'linear-gradient(135deg, #FFD700, #FFA500)',
            green: 'linear-gradient(135deg, #32CD32, #228B22)'
        };
        return gradients[theme] || gradients.orange;
    }
}

// Additional utility functions
class Utils {
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    static isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// Performance optimizations
const optimizedScroll = Utils.throttle(() => {
    // Scroll-based animations and effects
    const scrollPosition = window.scrollY;
    
    // Update navbar background
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollPosition > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Parallax effect for hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && scrollPosition < window.innerHeight) {
        const rate = scrollPosition * -0.5;
        heroBg.style.transform = `translateY(${rate}px)`;
    }
}, 16); // ~60fps

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WebsiteManager();
    
    // Add optimized scroll listener
    window.addEventListener('scroll', optimizedScroll);
    
    // Add resize listener for responsive adjustments
    window.addEventListener('resize', Utils.debounce(() => {
        // Handle responsive adjustments
        const customCursor = document.querySelector('.custom-cursor');
        if (window.innerWidth <= 768 && customCursor) {
            customCursor.style.display = 'none';
        } else if (customCursor) {
            customCursor.style.display = 'block';
        }
        
        // Adjust typewriter elements on resize
        const typewriterElements = document.querySelectorAll('.typewriter');
        const isMobile = window.innerWidth <= 768;
        
        typewriterElements.forEach(element => {
            if (isMobile && element.textContent.length > 20) {
                element.style.whiteSpace = 'normal';
                element.style.wordWrap = 'break-word';
                element.style.overflowWrap = 'break-word';
            } else if (!isMobile) {
                element.style.whiteSpace = 'nowrap';
                element.style.wordWrap = 'normal';
                element.style.overflowWrap = 'normal';
            }
        });
    }, 250));
});



// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WebsiteManager, Utils };
}
