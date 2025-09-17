import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function staggerBoxs(selector = ".stagger-box", options = {}) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      duration: 1,
      stagger: 0.9,
      scrollTrigger: {
        trigger: element,
        ...options,
      },
    });
  });
}
