export function initZoomable() {
  const Default = {
    initialZoom: 3,
    minZoom: 1.25,
    maxZoom: 4,
    zoomSpeed: 0.01,
  };

  const zoomables = document.querySelectorAll(".zoomable");

  zoomables.forEach((element) => {
    let config = {};
    let zoomed = false;
    let initialZoomValue, zoom;

    function mergeConfig(config) {
      return {
        ...Default,
        ...(typeof config === "object" ? config : {}),
      };
    }

    function init() {
      config = mergeConfig(config);
      const { initialZoom, minZoom, maxZoom } = config;
      initialZoomValue = Math.max(Math.min(initialZoom, maxZoom), minZoom);
      zoom = initialZoomValue;

      const img = element.querySelector(".zoomable__img");
      img.draggable = false;
      element.style.setProperty("--zoom", initialZoomValue);

      addEventListeners();
    }

    function addEventListeners() {
      element.addEventListener("mouseover", handleMouseover);
      element.addEventListener("mousemove", handleMousemove);
      element.addEventListener("mouseout", handleMouseout);
      element.addEventListener("wheel", handleWheel);

      element.addEventListener("touchstart", handleTouchstart);
      element.addEventListener("touchmove", handleTouchmove);
      element.addEventListener("touchend", handleTouchend);
    }

    function handleMouseover() {
      if (zoomed) return;
      element.classList.add("zoomable--zoomed");
      zoomed = true;
    }

    function handleMousemove(evt) {
      if (!zoomed) return;
      const elPos = element.getBoundingClientRect();
      const percentageX = `${
        ((evt.clientX - elPos.left) * 100) / elPos.width
      }%`;
      const percentageY = `${
        ((evt.clientY - elPos.top) * 100) / elPos.height
      }%`;
      element.style.setProperty("--zoom-pos-x", percentageX);
      element.style.setProperty("--zoom-pos-y", percentageY);
    }

    function handleMouseout() {
      if (!zoomed) return;
      element.style.setProperty("--zoom", initialZoomValue);
      element.classList.remove("zoomable--zoomed");
      zoomed = false;
    }

    function handleWheel(evt) {
      if (!zoomed) return;
      evt.preventDefault();
      const newZoom = zoom + evt.deltaY * (config.zoomSpeed * -1);
      const { minZoom, maxZoom } = config;
      zoom = Math.max(Math.min(newZoom, maxZoom), minZoom);
      element.style.setProperty("--zoom", zoom);
    }

    function handleTouchstart(evt) {
      evt.preventDefault();
      handleMouseover();
    }

    function handleTouchmove(evt) {
      if (!zoomed) return;
      const elPos = element.getBoundingClientRect();
      let percentageX =
        ((evt.touches[0].clientX - elPos.left) * 100) / elPos.width;
      let percentageY =
        ((evt.touches[0].clientY - elPos.top) * 100) / elPos.height;
      percentageX = Math.max(Math.min(percentageX, 100), 0);
      percentageY = Math.max(Math.min(percentageY, 100), 0);
      element.style.setProperty("--zoom-pos-x", `${percentageX}%`);
      element.style.setProperty("--zoom-pos-y", `${percentageY}%`);
    }

    function handleTouchend() {
      handleMouseout();
    }

    init();
  });
}
