<template>

  <component
  :is="currentPageComponent"
  :page-params="currentPageParams"/>

</template>

<script>
import eventBus from '@/eventBus';
import MainPage from '@/components/pages/MainPage.vue';
import ProductPage from '@/components/pages/ProductPage.vue';
import NotFoundPage from './components/pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  components: { MainPage, ProductPage, NotFoundPage },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  methods: {
    goToPage(pageName, pageParams = {}) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams;
    },
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  created() {
    eventBus.$on('goToPage', (pageName, pageParams) => this.goToPage(pageName, pageParams));
  },
};
</script>
