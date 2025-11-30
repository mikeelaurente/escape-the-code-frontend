<template>
  <div
    class="pagination pagination-primary lg:pagination-center pagination-center pagination-circle w-full mt-48p overflow-y-auto"
  >
    <a
      @click="$emit('navigateTo', page - 1)"
      v-if="hasPrevious"
      class="pagination-item pagination-prev cursor-pointer"
    >
      <i class="ti ti-chevron-left"></i>
    </a>
    <div class="pagination-list">
      <template v-for="(p, idx) in pages" :key="idx">
        <a v-if="page == p" class="pagination-item pagination-circle active">
          <span class="pagination-link">{{ p }}</span>
        </a>
        <a
          @click="$emit('navigateTo', p)"
          v-if="page !== p"
          class="pagination-item pagination-circle cursor-pointer"
        >
          <span class="pagination-link">{{ p }}</span>
        </a>
      </template>
    </div>
    <a
      @click="$emit('navigateTo', page + 1)"
      v-if="hasNext"
      class="pagination-item pagination-next cursor-pointer"
    >
      <i class="ti ti-chevron-right"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    page: Number,
    limit: Number,
  },
  emits: {
    navigateTo: Number,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
    pages() {
      return new Array(this.totalPages).fill(1).map((el, i) => i + el);
    },
    hasPrevious() {
      return this.page > 1 && this.totalPages > 1;
    },
    hasNext() {
      return this.page < this.totalPages;
    },
  },
};
</script>
