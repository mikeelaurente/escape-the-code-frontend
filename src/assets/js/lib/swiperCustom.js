import Swiper from "swiper/bundle";

export default function SwiperSliders() {
  // Infinity Slide start
  let infinityCarousel = document.querySelector(".infinity-slide-carousel");
  if (infinityCarousel) {
    const swiper = new Swiper(infinityCarousel, {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 24,
      speed: 6000,
      autoplay: {
        delay: 100,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      centeredSlides: false,
      breakpoints: {
        0: {
          spaceBetween: 40,
        },
        768: {
          spaceBetween: 48,
        },
        992: {
          spaceBetween: 60,
        },
      },
    });
  }
  // Infinity Slide end

  // Initialize the thumbs carousel
  function initializeThumbsCarousel(container) {
    // Check if the container exists
    if (!container) return;

    const thumbsGallery = container.querySelector(".thumbs-gallery");
    const thumbsGalleryMain = container.querySelector(".thumbs-gallery-main");

    if (thumbsGallery && thumbsGalleryMain) {
      // Get custom attributes
      const direction =
        container.getAttribute("data-carousel-direction") || "horizontal";

      const slidesPerView =
        parseInt(container.getAttribute("data-slides-per-view")) || 3;

      // Initialize the thumbs gallery
      const galleryThumbs = new Swiper(thumbsGallery, {
        spaceBetween: 10,
        slidesPerView: slidesPerView,
        loop: true,
        speed: 500,
        freeMode: true,
        loopedSlides: 4,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: direction, // Apply reverse direction if specified
        breakpoints: {
          768: {
            spaceBetween: 20,
          },
          992: {
            spaceBetween: 24,
          },
        },
      });

      // Initialize the main gallery
      new Swiper(thumbsGalleryMain, {
        spaceBetween: 10,
        slidesPerView: 1,
        loop: true,
        speed: 800,
        loopedSlides: 4,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".thumbs-gallery-pagination",
          clickable: true,
        },
        thumbs: {
          swiper: galleryThumbs,
        },
      });
    }
  }

  if (document.querySelectorAll(".thumbs-carousel-container")) {
    document
      .querySelectorAll(".thumbs-carousel-container")
      .forEach(initializeThumbsCarousel);
  }
  // Thumbs slider end

  // one cards Carousel start
  let oneCardCarousels = document.querySelectorAll(".one-card-carousel");

  if (oneCardCarousels.length > 0) {
    oneCardCarousels.forEach((el, idx) => {
      const carouselName = el.getAttribute("data-carousel-name");
      const reverseDir = el.getAttribute("data-carousel-reverse");
      new Swiper(el, {
        loop: true,
        slidesPerView: 1,
        speed: 1000,
        centeredSlides: false,
        rtl: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
          reverseDirection: reverseDir,
        },
        spaceBetween: 24,
        navigation: {
          nextEl: `.${carouselName}-carousel-next`,
          prevEl: `.${carouselName}-carousel-prev`,
        },
        pagination: {
          el: `.${carouselName}-carousel-pagination`,
          clickable: true,
        },
        scrollbar: {
          el: `.swiper-scrollbar `,
          draggable: true,
        },
      });
    });
  }
  //one cards Carousel end

  // two cards Carousel start
  let twoCardCarousels = document.querySelectorAll(".two-card-carousel");

  if (twoCardCarousels.length > 0) {
    twoCardCarousels.forEach((el, idx) => {
      const carouselName = el.getAttribute("data-carousel-name");
      const reverseDir = el.getAttribute("data-carousel-reverse");
      new Swiper(el, {
        loop: true,
        slidesPerView: 4,
        speed: 1000,
        centeredSlides: false,
        rtl: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
          reverseDirection: reverseDir,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 14,
          },
          576: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1800: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
        navigation: {
          nextEl: `.${carouselName}-carousel-next`,
          prevEl: `.${carouselName}-carousel-prev`,
        },
        pagination: {
          el: `.${carouselName}-carousel-pagination`,
          clickable: true,
        },
        scrollbar: {
          el: `.swiper-scrollbar `,
          draggable: true,
        },
      });
    });
  }
  //two cards Carousel end

  // three cards Carousel start
  let threeCardCarousels = document.querySelectorAll(".three-card-carousel");

  if (threeCardCarousels.length > 0) {
    threeCardCarousels.forEach((el, idx) => {
      const carouselName = el.getAttribute("data-carousel-name");
      const reverseDir = el.getAttribute("data-carousel-reverse");
      new Swiper(el, {
        loop: true,
        slidesPerView: 3,
        speed: 1000,
        centeredSlides: false,
        rtl: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
          reverseDirection: reverseDir,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 14,
          },
          576: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
        navigation: {
          nextEl: `.${carouselName}-carousel-next`,
          prevEl: `.${carouselName}-carousel-prev`,
        },
        pagination: {
          el: `.${carouselName}-carousel-pagination`,
          clickable: true,
        },
        scrollbar: {
          el: `.swiper-scrollbar `,
          draggable: true,
        },
      });
    });
  }

  let storiesCarousels = document.querySelectorAll(".stories-carousel");

  if (storiesCarousels.length > 0) {
    storiesCarousels.forEach((el, idx) => {
      const carouselName = el.getAttribute("data-carousel-name");
      const reverseDir = el.getAttribute("data-carousel-reverse");
      new Swiper(el, {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 24,
        speed: 1000,
        centeredSlides: false,
        rtl: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
          reverseDirection: reverseDir,
        },
        navigation: {
          nextEl: `.${carouselName}-carousel-next`,
          prevEl: `.${carouselName}-carousel-prev`,
        },
      });
    });
  }
  //three cards Carousel end

  // four cards Carousel start
  let fourCardCarousels = document.querySelectorAll(".four-card-carousel");

  if (fourCardCarousels.length > 0) {
    fourCardCarousels.forEach((el, idx) => {
      const carouselName = el.getAttribute("data-carousel-name");
      const reverseDir = el.getAttribute("data-carousel-reverse");
      new Swiper(el, {
        loop: true,
        slidesPerView: 4,
        speed: 500,
        centeredSlides: false,
        autoplay: {
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
          reverseDirection: reverseDir,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 14,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
        navigation: {
          nextEl: `.${carouselName}-carousel-next`,
          prevEl: `.${carouselName}-carousel-prev`,
        },
        pagination: {
          el: `.${carouselName}-carousel-pagination`,
          clickable: true,
        },
        scrollbar: {
          el: `.swiper-scrollbar `,
          draggable: true,
        },
      });
    });
  }
  //four cards Carousel end

  // Messenger Carousel start
  const messengerCarousels = document.querySelectorAll(".messenger-carousel");
  if (messengerCarousels) {
    messengerCarousels.forEach((el) => {
      new Swiper(el, {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: false,
        direction: "vertical",
        speed: 100,
        mousewheel: true,
      });
    });
  }

  const activeMembersCarousels = document.querySelectorAll(
    ".active-members-carousel"
  );
  if (activeMembersCarousels) {
    activeMembersCarousels.forEach((el) => {
      new Swiper(el, {
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 16,
        centeredSlides: false,
        direction: "horizontal",
        speed: 1000,
        autoplay: {
          delay: 1000,
          disableOnInteraction: true,
          pauseOnMouseEnter: false,
        },
        mousewheel: true,
      });
    });
  }
  // Messenger Carousel end
}
