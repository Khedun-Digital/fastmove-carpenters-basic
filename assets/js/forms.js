// Form handling and validation
const FormManager = {
  init() {
    this.setupServicePrefill();
    this.setupFormHandlers();
  },
  
  setupServicePrefill() {
    // Prefill service from CTA click
    Utils.$$('[data-service]').forEach(btn => {
      btn.addEventListener('click', () => {
        const serviceSelect = Utils.$('#q_service');
        if (serviceSelect) {
          const service = btn.getAttribute('data-service')
            .replace('builtins', 'Built-in Cupboards')
            .replace('kitchens', 'Kitchens & Cabinetry')
            .replace('doors', 'Doors & Frames')
            .replace('decking', 'Decking & Exterior Wood')
            .replace('repairs', 'Repairs & Refinishing')
            .replace('shopfitting', 'Shopfitting & Office');
          
          serviceSelect.value = service;
          Utils.log(`Service prefilled: ${service}`);
        }
      });
    });
  },
  
  setupFormHandlers() {
    this.handleForm('contactForm', 'contactMsg', 'Thanks for reaching out!');
    this.handleForm('quoteForm', 'quoteMsg', 'Quote request submitted.');
  },
  
  handleForm(formId, msgId, successText) {
    const form = Utils.$(`#${formId}`);
    const msg = Utils.$(`#${msgId}`);
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate form
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      
      // Collect form data
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      
      // Log submission (replace with actual endpoint later)
      Utils.log(`Form submission: ${formId}`, 'info');
      console.log(`FORM_SUBMIT_${formId}`, payload);
      
      // Show success message
      if (msg) {
        this.showMessage(msg, successText + ' We\'ll get back to you shortly.', 'success');
      }
      
      // Reset form
      form.reset();
      
      // TODO: Send to actual endpoint
      // this.submitToEndpoint(formId, payload);
    });
  },
  
  showMessage(element, text, type = 'success') {
    element.textContent = text;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      element.style.display = 'none';
    }, 5000);
  },
  
  // Placeholder for actual form submission
  async submitToEndpoint(formId, data) {
    const endpoint = window.CONFIG.forms[formId.replace('Form', '')];
    
    if (!endpoint) {
      Utils.log(`No endpoint configured for ${formId}`, 'warn');
      return;
    }
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      Utils.log(`Form ${formId} submitted successfully`);
    } catch (error) {
      Utils.log(`Form submission failed: ${error.message}`, 'error');
    }
  }
};

// Export for use in main app
window.FormManager = FormManager;
