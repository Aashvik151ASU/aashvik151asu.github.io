document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation Configuration
    const roles = ["Data Engineer", "Data Analyst", "Software Engineer", "Cloud Engineer"];
    let currentRoleIndex = 0;
    let charIndex = 0;
    const typedRolesElement = document.getElementById('typed-roles');
    const cursorElement = document.getElementById('cursor');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const waitTime = 2000;

    // Typing Animation Functions
    function typeRole() {
        if (charIndex < roles[currentRoleIndex].length) {
            typedRolesElement.textContent += roles[currentRoleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeRole, typingSpeed);
        } else {
            setTimeout(deleteRole, waitTime);
        }
    }

    function deleteRole() {
        if (charIndex > 0) {
            typedRolesElement.textContent = roles[currentRoleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteRole, deletingSpeed);
        } else {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            setTimeout(typeRole, typingSpeed);
        }
    }

    // Start typing animation
    typeRole();

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load the user's preferred theme from local storage
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(preferredTheme);
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        body.classList.add('transition');
        
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
        
        // Remove transition class after animation completes
        setTimeout(() => {
            body.classList.remove('transition');
        }, 500);
    });

    // Project Card Flip Functionality - Simplified and More Robust
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        console.log(`Setting up event listener for card ${index + 1}`);
        
        card.addEventListener('click', function(e) {
            console.log(`Card ${index + 1} clicked!`);
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the flipped class
            const isFlipped = this.classList.contains('flipped');
            this.classList.toggle('flipped');
            
            console.log(`Card ${index + 1} is now ${this.classList.contains('flipped') ? 'flipped' : 'not flipped'}`);
        });
        
        // Add keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
                console.log(`Card ${index + 1} toggled via keyboard`);
            }
        });
        
        // Make cards focusable for keyboard navigation
        card.setAttribute('tabindex', '0');
        card.style.cursor = 'pointer';
        
        // Add visual feedback
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
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

    // Add intersection observer for fade-in animations (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in effect
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Skills hover enhancement for better mobile experience
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(skill => {
        skill.addEventListener('touchstart', function() {
            // Add a brief highlight effect on touch for mobile users
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add loading state management
    window.addEventListener('load', function() {
        // Remove any loading states or add entrance animations
        document.body.classList.add('loaded');
        
        // Trigger initial visibility for sections
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
});

// Global function for project card flipping (for onclick attribute compatibility)
function flipCard(card) {
    console.log('flipCard function called');
    card.classList.toggle('flipped');
    console.log('Card flipped, class list:', card.classList);
}

// Utility function to handle responsive image loading
function handleImageLoad() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // Handle broken images by adding a placeholder or hiding
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
}

// Initialize image handling
document.addEventListener('DOMContentLoaded', handleImageLoad);

// Add resize handler for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle any resize-specific logic here
        // For example, recalculating layouts or updating animations
        
        // Update viewport height for mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 250);
});

// Set initial viewport height
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
