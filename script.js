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

function copyEmail() {
  const email = "jameswarren012@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    alert("Email copied to clipboard! Feel free to reach out!");
  }).catch(err => {
    console.error("Failed to copy email: ", err);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ block: "start", behavior: 'smooth' });
    }
  });
});



let timeout;
document.addEventListener('mousemove', e => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const splash = document.querySelector('#splash');
    const x = (e.pageX - window.innerWidth / 2) / 50;
    const y = (e.pageY - window.innerHeight / 2) / 50;
    splash.style.transform = `translate(${x}px, ${y}px)`;
  }, 10);
});

new Typed("#typed", {
  strings: ["Software Engineer", "Problem Solver", "Machine Learning Enthusiast", "Creative Thinker"],
  typeSpeed: 60,
  backSpeed: 30,
  loop: true
});



document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".skill-subgrid .skill-item");

  // Staggered wave animation on load
  items.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add("wave-animate");
    }, i * 150); // 0.15s stagger
  });

  // After all animations complete, make sure everything is visible
  const totalTime = items.length * 150 + 1000;
  setTimeout(() => {
    items.forEach(item => {
      item.style.opacity = "1";
      item.classList.remove("wave-animate");
    });
  }, totalTime);
});