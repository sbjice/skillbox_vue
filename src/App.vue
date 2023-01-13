<template>
  <section class="catalog">
      <ProductList
        :products="products"/>

      <BasePagination
        v-model="page"
        :count="countProducts"
        :per-page="productsPerPage"/>
    </section>
</template>

<script>

import ProductList from './components/ProductList.vue';
import BasePagination from './components/base/BasePagination.vue';
import products from './data/products';

export default {
  name: 'App',
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      // products,
    };
  },
  components: {
    ProductList,
    BasePagination,
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};
</script>
