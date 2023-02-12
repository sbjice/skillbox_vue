<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image"
      width="120" height="120" alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <AmountChanger
      :product-amount.sync="amount"
      :size="10"
      :optional-class="'product__counter'"/>

    <b class="product__price">
      {{ (item.product.price * amount) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct()">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';

import AmountChanger from '@/components/base/AmountChanger.vue';
import numberFormat from '@/helpers/numberFromat';

export default {
  components: { AmountChanger },
  filters: { numberFormat },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch(
          'updateCartProductAmount',
          { productId: this.item.productId, amount: value },
        );
      },
    },
  },
  methods: {
    ...mapActions(['deleteProductFromCart']),
    deleteProduct() {
      this.deleteProductFromCart(this.item.productId);
    },
  },

};
</script>
