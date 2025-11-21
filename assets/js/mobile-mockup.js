// Mobile Mockup Scroll Lock Controller
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const mockupSection = document.getElementById('mobile-mockup');
    const screenshotsContainer = document.querySelector('.screenshots-container');
    const screenshots = document.querySelectorAll('.screenshot');
    const progressFill = document.querySelector('.progress-fill');
    const progressHint = document.querySelector('.progress-hint');
    
    if (!mockupSection || !screenshotsContainer || screenshots.length === 0) {
      return; // Exit if elements don't exist
    }

    let currentScreenIndex = 0;
    let isScrollLocked = false;
    let isScrolling = false;
    let scrollTimeout;
    let hasEnteredSection = false;
    let lastScrollY = window.pageYOffset;
    
    const totalScreens = screenshots.length;
    const maxIndex = totalScreens - 1;

    console.log('Mobile mockup script initialized with', totalScreens, 'screenshots');

    // Update active screenshot and progress
    function updateActiveScreen(index) {
      // Remove active class from all
      screenshots.forEach(screen => screen.classList.remove('active'));
      
      // Add active class to current
      if (screenshots[index]) {
        screenshots[index].classList.add('active');
      }
      
      // Transform the container
      const translateX = -(index * 20); // 20% per screen (100% / 5 screens)
      screenshotsContainer.style.transform = `translateX(${translateX}%)`;
      
      // Update progress hint
      if (progressHint) {
        if (index === 0) {
          progressHint.textContent = 'Scroll to explore the app';
        } else if (index === maxIndex) {
          progressHint.textContent = 'Scroll to continue';
        } else {
          progressHint.textContent = 'Keep scrolling to explore';
        }
      }
      
      console.log('Updated to screen', index + 1, 'of', totalScreens);
    }

    // Lock/unlock page scrolling
    function lockScroll() {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      isScrollLocked = true;
      
      // Reset to first screenshot instantly (no animation) if not already there
      if (currentScreenIndex !== 0) {
        currentScreenIndex = 0;
        // Disable transitions temporarily
        screenshotsContainer.style.transition = 'none';
        updateActiveScreen(0);
        // Re-enable transitions after update
        setTimeout(() => {
          screenshotsContainer.style.transition = '';
        }, 50);
      }
      
      console.log('🔒 Scroll locked');
    }

    function unlockScroll() {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      isScrollLocked = false;
      hasEnteredSection = false;
      lastUnlockTime = Date.now(); // Track when we unlocked
      console.log('🔓 Scroll unlocked');
      
      // Don't reset screen index - keep current position
    }

    // Check if mockup section is fully visible and should lock
    function shouldLockScroll() {
      const rect = mockupSection.getBoundingClientRect();
      // Lock when section is mostly visible (90% or more)
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const sectionHeight = rect.height;
      const visibilityRatio = visibleHeight / sectionHeight;
      return visibilityRatio >= 0.9; // Lock when 90% or more is visible
    }

    // Check if we're approaching the mockup section
    function isApproachingMockup() {
      const rect = mockupSection.getBoundingClientRect();
      // More generous threshold - when section is visible in viewport
      return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2;
    }

    // Handle scroll events with section detection and locking
    function handleWheel(event) {
      const currentScrollY = window.pageYOffset;
      const scrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;
      
      const shouldLock = shouldLockScroll();
      const approaching = isApproachingMockup();
      const rect = mockupSection.getBoundingClientRect();
      
      console.log('Wheel event - scrollingDown:', scrollingDown, 'shouldLock:', shouldLock, 'approaching:', approaching);
      
      // Mark that user has scrolled (not auto-scroll)
      if (!userHasScrolledToSection && window.pageYOffset > 50) {
        userHasScrolledToSection = true;
      }
      
      // Lock ONLY when scrolling DOWN and section is mostly visible
      if (approaching && shouldLock && !isScrollLocked && userHasScrolledToSection && scrollingDown) {
        const timeSinceUnlock = Date.now() - lastUnlockTime;
        if (timeSinceUnlock > 1000) { // Wait at least 1 second after unlock
          console.log('🔒 LOCKING SCROLL - Scrolling down to section (90%)');
          event.preventDefault();
          lockScroll();
          hasEnteredSection = true;
          return false;
        }
      }
      
      // If scroll is locked, handle screenshot navigation
      if (isScrollLocked) {
        event.preventDefault();
        
        if (isScrolling) {
          console.log('Already scrolling, ignoring event');
          return false;
        }
        
        const delta = event.deltaY;
        let newIndex = currentScreenIndex;
        
        console.log('🎮 Handling locked scroll - delta:', delta, 'current index:', currentScreenIndex);
        
        // Determine scroll direction and update index
        if (delta > 0) {
          // Scrolling down - move to next screen
          if (currentScreenIndex < maxIndex) {
            newIndex = currentScreenIndex + 1;
            console.log('➡️ Moving to next screen:', newIndex);
          } else {
            // At last screen, unlock scroll and continue naturally
            console.log('🔓 At last screen, unlocking and continuing naturally');
            unlockScroll();
            // Don't prevent the event, let natural scrolling continue
            // This allows the user's scroll momentum to naturally move to the next section
          }
        } else if (delta < 0) {
          // Scrolling up - move to previous screen
          if (currentScreenIndex > 0) {
            newIndex = currentScreenIndex - 1;
            console.log('⬅️ Moving to previous screen:', newIndex);
          } else {
            // At first screen, unlock scroll and allow going back naturally
            console.log('🔓 At first screen, unlocking and going back naturally');
            unlockScroll();
            // Don't prevent the event, let natural scrolling continue
            // This allows the user's scroll momentum to naturally move to the previous section
          }
        }
        
        // Update screen if index changed
        if (newIndex !== currentScreenIndex) {
          currentScreenIndex = newIndex;
          updateActiveScreen(currentScreenIndex);
          
          // Prevent rapid scrolling
          isScrolling = true;
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 600); // Match transition duration
        }
        
        return false;
      }
      
      // If we're not in the section anymore and scroll was locked, unlock but keep position
      if (!approaching && isScrollLocked) {
        console.log('🔓 Left section area, unlocking scroll');
        unlockScroll();
      }
    }

    // Add wheel event listener with proper prevention
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    // Enhanced scroll position monitoring
    let checkInterval;
    let lastUnlockTime = 0;
    let userHasScrolledToSection = false;
    
    function startSectionMonitoring() {
      checkInterval = setInterval(() => {
        const currentScrollY = window.pageYOffset;
        const scrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
        
        const rect = mockupSection.getBoundingClientRect();
        const approaching = isApproachingMockup();
        const shouldLock = shouldLockScroll();
        const timeSinceUnlock = Date.now() - lastUnlockTime;
        
        // Force lock ONLY when scrolling down and conditions are met
        if (approaching && shouldLock && !isScrollLocked && userHasScrolledToSection && scrollingDown && timeSinceUnlock > 2000) {
          console.log('🔒 FORCED LOCK via interval check - scrolling down to section');
          lockScroll();
        }
        
        // Track if user has scrolled close to this section
        if (!userHasScrolledToSection && rect.top <= window.innerHeight * 0.7) {
          // Only set this flag if the user has actually scrolled (not on initial page load)
          if (window.pageYOffset > 150) { // User has scrolled at least 150px
            userHasScrolledToSection = true;
            console.log('📍 User has scrolled near mockup section');
          }
        }
      }, 100); // Check every 100ms
    }
    
    function stopSectionMonitoring() {
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
    }
    
    // Start monitoring immediately
    startSectionMonitoring();
    
    // Also handle scroll events for browsers that might not support wheel properly
    let lastScrollTime = 0;
    function handleScroll(event) {
      const now = Date.now();
      if (now - lastScrollTime < 50) return; // Throttle scroll events
      lastScrollTime = now;
      
      if (isScrollLocked) {
        event.preventDefault();
        window.scrollTo(0, mockupSection.offsetTop);
        return false;
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: false });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    if (mockupSection) {
      mockupSection.addEventListener('touchstart', (e) => {
        if (!isScrollLocked) return;
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
      }, { passive: true });

      mockupSection.addEventListener('touchend', (e) => {
        if (!isScrollLocked) return;
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 50;

      // Check if vertical swipe is more significant than horizontal
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
        let newIndex = currentScreenIndex;
        
        if (deltaY < 0) {
          // Swipe up - next screen
          if (currentScreenIndex < maxIndex) {
            newIndex = currentScreenIndex + 1;
          } else {
            // At last screen, unlock scroll and continue naturally (like mouse scroll)
            console.log('🔓 At last screen (touch), unlocking and continuing naturally');
            unlockScroll();
            return;
          }
        } else {
          // Swipe down - previous screen
          if (currentScreenIndex > 0) {
            newIndex = currentScreenIndex - 1;
          } else {
            // At first screen, unlock scroll and allow going back naturally (like mouse scroll)
            console.log('🔓 At first screen (touch), unlocking and going back naturally');
            unlockScroll();
            return;
          }
        }
        
        if (newIndex !== currentScreenIndex) {
          currentScreenIndex = newIndex;
          updateActiveScreen(currentScreenIndex);
          console.log('Touch swipe to screen', currentScreenIndex);
        }
      }
    }

    // Keyboard support
    function handleKeyDown(event) {
      if (!isScrollLocked) return;
      
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        if (currentScreenIndex < maxIndex) {
          currentScreenIndex++;
          updateActiveScreen(currentScreenIndex);
          console.log('Keyboard navigation to screen', currentScreenIndex);
        }
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (currentScreenIndex > 0) {
          currentScreenIndex--;
          updateActiveScreen(currentScreenIndex);
          console.log('Keyboard navigation to screen', currentScreenIndex);
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    // Initialize first screen
    updateActiveScreen(0);
    
    // Reset scroll lock on page unload
    window.addEventListener('beforeunload', () => {
      if (isScrollLocked) {
        unlockScroll();
      }
      stopSectionMonitoring();
    });
    
    // Cleanup on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopSectionMonitoring();
      } else {
        startSectionMonitoring();
      }
    });
    
    console.log('Mobile mockup controller fully initialized');
  });
})();