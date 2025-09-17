document.addEventListener('DOMContentLoaded', () => {
  // Contact details wiring from data attributes
  const root = document.documentElement;
  const phoneDisplay = root.dataset.phone || '';
  const phoneHref = phoneDisplay.replace(/[^+\d]/g, '');
  const whatsappE164 = root.dataset.whatsappE164 || '';

  // Update tel: links text and href
  document.querySelectorAll('a[href^="tel:"]').forEach(a => {
    if (phoneHref) a.setAttribute('href', `tel:${phoneHref}`);
    if (phoneDisplay) a.textContent = phoneDisplay;
  });

  // Update WhatsApp links
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    if (whatsappE164) a.setAttribute('href', `https://wa.me/${whatsappE164}`);
  });

  // Update JSON-LD telephone
  const ld = document.querySelector('script[type="application/ld+json"]');
  if (ld && phoneDisplay) {
    try {
      const data = JSON.parse(ld.textContent);
      data.telephone = phoneDisplay;
      ld.textContent = JSON.stringify(data, null, 2);
    } catch (_) { /* ignore */ }
  }

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  if(menuBtn){
    menuBtn.addEventListener('click', ()=> mainNav.classList.toggle('open'));
  }

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Prefill service from CTA click
  document.querySelectorAll('[data-service]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const sel = document.getElementById('q_service');
      if(sel){ sel.value = btn.getAttribute('data-service')
        .replace('builtins','Built-in Cupboards')
        .replace('kitchens','Kitchens & Cabinetry')
        .replace('doors','Doors & Frames')
        .replace('decking','Decking & Exterior Wood')
        .replace('repairs','Repairs & Refinishing')
        .replace('shopfitting','Shopfitting & Office');
      }
    });
  });

  // Simple form handlers (replace with real endpoint/webhook later)
  const handleForm = (formId, msgId, successText) => {
    const form = document.getElementById(formId);
    const msg = document.getElementById(msgId);
    if(!form) return;
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      console.log('FORM_SUBMIT_'+formId, payload);
      if (msg) {
        msg.style.display='block';
        msg.textContent = successText + ' We\'ll get back to you shortly.';
      }
      form.reset();
    });
  };
  handleForm('contactForm','contactMsg','Thanks for reaching out!');
  handleForm('quoteForm','quoteMsg','Quote request submitted.');

  // Testimonials rotator
  (function(){
    const box = document.getElementById('testimonials');
    if(!box) return;
    const quotes = Array.from(box.querySelectorAll('blockquote'));
    let i=0;
    const show = idx => quotes.forEach((q,j)=> q.style.display = (j===idx)?'block':'none');
    show(i);
    const prev = document.getElementById('prevTest');
    const next = document.getElementById('nextTest');
    if (prev) prev.addEventListener('click', ()=>{ i=(i-1+quotes.length)%quotes.length; show(i); });
    if (next) next.addEventListener('click', ()=>{ i=(i+1)%quotes.length; show(i); });
  })();

  // Simple analytics hooks (replace with GA/Pixel as needed)
  document.querySelectorAll('[data-track]').forEach(el=>{
    el.addEventListener('click', ()=> console.log('TRACK', el.getAttribute('data-track')));
  });
});
