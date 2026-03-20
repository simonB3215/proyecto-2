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

  // ==== Carousels (Draggable & Buttons) ====
  const carousels = document.querySelectorAll('.carousel-wrapper');
  
  carousels.forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.prev');
    const nextBtn = wrapper.querySelector('.next');
    
    if (!track) return;

    // --- Button Navigation ---
    const getScrollAmount = () => {
      const firstChild = track.children[0];
      return firstChild ? firstChild.offsetWidth + parseFloat(getComputedStyle(track).gap || 0) : 300;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
    }

    // --- Drag Navigation ---
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.scrollSnapType = 'none'; // Smooth dragging
    });
    
    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
      track.style.scrollSnapType = 'x mandatory';
    });
    
    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
      track.style.scrollSnapType = 'x mandatory';
    });
    
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 2; 
      track.scrollLeft = scrollLeft - walk;
    });
  });
});
