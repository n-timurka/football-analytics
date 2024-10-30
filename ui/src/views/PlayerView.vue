<script setup lang="ts">
import { useRoute } from 'vue-router';

const { id } = useRoute().params
</script>

<template>
    <h1>{{ id }}</h1>
</template>
