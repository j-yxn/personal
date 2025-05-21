// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

// Move cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .social-icon, .hamburger');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = 'var(--accent-color)';
        cursorDot.style.width = '0';
        cursorDot.style.height = '0';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'var(--accent-color)';
        cursorDot.style.width = '4px';
        cursorDot.style.height = '4px';
    });
});

// Mobile check (disable custom cursor on touch devices)
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Reveal animations
document.querySelectorAll('.reveal-text').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Form validation
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
        setErrorFor(nameInput, 'Name cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(nameInput);
    }
    
    // Validate email
    if (emailInput.value.trim() === '') {
        setErrorFor(emailInput, 'Email cannot be blank');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        setErrorFor(emailInput, 'Email is not valid');
        isValid = false;
    } else {
        setSuccessFor(emailInput);
    }
    
    // Validate message
    if (messageInput.value.trim() === '') {
        setErrorFor(messageInput, 'Message cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(messageInput);
    }
    
    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    }
});

function setErrorFor(input, message) {
    const inputGroup = input.parentElement;
    const errorMessage = inputGroup.querySelector('.error-message');
    
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function setSuccessFor(input) {
    const inputGroup = input.parentElement;
    
    inputGroup.classList.remove('error');
    inputGroup.classList.add('success');
    const errorMessage = inputGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
