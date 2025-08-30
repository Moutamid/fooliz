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

  // Initialize custom cursor when page loads
  document.addEventListener('DOMContentLoaded', initCustomCursor);

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
  // const preloader = document.querySelector('#preloader');
  // if (preloader) {
  //   window.addEventListener('load', () => {
  //     preloader.remove();
  //   });
  // }

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const startTime = Date.now();
    const minDisplayTime = 4250; // 4 seconds minimum display time
    // const minDisplayTime = 9000; // 4 seconds minimum display time

    window.addEventListener('load', () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        preloader.remove();
      }, remainingTime);
    });
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

          console.log('Filtering item:', item.className, 'hasHidden:', hasHiddenClass, 'showMore:', showMoreState.expanded, 'currentFilter:', currentFilter);

          // If item has hidden class and show more is not expanded, hide it
          if (hasHiddenClass && !showMoreState.expanded) {
            console.log('Hiding hidden item because showMore is false');
            return false;
          }

          // If show more is expanded but item doesn't match current filter, check filter
          if (currentFilter === '*') {
            console.log('Showing item - filter is *');
            return true;
          } else {
            const filterClass = currentFilter.replace('.', '');
            const matchesFilter = item.classList.contains(filterClass);

            // If it's a hidden item, only show if it matches the current filter
            if (hasHiddenClass) {
              console.log('Hidden item filter check:', matchesFilter, 'for filter:', filterClass);
              return matchesFilter;
            }

            console.log('Regular item filter check:', matchesFilter, 'for filter:', filterClass);
            return matchesFilter;
          }
        },
        sortBy: sort
      });

      isotopeInstance = initIsotope; // Store reference globally
      console.log('Isotope initialized');
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');

        // Update current filter
        currentFilter = this.getAttribute('data-filter');
        console.log('Filter changed to:', currentFilter);

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
      console.log('Show More state reset due to filter change');

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
    console.log('Found', HiddenItems.length, 'hidden items'); // Debug log
    HiddenItems.forEach((item, index) => {
      console.log(`Hidden item ${index}: classes =`, item.className); // Debug log
    });

    ShowMoreBtn.addEventListener('click', () => {
      console.log('Button clicked, current filter:', currentFilter, 'expanded state:', showMoreState.expanded); // Debug log

      // Toggle the expanded state
      showMoreState.expanded = !showMoreState.expanded;

      // Update button text
      ShowMoreBtn.innerText = showMoreState.expanded ? "show less" : "show more";

      console.log('Show more state changed to:', showMoreState.expanded);

      // Re-arrange isotope with the new show more state
      if (isotopeInstance) {
        console.log('About to rearrange isotope...');
        setTimeout(() => {
          console.log('Calling isotope arrange...');
          isotopeInstance.arrange();
          console.log('Isotope arrange called');
        }, 100);
      } else {
        console.log('Isotope instance not available');
      }

      console.log('Button click handler completed');
    });
  } else {
    console.log('Show More button not found or no hidden items'); // Debug log
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