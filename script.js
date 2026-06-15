/* ===================================================
   九重（ここのえ）手打ちそば・うどん
   JavaScript - Interactions & Animations
   =================================================== */

(function () {
  'use strict';

  /* ===== Header Scroll Effect ===== */
  const header = document.getElementById('site-header');

  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Page Top Button
    const pageTop = document.getElementById('page-top-btn');
    if (pageTop) {
      if (window.scrollY > 400) {
        pageTop.classList.add('visible');
      } else {
        pageTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  /* ===== Hamburger Menu ===== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const globalNav    = document.getElementById('global-nav');

  if (hamburgerBtn && globalNav) {
    hamburgerBtn.addEventListener('click', function () {
      const isOpen = globalNav.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    globalNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        globalNav.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (
        globalNav.classList.contains('open') &&
        !globalNav.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        globalNav.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ===== Scroll Reveal Animation ===== */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // only trigger once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ===== Active Nav Link on Scroll ===== */
  const sections = document.querySelectorAll('section[id], div[id="top"]');
  const navLinks = document.querySelectorAll('.global-nav a');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            link.style.color = '';
            link.style.background = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--clr-primary)';
            }
          });
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  document.querySelectorAll('section[id]').forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ===== Smooth Scroll Polyfill for anchor links ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ===== Reveal sections on load ===== */
  // Add reveal class to main content sections dynamically
  const sectionsToReveal = [
    '.concept-section .section-header',
    '.feature-main',
    '.feature-sub-card',
    '.gallery-section .section-header',
    '.gallery-item',
    '.info-section .section-header',
    '.info-table-wrap',
    '.info-cta',
    '.access-section .section-header',
    '.map-wrap',
    '.access-info',
  ];

  sectionsToReveal.forEach(function (selector, sectionIdx) {
    document.querySelectorAll(selector).forEach(function (el, idx) {
      el.classList.add('reveal');
      if (idx === 1) el.classList.add('reveal-delay-1');
      if (idx === 2) el.classList.add('reveal-delay-2');
      if (idx === 3) el.classList.add('reveal-delay-3');
      revealObserver.observe(el);
    });
  });

  /* ===== Image Slider (5 Seconds Interval) ===== */
  const sliders = document.querySelectorAll('.slider-container');

  sliders.forEach(function (slider) {
    const wrapper = slider.querySelector('.slider-wrapper');
    const images = wrapper.querySelectorAll('img');
    const imageCount = images.length;
    
    if (imageCount <= 1) return; // 画像が1枚以下の場合は何もしない

    let currentIndex = 0;

    setInterval(function () {
      currentIndex = (currentIndex + 1) % imageCount;
      // スライドさせる (1枚あたり50%移動)
      wrapper.style.transform = 'translateX(-' + (currentIndex * (100 / imageCount)) + '%)';
    }, 5000);
  });

})();
