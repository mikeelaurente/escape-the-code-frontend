<template>
  <!-- hero section start -->
  <section class="section-pt">
    <div class="container relative pt-[30px]">
      <div
        class="thumbs-carousel-container"
        data-carousel-name="home-hero-slider"
        data-slides-per-view="3"
      >
        <div class="swiper thumbs-gallery-main">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="w-full rounded-32 overflow-hidden relative">
                <img
                  class="w-full xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                  src="../assets/images/photos/heroBanner1.webp"
                  alt="product"
                />
                <div
                  class="absolute inset-0 z-[2] mx-80p 3xl:pt-[125px] xxl:pt-28 xl:pt-25 md:pt-12 pt-8"
                >
                  <div class="max-w-[790px]">
                    <h1
                      class="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                      data-text="UNITE. PLAY. CONQUER."
                    >
                      UNITE. PLAY. CONQUER.
                    </h1>
                    <div
                      class="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p"
                    >
                      <span class="text-m-medium text-w-neutral-1">
                        Leagues of Legends
                      </span>
                      <span
                        class="badge badge-circle badge-dot badge-light size-1"
                      ></span>
                      <span class="text-m-medium text-w-neutral-1">
                        Us English
                      </span>
                    </div>
                    <a
                      @click="startNow()"
                      class="btn btn-lg btn-primary rounded-12"
                    >
                      Start Now
                    </a>
                  </div>
                </div>
                <div class="overlay-1"></div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="w-full rounded-32 overflow-hidden relative">
                <img
                  class="w-full xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                  src="../assets/images/photos/heroBanner2.webp"
                  alt="product"
                />
                <div
                  class="absolute inset-0 z-[2] mx-80p 3xl:pt-[160px] xxl:pt-30 xl:pt-25 md:pt-12 pt-8"
                >
                  <div class="max-w-[790px]">
                    <h1
                      class="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                      data-text="UNITE. PLAY. CONQUER."
                    >
                      UNITE. PLAY. CONQUER.
                    </h1>
                    <div
                      class="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p"
                    >
                      <span class="text-m-medium text-w-neutral-1">
                        Leagues of Legends
                      </span>
                      <span
                        class="badge badge-circle badge-dot badge-light size-1"
                      ></span>
                      <span class="text-m-medium text-w-neutral-1">
                        Us English
                      </span>
                    </div>
                    <a
                      href="./game-details.html"
                      class="btn btn-lg btn-primary rounded-12"
                    >
                      Start Now
                    </a>
                  </div>
                </div>
                <div class="overlay-1"></div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="w-full rounded-32 overflow-hidden relative">
                <img
                  class="w-full xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                  src="../assets/images/photos/heroBanner3.webp"
                  alt="product"
                />
                <div
                  class="absolute inset-0 z-[2] mx-80p 3xl:pt-[160px] xxl:pt-30 xl:pt-25 md:pt-12 pt-8"
                >
                  <div class="max-w-[790px]">
                    <h1
                      class="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                      data-text="UNITE. PLAY. CONQUER."
                    >
                      UNITE. PLAY. CONQUER.
                    </h1>
                    <div
                      class="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p"
                    >
                      <span class="text-m-medium text-w-neutral-1">
                        Leagues of Legends
                      </span>
                      <span
                        class="badge badge-circle badge-dot badge-light size-1"
                      ></span>
                      <span class="text-m-medium text-w-neutral-1">
                        Us English
                      </span>
                    </div>
                    <a
                      href="./game-details.html"
                      class="btn btn-lg btn-primary rounded-12"
                    >
                      Start Now
                    </a>
                  </div>
                </div>
                <div class="overlay-1"></div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="w-full rounded-32 overflow-hidden relative">
                <img
                  class="w-full xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                  src="../assets/images/photos/heroBanner1.webp"
                  alt="product"
                />
                <div
                  class="absolute inset-0 z-[2] mx-80p 3xl:pt-[160px] xxl:pt-30 xl:pt-25 md:pt-12 pt-8"
                >
                  <div class="max-w-[790px]">
                    <h1
                      class="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                      data-text="UNITE. PLAY. CONQUER."
                    >
                      UNITE. PLAY. CONQUER.
                    </h1>
                    <div
                      class="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p"
                    >
                      <span class="text-m-medium text-w-neutral-1">
                        Leagues of Legends
                      </span>
                      <span
                        class="badge badge-circle badge-dot badge-light size-1"
                      ></span>
                      <span class="text-m-medium text-w-neutral-1">
                        Us English
                      </span>
                    </div>
                    <a
                      href="./game-details.html"
                      class="btn btn-lg btn-primary rounded-12"
                    >
                      Start Now
                    </a>
                  </div>
                </div>
                <div class="overlay-1"></div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="w-full rounded-32 overflow-hidden relative">
                <img
                  class="w-full xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                  src="../assets/images/photos/heroBanner2.webp"
                  alt="product"
                />
                <div
                  class="absolute inset-0 z-[2] mx-80p 3xl:pt-[160px] xxl:pt-30 xl:pt-25 md:pt-12 pt-8"
                >
                  <div class="max-w-[790px]">
                    <h1
                      class="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                      data-text="UNITE. PLAY. CONQUER."
                    >
                      UNITE. PLAY. CONQUER.
                    </h1>
                    <div
                      class="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p"
                    >
                      <span class="text-m-medium text-w-neutral-1">
                        Leagues of Legends
                      </span>
                      <span
                        class="badge badge-circle badge-dot badge-light size-1"
                      ></span>
                      <span class="text-m-medium text-w-neutral-1">
                        Us English
                      </span>
                    </div>
                    <a
                      href="./game-details.html"
                      class="btn btn-lg btn-primary rounded-12"
                    >
                      Start Now
                    </a>
                  </div>
                </div>
                <div class="overlay-1"></div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="w-full rounded-32 overflow-hidden relative">
                <img
                  class="w-full xxl:h-[630px] xl:h-[580px] lg:h-[520px] md:h-[420px] sm:h-[380px] h-[300px] object-cover"
                  src="../assets/images/photos/heroBanner3.webp"
                  alt="product"
                />
                <div
                  class="absolute inset-0 z-[2] mx-80p 3xl:pt-[160px] xxl:pt-30 xl:pt-25 md:pt-12 pt-8"
                >
                  <div class="max-w-[790px]">
                    <h1
                      class="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                      data-text="UNITE. PLAY. CONQUER."
                    >
                      UNITE. PLAY. CONQUER.
                    </h1>
                    <div
                      class="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p"
                    >
                      <span class="text-m-medium text-w-neutral-1">
                        Leagues of Legends
                      </span>
                      <span
                        class="badge badge-circle badge-dot badge-light size-1"
                      ></span>
                      <span class="text-m-medium text-w-neutral-1">
                        Us English
                      </span>
                    </div>
                    <a
                      href="./game-details.html"
                      class="btn btn-lg btn-primary rounded-12"
                    >
                      Start Now
                    </a>
                  </div>
                </div>
                <div class="overlay-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="md:absolute lg:right-15 md:right-12 lg:bottom-15 md:bottom-12 z-[2] overflow-hidden pt-5 flex justify-end"
        >
          <div
            class="thumbs-gallery xxl:w-[572px] lg:w-[400px] md:w-[380px] xsm:w-[300px] w-full h-fit overflow-hidden"
          >
            <div class="swiper-wrapper pb-10">
              <div class="swiper-slide">
                <div class="overflow-hidden cursor-pointer rounded-20">
                  <img
                    class="xxl:w-[180px] xl:w-[140px] lg:w-[120px] md:w-25 w-20 xxl:h-[110px] xl:h-24 lg:h-20 md:h-18 h-16 hover:scale-110 hover:-rotate-6 object-cover transition-1"
                    src="../assets/images/photos/heroBanner1.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="overflow-hidden cursor-pointer rounded-20">
                  <img
                    class="xxl:w-[180px] xl:w-[140px] lg:w-[120px] md:w-25 w-20 xxl:h-[110px] xl:h-24 lg:h-20 md:h-18 h-16 hover:scale-110 hover:-rotate-6 object-cover transition-1"
                    src="../assets/images/photos/heroBanner2.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="overflow-hidden cursor-pointer rounded-20">
                  <img
                    class="xxl:w-[180px] xl:w-[140px] lg:w-[120px] md:w-25 w-20 xxl:h-[110px] xl:h-24 lg:h-20 md:h-18 h-16 hover:scale-110 hover:-rotate-6 object-cover transition-1"
                    src="../assets/images/photos/heroBanner3.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="overflow-hidden cursor-pointer rounded-20">
                  <img
                    class="xxl:w-[180px] xl:w-[140px] lg:w-[120px] md:w-25 w-20 xxl:h-[110px] xl:h-24 lg:h-20 md:h-18 h-16 hover:scale-110 hover:-rotate-6 object-cover transition-1"
                    src="../assets/images/photos/heroBanner1.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="overflow-hidden cursor-pointer rounded-20">
                  <img
                    class="xxl:w-[180px] xl:w-[140px] lg:w-[120px] md:w-25 w-20 xxl:h-[110px] xl:h-24 lg:h-20 md:h-18 h-16 hover:scale-110 hover:-rotate-6 object-cover transition-1"
                    src="../assets/images/photos/heroBanner2.webp"
                    alt="product"
                  />
                </div>
              </div>
              <div class="swiper-slide">
                <div class="overflow-hidden cursor-pointer rounded-20">
                  <img
                    class="xxl:w-[180px] xl:w-[140px] lg:w-[120px] md:w-25 w-20 xxl:h-[110px] xl:h-24 lg:h-20 md:h-18 h-16 hover:scale-110 hover:-rotate-6 object-cover transition-1"
                    src="../assets/images/photos/heroBanner3.webp"
                    alt="product"
                  />
                </div>
              </div>
            </div>
            <div
              class="swiper-pagination pagination-three thumbs-gallery-pagination flex-c gap-2.5"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    startNow: () => {
      alert('Start Now');
    },
  },
};
</script>
