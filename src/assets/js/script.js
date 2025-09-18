/* ---------- Import All Libraries and Plugins Start ---------- */
import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import AOS from 'aos';
import './../styles/app.scss';

/* ---------- Import All Libraries and Plugins End ---------- */

/* ---------- Import All Custom Utilities functions Start ---------- */
import {
  activeMenu,
  currentYear,
  initializeCart,
  navScrollAnimation,
  popupVideoModal,
  preloader,
  priceRange,
  pricingPlan,
  productQty,
  scrollToTop,
  setupMobileSubmenu,
  setupNavigation,
} from './main.js';
import progressBar from './app/progressBar.js';
import circleTextSpin from './app/circleTextSpin.js';
/* ---------- Import All Custom Utilities functions End ---------- */

/* ---------- Import All Dataset Start ---------- */
import { intersect } from '@alpinejs/intersect';
import SwiperSliders from './lib/swiperCustom.js';
import { OdometerCounter } from './lib/odometerCustom.js';
import { TiltEffect } from './lib/tiltCustom.js';
import { FlatpickrCustom } from './lib/flatpickrCustom.js';
import { SlimSelectCustom } from './lib/SlimSelectCustom.js';
import { CountdownCustom } from './lib/CountdownCustom.js';
import { lightGalleryCustom } from './lib/lightGalleryCustom.js';
import { plyrCustom } from './lib/plyrCustom.js';
/* ---------- Import All Dataset End ---------- */

// Setup Alpine.js configuration
// Alpine.plugin(collapse);
// Alpine.plugin(focus);
// Alpine.plugin(intersect);

// Alpine.data('progressBar', progressBar);

// Alpine.data('modal', () => ({
//   modalOpen: false,
//   open() {
//     this.modalOpen = true;
//   },
//   close() {
//     this.modalOpen = false;
//   },
//   toggle() {
//     this.modalOpen = !this.modalOpen;
//   },
// }));

// Alpine.data('accordion', () => ({
//   activeAccordion: null,
//   setActiveAccordion(id) {
//     this.activeAccordion = this.activeAccordion === id ? null : id;
//   },
// }));

// Alpine.data('dropdown', () => ({
//   isOpen: false,
//   activeItem: null,
//   toggle() {
//     this.isOpen = !this.isOpen;
//   },
//   close() {
//     this.isOpen = false;
//   },
// }));

// Alpine.start();

// Setup AOS animation with optimized settings
AOS.init({
  // disable: window.innerWidth < 768,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,
  offset: 150,
  delay: 0,
  duration: 500,
  easing: 'ease',
  once: true, // Changed to true for better performance
  mirror: false,
  anchorPlacement: 'top-bottom',
});

// Async function to load GSAP animations
async function loadAnimations() {
  try {
    const { gsapCustom } = await import('./lib/gsap/gsapCustom.js');
    gsapCustom();
  } catch (error) {
    console.warn('Failed to load GSAP animations:', error);
  }
}

// Function to check if animations should be loaded
function shouldLoadAnimations() {
  return (
    window.innerWidth >= 768 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    'IntersectionObserver' in window
  );
}

// Initialize functions when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', function () {
  // First load critical UI functions
  const initCriticalFunctions = () => {
    navScrollAnimation();
    preloader();
    scrollToTop();
    activeMenu();
    currentYear();
    initializeCart();
  };

  // Then load non-critical UI functions
  const initSecondaryFunctions = () => {
    popupVideoModal();
    circleTextSpin();
    priceRange();
    pricingPlan();
    productQty();
  };

  // Finally load plugins and animations
  const initPlugins = () => {
    // Load custom plugins
    OdometerCounter();
    TiltEffect();
    SwiperSliders();
    FlatpickrCustom();
    SlimSelectCustom();
    CountdownCustom();
    lightGalleryCustom();
    plyrCustom();

    // Load GSAP animations if conditions are met
    // if (shouldLoadAnimations()) {
    loadAnimations();
    // }
  };

  // Execute functions in order with slight delays
  initCriticalFunctions();

  requestAnimationFrame(() => {
    initSecondaryFunctions();

    // Delay plugin initialization slightly
    setTimeout(initPlugins, 100);
  });
});

// Setup navigation
setupNavigation();
setupMobileSubmenu();

// Video poster click handler
document.getElementById('videoPoster')?.addEventListener('click', function () {
  const poster = document.getElementById('videoPoster');
  const player = document.getElementById('videoPlayer');

  if (poster && player) {
    poster.classList.add('hidden');
    player.classList.remove('hidden');

    const currentSrc = player.getAttribute('src');
    if (currentSrc) {
      player.setAttribute('src', currentSrc + '&autoplay=1');
    }
  }
});
import './ace.config.js';
import 'ace-builds/css/ace.css';
import 'flowbite';

import { createApp } from 'vue';
import App from '../../App.vue';
import { createWebHashHistory, createRouter } from 'vue-router';
import Home from '../../pages/Home.vue';
import About from '../../pages/About.vue';
import Story from '../../pages/Story.vue';
import Chapter from '../../pages/Chapter.vue';
import Section from '../../pages/Section.vue';
import Login from '../../pages/Login.vue';
import Register from '../../pages/Register.vue';
import { apiClient } from './http.js';
import { createPinia } from 'pinia';
import { useAuthStore } from '../../stores/auth'; // Import your Pinia store

const pinia = createPinia();
const app = createApp(App);

const routes = [
  { name: 'login', path: '/login', component: Login },
  { path: '/register', component: Register },
  { name: 'home', path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/about', component: About, meta: { requiresAuth: true } },
  { path: '/story', component: Story, meta: { requiresAuth: true } },
  {
    path: '/story/chapters/:chapter',
    component: Chapter,
    meta: { requiresAuth: true },
  },
  {
    path: '/story/chapters/:chapter/:section',
    component: Section,
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore(); // Access the Pinia store
  console.log(authStore.isAuthenticated, authStore.userToken);
  await authStore.init();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    // If the user is authenticated and tries to access the login page,
    // redirect to a dashboard or home page.
    next({ name: 'home' }); // Or whatever your authenticated landing page is
  } else {
    // Allow navigation to proceed.
    next();
  }
});

app.use(pinia);
app.use(router);
app.provide('http', apiClient);
app.mount('#app');
