<template>

  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :priceFrom.sync="filterPriceFrom"
        :priceTo.sync="filterPriceTo"
        :categoryId.sync="filterCategoryId"
        :colorId.sync="filterColorId"
        />

      <section class="catalog">
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>

</template>

<script>

import ProductFilter from './components/ProductFilter.vue';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/base/BasePagination.vue';
import products from './data/products';

export default {
  name: 'App',
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 3,
      // products,
    };
  },
  components: {
    ProductFilter,
    ProductList,
    BasePagination,
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((prod) => prod.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts
          .filter((prod) => prod.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts
          .filter((prod) => prod.categoryId === this.filterCategoryId);
      }

      if (this.filterColorId) {
        filteredProducts = filteredProducts
          .filter((prod) => prod.colorId === this.filterColorId);
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
