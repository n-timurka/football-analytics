<script setup lang="ts">
const props = defineProps<{
    teamId: number
}>()
</script>

<template>
    <h3>Stats: {{ teamId }}</h3>
</template>
