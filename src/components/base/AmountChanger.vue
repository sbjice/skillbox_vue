<template>
  <div class="form__counter" :class="(optionalClass || '')">
    <button type="button" aria-label="Убрать один товар"
      @click.prevent="decrease()">
      <svg :width="size" :height="size" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label>
      <input type="text" v-model.number="currentAmount" @input="setValue()">
    </label>

    <button type="button" aria-label="Добавить один товар"
      @click.prevent="increase()">
      <svg :width="size" :height="size" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    productAmount: Number,
    size: {
      type: Number,
      default: 12,
    },
    optionalClass: String,
  },
  watch: {
    productAmount(value) {
      this.currentAmount = value;
    },
  },
  data() {
    return {
      currentAmount: this.productAmount,
    };
  },
  methods: {
    increase() {
      this.$emit('update:productAmount', this.currentAmount + 1);
    },
    decrease() {
      if (this.currentAmount === 1) return;
      this.$emit('update:productAmount', this.currentAmount - 1);
    },
    setValue() {
      if (this.currentAmount < 1) {
        this.$emit('update:productAmount', 1);
      } else {
        this.$emit('update:productAmount', this.currentAmount);
      }
    },
  },

};
</script>
