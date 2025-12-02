<template>
  <div>
    <!-- hero section start -->
    <section class="section-pt" v-if="data.course.id">
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
                    src="../assets/images/photos/heroBanner1.png"
                    alt="product"
                  />
                  <div
                    class="absolute inset-0 z-[2] mx-80p 3xl:pt-[125px] xxl:pt-28 xl:pt-25 md:pt-12 pt-8"
                  >
                    <div class="max-w-[790px]">
                      <h1
                        class="display-120 text-w-neutral-1 stroked-text-1 line-clamp-2 mb-2"
                        :data-text="data.course.title"
                      >
                        {{ data.course.title }}
                      </h1>
                      <div
                        class="flex flex-wrap items-center gap-3 text-l-medium text-w-neutral-1 mb-40p"
                      ></div>
                      <router-link
                        :to="`/courses/${data.course.id}`"
                        class="btn btn-lg btn-primary rounded-12"
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                      >
                        Start Now
                      </router-link>
                    </div>
                  </div>
                  <div class="overlay-1"></div>
                </div>
              </div>
            </div>

            <div
              class="tab-navbar flex items-center flex-wrap gap-x-32p gap-y-24p sm:text-xl text-lg *:font-borda font-medium text-w-neutral-1 whitespace-nowrap pt-30p"
            >
              <a
                @click.prevent="selectedTab = 'overview'"
                class="cursor-pointer"
                :class="{
                  active: selectedTab == 'overview',
                }"
              >
                Overview
              </a>
              <a
                @click.prevent="selectedTab = 'progress'"
                class="cursor-pointer"
                :class="{
                  active: selectedTab == 'progress',
                }"
              >
                Progress
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="selectedTab == 'overview'">
      <section class="mb-10">
        <div class="container">
          <div>
            <h2 class="heading-2">Time Spent in Challenges (seconds)</h2>

            <div class="mt-40p" data-aos="fade-left">
              <div
                class="swiper chapter-list"
                data-carousel-name="chapter-cards"
              >
                <div class="swiper-wrapper pb-40p">
                  <div
                    v-for="(chapterChart, idx) in chapterCharts"
                    :key="idx"
                    class="swiper-slide"
                  >
                    <div class="w-full">
                      <h4>{{ chapterChart.chapter.title }}</h4>
                      <div class="my-2 min-h-[300px]">
                        <Line
                          class="p-3 bg-gray-700 rounded-10"
                          :data="chapterChart.chartData"
                          :options="chartOptions"
                        ></Line>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center gap-28p"
                  v-if="chapterCharts.length"
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
        </div>
      </section>
    </div>

    <div v-if="selectedTab == 'progress'" data-aos="zoom-in">
      <!-- Progress section start -->
      <section class="section-pb">
        <div class="container">
          <div class="overflow-x-auto scrollbar-sm rounded-12">
            <table
              class="text-sm font-poppins text-w-neutral-1 w-full whitespace-nowra"
            >
              <thead class="text-left">
                <tr class="bg-shap rounded-t-12">
                  <th class="text-sm px-24p py-3 lg:min-w-[150px] min-w-25">
                    Chapter
                  </th>
                  <th class="text-sm px-24p py-3 min-w-25">Sections</th>
                  <th class="text-sm px-24p py-3 min-w-25"></th>
                </tr>
              </thead>
              <tbody
                class="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3"
              >
                <template v-for="(chapter, idx) in data.progress" :key="idx">
                  <tr>
                    <td class="px-24p py-3">
                      <div class="flex-y gap-3">
                        <span class="text-sm"> {{ chapter.title }} </span>
                      </div>
                    </td>
                    <td class="px-24p py-3">{{ chapter.sections.length }}</td>
                    <td class="px-24p py-3 text-right">
                      <button
                        class="btn btn-c-dark-outline"
                        :class="{
                          'bg-gray-800 text-white': chapter.expanded,
                        }"
                        @click="toggleChapter(chapter)"
                      >
                        <i
                          class="ti icon-24"
                          :class="{
                            'ti-chevron-down': !chapter.expanded,
                            'ti-chevron-up': chapter.expanded,
                          }"
                        ></i>
                      </button>
                    </td>
                  </tr>
                  <tr
                    v-if="chapter.expanded"
                    :class="{
                      'bg-b-neutral-4/40': chapter.expanded,
                    }"
                  >
                    <td class="px-24p py-3 grid-lines-1" colspan="3">
                      <div
                        class="overflow-x-auto scrollbar-sm rounded-12 border border-w-neutral-4/60"
                      >
                        <table
                          class="text-l-medium font-poppins text-w-neutral-1 w-full whitespace-nowra"
                        >
                          <thead class="text-left">
                            <tr class="bg-shap rounded-t-12">
                              <th
                                class="text-sm px-24p py-3 lg:min-w-[150px] min-w-25"
                              >
                                Title
                              </th>
                              <th class="text-sm px-24p py-3 min-w-25">
                                Challenges
                              </th>
                              <th class="text-sm px-24p py-3 min-w-25"></th>
                            </tr>
                          </thead>
                          <tbody
                            class="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3"
                          >
                            <template
                              v-for="(section, idxSection) in chapter.sections"
                              :key="idxSection"
                            >
                              <tr>
                                <td class="px-24p py-3">
                                  <div class="flex-y gap-3">
                                    <span class="text-sm">
                                      {{ section.title }}
                                    </span>
                                  </div>
                                </td>
                                <td class="px-24p py-3">
                                  {{ section.challenges.length }}
                                </td>
                                <td class="px-24p py-3 text-right">
                                  <button
                                    class="btn btn-c-dark-outline"
                                    :class="{
                                      'bg-gray-800': section.expanded,
                                    }"
                                    @click="toggleSection(section)"
                                  >
                                    <i
                                      class="ti icon-24"
                                      :class="{
                                        'ti-chevron-down': !section.expanded,
                                        'ti-chevron-up': section.expanded,
                                      }"
                                    ></i>
                                  </button>
                                </td>
                              </tr>
                              <tr
                                v-if="section.expanded"
                                :class="{
                                  'bg-b-neutral-4/40': section.expanded,
                                }"
                              >
                                <td
                                  class="px-24p py-3 grid-lines-1"
                                  colspan="3"
                                >
                                  <div
                                    class="overflow-x-auto scrollbar-sm rounded-12 border border-w-neutral-4/60"
                                  >
                                    <table
                                      class="text-sm font-poppins text-w-neutral-1 w-full whitespace-nowra"
                                    >
                                      <thead class="text-left">
                                        <tr class="bg-shap rounded-t-12">
                                          <th
                                            class="text-sm px-24p py-3 lg:min-w-[150px] min-w-25"
                                          >
                                            Challenge
                                          </th>
                                          <th
                                            class="text-sm px-24p py-3 min-w-25"
                                          >
                                            Completed On
                                          </th>
                                          <th
                                            class="text-sm px-24p py-3 min-w-25"
                                          >
                                            Time Taken
                                          </th>
                                          <th
                                            class="text-sm px-24p py-3 min-w-25"
                                          >
                                            Hints Taken
                                          </th>
                                          <th
                                            class="text-sm px-24p py-3 min-w-25"
                                          >
                                            Status
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody
                                        class="divide-y divide-solid divide-shap border-b border-shap bg-b-neutral-3"
                                      >
                                        <template
                                          v-for="(
                                            challenge, idxChallenge
                                          ) in section.challenges"
                                          :key="idxChallenge"
                                        >
                                          <tr>
                                            <td class="px-24p py-3">
                                              <div class="flex-y gap-3">
                                                <i
                                                  class="ti ti-star-filled"
                                                  :class="{
                                                    'text-success':
                                                      challenge.difficulty ===
                                                      'easy',
                                                    'text-warning':
                                                      challenge.difficulty ===
                                                      'medium',
                                                    'text-danger':
                                                      challenge.difficulty ===
                                                      'hard',
                                                  }"
                                                >
                                                  {{ challenge.difficulty }}
                                                </i>
                                                <span class="text-sm">
                                                  {{ challenge.title }}
                                                </span>
                                              </div>
                                            </td>
                                            <td class="px-24p py-3">
                                              <span v-if="challenge.answer">
                                                {{
                                                  formatDate(
                                                    challenge.answer
                                                      .completed_at
                                                  )
                                                }}
                                                <i
                                                  @click="
                                                    showChallengeAnswer(
                                                      challenge
                                                    )
                                                  "
                                                  class="ti ti-question-mark text-info cursor-pointer border-warning border rounded-8"
                                                ></i>
                                              </span>
                                            </td>
                                            <td class="px-24p py-3">
                                              <span v-if="challenge.answer">
                                                {{
                                                  formatTime(
                                                    challenge.answer.time_taken
                                                  )
                                                }}
                                              </span>
                                            </td>
                                            <td class="px-24p py-3">
                                              <span v-if="challenge.answer">
                                                {{
                                                  challenge.answer.usages
                                                    ? challenge.answer.usages
                                                        .length
                                                    : 0
                                                }}
                                              </span>
                                            </td>
                                            <td class="px-24p py-3">
                                              <span
                                                class="text-success"
                                                v-if="challenge.answer"
                                              >
                                                Completed
                                              </span>
                                              <span class="text-warning" v-else>
                                                Not yet answered
                                              </span>
                                            </td>
                                          </tr>
                                        </template>
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </template>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <!-- Progress section end -->
    </div>

    <!-- Main modal -->
    <div
      v-show="showChallengeAnswerModal"
      id="select-modal"
      tabindex="-1"
      aria-hidden="true"
      style="background: rgba(0, 0, 0, 0.8)"
      class="fixed flex items-center justify-center z-[999] left-0 max-h-full md:inset-0 overflow-x-hidden overflow-y-auto right-0 top-0 w-full"
    >
      <div
        class="relative p-4 w-full max-w-lg max-h-full"
        v-if="selectedAnswer"
      >
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              <i class="ti ti-help-circle-filled"></i>
              Submissions
            </h3>
            <button
              @click="showChallengeAnswerModal = false"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <div class="max-h-[500px] overflow-auto">
              <div
                v-for="(submission, idx) in selectedAnswer.submissions"
                :key="idx"
                class="w-full p-4 mb-1 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700"
              >
                <h5
                  class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400"
                >
                  {{ formatDate(submission.created_at) }}
                </h5>
                <div
                  class="my-2 border-2 rounded-4 p-3 font-mono"
                  v-html="submission.code.replace(/\n/, '<br />')"
                ></div>
                <div class="flex justify-center">
                  <span
                    class="px-4 py-1.5 rounded-8"
                    :class="{
                      'bg-success': submission.result === 'passed',
                      'bg-danger': submission.result !== 'passed',
                    }"
                  >
                    {{ submission.result }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  background: #343839;
}
</style>

<script>
import Swiper from 'swiper/bundle';
import { Line } from 'vue-chartjs';
import dayjs from 'dayjs';
import { mapStores } from 'pinia';
import { useAppStore } from '../stores/app';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  components: { Line },
  data() {
    return {
      selectedTab: 'overview',
      data: {
        progress: [],
        course: {},
      },
      showChallengeAnswerModal: false,
      selectedAnswer: null,
      loaded: false,
      chapterCharts: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Sections Completed',
              color: 'cyan',
            },
            ticks: {
              color: 'white',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Time in Seconds',
              color: 'cyan',
            },
            ticks: {
              color: 'white',
            },
          },
        },
      },
    };
  },
  inject: ['http'],
  computed: {
    ...mapStores(useAppStore),
    swalClasses() {
      return {
        popup: this.appStore.isDarkMode
          ? 'bg-gray-800 text-white shadow-lg rounded-lg'
          : 'bg-white text-gray-900 shadow-lg rounded-lg',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-c-dark-outline',
      };
    },
  },
  async mounted() {
    this.loaded = false;
    const courseId = this.$route.params.id;
    const response = await this.http.get('/courses/' + courseId + '/progress');
    this.data = {
      progress: Object.values(response.data.data.progress.grouped),
      course: response.data.data.course,
    };

    const getAnswers = (chapter, mode) => {
      return chapter.sections.map((s) => {
        const challenge = s.challenges.find((c) => c.difficulty === mode);
        let challengeAnswer = null;
        if (challenge && s.answers) {
          challengeAnswer = s.answers.find(
            (a) => a.challenge_id === challenge.id
          );
          challenge.answer = challengeAnswer;
        }
        if (challengeAnswer) {
          return challengeAnswer.time_taken;
        }
        return 0;
      });
    };

    const chapterDatasets = {};

    for (const chapter of this.data.progress) {
      const labels = chapter.sections.map(
        (s) => `C${chapter.order}S${s.order}`
      );
      const easyDataset = getAnswers(chapter, 'easy');
      const mediumDataset = getAnswers(chapter, 'medium');
      const hardDataset = getAnswers(chapter, 'hard');

      chapterDatasets[chapter.id] = {
        chapter: { ...chapter },
        chartData: {
          labels: labels,
          datasets: [
            {
              label: 'Easy',
              backgroundColor: 'green',
              borderColor: 'green',
              pointStyle: 'rectRounded',
              pointRadius: 5,
              pointBorderColor: 'white',
              borderWidth: 1,
              data: easyDataset,
            },
            {
              label: 'Medium',
              backgroundColor: 'yellow',
              borderColor: 'yellow',
              pointStyle: 'circle',
              pointRadius: 5,
              pointBorderColor: 'white',
              borderWidth: 1,
              data: mediumDataset,
            },
            {
              label: 'Hard',
              backgroundColor: 'red',
              borderColor: 'red',
              pointStyle: 'rectRot',
              pointRadius: 5,
              pointBorderColor: 'white',
              borderWidth: 1,
              data: hardDataset,
            },
          ],
        },
      };
    }

    this.chapterCharts = Object.values(chapterDatasets);

    this.loaded = true;

    setTimeout(() => {
      let chapterCarousel = document.querySelectorAll('.chapter-list');

      if (chapterCarousel.length > 0) {
        chapterCarousel.forEach((el, idx) => {
          const carouselName = el.getAttribute('data-carousel-name');
          console.log('carouselName', carouselName);
          const swiper = new Swiper(el, {
            slidesPerView: 1,
            speed: 500,
            centeredSlides: true,
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
                slidesPerView: 1,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 1,
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
    }, 300);
  },
  methods: {
    showChallengeAnswer(challenge) {
      this.selectedAnswer = challenge.answer;
      this.showChallengeAnswerModal = true;
    },
    toggleChapter(chapter) {
      if (typeof chapter.expanded === 'undefined') {
        chapter.expanded = false;
      }
      chapter.expanded = !chapter.expanded;
    },
    toggleSection(section) {
      if (typeof section.expanded === 'undefined') {
        section.expanded = false;
      }
      section.expanded = !section.expanded;
    },
    formatDate(date) {
      const dt = dayjs(date);
      return dt.format('YYYY-MM-DD HH:mm:ss');
    },
    formatTime(seconds) {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds - hours * 3600) / 60);
      seconds = seconds - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return hours + 'h:' + minutes + 'm:' + seconds + 's';
    },
  },
};
</script>
