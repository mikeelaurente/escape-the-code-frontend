export default function preloader() {
  // Get the preloader element(s)
  const preloaders = document.querySelectorAll(".preloader");

  // Loop through each preloader if there are multiple elements with the class
  preloaders.forEach((preloader) => {
    // Set a timeout to fade out the preloader after 3 seconds (3000 milliseconds)
    setTimeout(function () {
      // Animate opacity to 0 over 500 milliseconds
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";

      // After the animation is complete, hide the preloader
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500); // Duration of the fade-out animation
    }, 1000); // Delay before starting the fade-out
  });
}
