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
      // Enhanced mobile menu toggle
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = mainNav.classList.contains('open');
        
        if (isOpen) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu();
        }
      });
      
      // Close menu when clicking on overlay or close button
      mainNav.addEventListener('click', (e) => {
        // Close if clicking on the overlay (not on menu items)
        if (e.target === mainNav || e.target.matches('#mainNav ul')) {
          this.closeMobileMenu();
        }
      });
      
      // Close menu when clicking on close button (CSS pseudo-element)
      document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('open') && 
            e.clientX > window.innerWidth - 64 && 
            e.clientY < 64) {
          this.closeMobileMenu();
        }
      });
      
      // Close menu when pressing Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
          this.closeMobileMenu();
          menuBtn.focus();
        }
      });
      
      // Close menu on orientation change
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          if (mainNav.classList.contains('open')) {
            this.closeMobileMenu();
          }
        }, 100);
      });
      
      // Close menu on resize to desktop
      window.addEventListener('resize', Utils.debounce(() => {
        if (window.innerWidth > 900 && mainNav.classList.contains('open')) {
          this.closeMobileMenu();
        }
      }, 250));
    }
  },
  
  openMobileMenu() {
    const menuBtn = Utils.$('#menuBtn');
    const mainNav = Utils.$('#mainNav');
    
    if (menuBtn && mainNav) {
      mainNav.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.textContent = 'Close';
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus first menu item for keyboard navigation
      setTimeout(() => {
        const firstLink = mainNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }, 300);
      
      Utils.log('Mobile menu opened');
    }
  },
  
  closeMobileMenu() {
    const menuBtn = Utils.$('#menuBtn');
    const mainNav = Utils.$('#mainNav');
    
    if (menuBtn && mainNav) {
      mainNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = 'Menu';
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      Utils.log('Mobile menu closed');
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
          
          // Close mobile menu first if open
          const mainNav = Utils.$('#mainNav');
          if (mainNav && mainNav.classList.contains('open')) {
            this.closeMobileMenu();
            
            // Delay scroll to allow menu close animation
            setTimeout(() => {
              Utils.scrollTo(target, window.CONFIG.animations.smoothScrollOffset);
            }, 300);
          } else {
            Utils.scrollTo(target, window.CONFIG.animations.smoothScrollOffset);
          }
        }
      });
    });
  }
};

// Export for use in main app
window.Navigation = Navigation;
