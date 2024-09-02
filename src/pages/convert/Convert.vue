<template>
  <div class="container">
    <h1 class="title">Конвертация валют</h1>
    <CurrencyConverter/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CurrencyConverter from '../../components/currenncy-converter/CurrencyConverter.vue';
import './style.css';

export default defineComponent({
  components: { CurrencyConverter }
});
</script>