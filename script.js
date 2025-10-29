// Initialize Swiper
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    769: {
      slidesPerView: 2,
    },
    1500: {
      slidesPerView: 3,
    },
  },
});


// Add floating particles to splash
function createParticles() {
  const splash = document.querySelector('.splash');
  const particleCount = 25;
  
  // Clear any existing particles
  const existingParticles = splash.querySelectorAll('.particle');
  existingParticles.forEach(particle => particle.remove());
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties - start from bottom
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 20 + 10;
    const animationDelay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.bottom = `-${size}px`; // Start below the viewport
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${animationDelay}s`;
    particle.style.opacity = '0'; // Start invisible
    
    splash.appendChild(particle);
  }
}


// Email copy function
function copyEmail() {
  const email = "jameswarren012@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    alert("Email copied to clipboard! Feel free to reach out!");
  }).catch(err => {
    console.error("Failed to copy email: ", err);
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ block: "start", behavior: 'smooth' });
    }
  });
});

// Mouse move effect for splash section
let mouseMoveTimeout;
document.addEventListener('mousemove', e => {
  clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout(() => {
    const splash = document.querySelector('#splash');
    const x = (e.pageX - window.innerWidth / 2) / 50;
    const y = (e.pageY - window.innerHeight / 2) / 50;
    splash.style.transform = `translate(${x}px, ${y}px)`;
  }, 10);
});

// Typed.js initialization
new Typed("#typed", {
  strings: ["Software Engineer", "Problem Solver", "Machine Learning Enthusiast", "Creative Thinker"],
  typeSpeed: 60,
  backSpeed: 30,
  loop: true
});

// Scroll-triggered animations
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  // Make nav bar visible immediately on load
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.opacity = '1';
    nav.style.transform = 'translateY(0)';
  }

  // Add initial animation classes to other elements
  const proPfp = document.querySelector('.pro-pfp img');
  const blurb = document.querySelector('.blurb');
  const projectsH2 = document.querySelector('.projects h2');
  const slideContainer = document.querySelector('.slide-container');
  const skillsH2 = document.querySelector('.skills h2');
  const skillsH3 = document.querySelectorAll('.skills h3');
  const workSection = document.querySelector('.work');
  const contactH2 = document.querySelector('.contact h2');
  const contactCards = document.querySelectorAll('.contact-card');
  const hrElements = document.querySelectorAll('hr');
  const skillSubgrids = document.querySelectorAll('.skill-subgrid');

  // Apply initial animation classes (excluding nav)
  if (proPfp) proPfp.classList.add('fade-in-right');
  if (blurb) blurb.classList.add('fade-in-left');
  if (projectsH2) projectsH2.classList.add('fade-in');
  if (slideContainer) slideContainer.classList.add('slide-in');
  if (skillsH2) skillsH2.classList.add('fade-in');
  if (skillsH3) skillsH3.forEach(h3 => h3.classList.add('fade-in'));
  if (workSection) workSection.classList.add('fade-in');
  if (contactH2) contactH2.classList.add('fade-in');
  if (contactCards) contactCards.forEach(card => card.classList.add('fade-in-rotate'));
  if (hrElements) hrElements.forEach(hr => hr.classList.add('fade-in'));

  // Store which elements have been animated
  const animatedElements = new Set();

  // Intersection Observer for regular animations
  const regularObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // More sensitive - 30% of element visible
        const ratio = entry.intersectionRatio;
        if (ratio >= 0.3 && !animatedElements.has(entry.target)) {
          entry.target.classList.add('animate');
          animatedElements.add(entry.target);
        }
      } else {
        // When element leaves viewport completely, remove from animated set so it can re-animate
        if (entry.intersectionRatio === 0) {
          animatedElements.delete(entry.target);
          entry.target.classList.remove('animate');
        }
      }
    });
  }, {
    threshold: [0, 0.3, 0.5, 0.7, 1.0],
    rootMargin: '0px 0px -50px 0px'
  });

  // Intersection Observer for skills wave animation
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ratio = entry.intersectionRatio;
        if (ratio >= 0.3 && !animatedElements.has(entry.target)) {
          const skillItems = entry.target.querySelectorAll('.skill-item');
          skillItems.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('animate-wave');
            }, i * 150);
          });
          animatedElements.add(entry.target);
        }
      } else {
        // When skills leave viewport completely, remove animations
        if (entry.intersectionRatio === 0) {
          animatedElements.delete(entry.target);
          const skillItems = entry.target.querySelectorAll('.skill-item');
          skillItems.forEach(item => {
            item.classList.remove('animate-wave');
          });
        }
      }
    });
  }, {
    threshold: [0, 0.3, 0.5, 0.7, 1.0],
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe regular elements (excluding nav)
  const regularElements = [
    proPfp, blurb, projectsH2, slideContainer, 
    skillsH2, ...skillsH3, workSection, contactH2, 
    ...contactCards, ...hrElements
  ].filter(el => el);

  regularElements.forEach(el => regularObserver.observe(el));

  // Observe skill subgrids
  skillSubgrids.forEach(grid => skillsObserver.observe(grid));
});