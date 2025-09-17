// Mobile performance optimizations
const Performance = {
  init() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupPreconnects();
    this.setupServiceWorker();
    this.monitorPerformance();
  },
  
  setupLazyLoading() {
    // Lazy load images that are not immediately visible
    const images = Utils.$$('img[src*="portfolio"], img[src*="hero"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Add loading animation
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', () => {
              img.style.opacity = '1';
            });
            
            // Add error handling
            img.addEventListener('error', () => {
              img.style.opacity = '0.5';
              Utils.log(`Failed to load image: ${img.src}`, 'warn');
            });
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });
      
      images.forEach(img => {
        imageObserver.observe(img);
      });
    }
  },
  
  setupImageOptimization() {
    // Add WebP support detection and fallbacks
    const supportsWebP = this.checkWebPSupport();
    
    if (supportsWebP) {
      Utils.log('WebP supported - consider using WebP images for better performance');
    }
    
    // Optimize image loading for mobile
    Utils.$$('img').forEach(img => {
      // Add loading="lazy" for native lazy loading
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding="async" for better performance\n      img.setAttribute('decoding', 'async');\n      \n      // Add proper alt text if missing\n      if (!img.hasAttribute('alt')) {\n        img.setAttribute('alt', '');\n        Utils.log(`Missing alt text for image: ${img.src}`, 'warn');\n      }\n    });\n  },\n  \n  checkWebPSupport() {\n    const canvas = document.createElement('canvas');\n    canvas.width = 1;\n    canvas.height = 1;\n    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;\n  },\n  \n  setupPreconnects() {\n    // Add preconnect hints for external resources\n    const preconnects = [\n      'https://fonts.googleapis.com',\n      'https://fonts.gstatic.com'\n    ];\n    \n    preconnects.forEach(url => {\n      if (!document.querySelector(`link[href=\"${url}\"]`)) {\n        const link = document.createElement('link');\n        link.rel = 'preconnect';\n        link.href = url;\n        link.crossOrigin = 'anonymous';\n        document.head.appendChild(link);\n      }\n    });\n  },\n  \n  setupServiceWorker() {\n    // Register service worker for caching (if available)\n    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {\n      navigator.serviceWorker.register('/sw.js')\n        .then(registration => {\n          Utils.log('Service Worker registered successfully');\n        })\n        .catch(error => {\n          Utils.log('Service Worker registration failed', 'warn');\n        });\n    }\n  },\n  \n  monitorPerformance() {\n    // Monitor performance metrics\n    if ('PerformanceObserver' in window) {\n      // Monitor Largest Contentful Paint\n      try {\n        const lcpObserver = new PerformanceObserver((list) => {\n          const entries = list.getEntries();\n          const lastEntry = entries[entries.length - 1];\n          Utils.log(`LCP: ${Math.round(lastEntry.startTime)}ms`);\n        });\n        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });\n      } catch (e) {\n        // LCP not supported\n      }\n      \n      // Monitor First Input Delay\n      try {\n        const fidObserver = new PerformanceObserver((list) => {\n          const entries = list.getEntries();\n          entries.forEach(entry => {\n            Utils.log(`FID: ${Math.round(entry.processingStart - entry.startTime)}ms`);\n          });\n        });\n        fidObserver.observe({ entryTypes: ['first-input'] });\n      } catch (e) {\n        // FID not supported\n      }\n    }\n    \n    // Monitor page load time\n    window.addEventListener('load', () => {\n      setTimeout(() => {\n        const perfData = performance.getEntriesByType('navigation')[0];\n        if (perfData) {\n          const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart);\n          Utils.log(`Page load time: ${loadTime}ms`);\n        }\n      }, 0);\n    });\n  },\n  \n  // Optimize for mobile network conditions\n  adaptToConnection() {\n    if ('connection' in navigator) {\n      const connection = navigator.connection;\n      \n      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {\n        // Reduce animations and effects for slow connections\n        document.documentElement.style.setProperty('--transition-fast', '0.1s');\n        document.documentElement.style.setProperty('--transition-smooth', '0.2s');\n        \n        Utils.log('Slow connection detected - reducing animations');\n      }\n      \n      if (connection.saveData) {\n        // Respect user's data saving preference\n        Utils.log('Data saver mode detected - optimizing for minimal data usage');\n        \n        // Could disable non-essential images or features\n        Utils.$$('img[src*=\"portfolio\"]').forEach(img => {\n          img.style.display = 'none';\n        });\n      }\n    }\n  }\n};\n\n// Initialize performance optimizations\nUtils.ready(() => {\n  Performance.init();\n  Performance.adaptToConnection();\n});\n\n// Export for use in other modules\nwindow.Performance = Performance;
