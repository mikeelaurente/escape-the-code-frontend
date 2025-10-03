// Preloader function
export function preloader() {
  const preloaders = document.querySelectorAll('.preloader');
  preloaders.forEach((preloader) => {
    setTimeout(() => {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 500);
  });
}

// Navbar scroll animation
export function navScrollAnimation() {
  function handleScroll() {
    const fixedTop = document.querySelector('#header-nav');
    if (fixedTop) {
      if (window.scrollY > 50) {
        fixedTop.classList.add('header-animation');
      } else {
        fixedTop.classList.remove('header-animation');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}

// Navigation toggle
export function setupNavigation() {
  const toggles = document.querySelectorAll('.nav-toggole');
  const menu = document.querySelector('.small-nav');
  const closeButtons = document.querySelectorAll('.nav-close');

  if (toggles.length && menu && closeButtons.length) {
    function openNavigation() {
      menu.classList.remove(
        'md:translate-y-full',
        'max-md:-translate-x-full',
        'invisible'
      );
      menu.classList.add('md:translate-y-0', 'max-md:translate-x-0', 'visible');
    }

    function closeNavigation() {
      menu.classList.remove(
        'md:translate-y-0',
        'max-md:translate-x-0',
        'visible'
      );
      menu.classList.add(
        'md:translate-y-full',
        'max-md:-translate-x-full',
        'invisible'
      );
    }

    toggles.forEach((toggle) =>
      toggle.addEventListener('click', openNavigation)
    );
    closeButtons.forEach((closeBtn) =>
      closeBtn.addEventListener('click', closeNavigation)
    );

    return () => {
      toggles.forEach((toggle) =>
        toggle.removeEventListener('click', openNavigation)
      );
      closeButtons.forEach((closeBtn) =>
        closeBtn.removeEventListener('click', closeNavigation)
      );
    };
  }
}

// Active Menu
export function activeMenu() {
  const currentUrl = window.location.href;
  const subMenuItems = document.querySelectorAll('.menu .submenu');
  const mainMenuLinks = document.querySelectorAll('.small-nav ul li a');
  const submenuLinks = document.querySelectorAll('.submenu-link a');
  const tabNavbar = document.querySelectorAll('.tab-navbar a');
  const sideNavbarOne = document.querySelectorAll('.side-navbar-one .nav-item');

  // Helper function to add or remove 'active' class
  const setActiveClass = (element, shouldBeActive) => {
    if (shouldBeActive) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  };

  // Remove 'active' class from all submenu items
  subMenuItems.forEach((item) => setActiveClass(item, false));

  // Apply 'active' class to the main menu link if it matches the current URL
  mainMenuLinks.forEach((link) => {
    if (link.href === currentUrl) {
      setActiveClass(link, true);

      const parentSubMenu = link.closest('.sub-menu');
      if (parentSubMenu) {
        setActiveClass(parentSubMenu.querySelector('span'), true);
        setActiveClass(parentSubMenu.querySelector('i'), true);
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
    const href = link.getAttribute('href');
    if (currentUrl.includes(href)) {
      const parentSubmenu = link.closest('.submenu');

      if (parentSubmenu) {
        setActiveClass(parentSubmenu, true);
        const btn = parentSubmenu.querySelector('.submenu-btn');
        const icon = parentSubmenu.querySelector('.submenu-icon i');

        setActiveClass(btn, true);
        setActiveClass(icon, true);
      }
    }
  });
}

// Mobile submenu collapse
export function setupMobileSubmenu() {
  const subMenus = document.querySelectorAll('.sub-menu');

  subMenus.forEach((menu) => {
    const submenu = menu.querySelector('ul');
    const collapseIcon = menu.querySelector('.collapse-icon');

    if (submenu) {
      submenu.style.maxHeight = '0';
      submenu.style.paddingTop = '0';
      submenu.style.overflow = 'hidden';
      submenu.style.transition =
        'max-height 0.5s ease-in-out, padding-top 0.5s ease-in-out';

      if (collapseIcon) {
        collapseIcon.style.transition = 'transform 0.5s ease-in-out';
      }

      menu.addEventListener('click', function () {
        const isOpen = menu.classList.contains('open');

        document.querySelectorAll('.sub-menu.open').forEach((openMenu) => {
          if (openMenu !== menu) {
            const openSubmenu = openMenu.querySelector('ul');
            const openCollapseIcon = openMenu.querySelector('.collapse-icon');
            if (openSubmenu) {
              openSubmenu.style.maxHeight = '0';
              openSubmenu.style.paddingTop = '0';
            }
            if (openCollapseIcon) {
              openCollapseIcon.style.transform = 'rotate(0deg)';
            }
            openMenu.classList.remove('open');
          }
        });

        if (isOpen) {
          submenu.style.maxHeight = '0';
          submenu.style.paddingTop = '0';
          if (collapseIcon) {
            collapseIcon.style.transform = 'rotate(0deg)';
          }
          menu.classList.remove('open');
        } else {
          submenu.style.maxHeight = submenu.scrollHeight + 4 + 'px';
          submenu.style.paddingTop = '5px';
          if (collapseIcon) {
            collapseIcon.style.transform = 'rotate(180deg)';
          }
          menu.classList.add('open');
        }
      });
    }
  });
}

// Scroll to top
export function scrollToTop() {
  const scrollToTopButton = document.getElementById('scrollToTop');

  if (scrollToTopButton) {
    function toggleScrollToTopButton() {
      if (window.scrollY >= 200) {
        scrollToTopButton.classList.add('show');
      } else {
        scrollToTopButton.classList.remove('show');
      }
    }

    toggleScrollToTopButton();
    window.addEventListener('scroll', toggleScrollToTopButton);

    scrollToTopButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    return () => window.removeEventListener('scroll', toggleScrollToTopButton);
  }
}

// Active Toggle State

export function stateToggle(targetSelector, activeClass = 'active') {
  const targets = document.querySelectorAll(targetSelector);

  if (targets) {
    targets.forEach((target) => target.classList.toggle(activeClass));
  }
}
