// animations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

// Utility function to check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.documentWidth)
  );
};

// Create split text instances only when needed
const createSplitText = (element, types = "words,chars") => {
  if (!element.splitInstance) {
    element.splitInstance = new SplitType(element, {
      types,
      tagName: "div",
    });
  }
  return element.splitInstance;
};

// Batch animations using requestAnimationFrame
const batchAnimations = (() => {
  const callbacks = new Set();
  let scheduled = false;

  const run = () => {
    callbacks.forEach((cb) => cb());
    callbacks.clear();
    scheduled = false;
  };

  return (callback) => {
    callbacks.add(callback);
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(run);
    }
  };
})();

// Shared ScrollTrigger configuration
const defaultScrollConfig = {
  start: "top 95%",
  end: "bottom 80%",
  toggleActions: "play none none none",
};

// Main animation function that handles all text split animations
export function gsapCustom() {
  // Create a single IntersectionObserver for all animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          batchAnimations(() => animateElement(element));
          observer.unobserve(element); // Animate only once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  // Animation configurations
  const animations = {
    "text-split-left": {
      from: { x: 70, autoAlpha: 0 },
      to: { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.03 },
    },
    "text-split-top": {
      from: { y: -25, rotation: -3, scale: 0.8, autoAlpha: 0 },
      to: {
        y: 0,
        rotation: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "elastic.out(1, 0.7)",
      },
    },
    "text-split-bottom": {
      from: { y: 50, autoAlpha: 0 },
      to: {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "elastic.out(1, 0.7)",
      },
    },
    "text-split-lines": {
      from: { y: 100, autoAlpha: 0 },
      to: {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.05,
        ease: "back.inOut",
      },
    },
  };

  // Find all elements to animate
  Object.keys(animations).forEach((className) => {
    document.querySelectorAll(`.${className}`).forEach((element) => {
      observer.observe(element);
    });
  });

  // Function to animate a single element
  function animateElement(element) {
    // Determine animation type from class
    const animationType = Object.keys(animations).find((key) =>
      element.classList.contains(key)
    );
    if (!animationType) return;

    const config = animations[animationType];
    const splitType = animationType === "text-split-lines" ? "lines" : "chars";

    try {
      const split = createSplitText(element, `words,${splitType}`);
      const targets = split[splitType];

      if (targets) {
        gsap.fromTo(targets, config.from, {
          ...config.to,
          scrollTrigger: {
            trigger: element,
            ...defaultScrollConfig,
          },
        });
      }
    } catch (error) {
      console.warn(`Animation failed for element:`, element, error);
    }
  }
}
