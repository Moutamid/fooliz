// Mobile Mockup Scroll Controller
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const screenshotsContainer = document.querySelector('.screenshots-container');
    const screenshots = document.querySelectorAll('.screenshot');
    
    if (!screenshotsContainer || screenshots.length === 0) {
      return; // Exit if elements don't exist
    }

    let currentScreenIndex = 0;
    let isScrolling = false;
    let scrollTimeout;
    
    const totalScreens = screenshots.length;
    const maxIndex = totalScreens - 1;

    // Update active screenshot
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
    }

    // Handle scroll events anywhere on the page
    function handleScroll(event) {
      if (isScrolling) return;
      
      const delta = event.deltaY;
      let newIndex = currentScreenIndex;
      
      // Determine scroll direction and update index
      if (delta > 0) {
        // Scrolling down - move to next screen
        newIndex = Math.min(currentScreenIndex + 1, maxIndex);
      } else if (delta < 0) {
        // Scrolling up - move to previous screen
        newIndex = Math.max(currentScreenIndex - 1, 0);
      }
      
      // Only update if index changed
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
    }

    // Add wheel event listener to the entire document
    document.addEventListener('wheel', handleScroll, { passive: true });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const mobileFrame = document.querySelector('.mobile-frame');
    if (mobileFrame) {
      mobileFrame.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
      }, { passive: true });

      mobileFrame.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 50;

      // Check if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        let newIndex = currentScreenIndex;
        
        if (deltaX > 0) {
          // Swipe right - previous screen
          newIndex = Math.max(currentScreenIndex - 1, 0);
        } else {
          // Swipe left - next screen
          newIndex = Math.min(currentScreenIndex + 1, maxIndex);
        }
        
        if (newIndex !== currentScreenIndex) {
          currentScreenIndex = newIndex;
          updateActiveScreen(currentScreenIndex);
        }
      }
    }

    // Initialize first screen
    updateActiveScreen(0);
  });
})();