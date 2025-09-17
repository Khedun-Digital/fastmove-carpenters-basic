// Configuration and constants
const CONFIG = {
  // Contact information (read from data attributes)
  contact: {
    phone: document.documentElement.dataset.phone || '+27-82-000-0000',
    whatsappE164: document.documentElement.dataset.whatsappE164 || '27820000000'
  },
  
  // Form endpoints (to be configured later)
  forms: {
    contact: null, // Add your contact form endpoint here
    quote: null    // Add your quote form endpoint here
  },
  
  // Animation settings
  animations: {
    testimonialRotateInterval: 5000, // Auto-rotate testimonials every 5 seconds
    smoothScrollOffset: 80 // Offset for smooth scroll to account for sticky header
  },
  
  // Analytics events
  analytics: {
    enabled: true,
    events: {
      navQuote: 'nav_quote',
      heroQuote: 'hero_quote',
      heroWhatsapp: 'hero_whatsapp'
    }
  }
};

// Export for use in other modules
window.CONFIG = CONFIG;
