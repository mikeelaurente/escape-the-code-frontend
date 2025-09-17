export default function cursorAnimation() {
  // Custom cursor script
  const cursorOuter = document.querySelector(".cursor-outer");
  const cursorInner = document.querySelector(".cursor-inner");

  if (cursorOuter && cursorInner) {
    window.addEventListener("mousemove", (e) => {
      const { clientX: x, clientY: y } = e;
      cursorOuter.style.transform = `translate(${x}px, ${y}px)`;
      cursorInner.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  let isCursorHovering = false;
  let isCursorBig = false;

  // Update cursor position
  window.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    cursorOuter.style.transform = `translate(${x}px, ${y}px)`;
    cursorInner.style.transform = `translate(${x}px, ${y}px)`;
  });

  // Add hover effects for clickable elements
  const handleCursorHover = () => {
    isCursorHovering = true;
    cursorOuter.classList.add("cursor-hover");
    cursorInner.classList.add("cursor-hover");
  };

  const handleCursorLeave = () => {
    isCursorHovering = false;
    cursorOuter.classList.remove("cursor-hover");
    cursorInner.classList.remove("cursor-hover");
  };

  // Add hover effects for title elements
  const handleMouseEnterTitle = () => {
    isCursorBig = true;
    cursorOuter.classList.add("cursor-big");
    cursorInner.classList.add("cursor-big");
  };

  const handleMouseLeaveTitle = () => {
    isCursorBig = false;
    cursorOuter.classList.remove("cursor-big");
    cursorInner.classList.remove("cursor-big");
  };

  // Add event listeners to title and clickable elements
  document.querySelectorAll("h1, p, h2, h3, h4, h5, h6").forEach((el) => {
    el.addEventListener("mouseover", handleMouseEnterTitle);
    el.addEventListener("mouseout", handleMouseLeaveTitle);
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", handleCursorHover);
    el.addEventListener("mouseleave", handleCursorLeave);
  });
}
