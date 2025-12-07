<template>
  <div>
    <!-- user profile section start -->
    <section class="section-pt overflow-visible">
      <div class="container">
        <div class="relative">
          <div class="glitch-effect">
            <div class="glitch-thumb">
              <img
                class="w-full xl:h-[490px] h-[400px] hover:scale-110 object-cover"
                :src="user.banner"
                alt="image"
              />
            </div>
            <div class="glitch-thumb">
              <img
                class="w-full xl:h-[490px] lg:h-[400px] md:h-[340px] sm:h-[300px] h-[240px] hover:scale-110 object-cover"
                :src="user.banner"
                alt="image"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-30p bg-b-neutral-3 rounded-12 pb-30p">
          <div
            class="4xl:col-start-2 4xl:col-end-12 col-span-12 max-4xl:px-48p"
          >
            <div
              class="relative flex 3xl:items-end max-3xl:items-center 3xl:justify-between max-3xl:flex-col gap-30p 3xl:mt-[70px] xl:-mt-52 lg:-mt-44 md:-mt-36 sm:-mt-30 -mt-20 4xl:mb-[70px] mb-60p"
            >
              <div
                class="3xl:order-1 order-2 flex text-center divide-x divide-shap"
              >
                <div class="px-24p">
                  <h2 class="heading-40 text-w-neutral-1 mb-1">
                    {{ user.points }}
                  </h2>
                  <span class="text-m-medium text-w-neutral-4/70">
                    Total Points
                  </span>
                </div>
              </div>
              <div
                class="3xl:order-2 order-1 3xl:absolute 3xl:bottom-0 3xl:left-1/2 3xl:-translate-x-1/2 max-3xl:flex-col-c z-[4]"
              >
                <img
                  class="avatar xl:size-60 lg:size-52 md:size-44 sm:size-40 size-28 border border-secondary"
                  :src="user.photoUrl"
                  alt="profile"
                />
                <div class="text-center mt-30p">
                  <h3 class="heading-3 text-w-neutral-1 mb-3 text-split-top">
                    {{ user.firstName }} {{ user.lastName }}
                  </h3>
                  <p v-if="!user.about" class="text-m-medium text-w-neutral-4">
                    No bio yet :(
                  </p>
                  <p v-if="user.about" class="text-m-medium text-w-neutral-4">
                    {{ user.about }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- user profile section end -->

    <!-- user profile Game Stats section start -->
    <section class="section-pb pt-60p overflow-visible">
      <div class="container">
        <div class="grid grid-cols-12 gap-30p">
          <div class="4xl:col-start-2 4xl:col-end-8 xl:col-span-7 col-span-12">
            <div
              class="p-40p rounded-12"
              :class="
                appStore.isDarkMode
                  ? 'bg-b-neutral-3'
                  : 'bg-white border border-gray-200'
              "
            >
              <h3
                class="heading-3 mb-30p text-split-left"
                :class="
                  appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                "
              >
                Achievements
              </h3>
              <h3
                class="heading-3 text-b-neutral-1"
                v-if="!achievements.length"
              >
                No achievements yet :(
              </h3>
              <div
                v-if="achievements"
                class="grid xxl+:grid-cols-3 xl:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-30p"
              >
                <!-- game stats 1 -->
                <div
                  v-for="achievement in paginatedAchievements"
                  :key="achievement.id"
                  class="bg-b-neutral-4 p-16p flex-col-c"
                  data-aos="fade-up"
                >
                  <div v-if="achievement.coverImage">
                    <img
                      :src="achievement.coverImage"
                      :alt="achievement.title"
                      class="w-20 h-20 rounded-full object-cover mb-16p"
                    />
                  </div>
                  <i :class="achievement.icon" class="icon-60" v-else></i>
                  <span
                    class="heading-5 text-w-neutral-1 link-1 line-clamp-1 my-2"
                  >
                    {{ achievement.title }}
                  </span>
                  <p class="text-m-regular text-w-neutral-3 text-center mb-3">
                    {{ achievement.description }}
                  </p>

                  <div
                    class="flex items-center border-t border-shap text-center pt-2"
                  ></div>
                </div>
              </div>
              <Pagination
                v-if="achievements.length > achievementsPerPage"
                :total="achievements.length"
                :page="achievementsPage"
                :limit="achievementsPerPage"
                @navigateTo="navigateToAchievementsPage"
              />
            </div>
          </div>
          <div
            class="4xl:col-start-8 4xl:col-end-12 xl:col-span-5 col-span-12 relative"
          >
            <div class="xl:sticky xl:top-30">
              <div
                class="grid grid-cols-1 gap-30p *:rounded-12 *:py-32p *:px-40p"
                :class="
                  appStore.isDarkMode
                    ? '*:bg-b-neutral-3'
                    : '*:bg-white *:border *:border-gray-200'
                "
              >
                <div v-for="(course, idx) in courses">
                  <h3
                    class="heading-3 mb-20p text-split-left"
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    {{ course.title }}
                  </h3>

                  <div class="flex items-center gap-24p overflow-x-hidden mb-3">
                    <div class="flex items-center w-full">
                      <div class="w-3.5 h-5 bg-primary"></div>
                      <div class="relative w-full h-2.5 bg-w-neutral-3">
                        <span
                          :style="'width:' + course.progressCounter + '%'"
                          class="progressbar-1"
                        >
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center text-w-neutral-1">
                      <h4 x-text="progress" class="heading-4"></h4>
                      <h4 class="heading-4">{{ course.progressCounter }}%</h4>
                    </div>
                  </div>
                  <div class="flex items-center justify-center">
                    <h5>
                      {{ course.completedSections }}/{{ course.totalSections }}
                      sections completed
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- user profile Game Stats section end -->
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useAppStore } from '../stores/app';
import Pagination from '../components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  computed: {
    ...mapStores(useAppStore),
    paginatedAchievements() {
      const start = (this.achievementsPage - 1) * this.achievementsPerPage;
      const end = start + this.achievementsPerPage;
      return this.achievements.slice(start, end);
    },
    courses: function () {
      return this.enrolledCourses.map((course) => {
        return {
          ...course,
        };
      });
    },
  },
  data() {
    return {
      user: {},
      progressInterval: {},
      achievements: [],
      achievementsPage: 1,
      achievementsPerPage: 6,
      enrolledCourses: [],
    };
  },
  watch: {
    enrolledCourses(current, old) {
      if (current != old) {
        console.log('enrolledCourses changed', current);
        current.forEach((course) => {
          this.startProgress(course);
        });
      }
    },
  },
  methods: {
    startProgress(course) {
      // Clear any existing interval
      if (course.progressInterval) clearInterval(course.progressInterval);
      // Start progress increment
      course.progressInterval = setInterval(() => {
        course.progressCounter += 1;
        if (course.progressCounter >= course.progress) {
          // Use course.progress
          clearInterval(course.progressInterval);
        }
      }, 100); // 30ms interval for smoother progress
    },
    navigateToAchievementsPage(page) {
      this.achievementsPage = page;
    },
  },
  inject: ['http'],
  async mounted() {
    const response = await this.http.get(
      '/courses/user-stats/' + this.$route.params.id
    );
    this.user = response.data.data.rank;
    this.achievements = response.data.data.achievements;
    this.enrolledCourses = response.data.data.enrolledCourses;

    this.enrolledCourses.map((course) => {
      course.progress =
        course.totalSections === 0
          ? 0
          : (course.completedSections / course.totalSections) * 100;
      course.progressInterval = null;
      course.progressCounter = 0;
    });
  },
};
</script>
