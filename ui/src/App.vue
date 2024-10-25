<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />

    <div class="flex-1 flex justify-center">
      <RouterView />
    </div>

    <TheFooter />
  </div>
</template>
