<template>
  <header class="header">
    <div class="container header__container">
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item">
            <router-link to="/">Главная</router-link>
          </li>
          <li class="nav__item">
            <router-link to="/convert">Конвертация</router-link>
          </li>
        </ul>
      </nav>
      <CurrencyDropdown :currencies="currencies" @selectCurrency="setBaseCurrency" :value="baseCurrency" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, watch, Ref } from 'vue';
import CurrencyDropdown from '../drop-down/CurrencyDropdown.vue';
import './style.css';

export default defineComponent({
  name: 'TheHeader',
  components: { CurrencyDropdown },
  emits: ['baseCurrency'],

  setup(_, { emit }) {
    const currencies: string[] = ['USD', 'EUR', 'RUB'];
    const baseCurrency: Ref<string> = ref('RUB');

    const setBaseCurrency = (currency: string): void => {
      baseCurrency.value = currency;
    };

    watch(baseCurrency, () => {
      emit('baseCurrency', baseCurrency.value);
    }, { immediate: true });

    return { currencies, setBaseCurrency, baseCurrency };
  }
});
</script>
