// Contact information management
const ContactManager = {
  init() {
    this.updatePhoneNumbers();
    this.updateWhatsAppLinks();
    this.updateJsonLD();
  },
  
  updatePhoneNumbers() {
    const { phone } = window.CONFIG.contact;
    const phoneHref = Utils.formatPhoneHref(phone);
    
    // Update phone links
    Utils.$$('a[href^="tel:"], .phone-link').forEach(a => {
      if (phoneHref) a.setAttribute('href', `tel:${phoneHref}`);
      if (phone) a.textContent = phone;
    });
    
    // Update phone display spans
    Utils.$$('.phone-display').forEach(span => {
      if (phone) span.textContent = phone;
    });
    
    Utils.log('Phone numbers updated');
  },
  
  updateWhatsAppLinks() {
    const { whatsappE164 } = window.CONFIG.contact;
    
    Utils.$$('a[href*="wa.me"], .whatsapp-link').forEach(a => {
      if (whatsappE164) {
        a.setAttribute('href', `https://wa.me/${whatsappE164}`);
      }
    });
    
    Utils.log('WhatsApp links updated');
  },
  
  updateJsonLD() {
    const { phone } = window.CONFIG.contact;
    const ldScript = Utils.$('script[type="application/ld+json"]');
    
    if (ldScript && phone) {
      try {
        const data = JSON.parse(ldScript.textContent);
        data.telephone = phone;
        ldScript.textContent = JSON.stringify(data, null, 2);
        Utils.log('JSON-LD telephone updated');
      } catch (error) {
        Utils.log('Failed to update JSON-LD', 'error');
      }
    }
  }
};

// Export for use in main app
window.ContactManager = ContactManager;
