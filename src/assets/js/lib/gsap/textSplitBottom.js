import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export function TextSplitBottom() {
  const animatedElements = document.querySelector(".text-split-bottom");

  if (animatedElements) {
    // Split the text into words and characters
    const splitText = new SplitType(animatedElements, {
      types: "words,chars",
      tagName: "span",
    });

    const chars = splitText.chars;

    if (chars) {
      // GSAP animation for characters
      gsap.fromTo(
        chars,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "elastic.out(1, 0.7)",
          scrollTrigger: {
            trigger: animatedElements,
            start: "top 95%",
            end: "bottom 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Additional opacity animation for characters
      gsap.to(chars, {
        // opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        delay: 2, // Adjusted delay to account for the initial animation
        scrollTrigger: {
          trigger: animatedElements,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }
  }
}
