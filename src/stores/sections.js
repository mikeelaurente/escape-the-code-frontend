import { defineStore } from 'pinia';
import { toSearchParams } from '../assets/js/utils';

export const useSectionStore = defineStore('sections', {
  state: () => ({
    sections: [],
    meta: {
      total: 0,
      page: 1,
      limit: 3,
      offset: 0,
    },
    params: {
      page: 1,
      limit: 3,
      search: '',
      filters: {
        chapterId: null,
        courseId: null,
      },
      sort: {
        name: 'id',
        order: 'asc',
      },
    },
  }),
  getters: {
    sectionList() {
      return this.sections;
    },
    metadata() {
      return this.meta;
    },
  },
  actions: {
    setParams(params) {
      Object.assign(this.params, params);
    },
    reset() {
      this.params = {
        page: 1,
        limit: 3,
        search: '',
        filters: {
          chapterId: null,
          courseId: null,
        },
        sort: {
          name: 'id',
          order: 'asc',
        },
      };
    },
    async getSections(courseId, chapterId) {
      this.params.filters.courseId = courseId;
      this.params.filters.chapterId = chapterId;
      const queryParams = toSearchParams(this.params);

      const response = await this.http.get(
        '/sections?' + queryParams.toString()
      );

      this.sections = {
        ...response.data.data,
      };
      this.meta = response.data.meta;
    },
  },
});
