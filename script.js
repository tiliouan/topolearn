// Navigation mobile burger
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Navigation fluide (scroll doux)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('active');
        }
    });
});

// Ajout de la classe active sur la navigation lors du scroll
const sectionsNav = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 120;
    sectionsNav.forEach(section => {
        const link = document.querySelector('.nav-links a[href="#' + section.id + '"]');
        if (link) {
            if (
                scrollPos >= section.offsetTop &&
                scrollPos < section.offsetTop + section.offsetHeight
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
});

// Animation légère sur apparition des sections
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.2 });
sections.forEach(section => {
    section.style.animationPlayState = 'paused';
    observer.observe(section);
});

// Formulaire de contact (affichage d'un message de confirmation)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons rapidement.');
    this.reset();
});

// === Auth system for TopoLearn ===
// Parse users file format
function parseUsersFile(text) {
    const users = [];
    let current = {};
    text.split('\n').forEach(line => {
        line = line.trim();
        if(line.startsWith('# username:')) {
            if(current.username) users.push(current);
            current = { username: line.split(':')[1].trim() };
        } else if(line.startsWith('# pswd:')) {
            current.pswd = line.split(':')[1].trim();
        } else if(line.startsWith('# vip:')) {
            current.vip = line.split(':')[1].trim();
        }
    });
    if(current.username) users.push(current);
    return users;
}

// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('topolearn_user');
}

// Get current user info
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('topolearn_user'));
    } catch(e) { return null; }
}

// Logout function
function logoutTopoLearn() {
    localStorage.removeItem('topolearn_user');
    window.location.href = 'login.html';
}

// Protect a page (redirect if not logged in)
function requireLogin() {
    if(!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Example: Display username or VIP in dashboard
function displayUserInfo(selector) {
    var user = getCurrentUser();
    var el = document.querySelector(selector);
    if(user && el) {
        el.textContent = user.username + ' (VIP ' + user.vip + ')';
    }
}
