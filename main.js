import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Navigation setup for smooth scroll
  const navLinks = document.querySelectorAll('.nav-links a, .btn, .logo');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Mobile Menu Toggle logic (clean via CSS class)
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navContainer = document.querySelector('.nav-links');
  
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navContainer.classList.toggle('active');
    });
  }

  // Also close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (navContainer && navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
      }
      
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ==== Intersection Observer for Section Transitions (4 transitions) ====
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the section is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Add 'show' class when section enters viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Once shown, we can unobserve if we want it to animate only once
        // observer.unobserve(entry.target);
      } else {
        // Optional: Remove class when exiting to animate again on rescorll
        // entry.target.classList.remove('show');
      }
    });
  }, observerOptions);

  // Observe all elements that have transition classes
  const transitionSelectors = [
    '.slide-transition',
    '.fade-transition',
    '.scale-transition',
    '.slide-up-transition'
  ];

  transitionSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));
  });

  // ==== Draggable Gallery ====
  const slider = document.querySelector('.gallery-grid');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.scrollSnapType = 'none'; // Smooth dragging
    });
    
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
      slider.style.scrollSnapType = 'x mandatory';
    });
    
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
      slider.style.scrollSnapType = 'x mandatory';
    });
    
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll fast multiplier
      slider.scrollLeft = scrollLeft - walk;
    });
  }
});
