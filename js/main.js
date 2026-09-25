/**
 * ATELIER GOLDDRUCK - MAIN JAVASCRIPT
 * Optimized for lightweight execution, fast response, zero layout shift
 */

// Universal Table of Contents Toggle Function
window.toggleToc = function(header) {
  const card = header.closest('.toc-card');
  if (!card) return;
  const list = card.querySelector('.toc-list');
  const badgeText = header.querySelector('.toc-badge-text');
  const icon = header.querySelector('.toc-toggle-icon');
  if (!list) return;

  const isClosed = list.style.display === 'none' || !list.classList.contains('show') || window.getComputedStyle(list).display === 'none';
  if (isClosed) {
    list.style.display = 'grid';
    list.classList.add('show');
    header.classList.add('border-open');
    if (icon) icon.innerHTML = '&#9660;';
    if (badgeText) badgeText.innerText = 'Hide';
  } else {
    list.style.display = 'none';
    list.classList.remove('show');
    header.classList.remove('border-open');
    if (icon) icon.innerHTML = '&#9654;';
    if (badgeText) badgeText.innerText = 'Show';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      mobileToggle.innerHTML = isExpanded ? '&#x2715;' : '&#x2630;';
    });
  }

  // FAQ Accordion Interactivity
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const icon = i.querySelector('.accordion-icon');
        if (icon) icon.innerHTML = '&#43;';
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        const icon = item.querySelector('.accordion-icon');
        if (icon) icon.innerHTML = '&#8722;';
      }
    });
  });

  // Table of Contents Toggle (Supports all pages and cards)
  const initTocToggles = () => {
    document.querySelectorAll('.toc-header').forEach(header => {
      // Remove any duplicate listener by replacing or checking flag
      if (!header.dataset.tocBound) {
        header.dataset.tocBound = "true";
        header.addEventListener('click', () => {
          window.toggleToc(header);
        });
      }
    });
  };
  initTocToggles();

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Contact Form Handling (If present)
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccess) {
        formSuccess.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 5000);
      }
    });
  }
});
