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
            'px-4 py-2 text-sm btn-primary font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white':
              idx === 0,
            'px-4 py-2 text-sm btn-primary font-medium text-gray-900 bg-gray-100 border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white':
              idx > 0 && idx < section.challenges.length - 1,
            'px-4 py-2 text-sm btn-primary font-medium text-gray-900 bg-gray-100 border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white':
              idx === section.challenges.length - 1,
          }"
          :style="{
            background: selectedChallenge.id == challenge.id ? '#f29620' : '',
          }"
        >
          <i class="ti ti-lock" v-if="challenge.locked"></i>
          {{ challenge.difficulty.toUpperCase() }}
        </button>
      </template>
    </div>

    <div class="mt-4 w-full" v-if="selectedChallenge.id">
      <h3>{{ selectedChallenge.title }}</h3>
      <div v-html="selectedChallenge.description"></div>
      <hr class="my-2 border-dotted border-3" />
      <div class="flex justify-center">
        <button
          v-if="selectedChallenge.status === 'none'"
          @click="startChallenge(selectedChallenge)"
          class="btn btn-primary rounded-10"
        >
          <i class="ti ti-player-play-filled icon-32"></i>
          Start Challenge
        </button>
        <button
          v-if="
            selectedChallenge.status === 'solved' &&
            (!selectedChallenge.type || selectedChallenge.type === 'code')
          "
          @click="completeChallenge(selectedChallenge)"
          class="btn btn-primary rounded-10 mt-4"
        >
          <i class="ti ti-circle-check-filled icon-32"></i>
          Complete Challenge
        </button>
      </div>
      <div v-if="selectedChallenge.status === 'ongoing'">
        <!-- Code Challenge -->
        <div
          v-if="!selectedChallenge.type || selectedChallenge.type === 'code'"
        >
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
        </div>

        <!-- Multiple Choice Challenge -->
        <div v-if="selectedChallenge.type === 'multiple_choice'">
          <div
            class="rounded-12 p-4 mb-4"
            :class="
              appStore.isDarkMode
                ? 'bg-b-neutral-4 border border-gray-700'
                : 'bg-white border border-gray-300'
            "
          >
            <h4
              class="font-semibold mb-4"
              :class="
                appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
              "
            >
              Select your answer:
            </h4>
            <div class="space-y-3">
              <label
                v-for="(choice, index) in parsedChoices"
                :key="index"
                class="flex items-start p-4 rounded-lg cursor-pointer transition-all"
                :class="[
                  selectedChoice === index
                    ? appStore.isDarkMode
                      ? 'bg-primary bg-opacity-20 border-2 border-primary'
                      : 'bg-primary bg-opacity-10 border-2 border-primary'
                    : appStore.isDarkMode
                    ? 'bg-b-neutral-3 border border-gray-600 hover:border-gray-500'
                    : 'bg-gray-50 border border-gray-200 hover:border-gray-400',
                  { 'shake border-danger': answerError },
                ]"
              >
                <input
                  type="radio"
                  :value="index"
                  v-model="selectedChoice"
                  class="mt-1 mr-3"
                />
                <span
                  class="text-base"
                  :class="
                    appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                  "
                  >{{ choice.text }}</span
                >
              </label>
            </div>
          </div>
          <div class="flex justify-between mt-3">
            <button @click="showHints()" class="btn btn-c-outline-primary">
              <i class="ti ti-help-circle-filled icon-24"></i>
              Hints
            </button>
            <button
              @click="submitAnswer()"
              class="btn btn-primary"
              :disabled="selectedChoice === null"
            >
              <i class="ti ti-check icon-24"></i>
              Submit Answer
            </button>
          </div>
        </div>
        <div
          v-show="
            !allTestsPassed &&
            codeSubmitted &&
            (!selectedChallenge.type || selectedChallenge.type === 'code')
          "
          class="flex flex-col mt-3"
        >
          <ul
            class="flex flex-wrap text-sm font-medium text-center border-b"
            :class="
              appStore.isDarkMode
                ? 'text-gray-500 border-gray-700'
                : 'text-gray-600 border-gray-300'
            "
          >
            <li class="me-2">
              <a
                @click.prevent="selectedTab = 'result'"
                aria-current="page"
                class="inline-block p-4 rounded-t-lg cursor-pointer"
                :class="[
                  selectedTab == 'result'
                    ? appStore.isDarkMode
                      ? 'text-blue-500 bg-gray-800'
                      : 'text-blue-600 bg-gray-200'
                    : '',
                  appStore.isDarkMode
                    ? 'hover:bg-gray-800'
                    : 'hover:bg-gray-200',
                ]"
                >Result</a
              >
            </li>
            <li class="me-2">
              <a
                @click.prevent="selectedTab = 'errors'"
                class="inline-block p-4 rounded-t-lg cursor-pointer"
                :class="[
                  selectedTab == 'errors'
                    ? appStore.isDarkMode
                      ? 'text-blue-500 bg-gray-800'
                      : 'text-blue-600 bg-gray-200'
                    : '',
                  appStore.isDarkMode
                    ? 'hover:bg-gray-800'
                    : 'hover:bg-gray-200',
                ]"
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

        <!-- Multiple Choice Result -->
        <div
          v-if="selectedChallenge.type === 'multiple_choice' && codeSubmitted"
          class="mt-4 p-4 rounded-12"
          :class="
            submissionResult.correct
              ? appStore.isDarkMode
                ? 'bg-green-900 bg-opacity-20 border border-green-700'
                : 'bg-green-50 border border-green-300'
              : appStore.isDarkMode
              ? 'bg-red-900 bg-opacity-20 border border-red-700'
              : 'bg-red-50 border border-red-300'
          "
        >
          <div class="flex items-center mb-3">
            <i
              :class="
                submissionResult.correct
                  ? 'ti ti-circle-check text-success icon-32'
                  : 'ti ti-circle-x text-danger icon-32'
              "
            ></i>
            <h4
              class="ml-2 font-bold"
              :class="submissionResult.correct ? 'text-success' : 'text-danger'"
            >
              {{ submissionResult.correct ? 'Correct!' : 'Incorrect' }}
            </h4>
          </div>
          <div
            v-if="!submissionResult.correct"
            :class="appStore.isDarkMode ? 'text-w-neutral-2' : 'text-gray-800'"
          >
            <p class="mb-2">
              <strong>Your answer:</strong>
              {{ submissionResult.userAnswerText }}
            </p>
            <p class="mb-2">
              <strong>Correct answer:</strong>
              {{ submissionResult.correctAnswerText }}
            </p>
          </div>
          <div
            v-if="submissionResult.explanation"
            class="mt-3 pt-3 border-t"
            :class="
              appStore.isDarkMode
                ? 'border-gray-600 text-w-neutral-2'
                : 'border-gray-300 text-gray-700'
            "
          >
            <strong>Explanation:</strong>
            <p class="mt-1" v-html="submissionResult.explanation"></p>
          </div>
        </div>
      </div>

      <div v-if="selectedChallenge.status === 'solved'">
        <div class="mt-4">
          <h2 class="text-center">Challenge Solved!</h2>

          <!-- Code Challenge Solved Display -->
          <div
            v-if="!selectedChallenge.type || selectedChallenge.type === 'code'"
          >
            <h3>Code</h3>
            <div
              class="font-mono p-3 rounded-10 my-2"
              :class="
                appStore.isDarkMode
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-gray-900 border border-gray-300'
              "
              v-html="
                selectedChallenge.ongoingAnswer.submission.code.replace(
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
                    selectedChallenge.ongoingAnswer.submission.metadata
                  )
                "
              ></strong>
            </h4>
            <div
              class="p-3 rounded-10 my-2"
              :class="
                appStore.isDarkMode
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-gray-900 border border-gray-300'
              "
            >
              <ul class="mb-0">
                <li
                  v-for="(result, idx) in selectedChallenge.ongoingAnswer
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

          <!-- Multiple Choice Challenge Solved Display -->
          <div v-if="selectedChallenge.type === 'multiple_choice'">
            <div
              class="p-4 rounded-10 my-2"
              :class="
                appStore.isDarkMode
                  ? 'bg-green-900 bg-opacity-20 border border-green-700'
                  : 'bg-green-50 border border-green-300'
              "
            >
              <div class="flex items-center mb-3">
                <i class="ti ti-circle-check text-success icon-32"></i>
                <h4 class="ml-2 font-bold text-success">Correct Answer!</h4>
              </div>
              <p
                :class="
                  appStore.isDarkMode ? 'text-w-neutral-2' : 'text-gray-800'
                "
              >
                <strong>Your answer:</strong>
                {{ parsedChoices[selectedChoice]?.text || 'N/A' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedChallenge.status === 'completed'">
        <div class="mt-4">
          <h2 class="text-center">Challenge Completed!</h2>
          <div>
            <h3>Time Spent</h3>
            <div
              class="font-mono p-3 rounded-10 my-2"
              :class="
                appStore.isDarkMode
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-gray-900 border border-gray-300'
              "
            >
              {{ formatTime(selectedChallenge.acceptedAnswer.duration) }}
            </div>

            <!-- Code Challenge Display -->
            <template
              v-if="
                !selectedChallenge.type || selectedChallenge.type === 'code'
              "
            >
              <h3>Code</h3>
              <div
                class="font-mono p-3 rounded-10 my-2"
                :class="
                  appStore.isDarkMode
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-gray-900 border border-gray-300'
                "
                v-html="
                  selectedChallenge.acceptedAnswer.submission.code.replace(
                    /\n/,
                    '<br />'
                  )
                "
              ></div>
            </template>

            <!-- Multiple Choice Display -->
            <template v-if="selectedChallenge.type === 'multiple_choice'">
              <h3>Question</h3>
              <div
                class="p-3 rounded-10 my-2"
                :class="
                  appStore.isDarkMode
                    ? 'bg-b-neutral-4 border border-gray-700'
                    : 'bg-white border border-gray-300'
                "
                v-html="selectedChallenge.description"
              ></div>

              <h3>Options</h3>
              <div class="space-y-2 my-2">
                <div
                  v-for="(choice, index) in parsedChoices"
                  :key="index"
                  class="flex items-start p-3 rounded-lg"
                  :class="getCompletedChoiceStyle(choice.text)"
                >
                  <span
                    class="mr-2 font-semibold"
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    {{ String.fromCharCode(65 + index) }}.
                  </span>
                  <span
                    :class="
                      appStore.isDarkMode ? 'text-w-neutral-1' : 'text-gray-900'
                    "
                  >
                    {{ choice.text }}
                  </span>
                  <i
                    v-if="getCompletedChoiceIcon(choice.text)"
                    :class="getCompletedChoiceIcon(choice.text)"
                    class="ml-auto icon-24"
                  ></i>
                </div>
              </div>
            </template>

            <h3>Feedback</h3>
            <div
              class="p-3 rounded-10 my-2"
              :class="
                appStore.isDarkMode
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-gray-900 border border-gray-300'
              "
              v-html="selectedChallenge.acceptedAnswer.feedback"
            ></div>
          </div>
        </div>

        <div
          class="mt-3 flex justify-center"
          v-if="nextSection && nextSection.id"
        >
          <router-link
            class="btn btn-primary rounder-12 pulse"
            :key="nextSection.id"
            :to="`/sections/${nextSection.id}`"
          >
            Next: {{ nextSection.title }}
          </router-link>
        </div>

        <div
          class="mt-3 flex justify-center"
          v-if="nextSection && !nextSection.id"
        >
          <router-link
            class="btn btn-primary rounder-12 pulse"
            :key="nextSection.id"
            :to="`/courses/${courseId}?chapter=${section.chapterId}`"
          >
            Back to Chapter Sections
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
    class="fixed flex items-center justify-center left-0 max-h-full md:inset-0 overflow-x-hidden overflow-y-auto right-0 top-0 w-full z-[999]"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div
        class="relative rounded-lg shadow-sm"
        :class="appStore.isDarkMode ? 'bg-gray-700' : 'bg-white'"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
          :class="appStore.isDarkMode ? 'border-gray-600' : 'border-gray-200'"
        >
          <h3
            class="text-lg font-semibold"
            :class="appStore.isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            <i class="ti ti-help-circle-filled"></i>
            Hints
          </h3>
          <button
            @click="showChallengeHints = false"
            type="button"
            class="bg-transparent rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
            :class="
              appStore.isDarkMode
                ? 'text-gray-400 hover:bg-gray-600 hover:text-white'
                : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            "
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
          <p
            class="mb-4"
            :class="appStore.isDarkMode ? 'text-gray-400' : 'text-gray-600'"
          >
            Choose a hint:
          </p>
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

.iframe-wrapper iframe {
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 0.375rem;
  display: block;
  margin-bottom: 1rem;
  margin-top: 1rem;
  max-width: 100%;
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
import { useAppStore } from '../stores/app';
import { mapStores } from 'pinia';
import Toastify from 'toastify-js';

export default {
  components: {
    VAceEditor,
  },
  data() {
    return {
      feedback: '',
      selectedChallenge: {},
      selectedTab: 'result',
      codeSubmitted: false,
      answerError: false,
      content: '',
      selectedChoice: null,
      showChallengeHints: false,
      hints: [],
      submissionResult: {
        status: '',
        results: [],
      },
      completeChallengeController: new AbortController(),
    };
  },
  props: {
    section: {
      required: true,
    },
    courseId: Number,
  },
  inject: ['http'],
  computed: {
    ...mapStores(useAuthStore),
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
    nextSection() {
      return this.section.nextSection;
    },
    parsedChoices() {
      if (this.selectedChallenge.choices) {
        try {
          const choices = Array.isArray(this.selectedChallenge.choices)
            ? this.selectedChallenge.choices
            : JSON.parse(this.selectedChallenge.choices);
          // Add index to each choice for easier reference
          return choices.map((choice, index) => ({
            ...choice,
            index,
          }));
        } catch (e) {
          console.error('Error parsing choices:', e);
          return [];
        }
      }
      return [];
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
            const challengeId = this.selectedChallenge.id;
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
        title: 'Complete Challenge?',
        html: `
        <div id="msg" class="flex flex-col gap-1">
          <p>This operation will take time.</p>
          <p>Please be patient while it's generating a feedback.</p>
          <p>Do not close this window or navigate away.</p>
          <p>Do you want to proceed?</p>
        </div>
        <hr class="my-2" />
        <div id="feedback" class="max-h-96 overflow-y-auto text-sm"></div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Complete',
        showLoaderOnConfirm: true,
        customClass: {
          ...this.swalClasses,
          popup:
            (this.appStore.isDarkMode ? 'bg-gray-800' : 'bg-white') +
            ' text-white shadow-lg rounded-lg w-fit max-w-4xl',
        },
        preConfirm: async () => {
          try {
            const msg = Swal.getPopup().querySelector('#msg');
            const feedback = Swal.getPopup().querySelector('#feedback');

            const div = document.createElement('div');
            div.setAttribute('class', 'flex items-center justify-center');

            const msgImg = document.createElement('img');
            msgImg.setAttribute('src', '/assets/images/loading-3.gif');
            msgImg.setAttribute('class', 'text-center');

            div.appendChild(msgImg);

            feedback.insertBefore(div, feedback.firstChild);

            this.completeChallengeController.abort();
            this.completeChallengeController = new AbortController();
            const { signal } = this.completeChallengeController;

            const challengeId = this.selectedChallenge.id;
            const response = await this.http.post(
              '/challenges/' + challengeId + '/complete',
              {},
              {
                signal,
                adapter: 'fetch',
                responseType: 'stream',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'text/event-stream',
                  'Cache-Control': 'no-cache',
                },
              }
            );

            const reader = response.data.getReader();
            const decoder = new TextDecoder('utf-8');

            let responseData = null;
            let feedbackParts = '';
            let finalResponse = '';

            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              const chunk = decoder.decode(value);
              const messages = chunk.split('\n\n').filter(Boolean);

              for (const message of messages) {
                if (message.startsWith('message: ')) {
                  try {
                    const eventData = JSON.parse(
                      message.substring('message: '.length)
                    );
                    msg.innerHTML = `<div class="py-2 px-4">${eventData.message}</div>`;
                  } catch (e) {
                    console.error('Failed to parse SSE data:', e);
                  }
                }
                if (message.startsWith('feedback: ')) {
                  try {
                    const eventData = JSON.parse(
                      message.substring('feedback: '.length)
                    );
                    feedbackParts += eventData.data;
                    feedback.innerHTML = feedbackParts;
                    feedback.scrollTo({
                      behavior: 'smooth',
                      top: feedback.clientHeight,
                    });
                  } catch (e) {
                    console.error('Failed to parse SSE data:', e);
                  }
                }
                if (message.startsWith('end: ')) {
                  try {
                    responseData = JSON.parse(finalResponse);
                    reader.cancel();
                  } catch (e) {
                    this.$emit('refetch');
                    console.error('Failed to parse final response data:', e);
                  }
                }
                if (message.startsWith('end:chunk')) {
                  const msg = message.substring('end:chunk: '.length).trim();
                  finalResponse += msg;
                }
              }
            }

            challenge.acceptedAnswer = responseData.data.data.answer;
            challenge.status = responseData.data.data.answer.status;
            const nextChallenge = this.section.challenges.find(
              (c) => c.order == challenge.order + 1
            );
            if (nextChallenge) {
              nextChallenge.locked = false;
            }

            this.section.nextSection = responseData.data.data.nextSection;

            await new Promise((res, rej) => setTimeout(() => res(), 2000));

            return responseData.data;
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then(async (result, response) => {
        if (result.isConfirmed) {
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
          }).then(async () => {
            // Show achievement notifications
            for (const c of result.value.achievements) {
              Toastify({
                text: `Achievement Unlocked: ${c.title}`,
                duration: 5000,
                destination: '/achievements',
                gravity: 'top', // `top` or `bottom`
                position: 'right', // `left`, `center` or `right`
                backgroundColor: '#00a93a',
                className: 'success',
                stopOnFocus: true, // Prevents dismissing of toast on hover
              }).showToast();
            }

            // Show reward points notification
            if (result.value.data.answer.rewardPoints) {
              Toastify({
                text: `🏆 +${result.value.data.answer.rewardPoints} Reward Points`,
                duration: 4000,
                gravity: 'top',
                position: 'right',
                backgroundColor: '#f59e0b',
                className: 'info',
                stopOnFocus: true,
              }).showToast();
            }

            // Show credit points notification
            if (result.value.data.answer.creditPoints) {
              Toastify({
                text: `💰 +${result.value.data.answer.creditPoints} Credit Points`,
                duration: 4000,
                gravity: 'top',
                position: 'right',
                backgroundColor: '#3b82f6',
                className: 'info',
                stopOnFocus: true,
              }).showToast();
            }
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

      this.selectedChallenge = challenge;
      this.selectedChoice = null;
      this.codeSubmitted = false;
      this.answerError = false;
    },
    isBought(hintId) {
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
            const challengeId = this.selectedChallenge.id;
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
        const challengeId = this.selectedChallenge.id;

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

            const challengeId = this.selectedChallenge.id;
            let requestData;

            // Handle different challenge types
            if (this.selectedChallenge.type === 'multiple_choice') {
              if (this.selectedChoice === null) {
                Swal.showValidationMessage('Please select an answer');
                return;
              }

              // Send the actual text of the selected choice, not the index
              const selectedChoiceText =
                this.parsedChoices[this.selectedChoice]?.text;

              requestData = {
                answer: selectedChoiceText,
              };

              try {
                const response = await this.http.post(
                  '/challenges/' + challengeId + '/answer-multiple-choice',
                  requestData
                );

                // Check for error status in response
                if (response.data.status === 'error') {
                  let errorMessage = response.data.message;

                  switch (response.data.code) {
                    case 'challenge_already_answered':
                      errorMessage = 'You have already answered this challenge';
                      break;
                    case 'challenge_not_found':
                      errorMessage = 'Challenge not found';
                      break;
                    case 'invalid_challenge_type':
                      errorMessage =
                        'This endpoint is only for multiple choice challenges';
                      break;
                    case 'challenge_not_started':
                      errorMessage = 'Challenge has not been started yet';
                      break;
                    case 'internal_error':
                      errorMessage =
                        'An error occurred while processing your answer';
                      break;
                  }

                  Swal.showValidationMessage(errorMessage);
                  return;
                }

                // Process multiple choice response
                this.submissionResult = {
                  correct: response.data.data.result === 'correct',
                  result: response.data.data.result,
                  userAnswer: response.data.data.userAnswer,
                  userAnswerText: response.data.data.userAnswer,
                  correctAnswerIndex: response.data.data.choices.findIndex(
                    (c) => c.isCorrect
                  ),
                  correctAnswerText:
                    response.data.data.choices.find((c) => c.isCorrect)?.text ||
                    '',
                  choices: response.data.data.choices,
                  explanation: response.data.data.explanation || '',
                };

                // Update challenge status based on result
                if (this.submissionResult.correct) {
                  this.selectedChallenge.status = 'completed';

                  // Store the accepted answer for display
                  this.selectedChallenge.acceptedAnswer =
                    response.data.data.acceptedAnswer;
                } else {
                  // Even if incorrect, multiple choice is completed after answering
                  this.selectedChallenge.status = 'completed';

                  // Store the accepted answer for display (incorrect answer)
                  this.selectedChallenge.acceptedAnswer =
                    response.data.data.completedAnswer;
                }

                // Update nextSection if returned (for both correct and incorrect)
                if (response.data.data.nextSection) {
                  this.section.nextSection = response.data.data.nextSection;
                }

                // Unlock next challenge if exists (for both correct and incorrect)
                const nextChallenge = this.section.challenges.find(
                  (c) => c.order == this.selectedChallenge.order + 1
                );
                if (nextChallenge) {
                  nextChallenge.locked = false;
                }

                // Include additional data from response for notifications
                this.submissionResult.achievements =
                  response.data.data.achievements || [];
                this.submissionResult.rewardPoints =
                  response.data.data.rewardPoints || 0;
                this.submissionResult.creditPoints =
                  response.data.data.creditPoints || 0;

                return this.submissionResult;
              } catch (error) {
                // Handle axios error responses
                if (error.response && error.response.data) {
                  const errorData = error.response.data;
                  let errorMessage = errorData.message || 'Request failed';

                  switch (errorData.code) {
                    case 'challenge_already_answered':
                      errorMessage = 'You have already answered this challenge';
                      break;
                    case 'challenge_not_found':
                      errorMessage = 'Challenge not found';
                      break;
                    case 'invalid_challenge_type':
                      errorMessage =
                        'This endpoint is only for multiple choice challenges';
                      break;
                    case 'challenge_not_started':
                      errorMessage =
                        'Challenge has not been started yet. Please start the challenge first.';
                      break;
                    case 'internal_error':
                      errorMessage =
                        'An error occurred while processing your answer. Please try again.';
                      break;
                  }

                  Swal.showValidationMessage(errorMessage);
                } else {
                  Swal.showValidationMessage(
                    `Request failed: ${error.message || error}`
                  );
                }
                return;
              }
            } else {
              // Default to code type
              const answer = encodeURIComponent(this.content);
              requestData = {
                answer,
                type: 'code',
              };

              const response = await this.http.post(
                '/challenges/' + challengeId + '/answer',
                requestData
              );

              this.submissionResult =
                response.data.data.ongoingAnswer.submission.metadata;
              this.selectedChallenge.ongoingAnswer =
                response.data.data.ongoingAnswer;
              this.selectedChallenge.status = response.data.data.result;

              return this.submissionResult;
            }
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result, response) => {
        if (result.isConfirmed) {
          if (this.selectedChallenge.type === 'multiple_choice') {
            if (result.value.correct) {
              Swal.fire({
                title: '✅ Correct Answer!',
                text: 'Well done! Challenge completed!',
                icon: 'success',
                customClass: this.swalClasses,
              }).then(async () => {
                // Show achievement notifications
                if (
                  result.value.achievements &&
                  result.value.achievements.length > 0
                ) {
                  for (const c of result.value.achievements) {
                    Toastify({
                      text: `Achievement Unlocked: ${c.title}`,
                      duration: 5000,
                      destination: '/achievements',
                      gravity: 'top',
                      position: 'right',
                      backgroundColor: '#00a93a',
                      className: 'success',
                      stopOnFocus: true,
                    }).showToast();
                  }
                }

                // Show reward points notification
                if (result.value.rewardPoints) {
                  Toastify({
                    text: `🏆 +${result.value.rewardPoints} Reward Points`,
                    duration: 4000,
                    gravity: 'top',
                    position: 'right',
                    backgroundColor: '#f59e0b',
                    className: 'info',
                    stopOnFocus: true,
                  }).showToast();
                }

                // Show credit points notification
                if (result.value.creditPoints) {
                  Toastify({
                    text: `💰 +${result.value.creditPoints} Credit Points`,
                    duration: 4000,
                    gravity: 'top',
                    position: 'right',
                    backgroundColor: '#3b82f6',
                    className: 'info',
                    stopOnFocus: true,
                  }).showToast();
                }

                // Refresh user data
                await this.authStore.fetchUser();
              });
            } else {
              this.answerError = true;
              Swal.fire({
                title: '❌ Incorrect Answer',
                text: 'Challenge completed. Review the explanation below.',
                icon: 'error',
                customClass: this.swalClasses,
              }).then(async () => {
                // Show achievement notifications even for incorrect answers
                if (
                  result.value.achievements &&
                  result.value.achievements.length > 0
                ) {
                  for (const c of result.value.achievements) {
                    Toastify({
                      text: `Achievement Unlocked: ${c.title}`,
                      duration: 5000,
                      destination: '/achievements',
                      gravity: 'top',
                      position: 'right',
                      backgroundColor: '#00a93a',
                      className: 'success',
                      stopOnFocus: true,
                    }).showToast();
                  }
                }

                // Show reward points notification (if any for incorrect)
                if (result.value.rewardPoints) {
                  Toastify({
                    text: `🏆 +${result.value.rewardPoints} Reward Points`,
                    duration: 4000,
                    gravity: 'top',
                    position: 'right',
                    backgroundColor: '#f59e0b',
                    className: 'info',
                    stopOnFocus: true,
                  }).showToast();
                }

                // Show credit points notification (if any for incorrect)
                if (result.value.creditPoints) {
                  Toastify({
                    text: `💰 +${result.value.creditPoints} Credit Points`,
                    duration: 4000,
                    gravity: 'top',
                    position: 'right',
                    backgroundColor: '#3b82f6',
                    className: 'info',
                    stopOnFocus: true,
                  }).showToast();
                }

                // Refresh user data
                await this.authStore.fetchUser();
              });
            }
          } else {
            // Code challenge result handling
            if (
              result.value.status === 'ok' &&
              result.value.results.every((x) => x.ok)
            ) {
              Swal.fire({
                title: '✅ Solution Successful',
                text: 'Your code executed correctly. You may proceed to the next challenge.',
                icon: 'success',
                customClass: this.swalClasses,
              }).then((successResult) => {
                // If user clicks OK, automatically trigger completion flow
                if (successResult.isConfirmed) {
                  this.completeChallenge(this.selectedChallenge);
                }
              });
            } else {
              this.answerError = true;
              Swal.fire({
                title: 'Execution Error',
                text: result.value.errors
                  ? result.value.errors.answer
                  : result.value.message,
                icon: 'error',
                customClass: this.swalClasses,
              });
            }
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
    getCompletedMultipleChoiceAnswer() {
      // For completed multiple choice challenges, get the answer from acceptedAnswer
      if (
        this.selectedChallenge.acceptedAnswer &&
        this.selectedChallenge.acceptedAnswer.submissions &&
        this.selectedChallenge.acceptedAnswer.submissions.length > 0
      ) {
        try {
          // Get the last submission
          const submission =
            this.selectedChallenge.acceptedAnswer.submissions[
              this.selectedChallenge.acceptedAnswer.submissions.length - 1
            ];

          // The submission.code contains the answer text directly
          const answerText = submission.code;

          // Try to parse metadata to get additional info if needed
          if (submission.metadata) {
            const metadata =
              typeof submission.metadata === 'string'
                ? JSON.parse(submission.metadata)
                : submission.metadata;

            // Return the userAnswer from metadata if available
            if (metadata.userAnswer) {
              return metadata.userAnswer;
            }
          }

          // Otherwise return the code field
          return answerText || 'N/A';
        } catch (e) {
          console.error('Error parsing completed answer:', e);
          return 'N/A';
        }
      }
      return 'N/A';
    },
    getCompletedUserAnswer() {
      // Get user's answer from acceptedAnswer submissions
      if (
        this.selectedChallenge.acceptedAnswer &&
        this.selectedChallenge.acceptedAnswer.submissions &&
        this.selectedChallenge.acceptedAnswer.submissions.length > 0
      ) {
        try {
          // Get the last submission
          const submission =
            this.selectedChallenge.acceptedAnswer.submissions[
              this.selectedChallenge.acceptedAnswer.submissions.length - 1
            ];

          const metadata =
            typeof submission.metadata === 'string'
              ? JSON.parse(submission.metadata)
              : submission.metadata;

          return metadata?.userAnswer || submission.code || 'N/A';
        } catch (e) {
          console.error('Error parsing user answer:', e);
          return 'N/A';
        }
      }
      return 'N/A';
    },
    getCompletedCorrectAnswer() {
      // Get correct answer from acceptedAnswer submissions metadata
      if (
        this.selectedChallenge.acceptedAnswer &&
        this.selectedChallenge.acceptedAnswer.submissions &&
        this.selectedChallenge.acceptedAnswer.submissions.length > 0
      ) {
        try {
          // Get the last submission
          const submission =
            this.selectedChallenge.acceptedAnswer.submissions[
              this.selectedChallenge.acceptedAnswer.submissions.length - 1
            ];

          const metadata =
            typeof submission.metadata === 'string'
              ? JSON.parse(submission.metadata)
              : submission.metadata;

          return metadata?.correctAnswer || 'N/A';
        } catch (e) {
          console.error('Error parsing correct answer:', e);
          return 'N/A';
        }
      }
      return 'N/A';
    },
    getCompletedAnswerWasCorrect() {
      // Check if user's answer was correct
      if (
        this.selectedChallenge.acceptedAnswer &&
        this.selectedChallenge.acceptedAnswer.submissions &&
        this.selectedChallenge.acceptedAnswer.submissions.length > 0
      ) {
        try {
          // Get the last submission
          const submission =
            this.selectedChallenge.acceptedAnswer.submissions[
              this.selectedChallenge.acceptedAnswer.submissions.length - 1
            ];

          const metadata =
            typeof submission.metadata === 'string'
              ? JSON.parse(submission.metadata)
              : submission.metadata;

          return metadata?.isCorrect === true;
        } catch (e) {
          return false;
        }
      }
      return false;
    },
    getCompletedChoiceStyle(choiceText) {
      // Style each choice based on whether it's correct or user's selection
      const userAnswer = this.getCompletedUserAnswer();
      const correctAnswer = this.getCompletedCorrectAnswer();

      const isUserChoice = choiceText === userAnswer;
      const isCorrectChoice = choiceText === correctAnswer;

      if (isCorrectChoice) {
        return this.appStore.isDarkMode
          ? 'bg-green-900 bg-opacity-20 border-2 border-green-700'
          : 'bg-green-50 border-2 border-green-300';
      } else if (isUserChoice && !isCorrectChoice) {
        return this.appStore.isDarkMode
          ? 'bg-red-900 bg-opacity-20 border-2 border-red-700'
          : 'bg-red-50 border-2 border-red-300';
      } else {
        return this.appStore.isDarkMode
          ? 'bg-b-neutral-4 border border-gray-700'
          : 'bg-white border border-gray-300';
      }
    },
    getCompletedChoiceIcon(choiceText) {
      // Show icon for correct answer and user's incorrect answer
      const userAnswer = this.getCompletedUserAnswer();
      const correctAnswer = this.getCompletedCorrectAnswer();

      const isUserChoice = choiceText === userAnswer;
      const isCorrectChoice = choiceText === correctAnswer;

      if (isCorrectChoice) {
        return 'ti ti-circle-check text-success';
      } else if (isUserChoice && !isCorrectChoice) {
        return 'ti ti-circle-x text-danger';
      }
      return null;
    },
  },
  beforeUnmount() {
    if (!this.completeChallengeController.signal.aborted) {
      this.completeChallengeController.abort();
    }
  },
  mounted() {
    // Sort challenges by difficulty: easy, medium, hard
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    this.section.challenges.sort((a, b) => {
      return (
        (difficultyOrder[a.difficulty] || 999) -
        (difficultyOrder[b.difficulty] || 999)
      );
    });

    for (const challenge of this.section.challenges) {
      challenge.locked = false;
      const currentOrder = challenge.order;

      if (currentOrder > 1) {
        const previousChallenge = this.section.challenges.find(
          (c) => c.order == currentOrder - 1
        );

        if (previousChallenge && previousChallenge.status !== 'completed') {
          challenge.locked = true;
        }
      }
    }

    if (this.section.challenges.length > 0) {
      this.displayChallenge(this.section.challenges[0]);
    }
  },
};
</script>
