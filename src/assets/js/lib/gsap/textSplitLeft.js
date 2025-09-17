import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export function TextSplitLeft() {
  const animatedElements = document.querySelectorAll(".text-split-left");

  animatedElements.forEach((element) => {
    // if (window.innerWidth >= 768 && element) {
    // Split the text into words and characters
    const splitText = new SplitType(element, {
      types: "words,chars",
      tagName: "span",
    });

    const chars = splitText.chars;

    if (chars) {
      // Apply GSAP animation to each character
      chars.forEach((char, index) => {
        gsap.from(char, {
          duration: 0.8,
          x: 70,
          delay: index * 0.03,
          autoAlpha: 0,
          scrollTrigger: {
            trigger: char,
            start: "top 95%",
            end: "bottom 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }

    // General animation for the whole element (if necessary)
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 100%",
      },
    });
    // }
  });
}
