<template>
  <div class="container">
    <h1 class="main__title">Курсы валют</h1>
    <div class="card">
      <ul class="list">
        <li
            class="list__item"
            v-for="currency in formatedRates"
            :key="currency.pair"
        >
          {{ currency.pair }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, Ref, watch } from 'vue';
import './style.css';

interface CurrencyRate {
  pair: string;
}

export default defineComponent({
  setup() {
    const baseCurrency = inject<Ref<string>>('baseCurrency');
    const rates = inject<Ref<Record<string, number>>>('rates');

    const formatedRates = ref<CurrencyRate[]>([]);

    function getExchangeRates(baseCurrency: string, data: Record<string, number>): CurrencyRate[] {
      const formattedData: CurrencyRate[] = [];

      for (const [key, value] of Object.entries(data)) {
        const [fromCurrency, toCurrency] = key.split('-');

        if (toCurrency.toUpperCase() === baseCurrency.toUpperCase()) {
          formattedData.push({
            pair: `1 ${fromCurrency.toUpperCase()} = ${value.toFixed(2)} ${toCurrency.toUpperCase()}`
          });
        }
      }

      return formattedData;
    }
    watch(
        [baseCurrency, rates],
        () => {
          if (baseCurrency && rates) {
            formatedRates.value = getExchangeRates(baseCurrency.value, rates.value);
          }
        },
        { immediate: true }
    );

    return { formatedRates };
  }
});
</script>
