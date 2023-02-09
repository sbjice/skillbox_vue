<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color"
        v-model="currentColorId"
        :checked="color.id === 1"
        :value="color.id"
        @change="changeColor()">
        <span class="colors__value" :style="`background-color: ${color.value};`">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  props: ['colorId'],
  name: 'ColorPicker',
  data() {
    return {
      currentColorId: 0,
      colorsData: null,
    };
  },
  watch: {
    colorId(value) {
      this.currentColorId = value;
    },
  },
  computed: {
    colors() {
      return this.colorsData
        ? this.colorsData.items.map((color) => ({
          ...color,
          value: color.code,
        }))
        : [];
    },
  },
  methods: {
    changeColor() {
      this.$emit('update:colorId', this.currentColorId);
      console.log(this.currentColorId);
    },
    loadColors() {
      clearTimeout(this.loadColorsTimeout);
      this.loadColorsTimeout = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/colors`)
          // eslint-disable-next-line no-return-assign
          .then((response) => this.colorsData = response.data);
      }, 0);
    },
  },
  created() {
    this.loadColors();
  },
};
</script>
