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
import colors from '@/data/colors';

export default {
  props: ['colorId'],
  name: 'ColorPicker',
  data() {
    return {
      currentColorId: 0,
    };
  },
  watch: {
    colorId(value) {
      this.currentColorId = value;
    },
  },
  computed: {
    colors() {
      return colors;
    },
  },
  methods: {
    changeColor() {
      this.$emit('update:colorId', this.currentColorId);
      console.log(this.currentColorId);
    },
  },
};
</script>
