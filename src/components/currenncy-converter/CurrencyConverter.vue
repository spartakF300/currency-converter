<template>
  <div class="converter">
    <div class="converter__inputs">
    <CurrencyDropdown :currencies="currencies" @selectCurrency="setCurrency1" :value="currency1"/>
    <input min="0" type="number" v-model="amount1" @input="convertCurrency('input1')"/>
    </div>
    <div class="converter__inputs">
    <CurrencyDropdown :currencies="currencies" @selectCurrency="setCurrency2" :value="currency2"/>
    <input min="0" type="number" v-model="amount2" @input="convertCurrency('input2')"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, Ref, ref} from 'vue';
import CurrencyDropdown from '../drop-down/CurrencyDropdown.vue';
import './style.css';

export default defineComponent({
  components: {CurrencyDropdown},
  setup() {
    const currencies = ['USD', 'EUR', 'RUB'];
    const currency1 = ref<string>('RUB');
    const currency2 = ref<string>('USD');
    const amount1 = ref<number>(0);
    const amount2 = ref<number>(0);
    const rates = inject('rates') as Ref<Record<string, number>>;

    const getCurrencyRate = (currency1: string, currency2: string): number => {
      return rates.value[`${currency1.toLowerCase()}-${currency2.toLowerCase()}`];
    }

    const convertCurrency = (input: string) => {
      if (currency1.value === currency2.value) {
        input === 'input1' ? amount2.value = amount1.value : amount1.value = amount2.value;
        return;
      }

      if (input === 'input1') {
        !amount1.value && (amount1.value = 0);
        amount2.value =
            parseFloat((amount1.value * getCurrencyRate(currency1.value, currency2.value))
            .toFixed(2));

      } else {
        !amount2.value && (amount2.value = 0);
        amount1.value =
            parseFloat((amount2.value / getCurrencyRate(currency1.value, currency2.value))
            .toFixed(2));
      }
    };

    const setCurrency1 = (currency: string) => {
      currency1.value = currency;
      convertCurrency('input1');
    };

    const setCurrency2 = (currency: string) => {
      currency2.value = currency;
      convertCurrency('input2');
    };

    return {
      currencies,
      amount1,
      amount2,
      setCurrency1,
      setCurrency2,
      convertCurrency,
      getCurrencyRate,
      currency1,
      currency2
    };
  }
});
</script>
