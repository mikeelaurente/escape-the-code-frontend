import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export function ParallaxImage() {
  const image = document.querySelector(".parallax-image");
  const parallaxContainer = document.querySelector(".parallax-container");

  if (image && parallaxContainer) {
    const yPercent = -40; // Adjust this value for your desired parallax effect

    // Set up GSAP ScrollTrigger for the parallax effect
    gsap.to(image, {
      yPercent: yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: parallaxContainer,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
}
