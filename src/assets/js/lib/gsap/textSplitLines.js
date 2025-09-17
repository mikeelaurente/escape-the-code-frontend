import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export function TextSplitLines() {
  const animatedElements = document.querySelector(".text-split-lines");

  if (animatedElements) {
    try {
      // Split the text into words, lines, and characters
      const mySplitText = new SplitType(animatedElements, {
        types: "words,lines,chars",
        tagName: "span",
      });

      // Animate lines from the bottom
      gsap.from(mySplitText.lines, {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "back.inOut",
        scrollTrigger: {
          trigger: animatedElements,
          start: "top 95%",
          end: "bottom 80%",
          toggleActions: "play none none none",
        },
      });

      // Additional opacity animation for lines
      gsap.to(mySplitText.lines, {
        // opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        delay: 2.2, // Adjusted delay to account for the initial animation
        scrollTrigger: {
          trigger: animatedElements,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    } catch (error) {
      console.error("Error creating SplitText:", error);
    }
  }
}
