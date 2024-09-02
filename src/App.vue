<script lang="ts">
import { defineComponent, onMounted, provide, ref, Ref } from 'vue';
import TheHeader from './components/headers/TheHeader.vue';
import TheFooter from './components/footer/TheFooter.vue';

interface Rates {
  [key: string]: number;
}

export default defineComponent({
  name: 'App',
  components: { TheFooter, TheHeader },
  setup() {
    const baseCurrency: Ref<string> = ref('RUB');
    const rates: Ref<Rates> = ref({});

    const changeBaseCurrency = (currency: string): void => {
      baseCurrency.value = currency;
    };

    const fetchRates = async (): Promise<void> => {
      try {
        const response = await fetch('https://status.neuralgeneration.com/api/currency');
        if (!response.ok) {
          throw new Error('Failed to fetch rates');
        }
        const data: Rates = await response.json();
        rates.value = data;
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    provide<Ref<string>>('baseCurrency', baseCurrency);
    provide<Ref<Rates>>('rates', rates);

    onMounted((): void => {
      fetchRates();
    });

    return { baseCurrency, changeBaseCurrency };
  }
});
</script>

<template>
  <TheHeader @baseCurrency="changeBaseCurrency" />
  <main class="main">
    <router-view />
  </main>
  <TheFooter />
</template>
