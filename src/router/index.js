import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/components/pages/MainPage.vue';
import NotFoundPage from '@/components/pages/NotFoundPage.vue';
import ProductPage from '@/components/pages/ProductPage.vue';
import CartPage from '@/components/pages/CartPage.vue';
import OrderPage from '@/components/pages/OrderPage.vue';
import OrderInfoPage from '@/components/pages/OrderInfoPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'cart', component: CartPage, path: '/cart' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'order', component: OrderPage, path: '/order' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
  { name: 'notFound', component: NotFoundPage, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
