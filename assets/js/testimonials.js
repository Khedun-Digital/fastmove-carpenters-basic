// Testimonials rotator
const TestimonialsManager = {
  currentIndex: 0,
  quotes: [],
  autoRotateTimer: null,
  
  init() {
    this.setupTestimonials();
  },
  
  setupTestimonials() {
    const container = Utils.$('#testimonials');
    if (!container) return;
    
    this.quotes = Array.from(container.querySelectorAll('blockquote'));
    
    if (this.quotes.length === 0) return;
    
    this.setupControls();
    this.show(this.currentIndex);
    this.startAutoRotate();
    
    Utils.log(`Testimonials initialized with ${this.quotes.length} quotes`);
  },
  
  setupControls() {
    const prevBtn = Utils.$('#prevTest');
    const nextBtn = Utils.$('#nextTest');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.previous();
        this.resetAutoRotate();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoRotate();
      });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('#testimonials')) {
        if (e.key === 'ArrowLeft') {
          this.previous();
          this.resetAutoRotate();
        } else if (e.key === 'ArrowRight') {
          this.next();
          this.resetAutoRotate();
        }
      }
    });
  },
  
  show(index) {
    this.quotes.forEach((quote, i) => {
      quote.style.display = i === index ? 'block' : 'none';
    });
    
    // Update ARIA attributes for accessibility
    this.quotes.forEach((quote, i) => {
      quote.setAttribute('aria-hidden', i !== index);
    });
  },
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
    this.show(this.currentIndex);
    Utils.log(`Testimonial advanced to index ${this.currentIndex}`);
  },
  
  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.quotes.length) % this.quotes.length;
    this.show(this.currentIndex);
    Utils.log(`Testimonial moved back to index ${this.currentIndex}`);
  },
  
  startAutoRotate() {
    if (this.quotes.length <= 1) return;
    
    this.autoRotateTimer = setInterval(() => {
      this.next();
    }, window.CONFIG.animations.testimonialRotateInterval);
  },
  
  stopAutoRotate() {
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
      this.autoRotateTimer = null;
    }
  },
  
  resetAutoRotate() {
    this.stopAutoRotate();
    this.startAutoRotate();
  }
};

// Export for use in main app
window.TestimonialsManager = TestimonialsManager;
