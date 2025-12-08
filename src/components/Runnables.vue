<template>
  <div id="accordion-collapse" data-accordion="collapse">
    <div v-for="(runnable, idx) in runnables" :key="idx">
      <h6 id="accordion-collapse-heading-1">
        <button
          @click="toggleRunnable(runnable)"
          type="button"
          :class="{
            'flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3':
              idx === 0,
            'flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3':
              idx > 0 && idx < runnables.length - 1,
            'flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3':
              idx === runnables.length - 1,
          }"
        >
          <span>{{ runnable.title }}</span>
          <svg
            data-accordion-icon
            class="w-3 h-3 shrink-0"
            :class="{
              'rotate-180': !runnable.open,
            }"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h6>
      <div
        :id="`accordion-collapse-body-${idx}`"
        :class="{
          hidden: !runnable.open,
        }"
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div
          class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
        >
          <div
            class="font-mono whitespace-pre py-2 px-4 mb-2 border border-1 rounded-8"
          >
            {{ runnable.code }}
          </div>
          <div class="flex justify-end">
            <button
              @click="runCode(runnable)"
              type="submit"
              class="btn btn-c-md btn-primary rounded-12"
            >
              <i class="ti ti-player-play-filled icon-24"></i>
            </button>
          </div>
          <template v-if="runnable.error">
            <hr class="my-2 border-dotted border-dark border-2" />
            <div
              class="bg-red-500/20 border border-red-500 rounded-10 my-2 p-3"
            >
              <div
                class="flex items-center gap-2 text-red-500 font-semibold mb-2"
              >
                <i class="ti ti-alert-circle"></i>
                <span>{{
                  runnable.error.errorType === 'syntax'
                    ? 'Syntax Error'
                    : 'Parse Error'
                }}</span>
              </div>
              <div class="text-sm text-red-400 mb-2">
                Line {{ runnable.error.errorLine }}, Column
                {{ runnable.error.errorColumn }}
              </div>
              <pre
                class="bg-black/30 rounded-8 p-3 text-red-300 text-sm overflow-x-auto"
                >{{ runnable.error.codeFrame }}</pre
              >
            </div>
          </template>
          <template v-else-if="runnable.results && runnable.results.length">
            <hr class="my-2 border-dotted border-dark border-2" />
            <div class="bg-black/20 rounded-10 my-2 shadow-2 px-5 py-3">
              <div
                class="flex items-center gap-2 text-green-500 font-semibold mb-2"
              >
                <i class="ti ti-check"></i>
                <span>Output</span>
              </div>
              <div class="text-sm overflow-x-auto">
                <template
                  v-for="(result, rIdx) in runnable.results"
                  :key="rIdx"
                >
                  <template v-if="result.logs && result.logs.length">
                    <div
                      v-for="(log, lIdx) in result.logs"
                      :key="`${rIdx}-${lIdx}`"
                      :class="{
                        'text-red-400': log.level === 'error',
                        'text-blue-400': log.level === 'info',
                        'text-gray-200': log.level === 'log',
                      }"
                    >
                      {{ log.args.join(' ') }}
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export default {
  data() {
    return {};
  },
  inject: ['http'],
  props: {
    runnables: {
      required: true,
      type: Array,
      default: [],
    },
  },
  methods: {
    toggleRunnable(runnable) {
      runnable.open = !runnable.open;
    },
    async runCode(runnable) {
      runnable.results = [];
      runnable.error = null;
      Toast.fire({
        icon: 'info',
        title: 'Running code...',
      });
      const response = await this.http.post('/runner/run', {
        code: btoa(encodeURIComponent(runnable.code)),
      });

      const data = response.data;

      // Check for parse/syntax errors (single error object)
      if (
        data.status === 'parse_error' ||
        (data.ok === false && data.errorType)
      ) {
        Toast.fire({
          icon: 'error',
          title: 'Code has errors',
        });
        runnable.error = {
          errorType: data.errorType,
          errorLine: data.errorLine,
          errorColumn: data.errorColumn,
          codeFrame: data.codeFrame,
        };
        return;
      }

      // Successful response is an array of results
      Toast.fire({
        icon: 'success',
        title: 'It worked!',
      });
      runnable.results = data.results;
    },
  },
  mounted() {},
};
</script>
