<template>
  <div>
    <!-- breadcrumb start -->
    <section class="pt-30p" v-if="course.id">
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
                  {{ course.title }}
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
                    <span class="breadcrumb-current">{{ course.title }}</span>
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

    <!-- live channels section start -->
    <section class="section-pt mb-60p">
      <div class="container">
        <div class="flex items-center justify-between flex-wrap gap-24p">
          <h2 class="heading-2 text-w-neutral-1 text-split-left">Chapters</h2>
        </div>
        <div v-if="!course.chapters.length">
          <h3 class="heading-3 text-b-neutral-1 my-4">
            No available chapters for this course yet.
          </h3>
        </div>
        <div class="mt-40p" data-aos="fade-left">
          <div class="swiper chapter-list" data-carousel-name="chapter-cards">
            <div class="swiper-wrapper pb-40p">
              <div
                v-for="chapter in course.chapters"
                class="swiper-slide cursor-pointer"
                @click="showSections(chapter)"
              >
                <div
                  class="relative bg-b-neutral-3 rounded-24 group overflow-hidden w-full h-full"
                  :class="
                    currentChapter && currentChapter.id == chapter.id
                      ? 'border-2 border-primary'
                      : ''
                  "
                >
                  <div class="overflow-hidden">
                    <span
                      v-if="currentChapter && currentChapter.id == chapter.id"
                      class="badge badge-neutral absolute top-3 left-3 z-10"
                    >
                      <i class="avatar avatar-primary size-3"></i>
                      <span class="text-sm text-w-neutral-1">Current</span>
                    </span>
                    <img
                      src="../assets/images/channels/fireStrikers.png"
                      class="w-full 3xl:h-[310px] xl:h-[280px] lg:h-[260px] h-[240px] object-cover object-top group-hover:scale-110 group-hover:rotate-2 transition-1"
                      alt="img"
                    />
                  </div>
                  <div class="p-28p">
                    <a
                      class="heading-3 text-w-neutral-1 link-1 mb-2 line-clamp-1"
                      >{{ chapter.title }}</a
                    >
                    <div class="flex-y flex-wrap *:py-2 *:px-3 mb-20p">
                      <div class="flex-y gap-2.5">
                        <span
                          class="badge badge-secondary size-3 badge-circle"
                        ></span>
                        <p class="text-base text-neutral-100">
                          <span class="span">{{
                            chapter.sections.length
                          }}</span>
                          Sections
                        </p>
                      </div>
                      <div class="flex-y gap-2.5">
                        <span
                          class="badge badge-primary size-3 badge-circle"
                        ></span>
                        <p class="text-base text-neutral-100">
                          <span class="span"
                            >Completed: {{ countCompletedSections(chapter) }}/{{
                              chapter.sections.length
                            }}</span
                          >
                        </p>
                      </div>
                    </div>
                    <div v-if="chapter.tags" class="flex flex-wrap justify-center items-center gap-2">
                        <span
                            v-for="(tag, idx) in chapter.tags"
                            :key="idx"
                            class="px-3 py-1 text-sm rounded-xl bg-slate-800"
                        >
                            {{ tag }}
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex items-center gap-28p"
              v-if="course.chapters.length"
            >
              <div class="swiper-navigation swp-navigation-one">
                <button
                  type="button"
                  class="navigation-btn-one chapter-cards-carousel-prev"
                >
                  <i class="ti ti-chevron-left"></i>
                </button>
                <button
                  type="button"
                  class="navigation-btn-one chapter-cards-carousel-next"
                >
                  <i class="ti ti-chevron-right"></i>
                </button>
              </div>
              <div class="swiper-scrollbar swiper-scrollbar-1"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- live channels section end -->

    <!-- trending section start -->
    <section class="section-pb" v-show="currentChapter.id > 0">
      <div class="container">
        <h2
          ref="sections"
          id="sections"
          class="heading-2 text-w-neutral-1 text-split-left mb-4"
        >
          {{ currentChapter.title }} Sections
        </h2>

        <div class="flex-y justify-between flex-wrap gap-24p mb-[30px]">
          <h5 class="heading-5 text-w-neutral-1">
            Viewing {{ sectionsStore.meta.offset + 1 }} -
            {{ sectionsStore.meta.offset + sectionsStore.params.limit }} of
            {{ sectionsStore.meta.total }} groups
          </h5>
          <div
            class="flex items-center sm:justify-end max-sm:flex-wrap w-[500px] gap-24p"
          >
            <form
              class="flex items-center sm:gap-3 gap-2 max-w-[500px] w-full px-20p py-16p bg-b-neutral-3 rounded-full"
            >
              <span class="flex-c icon-20 text-white">
                <i class="ti ti-search"></i>
              </span>
              <input
                autocomplete="off"
                class="bg-transparent w-full"
                type="text"
                name="search"
                id="search"
                placeholder="Search..."
                @input="search"
              />
            </form>
            <div class="shrink-0 flex-y gap-28p">
              <span class="text-m-medium text-w-neutral-1"> Per Page: </span>
              <form class="select-2 shrink-0">
                <select
                  v-model="sectionsStore.params.limit"
                  class="select w-full sm:py-3 py-2 px-24p rounded-full !text-base"
                  @change="
                    sectionsStore.params.page = 1;
                    dirty = true;
                  "
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                  <option value="30">30</option>
                </select>
              </form>
            </div>
          </div>
        </div>

        <div v-if="sectionsStore.sectionList.length <= 0">
          <h3 class="heading-3 text-b-neutral-1 my-4">No sections found.</h3>
        </div>
        <div
          class="grid 4xl:grid-cols-2 xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24p"
        >
          <template
            v-for="(section, idx) in sectionsStore.sectionList"
            :key="section.id"
          >
            <div
              class="w-full bg-b-neutral-3 p-24p rounded-24 grid 4xl:grid-cols-2 grid-cols-1 items-center gap-24p group"
              data-aos="zoom-in"
            >
              <div class="overflow-hidden rounded-24">
                <img
                  class="w-full xxl:h-[304px] xl:h-[280px] md:h-[260px] h-[240px] object-cover group-hover:scale-110 transition-1"
                  :src="`../assets/images/games/sec${idx + 1}.png`"
                  alt="img"
                />
              </div>
              <div>
                <router-link
                  :key="section.id"
                  :to="'/sections/' + section.id"
                  :title="section.title"
                  class="heading-4 text-w-neutral-1 4xl:line-clamp-2 line-clamp-1 link-1 my-16p text-split-left"
                >
                  {{ section.title }}
                </router-link>
                <div class="flex-y flex-wrap *:py-2 *:px-3 mb-20p">
                  <div class="flex-y gap-2.5" v-if="section.completed">
                    <span
                      class="badge badge-secondary size-3 badge-circle"
                    ></span>
                    <p class="text-base text-neutral-100">
                      <span class="span">Completed</span>
                    </p>
                  </div>
                  <div class="flex-y gap-2.5" v-if="!section.completed">
                    <span
                      class="badge badge-primary size-3 badge-circle"
                    ></span>
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
                    :key="section.id"
                    v-if="!section.locked"
                    :to="'/sections/' + section.id"
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
          </template>
        </div>
        <Pagination
          :total="sectionsStore.meta.total"
          :limit="sectionsStore.meta.limit"
          :page="sectionsStore.meta.page"
          @navigate-to="onNavigateTo"
        ></Pagination>
      </div>
    </section>
    <!-- trending section end -->
  </div>
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
import Swiper from 'swiper/bundle';
import { useSectionStore } from '../stores/sections';
import { mapStores } from 'pinia';
import Pagination from '../components/Pagination.vue';
import { debounce } from '../assets/js/utils';
import { SlimSelectCustom } from '../assets/js/lib/SlimSelectCustom.js';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      dirty: false,
      currentChapter: {
        id: null,
        title: '',
      },
      course: {
        id: null,
        title: '',
        chapters: [],
      },
    };
  },
  inject: ['http'],
  methods: {
    countCompletedSections(chapter) {
      return chapter.sections.filter((s) => s.courseProgress).length;
    },
    showSections(chapter) {
      this.currentChapter = chapter;
      this.dirty = false;
      this.sectionsStore.reset();
      this.sectionsStore.getSections(chapter.courseId, chapter.id);
    },
    onNavigateTo(page) {
      this.sectionsStore.params.page = page;
      this.dirty = true;
    },
    search: debounce(function (event) {
      this.sectionsStore.params.search = event.target.value;
      this.dirty = true;
    }, 300),
  },
  watch: {
    sections(val) {
      console.log('VALUE', val);
      if (val) {
        const sections = this.$refs.sections;
        console.log('SECTION', sections);
        setTimeout(() => {
          scrollTo({
            behavior: 'smooth',
            top: sections.offsetTop - 100,
            left: sections.offsetLeft,
          });
        }, 100);
      }
    },
    params: {
      handler: function (newVal) {
        if (this.dirty) {
          this.sectionsStore.getSections(
            this.currentChapter.courseId,
            this.currentChapter.id
          );
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapStores(useSectionStore),
    sections() {
      return this.sectionsStore.sectionList;
    },
    params() {
      return this.sectionsStore.params;
    },
  },
  async mounted() {
    try {
      SlimSelectCustom();
      const courseId = this.$route.params.id;
      const response = await this.http.get(
        '/courses/' + encodeURIComponent(courseId)
      );
      this.course = response.data.data;

      const chapterId = Number(this.$route.query.chapter) || 0;
      if (chapterId) {
        const selectedChapter = this.course.chapters.find(
          (c) => c.id === chapterId
        );
        if (selectedChapter) {
          this.showSections(selectedChapter);
        }
      }

      let chapterCarousel = document.querySelectorAll('.chapter-list');

      if (chapterCarousel.length > 0) {
        chapterCarousel.forEach((el, idx) => {
          const carouselName = el.getAttribute('data-carousel-name');
          const swiper = new Swiper(el, {
            slidesPerView: 4,
            speed: 500,
            centeredSlides: false,
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
    } catch (e) {}
  },
};
</script>
