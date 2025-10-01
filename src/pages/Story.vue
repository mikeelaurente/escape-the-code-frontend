<template>
  <div>
    <!-- breadcrumb start -->
    <section class="pt-30p" v-if="story.id">
      <div class="section-pt">
        <div
          class="relative bg-[url('../images/photos/breadcrumbImg.png')] bg-cover bg-no-repeat rounded-24 overflow-hidden"
        >
          <div class="container">
            <div
              class="grid grid-cols-12 gap-30p relative xl:py-[130px] md:py-30 sm:py-25 py-20 z-[2]"
            >
              <div class="lg:col-start-2 lg:col-end-12 col-span-12">
                <h2 class="heading-2 text-w-neutral-1 mb-3">
                  {{ story.title }}
                </h2>
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
                    <span class="breadcrumb-current">{{ story.title }}</span>
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
    <section class="section-pb pt-60p" v-if="story.id">
      <div class="container">
        <div
          class="grid 4xl:grid-cols-2 xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24p"
        >
          <div
            v-for="(chapter, idx) in story.chapters"
            :key="chapter.id"
            class="w-full bg-b-neutral-3 p-24p rounded-24 grid 4xl:grid-cols-2 grid-cols-1 items-center gap-24p group"
            data-aos="zoom-in"
          >
            <div class="overflow-hidden rounded-24">
              <img
                class="w-full xxl:h-[304px] xl:h-[280px] md:h-[260px] h-[240px] object-cover group-hover:scale-110 transition-1"
                :src="`../assets/images/games/chap${idx + 1}.png`"
                alt="img"
              />
            </div>
            <div>
              <div class="flex-y items-center justify-center gap-2">
                <span
                  v-for="(reward, key) in chapter.rewardOptions"
                  :key="key"
                  class="badge badge-outline-shap hover:badge-primary badge-smm"
                >
                  {{ key }}: {{ reward }}
                </span>
              </div>
              <router-link
                :to="`/story/chapters/${chapter.id}`"
                class="heading-4 text-w-neutral-1 4xl:line-clamp-2 line-clamp-1 link-1 my-16p text-split-left"
                >{{ chapter.title }}</router-link
              >
              <div class="flex-y flex-wrap *:py-2 *:px-3 mb-20p">
                <div class="flex-y gap-2.5">
                  <span
                    class="badge badge-secondary size-3 badge-circle"
                  ></span>
                  <p class="text-base text-neutral-100">
                    <span class="span">{{ chapter.sections.length }}</span>
                    Sections
                  </p>
                </div>
                <div class="flex-y gap-2.5">
                  <span class="badge badge-primary size-3 badge-circle"></span>
                  <p class="text-base text-neutral-100">
                    <span class="span"
                      >Completed: {{ countCompletedSections(chapter) }}/{{
                        chapter.sections.length
                      }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="flex-y flex-wrap items-center justify-center">
                <router-link
                  :to="`/story/chapters/${chapter.id}`"
                  class="btn btn-md rounded-12 w-full"
                  :class="{
                    pulse: !chapter.completed && !chapter.locked,
                    'btn-primary': !chapter.completed,
                    'btn-secondary': chapter.completed,
                  }"
                >
                  <i class="ti ti-eye icon-24"></i>
                  {{ chapter.completed ? 'Review' : 'View' }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- trending section end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      story: {
        id: null,
        title: '',
        chapters: [],
      },
    };
  },
  inject: ['http'],
  methods: {
    countCompletedSections(chapter) {
      return chapter.sections.filter((s) => s.storyProgress).length;
    },
  },
  async mounted() {
    try {
      const response = await this.http.get('/story');
      this.story = response.data.data;
    } catch (e) {}
  },
};
</script>
