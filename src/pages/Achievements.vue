<template>
  <div>
    <!-- breadcrumb start -->
    <section class="pt-30p">
      <div class="section-pt">
        <div
          class="relative bg-[url('../images/photos/breadcrumbImg.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden"
        >
          <div class="container">
            <div
              class="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]"
            >
              <div class="lg:col-start-2 lg:col-end-12 col-span-12">
                <h2 class="heading-2 text-w-neutral-1 mb-3">Achievements</h2>
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/" class="breadcrumb-link"
                      >Home</router-link
                    >
                  </li>
                  <li class="breadcrumb-item">
                    <span class="breadcrumb-icon">
                      <i class="ti ti-chevrons-right"></i>
                    </span>
                  </li>
                  <li class="breadcrumb-item">
                    <span class="breadcrumb-current">Achievements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="overlay-11"></div>
        </div>
      </div>
    </section>
    <!-- breadcrumb end -->
    <!-- User profile Achievements section start -->
    <section class="section-pb pt-60p overflow-visible">
      <div class="container">
        <div class="grid grid-cols-12">
          <div class="4xl:col-start-2 4xl:col-end-11 col-span-12">
            <div
              class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p py-40p 4xl:px-[70px] px-40p bg-b-neutral-3 rounded-12"
            >
              <!-- achievements 1 -->
              <div
                class="bg-b-neutral-4 py-32p px-40p flex-col-c text-center rounded-12"
              >
                <img
                  class="size-140p rounded-full mb-16p"
                  src="../assets/images/games/gameLogo9.png"
                  alt="game"
                />
                <a
                  href="./game-details.html"
                  class="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-3"
                >
                  Gameplays
                </a>
                <span class="text-m-medium text-primary mb-16p"> 3 of 20 </span>
                <div
                  x-data="progressBar(0, 45)"
                  x-init="init()"
                  class="overflow-x-hidden w-full"
                >
                  <div class="flex items-center w-full">
                    <div class="w-3.5 h-5 bg-primary"></div>
                    <div
                      x-intersect.once="$dispatch('start-progress')"
                      class="relative w-full h-2.5 bg-w-neutral-3"
                    >
                      <span
                        :style="'width:' + progress + '%'"
                        class="progressbar-1 h-full"
                      >
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- achievements 2 -->
              <div
                class="bg-b-neutral-4 py-32p px-40p flex-col-c text-center rounded-12"
              >
                <img
                  class="size-140p rounded-full mb-16p"
                  src="../assets/images/games/gameLogo10.png"
                  alt="game"
                />
                <a
                  href="./game-details.html"
                  class="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-3"
                >
                  Gameplays
                </a>
                <span class="text-m-medium text-primary mb-16p"> 3 of 20 </span>
                <div
                  x-data="progressBar(0, 45)"
                  x-init="init()"
                  class="overflow-x-hidden w-full"
                >
                  <div class="flex items-center w-full">
                    <div class="w-3.5 h-5 bg-primary"></div>
                    <div
                      x-intersect.once="$dispatch('start-progress')"
                      class="relative w-full h-2.5 bg-w-neutral-3"
                    >
                      <span
                        :style="'width:' + progress + '%'"
                        class="progressbar-1 h-full"
                      >
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- achievements 3 -->
              <div
                class="bg-b-neutral-4 py-32p px-40p flex-col-c text-center rounded-12"
              >
                <img
                  class="size-140p rounded-full mb-16p"
                  src="../assets/images/games/gameLogo11.png"
                  alt="game"
                />
                <a
                  href="./game-details.html"
                  class="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-3"
                >
                  Gameplays
                </a>
                <span class="text-m-medium text-primary mb-16p"> 3 of 20 </span>
                <div
                  x-data="progressBar(0, 45)"
                  x-init="init()"
                  class="overflow-x-hidden w-full"
                >
                  <div class="flex items-center w-full">
                    <div class="w-3.5 h-5 bg-primary"></div>
                    <div
                      x-intersect.once="$dispatch('start-progress')"
                      class="relative w-full h-2.5 bg-w-neutral-3"
                    >
                      <span
                        :style="'width:' + progress + '%'"
                        class="progressbar-1 h-full"
                      >
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- achievements 4 -->
              <div
                class="bg-b-neutral-4 py-32p px-40p flex-col-c text-center rounded-12"
              >
                <img
                  class="size-140p rounded-full mb-16p"
                  src="../assets/images/games/gameLogo12.png"
                  alt="game"
                />
                <a
                  href="./game-details.html"
                  class="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-3"
                >
                  Gameplays
                </a>
                <span class="text-m-medium text-primary mb-16p"> 3 of 20 </span>
                <div
                  x-data="progressBar(0, 45)"
                  x-init="init()"
                  class="overflow-x-hidden w-full"
                >
                  <div class="flex items-center w-full">
                    <div class="w-3.5 h-5 bg-primary"></div>
                    <div
                      x-intersect.once="$dispatch('start-progress')"
                      class="relative w-full h-2.5 bg-w-neutral-3"
                    >
                      <span
                        :style="'width:' + progress + '%'"
                        class="progressbar-1 h-full"
                      >
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- achievements 5 -->
              <div
                class="bg-b-neutral-4 py-32p px-40p flex-col-c text-center rounded-12"
              >
                <img
                  class="size-140p rounded-full mb-16p"
                  src="../assets/images/games/gameLogo13.png"
                  alt="game"
                />
                <a
                  href="./game-details.html"
                  class="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-3"
                >
                  Gameplays
                </a>
                <span class="text-m-medium text-primary mb-16p"> 3 of 20 </span>
                <div
                  x-data="progressBar(0, 45)"
                  x-init="init()"
                  class="overflow-x-hidden w-full"
                >
                  <div class="flex items-center w-full">
                    <div class="w-3.5 h-5 bg-primary"></div>
                    <div
                      x-intersect.once="$dispatch('start-progress')"
                      class="relative w-full h-2.5 bg-w-neutral-3"
                    >
                      <span
                        :style="'width:' + progress + '%'"
                        class="progressbar-1 h-full"
                      >
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- User profile Achievements section end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
    };
  },
  mounted() {
    console.log('Achievements');
  },
};
</script>
