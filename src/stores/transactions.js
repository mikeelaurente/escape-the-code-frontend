import { defineStore } from 'pinia';
import { toSearchParams } from '../assets/js/utils';

export const useTransactionStore = defineStore('creditTransactions', {
  state: () => ({
    transactions: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      offset: 0,
    },
    params: {
      page: 1,
      limit: 10,
      search: '',
      filters: {
        type: 'all',
        group: 'all',
      },
      sort: {
        name: 'id',
        order: 'desc',
      },
    },
  }),
  getters: {
    transactionList() {
      return this.transactions;
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
        limit: 10,
        search: '',
        filters: {
          group: 'all',
          type: 'all',
        },
        sort: {
          name: 'id',
          order: 'asc',
        },
      };
    },
    async getTransactions() {
      const queryParams = toSearchParams(this.params);
      const response = await this.http.get(
        '/transactions?' + queryParams.toString()
      );
      this.transactions = response.data.data;
      this.meta = response.data.meta;
    },
  },
});
