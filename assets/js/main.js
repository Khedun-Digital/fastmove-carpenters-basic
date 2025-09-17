// Main application entry point
// This file initializes all modules when the DOM is ready

const App = {
  init() {
    Utils.log('FastMove Carpenters app initializing...');
    
    // Initialize all modules
    ContactManager.init();
    Navigation.init();
    FormManager.init();
    TestimonialsManager.init();
    Analytics.init();
    
    Utils.log('FastMove Carpenters app initialized successfully');
  }
};

// Initialize the app when DOM is ready
Utils.ready(() => {
  App.init();
});

// Export for debugging purposes
window.App = App;
