document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     STICKY HEADER
  ========================= */

  const header = document.getElementById("mainHeader");
  const productSection = document.querySelector(".product-detail-section");

  window.addEventListener("scroll", () => {

    if (!productSection) return;

    const sectionBottom = productSection.getBoundingClientRect().bottom;

    if (sectionBottom <= 0) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

  });
  /* =========================
     IMAGE CAROUSEL
  ========================= */

  const mainProductImage = document.querySelector(".main-product-image");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  let currentIndex = 0;

  if (mainProductImage && thumbnails.length > 0) {

    function updateImage(index) {

      thumbnails.forEach(t => t.classList.remove("active"));

      thumbnails[index].classList.add("active");

      mainProductImage.src = thumbnails[index].src;

      currentIndex = index;
    }

    thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        updateImage(index);
      });
    });

    if (rightArrow) {
      rightArrow.addEventListener("click", () => {

        currentIndex = (currentIndex + 1) % thumbnails.length;

        updateImage(currentIndex);

      });
    }

    if (leftArrow) {
      leftArrow.addEventListener("click", () => {

        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;

        updateImage(currentIndex);

      });
    }

  }


  /* =========================
     IMAGE ZOOM PREVIEW
  ========================= */

  const mainImageContainer = document.querySelector(".main-image-container");
  const zoomPreview = document.querySelector(".thumbnail-zoom-preview");

  if (mainImageContainer && zoomPreview && mainProductImage) {

    // --- Custom blur-box cursor tooltip ---
    const zoomTooltip = document.createElement("div");
    zoomTooltip.id = "zoom-cursor-tooltip";
    zoomTooltip.innerHTML = `<img src="assets/zoom-preview-icon.svg" alt="Zoom In" />`;
    Object.assign(zoomTooltip.style, {
      position: "fixed",
      display: "none",
      pointerEvents: "none",
      zIndex: "9999",
      width: "126px",
      height: "126px",
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.18)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
      border: "1px solid rgba(255, 255, 255, 0.35)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.18)",
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 0.15s ease",
    });
    zoomTooltip.style.display = "none";
    const tooltipImg = zoomTooltip.querySelector("img");
    Object.assign(tooltipImg.style, {
      width: "32px",
      height: "32px",
      pointerEvents: "none",
      userSelect: "none",
    });
    document.body.appendChild(zoomTooltip);

    // Hide zoom tooltip when hovering over the arrow buttons
    const arrowButtons = mainImageContainer.querySelectorAll(".carousel-arrow");
    arrowButtons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        mainImageContainer.style.cursor = "pointer";
        zoomTooltip.style.display = "none";
        zoomPreview.style.display = "none";
      });
      btn.addEventListener("mouseleave", () => {
        mainImageContainer.style.cursor = "none";
        zoomTooltip.style.display = "flex";
      });
    });

    mainImageContainer.addEventListener("mouseenter", () => {
      mainImageContainer.style.cursor = "none";
      zoomTooltip.style.display = "flex";
    });

    mainImageContainer.addEventListener("mousemove", (e) => {
      // Position tooltip centred on the cursor
      zoomTooltip.style.left = (e.clientX - 63) + "px";
      zoomTooltip.style.top = (e.clientY - 63) + "px";

      const rect = mainImageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      zoomPreview.style.display = "block";
      zoomPreview.style.backgroundImage = `url(${mainProductImage.src})`;
      zoomPreview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
      zoomPreview.style.left = '530px';
      zoomPreview.style.top = '100px';
    });

    mainImageContainer.addEventListener("mouseleave", () => {
      zoomPreview.style.display = "none";
      mainImageContainer.style.cursor = "default";
      zoomTooltip.style.display = "none";
    });

  }

});

/* =========================
   DOWNLOAD DATASHEET MODAL
   ========================= */
(function () {
  const modal = document.getElementById("datasheetModal");
  const openBtn = document.getElementById("downloadDatasheetBtn");
  const closeBtn = document.getElementById("dsModalClose");
  const emailInput = document.getElementById("dsEmail");
  const submitBtn = document.getElementById("dsSubmitBtn");
  const form = document.getElementById("dsModalForm");

  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add("ds-open");
    document.body.style.overflow = "hidden";
    emailInput.focus();
  }

  function closeModal() {
    modal.classList.remove("ds-open");
    document.body.style.overflow = "";
    form.reset();
    submitBtn.disabled = true;
  }

  // Open on button click
  openBtn.addEventListener("click", openModal);

  // Close on X button
  closeBtn.addEventListener("click", closeModal);

  // Close when clicking the backdrop (outside the box)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("ds-open")) closeModal();
  });

  // Enable submit only when email field has a valid value
  emailInput.addEventListener("input", () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    submitBtn.disabled = !isValid;
  });

  // Open the PDF when "Download Brochure" is clicked
  submitBtn.addEventListener("click", () => {
    submitBtn.textContent = "Opening…";
    submitBtn.disabled = true;

    // Open the PDF in a new browser tab
    window.open("./assets/Abhilash_Bhargava_Resume.pdf", "_blank");

    // Reset the button and close the modal after a short delay
    setTimeout(() => {
      closeModal();
      submitBtn.textContent = "Download Brochure";
    }, 800);
  });
})();

/* =========================
   REQUEST A QUOTE MODAL
   ========================= */
(function () {
  const modal = document.getElementById("quoteModal");
  const openBtn = document.getElementById("requestQuoteBtn");
  const closeBtn = document.getElementById("quoteModalClose");
  const form = document.getElementById("quoteModalForm");
  const submitBtn = document.getElementById("quoteSubmitBtn");

  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add("ds-open");
    document.body.style.overflow = "hidden";
    document.getElementById("qFullName").focus();
  }

  function closeModal() {
    modal.classList.remove("ds-open");
    document.body.style.overflow = "";
    form.reset();
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("ds-open")) closeModal();
  });

  submitBtn.addEventListener("click", () => {
    const name = document.getElementById("qFullName").value.trim();
    const email = document.getElementById("qEmail").value.trim();
    const phone = document.getElementById("qPhone").value.trim();

    if (!name || !email || !phone) {
      // Highlight empty required fields
      [document.getElementById("qFullName"), document.getElementById("qEmail"), document.getElementById("qPhone")].forEach(el => {
        if (!el.value.trim()) el.style.borderColor = "#ef4444";
        else el.style.borderColor = "";
      });
      return;
    }

    submitBtn.textContent = "Opening…";
    submitBtn.disabled = true;

    // Open the PDF in a new browser tab
    window.open("./assets/Abhilash_Bhargava_Resume.pdf", "_blank");

    // Reset and close after short delay
    setTimeout(() => {
      closeModal();
      submitBtn.textContent = "Submit Form";
      submitBtn.disabled = false;
    }, 800);
  });

  // Clear red border on input
  ["qFullName", "qEmail", "qPhone"].forEach(id => {
    document.getElementById(id).addEventListener("input", (e) => {
      e.target.style.borderColor = "";
    });
  });
})();

function handleCompanyLogos() {
  const companyLogos = document.querySelector('.company-logos');
  const logoImages = companyLogos ? companyLogos.querySelectorAll('img') : [];

  if (logoImages.length === 0) return;

  const screenWidth = window.innerWidth;

  // Hide all logos first
  logoImages.forEach(img => {
    img.style.display = 'none';
  });

  // Show appropriate number of logos based on screen width
  if (screenWidth >= 1240) {
    // Desktop: Show all 6 icons
    logoImages.forEach(img => {
      img.style.display = 'block';
    });
  } else if (screenWidth >= 1000) {
    // Tablet: Show 4-5 icons
    logoImages.forEach((img, index) => {
      img.style.display = index < 5 ? 'block' : 'none';
    });
  } else if (screenWidth >= 550) {
    // Mobile: Show 3 icons
    logoImages.forEach((img, index) => {
      img.style.display = index < 4 ? 'block' : 'none';
    });
  }
  else {
    // Mobile: Show 3 icons
    logoImages.forEach((img, index) => {
      img.style.display = index < 3 ? 'block' : 'none';
    });
  }

}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  handleCompanyLogos();
});

// Handle resize events
window.addEventListener('resize', () => {
  handleCompanyLogos();
});

// ---FAQ Section  ---
document.addEventListener("DOMContentLoaded", () => {
  // --- FAQ Functionality ---
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active")
        faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
        question.setAttribute("aria-expanded", "true")
      }
    })
  })

  // --- Email Catalogue Functionality ---
  const emailInput = document.querySelector(".email-input")
  const sendButton = document.querySelector(".send-catalogue-btn")

  if (sendButton && emailInput) {
    sendButton.addEventListener("click", () => {
      const email = emailInput.value.trim()

      if (!email) {
        alert("Please enter your email address")
        emailInput.focus()
        return
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address")
        emailInput.focus()
        return
      }

      // Simulate sending catalogue
      const originalText = sendButton.textContent
      sendButton.textContent = "SENDING..."
      sendButton.disabled = true

      setTimeout(() => {
        sendButton.textContent = "SENT ✓"
        setTimeout(() => {
          sendButton.textContent = originalText
          sendButton.disabled = false
          emailInput.value = ""
          alert("Catalogue sent successfully! Check your email.")
        }, 2000)
      }, 1500)
    })

    // Handle Enter key in email input
    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendButton.click()
      }
    })
  }

  // --- Applications Carousel Functionality ---
  const carouselTrack = document.querySelector(".carousel-track")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  const cards = document.querySelectorAll(".application-card")

  if (carouselTrack && cards.length > 0) {
    let currentIndex = 0
    const cardWidth = cards[0].offsetWidth + 12 // Card width + gap
    const visibleCards = Math.floor(carouselTrack.parentElement.offsetWidth / cardWidth)
    const maxIndex = Math.max(0, cards.length - visibleCards)

    function updateCarousel() {
      const translateX = -currentIndex * cardWidth
      carouselTrack.style.transform = `translateX(${translateX}px)`

      // Update button states
      if (prevBtn) prevBtn.disabled = currentIndex === 0
      if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--
          updateCarousel()
        }
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIndex < maxIndex) {
          currentIndex++
          updateCarousel()
        }
      })
    }

    // Initialize carousel
    updateCarousel()

    // Handle window resize
    window.addEventListener("resize", () => {
      const newVisibleCards = Math.floor(carouselTrack.parentElement.offsetWidth / cardWidth)
      const newMaxIndex = Math.max(0, cards.length - newVisibleCards)

      if (currentIndex > newMaxIndex) {
        currentIndex = newMaxIndex
      }
      updateCarousel()
    })
  }

  // --- Manufacturing Process Tabs ---
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.classList.add("active")
      }
    })
  })


  // --- Touch Scrolling for Mobile Carousel ---
  let isDown = false
  let startX
  let scrollLeft

  if (carouselTrack) {
    carouselTrack.addEventListener("mousedown", (e) => {
      isDown = true
      carouselTrack.style.cursor = "grabbing"
      startX = e.pageX - carouselTrack.offsetLeft
      scrollLeft = carouselTrack.scrollLeft
    })

    carouselTrack.addEventListener("mouseleave", () => {
      isDown = false
      carouselTrack.style.cursor = "grab"
    })

    carouselTrack.addEventListener("mouseup", () => {
      isDown = false
      carouselTrack.style.cursor = "grab"
    })

    carouselTrack.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - carouselTrack.offsetLeft
      const walk = (x - startX) * 2
      carouselTrack.scrollLeft = scrollLeft - walk
    })
  }

  // --- Smooth Scroll Animation for Tab Content ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe tab contents for animation
  tabContents.forEach((content) => {
    content.style.opacity = "0"
    content.style.transform = "translateY(20px)"
    content.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    contentObserver.observe(content)
  })

  // --- Utility Functions ---
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
})


// part 3 starts here 

document.addEventListener("DOMContentLoaded", () => {
  // --- Testimonials Carousel Functionality ---
  const testimonialsCarousel = document.querySelector(".testimonials-carousel")
  const carouselTrack = testimonialsCarousel ? testimonialsCarousel.querySelector(".carousel-track") : null
  const testimonialCards = testimonialsCarousel ? testimonialsCarousel.querySelectorAll(".testimonial-card") : []

  if (carouselTrack && testimonialCards.length > 0) {
    let isDown = false
    let startX
    let scrollLeft

    // Mouse events for desktop drag
    carouselTrack.addEventListener("mousedown", (e) => {
      isDown = true
      carouselTrack.classList.add("active-drag")
      startX = e.pageX - carouselTrack.offsetLeft
      scrollLeft = carouselTrack.scrollLeft
    })

    carouselTrack.addEventListener("mouseleave", () => {
      isDown = false
      carouselTrack.classList.remove("active-drag")
    })

    carouselTrack.addEventListener("mouseup", () => {
      isDown = false
      carouselTrack.classList.remove("active-drag")
    })

    carouselTrack.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - carouselTrack.offsetLeft
      const walk = (x - startX) * 1.5 // Adjust scroll speed
      carouselTrack.scrollLeft = scrollLeft - walk
    })

    // Touch events for mobile swipe
    carouselTrack.addEventListener("touchstart", (e) => {
      isDown = true
      startX = e.touches[0].pageX - carouselTrack.offsetLeft
      scrollLeft = carouselTrack.scrollLeft
    })

    carouselTrack.addEventListener("touchend", () => {
      isDown = false
    })

    carouselTrack.addEventListener("touchmove", (e) => {
      if (!isDown) return
      const x = e.touches[0].pageX - carouselTrack.offsetLeft
      const walk = (x - startX) * 1.5
      carouselTrack.scrollLeft = scrollLeft - walk
    })
  }

  // --- Learn More Button Functionality (Portfolio Cards) ---
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn")

  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // In a real application, this would navigate to a product detail page
      // or open a modal with more information.
      const cardTitle = button.closest(".portfolio-card").querySelector("h3").textContent
    })
  })

  // --- Talk to an Expert Button Functionality (CTA Section) ---
  const talkToExpertBtn = document.querySelector(".talk-to-expert-btn")

  if (talkToExpertBtn) {
    talkToExpertBtn.addEventListener("click", () => {
      // In a real application, this would open a contact form modal,
      // redirect to a contact page, or initiate a chat.
    })
  }

  // --- Intersection Observer for Section Animations ---
  const sectionsToAnimate = document.querySelectorAll(
    ".testimonials-section .section-title, .testimonials-section .section-subtitle, .testimonial-card, " +
    ".portfolio-section .section-title, .portfolio-section .section-subtitle, .portfolio-card, " +
    ".cta-section .cta-box",
  )

  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Adjust when element enters viewport
  }

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up") // Add a class for animation
        observer.unobserve(entry.target) // Stop observing once animated
      }
    })
  }, observerOptions)

})


class ManufacturingCarousel {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 8;
    this.isAnimating = false;

    this.slides = [
      { title: 'Raw Material', step: 1 },
      { title: 'Extrusion', step: 2 },
      { title: 'Cooling', step: 3 },
      { title: 'Sizing', step: 4 },
      { title: 'Quality Control', step: 5 },
      { title: 'Marking', step: 6 },
      { title: 'Cutting', step: 7 },
      { title: 'Packaging', step: 8 }
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateUI();
    this.setupSwipeGestures();
    this.setupKeyboardNavigation();
  }

  bindEvents() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', () => this.previousSlide());
    nextBtn.addEventListener('click', () => this.nextSlide());
  }

  setupSwipeGestures() {
    const container = document.querySelector('.carousel-content');
    let startX = 0;
    let startY = 0;
    let startTime = 0;

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();

      this.handleSwipe(startX, startY, endX, endY, endTime - startTime);
    }, { passive: true });
  }

  handleSwipe(startX, startY, endX, endY, duration) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300;

    // Only handle horizontal swipes that are fast enough
    if (Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > minSwipeDistance &&
      duration < maxSwipeTime) {

      if (deltaX > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.previousSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
      }
    });
  }

  nextSlide() {
    if (this.isAnimating || this.currentSlide >= this.totalSlides - 1) return;

    this.goToSlide(this.currentSlide + 1, 'next');
  }

  previousSlide() {
    if (this.isAnimating || this.currentSlide <= 0) return;

    this.goToSlide(this.currentSlide - 1, 'prev');
  }

  goToSlide(index, direction = 'next') {
    if (this.isAnimating || index === this.currentSlide ||
      index < 0 || index >= this.totalSlides) return;

    this.isAnimating = true;
    this.animateSlide(this.currentSlide, index, direction);
    this.currentSlide = index;
    this.updateUI();

    // Reset animation flag
    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }

  animateSlide(fromIndex, toIndex, direction) {
    const slides = document.querySelectorAll('.slide');
    const currentSlide = slides[fromIndex];
    const nextSlide = slides[toIndex];

    // Prepare next slide
    nextSlide.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
    nextSlide.style.opacity = '0';
    nextSlide.style.position = 'absolute';
    nextSlide.style.top = '0';
    nextSlide.style.left = '0';
    nextSlide.style.width = '100%';

    // Force reflow
    nextSlide.offsetHeight;

    // Start animation
    requestAnimationFrame(() => {
      // Animate current slide out
      currentSlide.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
      currentSlide.style.opacity = '0';

      // Animate next slide in
      nextSlide.style.transform = 'translateX(0)';
      nextSlide.style.opacity = '1';

      // Clean up after animation
      setTimeout(() => {
        // Reset all slides
        slides.forEach((slide, index) => {
          slide.classList.remove('active');
          if (index === toIndex) {
            slide.classList.add('active');
            slide.style.position = 'relative';
            slide.style.transform = '';
            slide.style.opacity = '';
            slide.classList.add('fade-in');

            // Remove fade-in class after animation
            setTimeout(() => {
              slide.classList.remove('fade-in');
            }, 400);
          } else {
            slide.style.position = 'absolute';
            slide.style.transform = 'translateX(100%)';
            slide.style.opacity = '0';
          }
        });
      }, 400);
    });
  }

  updateUI() {
    // Update step badge
    const stepBadge = document.getElementById('stepBadge');
    const currentSlideData = this.slides[this.currentSlide];
    stepBadge.textContent = `Step ${currentSlideData.step}/8: ${currentSlideData.title}`;

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = this.currentSlide === 0;
    nextBtn.disabled = this.currentSlide === this.totalSlides - 1;

    // Add visual feedback for disabled state
    if (prevBtn.disabled) {
      prevBtn.style.opacity = '0.5';
    } else {
      prevBtn.style.opacity = '1';
    }

    if (nextBtn.disabled) {
      nextBtn.style.opacity = '0.5';
    } else {
      nextBtn.style.opacity = '1';
    }
  }

  // Public method to go to specific slide (for external control)
  goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= this.totalSlides) {
      const direction = stepNumber > this.currentSlide + 1 ? 'next' : 'prev';
      this.goToSlide(stepNumber - 1, direction);
    }
  }

  // Get current step info
  getCurrentStep() {
    return {
      step: this.currentSlide + 1,
      title: this.slides[this.currentSlide].title,
      total: this.totalSlides
    };
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.manufacturingCarousel = new ManufacturingCarousel();
});

// Handle page visibility change to pause animations
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.manufacturingCarousel) {
    window.manufacturingCarousel.isAnimating = false;
  }
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
  if (e.target.closest('.carousel-card')) {
    e.preventDefault();
  }
});




