<template>
  <label class="form__label form__label--select">
    <select class="form__select" type="text" name="category"
    v-model.number="currentCategoryId"
    @change="changeCategory()">
      <option value="0">Все категории</option>
      <option v-for="category in categories"
      :key="category.id"
      :value="category.id" >{{ category.title }}</option>
    </select>
  </label>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  props: ['categoryId'],
  name: 'CategorySelect',
  data() {
    return {
      currentCategoryId: 0,
      categoriesData: null,
    };
  },
  watch: {
    categoryId(value) {
      this.currentCategoryId = value;
    },
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
  },
  methods: {
    changeCategory() {
      this.$emit('update:categoryId', this.currentCategoryId);
    },
    loadCategories() {
      clearTimeout(this.loadCategoriesTimeout);
      this.loadCategoriesTimeout = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/productCategories`)
          // eslint-disable-next-line no-return-assign
          .then((response) => this.categoriesData = response.data);
      }, 0);
    },
  },
  created() {
    this.loadCategories();
  },
};
</script>
