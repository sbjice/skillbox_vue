<template>
  <div>
    <div v-if="$store.state.cartProductsLoading" class="cssload-thecube">
      <div class="cssload-cube cssload-c1"></div>
      <div class="cssload-cube cssload-c2"></div>
      <div class="cssload-cube cssload-c4"></div>
      <div class="cssload-cube cssload-c3"></div>
    </div>
    <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalAmount }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem class="cart__item product"
            v-for="item in products"
            :item="item"
            :key="item.productId"/>

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
          </p>

          <router-link v-if="products.length"
          tag="button" class="cart__button button button--primery"
          :to="{ name: 'order' }" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
    </main>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';

import numberFormat from '@/helpers/numberFromat';
import CartItem from '../CartItem.vue';

export default {
  filters: { numberFormat },
  components: { CartItem },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalAmount: 'cartTotalAmount',
    }),
  },
};
</script>
