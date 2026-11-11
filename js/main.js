// ============================================================================
// NovaPlay — КР3 JavaScript (HTML/CSS)
// Sticky header, mobile menu, product gallery, cart, order forms
// ============================================================================

(function () {
  'use strict';

  // ------------------------------------------------------------------
  // Sticky header on scroll
  // ------------------------------------------------------------------
  const header = document.querySelector('.site-header.sticky-header');
  let lastScrollY = window.scrollY;

  if (header) {
    const updateSticky = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0 && currentScrollY > lastScrollY) {
        header.classList.remove('is-sticky');
      } else {
        header.classList.add('is-sticky');
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateSticky, { passive: true });
    updateSticky();
  }

  // ------------------------------------------------------------------
  // Order dialog (shared across pages)
  // ------------------------------------------------------------------
  const dialog = document.getElementById('order-dialog');
  const openButton = document.getElementById('open-order-dialog');
  const closeButtons = document.querySelectorAll('[id^="close-order-dialog"], [id^="close-dialog-order"]');
  const form = document.getElementById('order-form');
  const dialogForm = document.getElementById('order-dialog-form');
  const message = document.getElementById('form-message');
  const dialogMessage = document.getElementById('dialog-form-message');

  const openDialog = () => {
    if (dialog) dialog.showModal();
  };

  const closeDialog = () => {
    if (dialog) dialog.close();
  };

  if (openButton) {
    openButton.addEventListener('click', openDialog);
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', closeDialog);
  });

  if (dialog) {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog();
    });
  }

  // ------------------------------------------------------------------
  // Generic form submit handler
  // ------------------------------------------------------------------
  const handleFormSubmit = (formElement, messageElement) => {
    if (!formElement || !messageElement) return;

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      if (formElement.checkValidity()) {
        messageElement.hidden = false;
        formElement.reset();

        // Auto-hide message after 5 seconds
        setTimeout(() => {
          messageElement.hidden = true;
        }, 5000);
      } else {
        formElement.reportValidity();
      }
    });
  };

  handleFormSubmit(form, message);
  handleFormSubmit(dialogForm, dialogMessage);

  // ------------------------------------------------------------------
  // Product page: thumbnail switching
  // ------------------------------------------------------------------
  const thumbnails = document.querySelectorAll('.product-detail__thumb');
  const mainImage = document.querySelector('.product-detail__image');

  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const imageSrc = thumb.getAttribute('data-image');
      if (mainImage && imageSrc) {
        mainImage.src = imageSrc;
      }

      thumbnails.forEach((t) => t.classList.remove('product-detail__thumb--active'));
      thumb.classList.add('product-detail__thumb--active');
    });
  });

  // ------------------------------------------------------------------
  // Product page: buy / order buttons
  // ------------------------------------------------------------------
  const buyButtons = document.querySelectorAll('.product-detail__buy');
  const orderButtons = document.querySelectorAll('.product-detail__order');

  buyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      alert('Товар добавлен в корзину. Перейдите к оформлению заказа.');
    });
  });

  orderButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      openDialog();
    });
  });

  // ------------------------------------------------------------------
  // Mobile menu toggle
  // ------------------------------------------------------------------
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.site-nav__list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('site-nav__list--open');
    });

    // Close menu when clicking a link
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('site-nav__list--open');
      });
    });
  }

  // ------------------------------------------------------------------
  // Product cards: "Подробнее" links (already handled by HTML href)
  // ------------------------------------------------------------------

})();
