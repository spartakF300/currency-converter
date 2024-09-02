<template>
  <select @change="handleChange" :value="value">
    <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    currencies: {
      type: Array as PropType<string[]>,
      required: true
    },
    value: {
      type: String,
    }
  },
  emits: ['selectCurrency'],
  setup(_, { emit }) {
    const handleChange = (event: Event) => {
      const selectedCurrency = (event.target as HTMLSelectElement).value;
      emit('selectCurrency', selectedCurrency);
    };

    return { handleChange };
  }
});
</script>
