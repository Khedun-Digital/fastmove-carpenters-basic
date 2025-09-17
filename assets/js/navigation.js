// Navigation and mobile menu management
const Navigation = {
  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
  },
  
  setupMobileMenu() {
    const menuBtn = Utils.$('#menuBtn');
    const mainNav = Utils.$('#mainNav');
    
    if (menuBtn && mainNav) {
      menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        
        // Update aria-expanded for accessibility
        const isOpen = mainNav.classList.contains('open');
        menuBtn.setAttribute('aria-expanded', isOpen);
        
        Utils.log(`Mobile menu ${isOpen ? 'opened' : 'closed'}`);
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !menuBtn.contains(e.target)) {
          mainNav.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Close menu when pressing Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.focus();
        }
      });
    }
  },
  
  setupSmoothScroll() {
    // Handle anchor links for smooth scrolling
    Utils.$$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href === '#') return;
        
        const target = Utils.$(href);
        if (target) {
          e.preventDefault();
          Utils.scrollTo(target, window.CONFIG.animations.smoothScrollOffset);
          
          // Close mobile menu if open
          const mainNav = Utils.$('#mainNav');
          if (mainNav && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            Utils.$('#menuBtn')?.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }
};

// Export for use in main app
window.Navigation = Navigation;
