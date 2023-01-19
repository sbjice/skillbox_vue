<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products"
                  :product="product"
                  :key="product.id"
                  @goToPage="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)"/>
  </ul>
</template>

<script>

import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  name: 'ProductList',
  components: {
    ProductItem,
  },
};

</script>
