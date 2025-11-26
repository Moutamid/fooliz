(function () {
  "use strict";

  // Custom cursor implementation
  function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY + 25;
    });

    // Smooth cursor animation
    function animateCursor() {
      const speed = 1;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover states
    const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-entry, .faq-item, .faq-item h3, .faq-toggle, .team-member, .pricing-card, .scroll-top, .mobile-nav-toggle, .navmenu a, .show-more-button, .portfolio-filters li, .swiper-button-prev, .swiper-button-next, .contact-info-box, input[type="submit"], textarea, input, .feature-item, .step-item, .cta-button, .social-links a, .footer-links a, .testimonial-intro button, .accordion-button, .badge, .project-badge, .btn-view-project, .btn-next-project, .isotope-filters, .glightbox, [data-bs-toggle]');

    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });

      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });

      element.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-click');
      });

      element.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-click');
      });
    });
  }

  // Initialize custom cursor only on desktop (fine pointer & large viewport)
  function shouldUseCustomCursor() {
    return window.matchMedia('(pointer:fine)').matches && window.innerWidth >= 992;
  }
  document.addEventListener('DOMContentLoaded', () => {
    if (shouldUseCustomCursor()) {
      initCustomCursor();
    }
  });
  // Re-evaluate on resize (e.g., rotating tablet or resizing window)
  window.addEventListener('resize', () => {
    const existing = document.querySelector('.custom-cursor');
    if (shouldUseCustomCursor()) {
      if (!existing) initCustomCursor();
    } else if (existing) {
      existing.remove();
      // Restore native cursor
      document.querySelectorAll('*').forEach(el => { el.style.cursor = ''; });
    }
  });

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    // Check if this is the home page by looking for preloader-home class
    const isHomePage = preloader.querySelector('.preloader-home');
    
    if (isHomePage) {
      // Home page logic - time-based showing
      function shouldShowPreloader() {
        const now = Date.now();
        const lastShown = localStorage.getItem('preloader_last_shown');
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        // If no previous record or more than 1 hour has passed, show preloader
        if (!lastShown || (now - parseInt(lastShown)) > oneHour) {
          localStorage.setItem('preloader_last_shown', now.toString());
          return true;
        }
        
        return false;
      }

      // Only show preloader if enough time has passed
      if (shouldShowPreloader()) {
        const startTime = Date.now();
        const minDisplayTime = 7000; // 7 seconds minimum display time

        window.addEventListener('load', () => {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

          setTimeout(() => {
            preloader.remove();
          }, remainingTime);
        });
      } else {
        // Hide preloader immediately if not enough time has passed
        preloader.style.display = 'none';
        preloader.remove();
      }
    } else {
      // Portfolio or other pages - always show preloader
      const startTime = Date.now();
      const minDisplayTime = 3000; // 3 seconds for portfolio pages

      window.addEventListener('load', () => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        setTimeout(() => {
          preloader.remove();
        }, remainingTime);
      });
    }
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  let currentFilter = '*'; // Track current filter globally
  let showMoreState = { expanded: false }; // Track show more state globally
  let isotopeInstance = null; // Store isotope instance globally

  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: function (itemElem) {
          // Custom filter function that respects both isotope filters and hidden state
          const item = itemElem;
          const hasHiddenClass = item.classList.contains('hidden');


          // If item has hidden class and show more is not expanded, hide it
          if (hasHiddenClass && !showMoreState.expanded) {
            return false;
          }

          // If show more is expanded but item doesn't match current filter, check filter
          if (currentFilter === '*') {
            return true;
          } else {
            const filterClass = currentFilter.replace('.', '');
            const matchesFilter = item.classList.contains(filterClass);

            // If it's a hidden item, only show if it matches the current filter
            if (hasHiddenClass) {
              return matchesFilter;
            }

            return matchesFilter;
          }
        },
        sortBy: sort
      });

      isotopeInstance = initIsotope; // Store reference globally
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');

        // Update current filter
        currentFilter = this.getAttribute('data-filter');

        // Reset show more state when filter changes
        resetShowMoreState();

        // Re-arrange with custom filter
        initIsotope.arrange();

        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });


  /**
   * Show More Button Functionality
   */
  function resetShowMoreState() {
    const ShowMoreBtn = document.querySelector('.show-more-button');

    if (ShowMoreBtn) {
      // Reset button state
      ShowMoreBtn.innerText = "show more";
      showMoreState.expanded = false;

      // Re-arrange isotope to apply the new filter state
      if (isotopeInstance) {
        setTimeout(() => {
          isotopeInstance.arrange();
        }, 100);
      }
    }
  }

  const HiddenItems = Array.from(document.getElementsByClassName("hidden"));
  let ShowMoreBtn = document.querySelector('.show-more-button');

  if (ShowMoreBtn && HiddenItems.length > 0) {
    HiddenItems.forEach((item, index) => {
    });

    ShowMoreBtn.addEventListener('click', () => {

      // Toggle the expanded state
      showMoreState.expanded = !showMoreState.expanded;

      // Update button text
      ShowMoreBtn.innerText = showMoreState.expanded ? "show less" : "show more";


      // Re-arrange isotope with the new show more state
      if (isotopeInstance) {
        setTimeout(() => {
          isotopeInstance.arrange();
        }, 100);
      } else {
      }

    });
  } else {
  }

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Portfolio linking (index and other listing pages) and dynamic hydration (detail page)
(function () {
  // Attach dataset from portfolio links and append URL params for shareability
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href$="portfolio-item.html"]').forEach(a => {
      a.addEventListener('click', function () {
        const ds = a.dataset || {};
        const title = ds.title;
        const hero = ds.hero;
        const longImg = ds.long;
        const live = ds.live;

        if (!title && !hero && !longImg && !live) return;

        // Persist to sessionStorage as a fallback
        if (title) sessionStorage.setItem('pf_title', title);
        if (hero) sessionStorage.setItem('pf_hero', hero);
        if (longImg) sessionStorage.setItem('pf_long', longImg);
        if (live) sessionStorage.setItem('pf_live', live);

        // Append params for shareability
        try {
          const url = new URL(a.href, window.location.origin);
          if (title) url.searchParams.set('title', title);
          if (hero) url.searchParams.set('hero', hero);
          if (longImg) url.searchParams.set('long', longImg);
          if (live) url.searchParams.set('live', live);
          a.href = url.toString();
        } catch (err) {
          // Ignore; sessionStorage still allows hydration on same-session navigation
        }
      }, { passive: true });
    });
  });

  // Hydrate portfolio details page from URL or sessionStorage
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('portfolio-details-page')) return;

    function getParam(name) {
      try {
        const u = new URL(window.location.href);
        return u.searchParams.get(name);
      } catch (_) {
        return null;
      }
    }

    const title = getParam('title') || sessionStorage.getItem('pf_title');
    const hero = getParam('hero') || sessionStorage.getItem('pf_hero');
    const longImg = getParam('long') || sessionStorage.getItem('pf_long');
    const live = getParam('live') || sessionStorage.getItem('pf_live');

    if (title) {
      const t = document.getElementById('portfolio-title');
      if (t) t.textContent = title;
    }
    if (hero) {
      const h = document.getElementById('portfolio-hero');
      if (h) h.src = hero;
    }
    if (longImg) {
      const l = document.getElementById('portfolio-long');
      if (l) l.src = longImg;
    }
    
    // Handle the live link button visibility
    const liveButton = document.getElementById('portfolio-live-link');
    if (liveButton) {
      
      // Check if live link exists and is not empty
      if (live && live.trim() !== '' && live !== '""' && live !== "''") {
        // Show button and set the href
        liveButton.classList.remove('portfolio-button-hidden');
        liveButton.style.cssText = 'display: block !important; visibility: visible !important;';
        liveButton.href = live.startsWith('http') ? live : ('https://' + live);
      } else {
        // Hide button if no valid link
        liveButton.classList.add('portfolio-button-hidden');
        liveButton.style.cssText = 'display: none !important; visibility: hidden !important;';
      }
    } else {
    }
  });
})();

// Plan selector functionality
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Get all Choose Plan buttons
    const planButtons = document.querySelectorAll('.btn-plan[data-plan]');
    const planSelector = document.getElementById('plan-selector');

    planButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get the plan type from data attribute
        const planType = this.getAttribute('data-plan');
        
        // Set the dropdown value
        if (planSelector && planType) {
          planSelector.value = planType;
          
          // Add a visual indicator that the selection was made
          planSelector.style.borderColor = 'var(--accent-color)';
          setTimeout(() => {
            planSelector.style.borderColor = '';
          }, 2000);
        }
        
        // Scroll to contact form instead of contact section
        const contactForm = document.querySelector('.form-container-overlap');
        if (contactForm) {
          const headerHeight = document.querySelector('#header')?.offsetHeight || 0;
          const targetPosition = contactForm.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  });
})();

// Budget Range Slider functionality
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const budgetMin = document.getElementById('budget-min');
    const budgetMax = document.getElementById('budget-max');
    const budgetMinValue = document.querySelector('.budget-min-value');
    const budgetMaxValue = document.querySelector('.budget-max-value');
    const sliderRange = document.querySelector('.slider-range');
    const budgetRangeInput = document.getElementById('budget-range-input');

    if (!budgetMin || !budgetMax || !budgetMinValue || !budgetMaxValue || !sliderRange || !budgetRangeInput) {
      return; // Exit if elements don't exist
    }

    // Convert slider value to budget amount
    function sliderToBudget(value) {
      const numValue = parseInt(value);
      if (numValue >= 100) return 100000; // 100K+
      return numValue * 1000; // Convert to thousands
    }

    // Format budget for display
    function formatBudgetDisplay(value) {
      const numValue = parseInt(value);
      if (numValue >= 100) return '$100K+';
      return `$${numValue}K`;
    }

    // Update slider range visual
    function updateSliderRange() {
      const minVal = parseInt(budgetMin.value);
      const maxVal = parseInt(budgetMax.value);
      const minPercent = ((minVal - 5) / (100 - 5)) * 100;
      const maxPercent = ((maxVal - 5) / (100 - 5)) * 100;
      
      sliderRange.style.left = `${minPercent}%`;
      sliderRange.style.width = `${maxPercent - minPercent}%`;
    }

    // Update budget values and hidden input
    function updateBudgetValues() {
      const minVal = parseInt(budgetMin.value);
      const maxVal = parseInt(budgetMax.value);
      
      // Ensure min is always less than max
      if (minVal >= maxVal) {
        if (budgetMin === document.activeElement) {
          budgetMax.value = minVal + 1;
        } else {
          budgetMin.value = maxVal - 1;
        }
      }
      
      const finalMinVal = parseInt(budgetMin.value);
      const finalMaxVal = parseInt(budgetMax.value);
      
      // Update display values
      budgetMinValue.textContent = formatBudgetDisplay(finalMinVal);
      budgetMaxValue.textContent = formatBudgetDisplay(finalMaxVal);
      
      // Update hidden input for form submission
      const minBudget = sliderToBudget(finalMinVal);
      const maxBudget = sliderToBudget(finalMaxVal);
      budgetRangeInput.value = `${minBudget}-${maxBudget}`;
      
      // Update slider range visual
      updateSliderRange();
    }

    // Add event listeners
    budgetMin.addEventListener('input', updateBudgetValues);
    budgetMax.addEventListener('input', updateBudgetValues);

    // Initialize the slider
    updateBudgetValues();
  });
})();

// Budget Range Slider functionality
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const budgetMin = document.getElementById('budget-min');
    const budgetMax = document.getElementById('budget-max');
    const budgetMinValue = document.querySelector('.budget-min-value');
    const budgetMaxValue = document.querySelector('.budget-max-value');
    const sliderRange = document.querySelector('.slider-range');
    const budgetRangeInput = document.getElementById('budget-range-input');

    if (!budgetMin || !budgetMax || !budgetMinValue || !budgetMaxValue || !sliderRange || !budgetRangeInput) {
      return; // Exit if elements don't exist
    }

    // Convert slider value to budget amount
    function sliderToBudget(value) {
      const numValue = parseInt(value);
      if (numValue >= 100) return 100000; // 100K+
      return numValue * 1000; // Convert to thousands
    }

    // Format budget for display
    function formatBudgetDisplay(value) {
      const numValue = parseInt(value);
      if (numValue >= 100) return '$100K+';
      return `$${numValue}K`;
    }

    // Update slider range visual
    function updateSliderRange() {
      const minVal = parseInt(budgetMin.value);
      const maxVal = parseInt(budgetMax.value);
      const minPercent = ((minVal - 5) / (100 - 5)) * 100;
      const maxPercent = ((maxVal - 5) / (100 - 5)) * 100;
      
      sliderRange.style.left = `${minPercent}%`;
      sliderRange.style.width = `${maxPercent - minPercent}%`;
    }

    // Update budget values and hidden input
    function updateBudgetValues() {
      const minVal = parseInt(budgetMin.value);
      const maxVal = parseInt(budgetMax.value);
      
      // Ensure min is always less than max
      if (minVal >= maxVal) {
        if (budgetMin === document.activeElement) {
          budgetMax.value = minVal + 1;
        } else {
          budgetMin.value = maxVal - 1;
        }
      }
      
      const finalMinVal = parseInt(budgetMin.value);
      const finalMaxVal = parseInt(budgetMax.value);
      
      // Update display values
      budgetMinValue.textContent = formatBudgetDisplay(finalMinVal);
      budgetMaxValue.textContent = formatBudgetDisplay(finalMaxVal);
      
      // Update hidden input for form submission
      const minBudget = sliderToBudget(finalMinVal);
      const maxBudget = sliderToBudget(finalMaxVal);
      budgetRangeInput.value = `${minBudget}-${maxBudget}`;
      
      // Update slider range visual
      updateSliderRange();
    }

    // Add event listeners
    budgetMin.addEventListener('input', updateBudgetValues);
    budgetMax.addEventListener('input', updateBudgetValues);

    // Initialize the slider
    updateBudgetValues();
  });
})();