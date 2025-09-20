<template>
  <!-- breadcrumb start -->
  <section class="pt-30p">
    <div class="section-pt" v-if="chapter.id">
      <div
        class="relative bg-[url('../images/photos/breadcrumbImg.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden"
      >
        <div class="container">
          <div
            class="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]"
          >
            <div class="lg:col-start-2 lg:col-end-12 col-span-12">
              <h2 class="heading-2 text-w-neutral-1 mb-3">
                {{ chapter.title }}
              </h2>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#" class="breadcrumb-link"> Home </a>
                </li>
                <li class="breadcrumb-item">
                  <span class="breadcrumb-icon">
                    <i class="ti ti-chevrons-right"></i>
                  </span>
                </li>
                <li class="breadcrumb-item">
                  <span class="breadcrumb-current">Trending</span>
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

  <!-- trending section start -->
  <section class="section-pb pt-60p">
    <div class="container">
      <div
        class="grid 4xl:grid-cols-2 xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24p"
      >
        <div
          v-for="section in chapter.sections"
          :key="section.id"
          class="w-full bg-b-neutral-3 p-24p rounded-24 grid 4xl:grid-cols-2 grid-cols-1 items-center gap-24p group"
          data-aos="zoom-in"
        >
          <div class="overflow-hidden rounded-24">
            <img
              class="w-full xxl:h-[304px] xl:h-[280px] md:h-[260px] h-[240px] object-cover group-hover:scale-110 transition-1"
              src="../assets/images/games/game1.png"
              alt="img"
            />
          </div>
          <div>
            <div class="flex-y items-center justify-center gap-2">
              <span
                v-for="(reward, key) in section.rewardOptions"
                :key="key"
                class="badge badge-outline-shap hover:badge-primary badge-smm"
              >
                {{ key }}: {{ reward }}
              </span>
            </div>
            <router-link
              :to="'/story/chapters/' + chapter.id + '/' + section.id"
              :title="section.title"
              class="heading-4 text-w-neutral-1 4xl:line-clamp-2 line-clamp-1 link-1 my-16p text-split-left"
            >
              {{ section.title }}
            </router-link>
            <div class="flex-y flex-wrap *:py-2 *:px-3 mb-20p">
              <div class="flex-y gap-2.5" v-if="section.completed">
                <span class="badge badge-secondary size-3 badge-circle"></span>
                <p class="text-base text-neutral-100">
                  <span class="span">Completed</span>
                </p>
              </div>
              <div class="flex-y gap-2.5" v-if="!section.completed">
                <span class="badge badge-primary size-3 badge-circle"></span>
                <p class="text-base text-neutral-100">
                  <span class="span">Not yet taken</span>
                </p>
              </div>
            </div>
            <div class="flex-y flex-wrap items-center justify-center">
              <button
                v-if="section.locked"
                class="btn btn-md btn-c-dark-outline rounded-12 w-full"
              >
                <i class="ti ti-lock icon-24"></i>
                Locked
              </button>
              <router-link
                v-if="!section.locked"
                :to="'/story/chapters/' + chapter.id + '/' + section.id"
                class="btn btn-md rounded-12 w-full"
                :class="{
                  pulse: !section.completed && !section.locked,
                  'btn-primary': !section.completed,
                  'btn-secondary': section.completed,
                }"
              >
                <i class="ti ti-eye icon-24"></i>
                {{ section.completed ? 'Review' : 'View' }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- trending section end -->
</template>

<style>
.pulse {
  animation: pulse-animation 1.3s infinite;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0px rgba(242, 150, 32, 0.5);
  }
  100% {
    box-shadow: 0 0 0 15px rgba(255, 0, 0, 0);
  }
}
</style>

<script>
export default {
  data() {
    return {
      chapter: {},
    };
  },
  inject: ['http'],
  async mounted() {
    console.log(this.$route.params);
    const response = await this.http.get(
      '/story/chapters/' + this.$route.params.chapter + '/sections'
    );
    this.chapter = response.data.data;
  },
};
</script>
