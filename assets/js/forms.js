// Form handling and validation
const FormManager = {
  init() {
    this.setupServicePrefill();
    this.setupFormHandlers();
    this.setupMobileOptimizations();
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
  },
  
  setupMobileOptimizations() {
    // Optimize forms for mobile devices
    Utils.$$('input, select, textarea').forEach(field => {
      this.optimizeFieldForMobile(field);
    });
    
    // Setup mobile-friendly validation
    Utils.$$('form').forEach(form => {
      this.setupMobileValidation(form);
    });
  },
  
  optimizeFieldForMobile(field) {
    const type = field.type || field.tagName.toLowerCase();
    
    // Set appropriate input modes and keyboards
    switch (type) {
      case 'email':
        field.setAttribute('inputmode', 'email');
        field.setAttribute('autocomplete', 'email');
        field.setAttribute('autocapitalize', 'none');
        field.setAttribute('autocorrect', 'off');
        field.setAttribute('spellcheck', 'false');
        break;
        
      case 'tel':
        field.setAttribute('inputmode', 'tel');
        field.setAttribute('autocomplete', 'tel');
        field.setAttribute('autocapitalize', 'none');
        field.setAttribute('autocorrect', 'off');
        field.setAttribute('spellcheck', 'false');
        break;
        
      case 'text':
        if (field.name && field.name.includes('name')) {
          field.setAttribute('autocomplete', 'name');
          field.setAttribute('autocapitalize', 'words');
        } else if (field.name && field.name.includes('address')) {
          field.setAttribute('autocomplete', 'street-address');
          field.setAttribute('autocapitalize', 'words');
        }
        break;
        
      case 'textarea':
        field.setAttribute('autocapitalize', 'sentences');
        field.style.resize = 'vertical';
        field.style.minHeight = '100px';
        break;
    }
    
    // Prevent zoom on iOS by ensuring font-size is at least 16px
    const computedStyle = window.getComputedStyle(field);
    const fontSize = parseFloat(computedStyle.fontSize);
    if (fontSize < 16) {
      field.style.fontSize = '16px';
    }
  },
  
  setupMobileValidation(form) {
    // Handle form submission with mobile optimizations
    const originalSubmitHandler = form.onsubmit;
    
    form.addEventListener('invalid', (e) => {
      e.preventDefault();
      
      // Find first invalid field and scroll to it
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) {
        setTimeout(() => {
          firstInvalid.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
          firstInvalid.focus();
        }, 100);
      }
    }, true);
    
    // Add real-time validation for better UX
    Utils.$$('input, select, textarea', form).forEach(field => {
      field.addEventListener('blur', () => {
        if (field.value.trim() !== '') {
          this.showFieldValidation(field);
        }
      });
      
      field.addEventListener('focus', () => {
        this.clearFieldValidation(field);
      });
    });
  },
  
  showFieldValidation(field) {
    const isValid = field.checkValidity();
    const fieldContainer = field.closest('.field');
    
    if (!fieldContainer) return;
    
    fieldContainer.classList.remove('field-valid', 'field-invalid');
    
    const existingError = fieldContainer.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    if (!isValid) {
      fieldContainer.classList.add('field-invalid');
      
      const errorMsg = document.createElement('div');
      errorMsg.className = 'field-error';
      errorMsg.textContent = this.getValidationMessage(field);
      fieldContainer.appendChild(errorMsg);
    } else {
      fieldContainer.classList.add('field-valid');
    }
  },
  
  clearFieldValidation(field) {
    const fieldContainer = field.closest('.field');
    if (fieldContainer) {
      fieldContainer.classList.remove('field-valid', 'field-invalid');
      const errorMsg = fieldContainer.querySelector('.field-error');
      if (errorMsg) {
        errorMsg.remove();
      }
    }
  },
  
  getValidationMessage(field) {
    if (field.validity.valueMissing) {
      const label = field.closest('.field')?.querySelector('label');
      const fieldName = label ? label.textContent : 'This field';
      return `${fieldName} is required`;
    }
    if (field.validity.typeMismatch) {
      if (field.type === 'email') {
        return 'Please enter a valid email address';
      }
      if (field.type === 'tel') {
        return 'Please enter a valid phone number';
      }
    }
    if (field.validity.tooShort) {
      return 'This field is too short';
    }
    if (field.validity.tooLong) {
      return 'This field is too long';
    }
    return 'Please check this field';
  }
};

// Export for use in main app
window.FormManager = FormManager;
