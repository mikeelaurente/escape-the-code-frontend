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
      </div>
    </section>
    <!-- User profile Achievements section end -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      achievements: [],
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
  },
  async mounted() {
    try {
      // Fetch section data from API
      const response = await this.http.get(`/achievements`);
      this.achievements = response.data.data;
    } catch (error) {
      console.error('Error fetching section data:', error);
    }
  },
};
</script>
