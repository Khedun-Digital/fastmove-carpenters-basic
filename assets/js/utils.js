// Utility functions
const Utils = {
  // DOM helpers
  $: (selector) => document.querySelector(selector),
  $$: (selector) => document.querySelectorAll(selector),
  
  // Wait for DOM to be ready
  ready: (callback) => {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  },
  
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Smooth scroll to element
  scrollTo: (element, offset = 0) => {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  },
  
  // Format phone number for href
  formatPhoneHref: (phone) => {
    return phone.replace(/[^+\d]/g, '');
  },
  
  // Simple logging with namespace
  log: (message, type = 'info') => {
    if (window.CONFIG?.analytics?.enabled) {
      console.log(`[FastMove] ${type.toUpperCase()}: ${message}`);
    }
  }
};

// Export for use in other modules
window.Utils = Utils;
