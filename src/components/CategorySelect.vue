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
import categories from '@/data/categories';

export default {
  props: ['categoryId'],
  name: 'CategorySelect',
  data() {
    return {
      currentCategoryId: 0,
    };
  },
  watch: {
    categoryId(value) {
      this.currentCategoryId = value;
    },
  },
  computed: {
    categories() {
      return categories;
    },
  },
  methods: {
    changeCategory() {
      this.$emit('update:categoryId', this.currentCategoryId);
    },
  },
};
</script>
