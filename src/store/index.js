/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartProductsLoading: false,
    cartProductsLoadingTimeout: null,
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProducts.find((elem) => elem.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((elem) => elem.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(
        (item) => ({
          productId: item.product.id,
          amount: item.quantity,
          product: {
            ...item.product,
            image: item.product.image.file.url,
          },
        }),
      );
    },
    updateCartProductsLoadingTimeout(state, timeoutId) {
      state.cartProductsLoadingTimeout = timeoutId;
    },
    updateCartProductsLoading(state, isLoading) {
      state.cartProductsLoading = isLoading;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData
          .find((prod) => item.productId === prod.product.id)
          .product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts
        .reduce((acc, item) => item.amount + acc, 0);
    },
  },
  actions: {
    loadCart(context) {
      clearTimeout(context.state.cartProductsLoadingTimeout);
      context.commit('updateCartProductsLoading', true);
      context.commit(
        'updateCartProductsLoadingTimeout',
        setTimeout(() => {
          axios
            .get(`${API_BASE_URL}/api/baskets`, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .catch()
            .then((response) => {
              if (!context.state.userAccessKey) {
                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserAccessKey', response.data.user.accessKey);
              }
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
              context.commit('updateCartProductsLoading', false);
            });
        }, 3000),
      );
    },
  },
});
