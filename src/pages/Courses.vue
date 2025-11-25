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
                <h2 class="heading-2 text-w-neutral-1 mb-3">List of Courses</h2>
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
                    <span class="breadcrumb-current">Courses</span>
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
        <div class="flex-y justify-between flex-wrap gap-24p mb-[30px]">
          <h5 class="heading-5 text-w-neutral-1">
            Viewing {{ meta.offset + 1 }} - {{ meta.offset + params.limit }} of
            {{ meta.total }} groups
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
                  v-model="params.limit"
                  class="select w-full sm:py-3 py-2 px-24p rounded-full !text-base"
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
        <div
          class="grid 4xl:grid-cols-2 xxl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-24p"
        >
          <div
            v-for="(course, idx) in courses"
            :key="course.id"
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
              <router-link
                :to="`/courses/${course.id}`"
                class="heading-4 text-w-neutral-1 4xl:line-clamp-2 line-clamp-1 link-1 my-16p text-split-left"
                >{{ course.title }}</router-link
              >
              <div class="flex-y flex-wrap *:py-2 *:px-3 mb-20p">
                <div class="flex-y gap-2.5">
                  <span
                    class="badge badge-secondary size-3 badge-circle"
                  ></span>
                  <p class="text-base text-neutral-100">
                    <span class="span">{{ course.chapters.length }}</span>
                    Chapters
                  </p>
                </div>
                <div class="flex-y gap-2.5">
                  <span class="badge badge-primary size-3 badge-circle"></span>
                  <p class="text-base text-neutral-100">
                    <span class="span"
                      >Completed: {{ countCompletedChapters(course) }}/{{
                        course.chapters.length
                      }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="flex-y flex-wrap items-center justify-center">
                <router-link
                  :to="`/courses/${course.id}`"
                  class="btn btn-md rounded-12 w-full"
                  :class="{
                    pulse: !course.completed && !course.locked,
                    'btn-primary': !course.completed,
                    'btn-secondary': course.completed,
                  }"
                >
                  <i class="ti ti-eye icon-24"></i>
                  {{ course.completed ? 'Review' : 'View' }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          :total="meta.total"
          :limit="meta.limit"
          :page="meta.page"
          @navigate-to="onNavigateTo"
        ></Pagination>
      </div>
    </section>
    <!-- trending section end -->
  </div>
</template>

<script>
import { toSearchParams, debounce } from '../assets/js/utils';
import Pagination from '../components/Pagination.vue';
import { SlimSelectCustom } from '../assets/js/lib/SlimSelectCustom.js';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      courses: [],
      params: {
        page: 1,
        limit: 3,
        search: '',
        sort: [
          {
            name: 'title',
            order: 'asc',
          },
        ],
      },
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
      },
    };
  },
  inject: ['http'],
  methods: {
    countCompletedChapters(course) {
      return course.chapters.filter((s) => s.storyProgress).length;
    },
    onNavigateTo(page) {
      this.params.page = page;
    },

    search: debounce(function (event) {
      console.log('search', event.target.value);
      this.params.search = event.target.value;
    }, 300),
    async fetchCourses() {
      const params = toSearchParams(this.params);
      console.log('params', params);
      const response = await this.http.get('/courses?' + params.toString());
      this.courses = response.data.data;
      console.log(response.data.meta);
      this.meta = {
        ...response.data.meta,
      };
    },
  },
  watch: {
    params: {
      handler: function (val) {
        this.fetchCourses();
      },
      deep: true,
    },
  },
  async mounted() {
    try {
      this.fetchCourses();
      SlimSelectCustom();
    } catch (e) {}
  },
};
</script>
