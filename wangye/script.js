document.addEventListener('DOMContentLoaded', function() {
    // 动态背景效果 - 已移除粒子效果
    
    // Add grid pattern elements
    addGridPattern();
    
    // Mobile navigation toggle
    setupMobileNav();
    
    // FAQ accordions
    setupFaqAccordions();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add animation effects on scroll
    setupScrollAnimations();
    
    // Add hover effects for service cards
    setupServiceCardEffects();
    
    // Add cursor trail effect
    setupCursorTrail();
    
    // Add typing effect for hero headline
    setupTypingEffect();
});

// 粒子背景效果相关函数已移除

// Add grid pattern to the background 
function addGridPattern() {
    const sections = document.querySelectorAll('section, header, footer');
    
    sections.forEach(section => {
        const gridPattern = document.createElement('div');
        gridPattern.classList.add('grid-pattern');
        section.appendChild(gridPattern);
    });
}

// Mobile navigation
function setupMobileNav() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger menu for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(hamburger, document.querySelector('.cta-button'));
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        if (navLinks.style.display === 'flex') {
            // Close the menu
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
        } else {
            // Open the menu
            navLinks.style.display = 'flex';
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                navLinks.style.opacity = '1';
                navLinks.style.transform = 'translateY(0)';
            }, 10);
        }
    });
    
    // Set initial styles for mobile nav
    if (window.innerWidth <= 768) {
        navLinks.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        navLinks.style.opacity = '0';
    }
    
    // Hide mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && navLinks.style.display === 'flex') {
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 300);
            hamburger.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.opacity = '0';
                navLinks.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
                hamburger.classList.remove('active');
            }
        });
    });
}

// FAQ accordions
function setupFaqAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleBtn = item.querySelector('.toggle-btn');
        
        question.addEventListener('click', function() {
            // Toggle this FAQ item
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.toggle-btn i');
                    
                    otherAnswer.style.maxHeight = '0';
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                    
                    setTimeout(() => {
                        otherAnswer.style.display = 'none';
                    }, 300);
                }
            });
            
            // Toggle this FAQ
            item.classList.toggle('active');
            
            // Update the icon
            const icon = toggleBtn.querySelector('i');
            if (!isActive) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
                
                // Open with animation
                answer.style.display = 'block';
                setTimeout(() => {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }, 10);
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
                
                // Close with animation
                answer.style.maxHeight = '0';
                setTimeout(() => {
                    answer.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop - 80, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Elements to animate
    const elements = [
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.faq-item'),
        document.querySelector('.cta-content'),
        document.querySelector('.hero-content'),
        ...document.querySelectorAll('.stat-item')
    ].filter(Boolean);
    
    // Add staggered delay to cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.08}s`;
    });
    
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.12}s`;
    });
    
    // Add initial classes
    elements.forEach(el => {
        el.classList.add('animate-on-scroll');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    // Function to handle animation on scroll
    function handleScrollAnimation() {
        elements.forEach(el => {
            if (isInViewport(el) && el.style.opacity === '0') {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    }
    
    // Initial check
    setTimeout(() => {
        handleScrollAnimation();
    }, 300);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
}

// Add hover effects for service cards
function setupServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 15;
            const moveY = (y - centerY) / 15;
            
            card.style.transform = `perspective(600px) rotateX(${-moveY}deg) rotateY(${moveX}deg) translateZ(10px)`;
            card.style.boxShadow = `0 10px 30px rgba(0, 242, 147, 0.15), 
                              ${moveX * 0.5}px ${moveY * 0.5}px 15px rgba(0, 242, 147, 0.1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 242, 147, 0.15)';
        });
    });
}

// Parallax effect on hover for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;
        
        // Apply 3D transform
        card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Move the project-category element based on mouse position
        const categoryEl = card.querySelector('.project-category');
        if (categoryEl) {
            categoryEl.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
        }
        
        // Move the h3 element based on mouse position
        const h3El = card.querySelector('h3');
        if (h3El) {
            h3El.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        
        // Reset transforms on inner elements
        const categoryEl = card.querySelector('.project-category');
        if (categoryEl) {
            categoryEl.style.transform = 'translate(0, 0)';
        }
        
        const h3El = card.querySelector('h3');
        if (h3El) {
            h3El.style.transform = 'translate(0, 0)';
        }
    });
});

// Add cursor trail effect
function setupCursorTrail() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-trail');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
}

// Add typing effect for hero headline
function setupTypingEffect() {
    const heroHeading = document.querySelector('.hero h1');
    if (!heroHeading) return;
    
    // Create counters for animation
    const counters = document.querySelectorAll('.stat-item h2');
    counters.forEach(counter => {
        const targetValue = parseInt(counter.textContent);
        counter.textContent = '0';
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let currentValue = 0;
                const increment = Math.ceil(targetValue / 50);
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue > targetValue) {
                        currentValue = targetValue;
                        clearInterval(timer);
                    }
                    counter.textContent = currentValue + (counter.textContent.includes('+') ? '+' : '');
                }, 30);
                observer.disconnect();
            }
        });
        
        observer.observe(counter);
    });
}

// Add sticky header with background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}); 