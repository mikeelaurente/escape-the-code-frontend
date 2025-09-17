import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";

export function lightGalleryCustom() {
  const $dynamicGallery = document.getElementById("gallery-container");
  const dynamicGallery = lightGallery($dynamicGallery, {
    dynamic: true,
    plugins: [lgThumbnail],
    dynamicEl: [
      {
        src: "./assets/images/photos/heroBanner4.webp",
        thumb: "./assets/images/photos/heroBanner4.webp",
      },
      {
        src: "./assets/images/photos/heroBanner10.webp",
        thumb: "./assets/images/photos/heroBanner10.webp",
      },
      {
        src: "./assets/images/photos/heroBanner11.webp",
        thumb: "./assets/images/photos/heroBanner11.webp",
      },
      {
        src: "./assets/images/photos/heroBanner2.webp",
        thumb: "./assets/images/photos/heroBanner2.webp",
      },
      {
        src: "./assets/images/photos/heroBanner1.webp",
        thumb: "./assets/images/photos/heroBanner1.webp",
      },
    ],
  });

  document.querySelectorAll(".gallery-items").forEach((el, index) => {
    el.addEventListener("click", () => {
      dynamicGallery.openGallery(index);
    });
  });
}
