import VanillaTilt from "vanilla-tilt";

// Reusable function to initialize VanillaTilt on multiple elements
export const TiltEffect = (selector = ".tilt-card", options = {}) => {
  // Check if the screen width is less than or equal to 720px
  if (window.innerWidth >= 768) {
    const elements = document.querySelectorAll(selector);

    // Initialize VanillaTilt with options for all selected elements
    VanillaTilt.init(elements, {
      reverse: false,
      max: 10,
      perspective: 1000,
      scale: 1,
      speed: 1500,
      transition: true,
      axis: null,
      reset: true,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      glare: true,
      "max-glare": 0,
      ...options, // Spread custom options passed to the function
    });
  }
};
