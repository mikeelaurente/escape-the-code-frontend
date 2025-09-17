// Preloader function
export function preloader() {
  const preloaders = document.querySelectorAll(".preloader");
  preloaders.forEach((preloader) => {
    setTimeout(() => {
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 500);
  });
}

// Navbar scroll animation
export function navScrollAnimation() {
  function handleScroll() {
    const fixedTop = document.querySelector("#header-nav");
    if (fixedTop) {
      if (window.scrollY > 50) {
        fixedTop.classList.add("header-animation");
      } else {
        fixedTop.classList.remove("header-animation");
      }
    }
  }

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}

// Navigation toggle
export function setupNavigation() {
  const toggles = document.querySelectorAll(".nav-toggole");
  const menu = document.querySelector(".small-nav");
  const closeButtons = document.querySelectorAll(".nav-close");

  if (toggles.length && menu && closeButtons.length) {
    function openNavigation() {
      menu.classList.remove(
        "md:translate-y-full",
        "max-md:-translate-x-full",
        "invisible"
      );
      menu.classList.add("md:translate-y-0", "max-md:translate-x-0", "visible");
    }

    function closeNavigation() {
      menu.classList.remove(
        "md:translate-y-0",
        "max-md:translate-x-0",
        "visible"
      );
      menu.classList.add(
        "md:translate-y-full",
        "max-md:-translate-x-full",
        "invisible"
      );
    }

    toggles.forEach((toggle) =>
      toggle.addEventListener("click", openNavigation)
    );
    closeButtons.forEach((closeBtn) =>
      closeBtn.addEventListener("click", closeNavigation)
    );

    return () => {
      toggles.forEach((toggle) =>
        toggle.removeEventListener("click", openNavigation)
      );
      closeButtons.forEach((closeBtn) =>
        closeBtn.removeEventListener("click", closeNavigation)
      );
    };
  }
}

// Active Menu
export function activeMenu() {
  const currentUrl = window.location.href;
  const subMenuItems = document.querySelectorAll(".menu .submenu");
  const mainMenuLinks = document.querySelectorAll(".small-nav ul li a");
  const submenuLinks = document.querySelectorAll(".submenu-link a");
  const tabNavbar = document.querySelectorAll(".tab-navbar a");
  const sideNavbarOne = document.querySelectorAll(".side-navbar-one .nav-item");

  // Helper function to add or remove 'active' class
  const setActiveClass = (element, shouldBeActive) => {
    if (shouldBeActive) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  };

  // Remove 'active' class from all submenu items
  subMenuItems.forEach((item) => setActiveClass(item, false));

  // Apply 'active' class to the main menu link if it matches the current URL
  mainMenuLinks.forEach((link) => {
    if (link.href === currentUrl) {
      setActiveClass(link, true);

      const parentSubMenu = link.closest(".sub-menu");
      if (parentSubMenu) {
        setActiveClass(parentSubMenu.querySelector("span"), true);
        setActiveClass(parentSubMenu.querySelector("i"), true);
      }
    }
  });

  // Apply 'active' class to the profile nav link if it matches the current URL
  tabNavbar.forEach((link) => {
    if (link.href === currentUrl) {
      setActiveClass(link, true);
    }
  });

  // Apply 'active' class to the side navbar one link if it matches the current URL
  sideNavbarOne.forEach((link) => {
    if (link.href === currentUrl) {
      setActiveClass(link, true);
    }
  });

  // Apply 'active' class to the submenu link if it matches a part of the current URL
  submenuLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (currentUrl.includes(href)) {
      const parentSubmenu = link.closest(".submenu");

      if (parentSubmenu) {
        setActiveClass(parentSubmenu, true);
        const btn = parentSubmenu.querySelector(".submenu-btn");
        const icon = parentSubmenu.querySelector(".submenu-icon i");

        setActiveClass(btn, true);
        setActiveClass(icon, true);
      }
    }
  });
}

// Mobile submenu collapse
export function setupMobileSubmenu() {
  const subMenus = document.querySelectorAll(".sub-menu");

  subMenus.forEach((menu) => {
    const submenu = menu.querySelector("ul");
    const collapseIcon = menu.querySelector(".collapse-icon");

    if (submenu) {
      submenu.style.maxHeight = "0";
      submenu.style.paddingTop = "0";
      submenu.style.overflow = "hidden";
      submenu.style.transition =
        "max-height 0.5s ease-in-out, padding-top 0.5s ease-in-out";

      if (collapseIcon) {
        collapseIcon.style.transition = "transform 0.5s ease-in-out";
      }

      menu.addEventListener("click", function () {
        const isOpen = menu.classList.contains("open");

        document.querySelectorAll(".sub-menu.open").forEach((openMenu) => {
          if (openMenu !== menu) {
            const openSubmenu = openMenu.querySelector("ul");
            const openCollapseIcon = openMenu.querySelector(".collapse-icon");
            if (openSubmenu) {
              openSubmenu.style.maxHeight = "0";
              openSubmenu.style.paddingTop = "0";
            }
            if (openCollapseIcon) {
              openCollapseIcon.style.transform = "rotate(0deg)";
            }
            openMenu.classList.remove("open");
          }
        });

        if (isOpen) {
          submenu.style.maxHeight = "0";
          submenu.style.paddingTop = "0";
          if (collapseIcon) {
            collapseIcon.style.transform = "rotate(0deg)";
          }
          menu.classList.remove("open");
        } else {
          submenu.style.maxHeight = submenu.scrollHeight + 4 + "px";
          submenu.style.paddingTop = "5px";
          if (collapseIcon) {
            collapseIcon.style.transform = "rotate(180deg)";
          }
          menu.classList.add("open");
        }
      });
    }
  });
}

// Scroll to top
export function scrollToTop() {
  const scrollToTopButton = document.getElementById("scrollToTop");

  if (scrollToTopButton) {
    function toggleScrollToTopButton() {
      if (window.scrollY >= 200) {
        scrollToTopButton.classList.add("show");
      } else {
        scrollToTopButton.classList.remove("show");
      }
    }

    toggleScrollToTopButton();
    window.addEventListener("scroll", toggleScrollToTopButton);

    scrollToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    return () => window.removeEventListener("scroll", toggleScrollToTopButton);
  }
}

// Active Toggle State

export function stateToggle(targetSelector, activeClass = "active") {
  const targets = document.querySelectorAll(targetSelector);

  if (targets) {
    targets.forEach((target) => target.classList.toggle(activeClass));
  }
}

// Current year
export function currentYear() {
  const currentYear = new Date().getFullYear();
  const currentYearElement = document.querySelector(".currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = currentYear;
  }
}

// Popup video modal
export function popupVideoModal() {
  const modal = document.getElementById("modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  if (modal) {
    const videoIframe = modal.querySelector("iframe");

    function openModal(event) {
      const button = event.currentTarget;
      const videoUrl = button.getAttribute("data-video-url");

      if (videoIframe && videoUrl) {
        videoIframe.src = videoUrl; // Set the video URL dynamically
      }
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }

    function closeModal() {
      if (videoIframe) {
        videoIframe.src = ""; // Clear the video source to stop playback
      }
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }

    const modalOpenButtons = document.querySelectorAll(".modal-open-btn");
    modalOpenButtons.forEach((btn) => btn.addEventListener("click", openModal));

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeModal);
    }

    const modalBackdrop = modal.querySelector("#modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", closeModal);
    }

    return () => {
      modalOpenButtons.forEach((btn) =>
        btn.removeEventListener("click", openModal)
      );
      if (modalCloseBtn) modalCloseBtn.removeEventListener("click", closeModal);
      if (modalBackdrop) modalBackdrop.removeEventListener("click", closeModal);
    };
  }
}

// Price Range
export function priceRange() {
  const sliderOne = document.getElementById("range-slider-1");
  const sliderTwo = document.getElementById("range-slider-2");
  const displayValOne = document.getElementById("min-value");
  const displayValTwo = document.getElementById("max-value");
  const sliderTrack = document.querySelector(".slider-track");

  // Exit if any required element is not found
  if (sliderOne && sliderTwo && displayValOne && displayValTwo && sliderTrack) {
    const minGap = 0;
    const maxSliderValue = parseInt(sliderOne.max, 10) || 100; // Set a default value if max is null

    // Event listeners for sliders
    sliderOne.addEventListener("input", updateSliderOne);
    sliderTwo.addEventListener("input", updateSliderTwo);

    // Initial setup
    updateSliderOne();
    updateSliderTwo();

    function updateSliderOne() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
      }
      displayValOne.textContent = sliderOne.value;
      applySliderTrackColor();
    }

    function updateSliderTwo() {
      if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
      }
      displayValTwo.textContent = sliderTwo.value;
      applySliderTrackColor();
    }

    function applySliderTrackColor() {
      const percent1 = (sliderOne.value / maxSliderValue) * 100;
      const percent2 = (sliderTwo.value / maxSliderValue) * 100;
      sliderTrack.style.background = `linear-gradient(to right, #E8ECEF ${percent1}%, #F29620 ${percent1}%, #F29620 ${percent2}%, #E8ECEF ${percent2}%)`;
    }
  }
}

// Pricing plan
export function pricingPlan() {
  // Select all pricing sections
  const pricingSections = document.querySelectorAll(".pricing-section");

  pricingSections.forEach((section) => {
    // Get the toggle button and pricing elements for each section
    const togglePricing = section.querySelector(".togglePricing");
    const prices = section.querySelectorAll(".price");
    const periodTexts = section.querySelectorAll(".period-text");

    // Skip if there's no toggle for this section
    if (!togglePricing) return;

    // Listen for change event on the toggle
    togglePricing.addEventListener("change", () => {
      // Iterate over all price elements and update the price based on the toggle state
      prices.forEach((price) => {
        const monthlyPrice = price.getAttribute("data-monthly");
        const yearlyPrice = price.getAttribute("data-yearly");

        // Update the price content based on the toggle state
        if (togglePricing.checked) {
          price.textContent = yearlyPrice;
        } else {
          price.textContent = monthlyPrice;
        }
      });

      // Update the period text for all pricing options (monthly or yearly)
      periodTexts.forEach((period) => {
        if (togglePricing.checked) {
          period.textContent = "PER YEAR";
        } else {
          period.textContent = "PER MONTH";
        }
      });
    });
  });
}

// Product quantity
export function productQty() {
  const decreaseQtyBtns = document.querySelectorAll(".decreaseQty");
  const increaseQtyBtns = document.querySelectorAll(".increaseQty");
  const qtyInputs = document.querySelectorAll(".qtyValue");

  decreaseQtyBtns.forEach((decreaseQtyBtn, index) => {
    const qtyInput = qtyInputs[index];
    decreaseQtyBtn.addEventListener("click", () => {
      let currentQty = parseInt(qtyInput.value);
      if (currentQty > 1) {
        qtyInput.value = currentQty - 1;

        // If you calculate item sub total, grand total, discount etc. Update prices when quantity changes
        calculatePrices();
      }
    });
  });

  increaseQtyBtns.forEach((increaseQtyBtn, index) => {
    const qtyInput = qtyInputs[index];
    increaseQtyBtn.addEventListener("click", () => {
      let currentQty = parseInt(qtyInput.value);
      qtyInput.value = currentQty + 1;

      // If you calculate item sub total, grand total, discount etc. Update prices when quantity changes
      calculatePrices();
    });
  });
}

// cart.js
export function calculatePrices() {
  const productRows = document.querySelectorAll(".product");
  let subtotal = 0;

  productRows.forEach((row) => {
    const priceElement = row.querySelector(".product-price");
    const quantityInput = row.querySelector(".qtyValue");
    const subtotalElement = row.querySelector(".product-subtotal");

    if (priceElement && quantityInput && subtotalElement) {
      const price = parseFloat(priceElement.textContent);
      const quantity = parseInt(quantityInput.value);
      const rowSubtotal = price * quantity;

      subtotalElement.textContent = rowSubtotal.toFixed(2);
      subtotal += rowSubtotal;
    }
  });

  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  if (subtotalElement) {
    subtotalElement.textContent = subtotal.toFixed(2);
  }

  if (totalElement) {
    totalElement.textContent = subtotal.toFixed(2); // Assuming no additional fees for now
  }
}

export function initializeCart() {
  productQty(); // Initialize quantity adjustment events

  const quantityInputs = document.querySelectorAll(".qtyValue");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", calculatePrices);
  });

  const quantityButtons = document.querySelectorAll(
    ".increaseQty, .decreaseQty"
  );
  quantityButtons.forEach((button) => {
    button.addEventListener("click", calculatePrices);
  });

  calculatePrices(); // Initial calculation of prices
}
