// Animation System
class AnimationSystem {
    constructor() {
        this.canvas = document.getElementById('animationCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.sparkles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.pear = document.getElementById('floatingPear');
        
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createStars();
        this.setupEventListeners();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        for (let i = 0; i < 50; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speed: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Mouse tracking for pear
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Create sparkles on click
        document.addEventListener('click', (e) => {
            this.createSparkles(e.clientX, e.clientY);
        });

        // Create stars on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.createRandomStars();
            }, 100);
        });
    }

    createSparkles(x, y) {
        for (let i = 0; i < 10; i++) {
            this.sparkles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                decay: 0.02
            });
        }
    }

    createRandomStars() {
        for (let i = 0; i < 5; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: -10,
                size: Math.random() * 3 + 1,
                speed: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Animate stars
        this.stars.forEach((star, index) => {
            star.y += star.speed;
            star.opacity = Math.sin(Date.now() * 0.001 + index) * 0.3 + 0.7;
            
            this.ctx.save();
            this.ctx.globalAlpha = star.opacity;
            this.ctx.fillStyle = '#fbbf24';
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            if (star.y > this.canvas.height + 10) {
                this.stars.splice(index, 1);
            }
        });

        // Animate sparkles
        this.sparkles.forEach((sparkle, index) => {
            sparkle.x += sparkle.vx;
            sparkle.y += sparkle.vy;
            sparkle.life -= sparkle.decay;
            
            this.ctx.save();
            this.ctx.globalAlpha = sparkle.life;
            this.ctx.fillStyle = '#fbbf24';
            this.ctx.beginPath();
            this.ctx.arc(sparkle.x, sparkle.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            if (sparkle.life <= 0) {
                this.sparkles.splice(index, 1);
            }
        });

        // Animate pear following cursor
        if (this.pear) {
            const targetX = this.mouseX - 30;
            const targetY = this.mouseY - 30;
            
            const currentX = parseFloat(this.pear.style.left) || 0;
            const currentY = parseFloat(this.pear.style.top) || 0;
            
            const newX = currentX + (targetX - currentX) * 0.1;
            const newY = currentY + (targetY - currentY) * 0.1;
            
            this.pear.style.left = newX + 'px';
            this.pear.style.top = newY + 'px';
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation system
    const animationSystem = new AnimationSystem();
    
    const tabs = document.querySelectorAll('.tab');
    const contentSections = document.querySelectorAll('.content-section');

    // Add click event listeners to all tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Create celebration effect
            createCelebrationEffect();
        });
    });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to buttons with extra animations
    const buttons = document.querySelectorAll('.btn, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            createButtonSparkles(this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click handlers for contact buttons
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            switch(buttonText) {
                case 'LinkedIn':
                    window.open('https://www.linkedin.com/in/ankur-j/', '_blank');
                    break;
                case 'GitHub':
                    window.open('https://github.com/Ankur', '_blank');
                    break;
            }
        });
    });

    // Add click handlers for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Connect on LinkedIn')) {
                window.open('https://www.linkedin.com/in/ankur-j/', '_blank');
            } else if (buttonText.includes('View GitHub')) {
                window.open('https://github.com/Ankur', '_blank');
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                createElementSparkles(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add scroll-based navbar styling
    const navbar = document.querySelector('.nav-tabs');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add typing animation for the name with extra effects
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const name = nameElement.textContent;
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < name.length) {
                nameElement.textContent += name.charAt(i);
                createTypingSparkles(nameElement);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add floating elements
    createFloatingElements();
});

// Animation helper functions
function createCelebrationEffect() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, i * 100);
    }
}

function createButtonSparkles(button) {
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

function createElementSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }, i * 50);
    }
}

function createTypingSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = (rect.right - 10) + 'px';
    sparkle.style.top = (rect.top + rect.height / 2) + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 500);
}

function createFloatingElements() {
    const emojis = ['⭐', '🚀', '💫', '✨', '🌟'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            element.style.position = 'fixed';
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.top = window.innerHeight + 50 + 'px';
            element.style.fontSize = '2rem';
            element.style.pointerEvents = 'none';
            element.style.zIndex = '999';
            element.style.transition = 'all 3s ease-out';
            document.body.appendChild(element);
            
            setTimeout(() => {
                element.style.top = '-50px';
                element.style.opacity = '0';
            }, 100);
            
            setTimeout(() => {
                element.remove();
            }, 3000);
        }, i * 2000);
    }
}

// Utility functions
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

// Add rainbow text effect to name
function addRainbowEffect() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        let colorIndex = 0;
        
        setInterval(() => {
            nameElement.style.color = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 2000);
    }
}

// Initialize rainbow effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addRainbowEffect, 3000);
}); 