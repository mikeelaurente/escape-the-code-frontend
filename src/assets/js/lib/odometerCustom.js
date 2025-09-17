import Odometer from "odometer";

export function OdometerCounter() {
  const odometerElements = document.querySelectorAll(".odometer");

  function initOdometer(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const odometerElement = entry.target.querySelector(".odometer");
        const elementValue = Number(
          odometerElement.getAttribute("data-counter-value")
        );
        const od = new Odometer({
          el: odometerElement,
          value: 0,
          format: "",
          theme: "digital",
        });
        od.update(elementValue);
        observer.unobserve(entry.target);
      }
    });
  }

  odometerElements &&
    odometerElements.forEach((item) => {
      const observer = new IntersectionObserver(initOdometer);
      observer.observe(item.parentElement);
    });
}
