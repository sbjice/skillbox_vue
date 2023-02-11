<template>
  <div v-if="$store.state.cartProductsLoading" class="cssload-thecube">
    <div class="cssload-cube cssload-c1"></div>
    <div class="cssload-cube cssload-c2"></div>
    <div class="cssload-cube cssload-c4"></div>
    <div class="cssload-cube cssload-c3"></div>
  </div>
  <router-link :to="{ name: 'cart' }" class="header__cart"
    v-else
    aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count"
    aria-label="Количество товаров">
      {{ $store.state.cartProducts.length }}
    </span>
  </router-link>
</template>

<script>
export default {

};
</script>
