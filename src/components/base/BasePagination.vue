<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
    <ul class="catalog__pagination pagination">
        <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" href="#"
            aria-label="Предыдущая страница"
            :class="{'pagination__link--disabled': this.page === 1}"
            @click.prevent="prevPage()">
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-left"></use>
                </svg>
            </a>
        </li>
        <li class="pagination__item" v-for="currentPage in pages" :key="currentPage">
            <a href="#" class="pagination__link"
            :class="{'pagination__link--current': currentPage === page}"
            @click.prevent="paginate(currentPage)">
                {{ currentPage }}
            </a>
        </li>
        <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" href="#"
            aria-label="Следующая страница"
            :class="{'pagination__link--disabled': this.page === this.pages}"
            @click.prevent="nextPage()">
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-right"></use>
                </svg>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    nextPage() {
      if (this.page < this.pages) this.$emit('paginate', this.page + 1);
    },
    prevPage() {
      if (this.page > 1) this.$emit('paginate', this.page - 1);
    },
  },
};
</script>
