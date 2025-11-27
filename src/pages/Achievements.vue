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
        <div class="flex my-4 items-center justify-center">
          <div class="shrink-0 flex-y gap-28p">
            <span class="text-m-medium text-w-neutral-1"> Status: </span>
            <form class="select-2 shrink-0">
              <select
                v-model="params.filters.status"
                class="select w-full sm:py-3 py-2 px-24p rounded-full !text-base"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="not_completed">Not Completed</option>
              </select>
            </form>
          </div>
        </div>
        <div class="grid grid-cols-12">
          <div class="4xl:col-start-2 4xl:col-end-11 col-span-12">
            <div
              class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-30p py-40p 4xl:px-[70px] px-40p bg-b-neutral-3 rounded-12"
            >
              <!-- achievements 1 -->
              <div
                v-for="(achievement, index) in achievements"
                :key="index"
                class="bg-b-neutral-4 py-32p px-40p flex-col-c text-center rounded-12"
                :class="{
                  'border-4 border-primary':
                    achievement.userAchievements.length,
                }"
              >
                <i :class="getAchievementIcon(achievement)" class="icon-60"></i>
                <span
                  href="./game-details.html"
                  class="heading-4 text-w-neutral-1 link-1 line-clamp-1 mb-3"
                >
                  {{ achievement.title }}
                </span>

                <p class="text-m-regular text-w-neutral-3 line-clamp-3">
                  {{ achievement.description }}
                </p>
                <span
                  v-if="achievement.userAchievements.length"
                  class="text-m-medium text-primary mb-16p"
                >
                  Achieved on:
                  {{
                    new Date(
                      achievement.userAchievements[0].awardedAt
                    ).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }}
                </span>
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
    <!-- User profile Achievements section end -->
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
      achievements: [],
      params: {
        page: 1,
        limit: 3,
        filters: {
          status: 'all',
        },
        search: '',
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
    getAchievementIcon(achievement) {
      if (achievement.userAchievements.length) {
        return achievement.icon + ' text-primary';
      }
      return achievement.icon || 'ti ti-award';
    },
    onNavigateTo(page) {
      this.params.page = page;
    },

    search: debounce(function (event) {
      this.params.search = event.target.value;
    }, 300),
    async fetchAchievements() {
      const params = toSearchParams(this.params);
      const response = await this.http.get(
        '/achievements?' + params.toString()
      );
      this.achievements = response.data.data;
      this.meta = {
        ...response.data.meta,
      };
    },
  },
  watch: {
    params: {
      handler: function (val) {
        this.fetchAchievements();
      },
      deep: true,
    },
  },
  async mounted() {
    try {
      this.fetchAchievements();
      SlimSelectCustom();
    } catch (e) {}
  },
};
</script>
