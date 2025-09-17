import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export function TextSplitTop() {
  const animatedElements = document.querySelector(".text-split-top");

  if (animatedElements) {
    // Split the text into words and characters
    const splitText = new SplitType(animatedElements, {
      types: "words,chars",
      tagName: "span",
    });

    const chars = splitText.chars;

    if (chars) {
      // Create GSAP timeline for animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: animatedElements,
          start: "top 95%",
          end: "bottom 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate each character from top to bottom with staggered effect
      tl.fromTo(
        chars,
        {
          y: -25,
          rotation: -3,
          opacity: 0,
          scale: 0.8,
          autoAlpha: 0,
        },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "elastic.out(1, 0.7)",
          autoAlpha: 1,
        }
      ).to(chars, {
        // opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        delay: 2,
        autoAlpha: 1,
      });
    }
  }
}
