/* ============================================
   BWAMBALE KELVIN PORTFOLIO — script.js
============================================ */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

if (cursor && cursorTrail) {
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    cursorTrail.style.transform = `translate(${trailX - 15}px, ${trailY - 15}px)`;
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Scale cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, .project-card, .skill-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(2)';
      cursorTrail.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      cursorTrail.style.opacity = '1';
    });
  });
}

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV ON SCROLL =====
function updateActiveNav() {
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const links = document.querySelectorAll('.nav-link');
  let current = 'home';

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= 100) current = id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===== TYPING EFFECT =====
const phrases = [
  'Software Developer.',
  'Web Developer.',
  'App Developer.',
  'EA Builder.',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.querySelector('.typing-target');

function typeLoop() {
  if (!typingEl) return;

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1800; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}
typeLoop();

// ===== INTERSECTION OBSERVER — ANIMATE ON SCROLL =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      observer.unobserve(el);
    }
  });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.dataset.delay = i * 150;
  observer.observe(card);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== HERO PARALLAX (subtle) =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.08}px)`;
    hero.style.opacity = 1 - scrolled * 0.001;
  }
});

// ===== SEND EMAIL (mailto) =====
function sendEmail() {
  const name    = document.getElementById('msg-name').value.trim();
  const email   = document.getElementById('msg-email').value.trim();
  const subject = document.getElementById('msg-subject').value.trim();
  const body    = document.getElementById('msg-body').value.trim();
  const note    = document.getElementById('formNote');

  if (!name || !email || !body) {
    note.textContent = '⚠ Please fill in your name, email, and message.';
    note.className = 'form-note error';
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    note.textContent = '⚠ Please enter a valid email address.';
    note.className = 'form-note error';
    return;
  }

  const mailBody = `Name: ${name}\nEmail: ${email}\n\n${body}`;
  const mailtoLink = `mailto:bwambalekelvin9@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(mailBody)}`;
  window.location.href = mailtoLink;

  note.textContent = '✓ Opening your email client...';
  note.className = 'form-note';

  setTimeout(() => {
    document.getElementById('msg-name').value = '';
    document.getElementById('msg-email').value = '';
    document.getElementById('msg-subject').value = '';
    document.getElementById('msg-body').value = '';
    note.textContent = '';
  }, 3000);
}