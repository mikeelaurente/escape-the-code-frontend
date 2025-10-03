<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="heading-2 mb-4 border-dotted border-b-2">Challenge</h2>
    <div class="inline-flex rounded-md shadow-xs" role="group">
      <template
        v-for="(challenge, idx) in section.challenges"
        :key="challenge.id"
      >
        <button
          @click="displayChallenge(challenge)"
          type="button"
          :class="{
            'px-4 py-2 text-sm btn-primary font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white':
              idx === 0,
            'px-4 py-2 text-sm btn-primary font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white':
              idx > 0 && idx < section.challenges.length - 1,
            'px-4 py-2 text-sm btn-primary font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white':
              idx === section.challenges.length - 1,
          }"
          :style="{
            background: selectedChallege.id == challenge.id ? '#f29620' : '',
          }"
        >
          <i class="ti ti-lock" v-if="challenge.locked"></i>
          {{ challenge.difficulty.toUpperCase() }}
        </button>
      </template>
    </div>

    <div class="mt-4 w-full" v-if="selectedChallege.id">
      <h3>{{ selectedChallege.title }}</h3>
      <div v-html="selectedChallege.description"></div>
      <hr class="my-2 border-dotted border-3" />
      <div class="flex justify-center">
        <button
          v-if="selectedChallege.status === 'none'"
          @click="startChallenge(selectedChallege)"
          class="btn btn-primary rounded-10"
        >
          <i class="ti ti-player-play-filled icon-32"></i>
          Start Challenge
        </button>
        <button
          v-if="selectedChallege.status === 'solved'"
          @click="completeChallenge(selectedChallege)"
          class="btn btn-primary rounded-10 mt-4"
        >
          <i class="ti ti-circle-check-filled icon-32"></i>
          Complete Challenge
        </button>
      </div>
      <div v-if="selectedChallege.status === 'ongoing'">
        <div
          class="shadow-3 border-2 rounded-12 border-indigo-950"
          :class="{ 'shake border-danger': answerError }"
        >
          <v-ace-editor
            v-model:value="content"
            class="code-editor rounded-12 text-lg"
            lang="javascript"
            theme="monokai"
            style="height: 300px"
            :options="{
              enableBasicAutocompletion: true,
              enableSnippets: true,
              enableLiveAutocompletion: true,
            }"
          />
        </div>
        <div class="flex justify-between mt-3">
          <button @click="showHints()" class="btn btn-c-outline-primary">
            <i class="ti ti-help-circle-filled icon-24"></i>
            Hints
          </button>
          <button @click="submitAnswer()" class="btn btn-primary">
            <i class="ti ti-player-play-filled icon-24"></i>
            Run
          </button>
        </div>
        <div
          v-show="!allTestsPassed && codeSubmitted"
          class="flex flex-col mt-3"
        >
          <ul
            class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
          >
            <li class="me-2">
              <a
                @click.prevent="selectedTab = 'result'"
                aria-current="page"
                class="inline-block p-4 rounded-t-lg hover:bg-gray-800 hover:dark:bg-gray-800 cursor-pointer"
                :class="{
                  'active text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500':
                    selectedTab == 'result',
                }"
                >Result</a
              >
            </li>
            <li class="me-2">
              <a
                @click.prevent="selectedTab = 'errors'"
                class="inline-block p-4 rounded-t-lg hover:bg-gray-800 hover:dark:bg-gray-800 cursor-pointer"
                :class="{
                  'active text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500':
                    selectedTab == 'errors',
                }"
                >Errors</a
              >
            </li>
          </ul>
          <div class="mt-2" v-if="selectedTab == 'result'">
            <h4 class="font-mono">
              Result:
              <strong
                class="font-mono"
                v-html="getSubmissionResultTitle(this.submissionResult)"
              ></strong>
            </h4>
            <ul class="mb-0">
              <li v-for="(result, idx) in submissionResult.results" :key="idx">
                <template v-if="result.ok">
                  <div>
                    {{ result.ms }}ms | Test {{ idx + 1 }}:
                    <strong class="text-success">PASSED</strong>
                  </div>
                </template>
                <template v-else>
                  <div
                    class="font-mono"
                    v-html="getAssertionResult(result, idx)"
                  ></div>
                </template>
              </li>
            </ul>
          </div>
          <div class="mt-2" v-if="selectedTab == 'errors'">
            <pre v-html="getCodeErrors(submissionResult)"></pre>
          </div>
        </div>
      </div>

      <div v-if="selectedChallege.status === 'solved'">
        <div class="mt-4">
          <h2 class="text-center">Challenge Solved!</h2>
          <div>
            <h3>Code</h3>
            <div
              class="font-mono p-3 bg-neutral-900 rounded-10 my-2"
              v-html="
                selectedChallege.ongoingAnswer.submission.code.replace(
                  /\n/,
                  '<br />'
                )
              "
            ></div>

            <h4 class="font-mono">
              Result:
              <strong
                class="font-mono"
                v-html="
                  getSubmissionResultTitle(
                    selectedChallege.ongoingAnswer.submission.metadata
                  )
                "
              ></strong>
            </h4>
            <div class="p-3 bg-neutral-900 rounded-10 my-2">
              <ul class="mb-0">
                <li
                  v-for="(result, idx) in selectedChallege.ongoingAnswer
                    .submission.metadata.results"
                  :key="idx"
                >
                  <template v-if="result.ok">
                    <div>
                      {{ result.ms }}ms | Test {{ idx + 1 }}:
                      <strong class="text-success">PASSED</strong>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      class="font-mono"
                      v-html="getAssertionResult(result, idx)"
                    ></div>
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedChallege.status === 'completed'">
        <div class="mt-4">
          <h2 class="text-center">Challenge Completed!</h2>
          <div>
            <h3>Time Spent</h3>
            <div class="font-mono p-3 bg-neutral-900 rounded-10 my-2">
              {{ formatTime(selectedChallege.acceptedAnswer.duration) }}
            </div>
            <h3>Code</h3>
            <div
              class="font-mono p-3 bg-neutral-900 rounded-10 my-2"
              v-html="
                selectedChallege.acceptedAnswer.submission.code.replace(
                  /\n/,
                  '<br />'
                )
              "
            ></div>
            <h3>Feedback</h3>
            <div
              class="p-3 bg-neutral-900 rounded-10 my-2"
              v-html="selectedChallege.acceptedAnswer.feedback"
            ></div>
          </div>
        </div>

        <div class="mt-3 flex justify-center" v-if="nextSection">
          <router-link
            class="btn btn-primary rounder-12 pulse"
            :key="nextSection.id"
            :to="`/story/chapters/${nextSection.chapterId}/${
              nextSection.id
            }?t=${new Date().getTime()}`"
          >
            Next: {{ nextSection.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Main modal -->
  <div
    v-show="showChallengeHints"
    id="select-modal"
    tabindex="-1"
    aria-hidden="true"
    style="background: rgba(0, 0, 0, 0.8)"
    class="fixed flex items-center justify-center z-[999] left-0 max-h-full md:inset-0 overflow-x-hidden overflow-y-auto right-0 top-0 w-full z-50"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            <i class="ti ti-help-circle-filled"></i>
            Hints
          </h3>
          <button
            @click="showChallengeHints = false"
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
          <p class="text-gray-500 dark:text-gray-400 mb-4">Choose a hint:</p>
          <ul class="space-y-4 mb-4">
            <li
              v-for="hint in modifiedHints"
              :key="hint.id"
              @click="buyHint(hint)"
            >
              <label
                for="job-1"
                class="inline-flex items-center bg-white justify-between w-full p-5 text-gray-900 border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                <div class="block">
                  <div class="w-full text-lg font-semibold">
                    {{ hint.displayText }}
                  </div>
                  <div class="w-full text-gray-500 dark:text-gray-400">
                    {{ hint.cost }} credits
                  </div>
                </div>
                <i
                  class="ti icon-40"
                  :class="{
                    'ti-lock-open-2 text-success': hint.bought,
                    'ti-lock': !hint.bought,
                  }"
                ></i>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
<script>
import { VAceEditor } from 'vue3-ace-editor';
import Swal from 'sweetalert2';
import { Toast } from '../assets/js/swal-mixin';
import { useAuthStore } from '../stores/auth';
import { mapStores } from 'pinia';

export default {
  components: {
    VAceEditor,
  },
  data() {
    return {
      feedback: '',
      selectedChallege: {},
      selectedTab: 'result',
      codeSubmitted: false,
      answerError: false,
      content: '',
      showChallengeHints: false,
      swalClasses: {
        popup: 'bg-gray-800 text-white shadow-lg rounded-lg',
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-c-dark-outline',
      },
      hints: [],
      submissionResult: {
        status: '',
        results: [],
      },
    };
  },
  props: {
    section: {
      required: true,
    },
  },
  inject: ['http'],
  computed: {
    ...mapStores(useAuthStore),
    nextSection() {
      return this.section.nextSection;
    },
    modifiedHints() {
      return this.hints.map((hint) => {
        const boughtHint = this.section.creditUsages.find(
          (x) => x.challengeHintId == hint.id
        );
        if (boughtHint) {
          hint.bought = true;
          hint.hintText = boughtHint.hint.hintText;
        } else {
          hint.bought = false;
        }
        return hint;
      });
    },
    allTestsPassed() {
      if (this.submissionResult.status === 'ok') {
        this.submissionResult.results.every((t) => t.ok);
      }
      return false;
    },
  },
  methods: {
    startChallenge(challenge) {
      Swal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonText: 'Start',
        showLoaderOnConfirm: true,
        customClass: this.swalClasses,
        preConfirm: async () => {
          try {
            const challengeId = this.selectedChallege.id;
            const response = await this.http.post(
              '/challenges/' + challengeId + '/start'
            );
            challenge.status = response.data.data.status;
            return response.data;
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result, response) => {
        if (result.isConfirmed) {
        }
      });
    },
    completeChallenge(challenge) {
      Swal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonText: 'Complete',
        showLoaderOnConfirm: true,
        customClass: this.swalClasses,
        preConfirm: async () => {
          try {
            const challengeId = this.selectedChallege.id;
            const response = await this.http.post(
              '/challenges/' + challengeId + '/complete'
            );
            console.log('========', response.data.data);
            console.log('========b4', challenge);
            challenge.acceptedAnswer = response.data.data.answer;
            challenge.status = response.data.data.answer.status;
            const nextChallenge = this.section.challenges.find(
              (c) => c.order == challenge.order + 1
            );

            if (nextChallenge) {
              nextChallenge.locked = false;
            }

            this.section.nextSection = response.data.data.nextSection;
            console.log('========after', challenge);
            return response.data;
          } catch (error) {
            console.log('error', error);
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(async (result, response) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Yey',
            text: 'You have completed this challenge!',
            customClass: this.swalClasses,
          });

          Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            text: 'Challenge completed!',
            width: 600,
            padding: '3em',
            customClass: this.swalClasses,
            backdrop: `
              rgba(0,0,123,0.4)
              url("/assets/images/nyan-cat.gif")
              left top
              no-repeat
            `,
          });
          await this.authStore.fetchUser();
        }
      });
    },
    getSubmissionResultTitle(submissionResult) {
      const status = submissionResult.status;
      switch (status) {
        case 'timeout':
          return '<strong class="text-danger">Timeout</strong>';
        case 'ok': {
          if (submissionResult.results.every((x) => x.ok)) {
            return '<strong class="text-success">Passed</strong>';
          } else if (
            submissionResult.results.some(
              (x) => x.error && x.error.indexOf('ReferenceError') > -1
            )
          ) {
            return (
              '<strong class="text-danger">' +
              submissionResult.results[0].error +
              '</strong>'
            );
          } else {
            return '<strong class="text-danger">Code Error</strong>';
          }
        }
        case 'oom':
          return '<strong class="text-danger">Out of memory</strong>';
        case 'parse_error':
          return '<strong class="text-danger">Syntax Error</strong>';
      }
      return '<strong class="text-warning">No Result</strong>';
    },
    getAssertionResult(r, i) {
      const testNum = i + 1;
      const method =
        'assert_print' in r ? 'assert_print' : 'assert' in r ? 'assert' : '';
      if (!method) {
        return `[${r.ms}ms] | Test ${testNum}: <strong class="text-danger">FAILED</strong>`;
      }
      return `[${r.ms}ms] | Test ${testNum}: <strong class="text-danger">FAILED</strong> - Expected '${r[method].diff.expected}', got '${r[method].diff.actual}'`;
    },
    getCodeErrors(result) {
      let codeErrorsHTML = '';
      if (result.status === 'parse_error') {
        const codeFrameParts = result.codeFrame.split('\n');
        const codeFrameCode = codeFrameParts[0];
        const condeFrameIndicator = (
          ' '.repeat(5 + result.errorLine.toString().length) + codeFrameParts[1]
        ).replaceAll(/\s/g, '&nbsp;');
        codeErrorsHTML += `${
          codeFrameCode + '<br />' + condeFrameIndicator
        } at line number ${result.errorLine}, column ${result.errorColumn}`;
      }
      return codeErrorsHTML;
    },
    displayChallenge(challenge) {
      if (challenge.locked) {
        Toast.fire({
          icon: 'warning',
          title: 'Challenge is currently locked.',
        });
        return;
      }

      this.selectedChallege = challenge;
    },
    isBought(hintId) {
      console.log(
        'hintId',
        hintId,
        this.section.creditUsages,
        this.section.creditUsages.find((c) => c.challengeHintId == hintId)
      );
      return (
        this.section.creditUsages.filter((c) => c.challengeHintId == hintId)
          .length > 0
      );
    },
    getHint(hintId) {
      return this.section.creditUsages.find((c) => c.challengeHintId == hintId);
    },
    async buyHint(hint) {
      const boughtHint = this.getHint(hint.id);
      if (boughtHint) {
        Swal.fire({
          icon: 'info',
          title: 'Hint',
          html: `
            <div class="font-mono my-2 border-2 p-3">${boughtHint.hint.hintText}</div>
          `,
          customClass: this.swalClasses,
        });
        return;
      }

      Swal.fire({
        title: `Do you want to buy '${hint.displayText}'?`,
        showCancelButton: true,
        confirmButtonText: 'Buy',
        showLoaderOnConfirm: true,
        customClass: this.swalClasses,
        preConfirm: async () => {
          try {
            const challengeId = this.selectedChallege.id;
            const hintId = hint.id;
            const response = await this.http.post(
              '/challenges/' + challengeId + '/buy-hint',
              {
                hintId,
              }
            );
            return response.data;
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      })
        .then(async (result, response) => {
          if (result.isConfirmed && result.value) {
            const data = result.value;

            if (data.status === 'ok') {
              if (data.alreadyUsed) {
                Swal.fire({
                  icon: 'info',
                  title: 'Hint already purchased',
                  text: data.hint.hintText,
                  customClass: this.swalClasses,
                });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Hint purchased!',
                  html: `
                <div class="my-2 border-2 p-3 font-mono">${data.purchasedHint.hintText}</div>
                <p class="text-secondary">Remaining credits: ${data.remainingCredits}</p>
          `,
                  customClass: this.swalClasses,
                });
                this.section.creditUsages.push(data.creditUsage);
                this.authStore.setCredits(data.remainingCredits);
              }
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Purchase failed.',
                text: data.message,
                customClass: this.swalClasses,
              });
            }
          }
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong. Please try again',
            customClass: this.swalClasses,
          });
        });
    },
    async showHints() {
      try {
        const challengeId = this.selectedChallege.id;

        const response = await this.http.get(
          '/challenges/' + challengeId + '/hints'
        );
        const hints = response.data.data;
        this.hints = hints;

        this.showChallengeHints = true;
      } catch (e) {}
    },
    submitAnswer() {
      Swal.fire({
        title: 'Are you sure?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        customClass: this.swalClasses,
        preConfirm: async () => {
          try {
            this.answerError = false;
            this.feedback = '';
            this.codeSubmitted = true;
            const answer = encodeURIComponent(this.content);
            const challengeId = this.selectedChallege.id;
            const response = await this.http.post(
              '/challenges/' + challengeId + '/answer',
              {
                answer,
              }
            );
            this.submissionResult =
              response.data.data.ongoingAnswer.submission.metadata;
            this.selectedChallege.ongoingAnswer =
              response.data.data.ongoingAnswer;
            this.selectedChallege.status = response.data.data.result;
            return this.submissionResult;
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result, response) => {
        if (result.isConfirmed) {
          if (
            result.value.status === 'ok' &&
            result.value.results.every((x) => x.ok)
          ) {
            Swal.fire({
              title: '✨ Spell Cast!',
              text: 'Your incantation worked perfectly — the quest advances!',
              icon: 'success',
              customClass: this.swalClasses,
            });
          } else {
            this.answerError = true;
            Swal.fire({
              title: '🪄 Spell Fizzled!',
              text: result.value.errors
                ? result.value.errors.answer
                : result.value.message,
              icon: 'error',
              customClass: this.swalClasses,
            });
          }
        }
      });
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
  mounted() {
    for (const challenge of this.section.challenges) {
      challenge.locked = false;
      const currentOrder = challenge.order;
      console.log(currentOrder);

      if (currentOrder > 1) {
        const previousChallenge = this.section.challenges.find(
          (c) => c.order == currentOrder - 1
        );

        if (previousChallenge.status !== 'completed') {
          challenge.locked = true;
        }
      }
    }

    this.displayChallenge(this.section.challenges[0]);
  },
};
</script>
