<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <Skeleton width="20rem" height="1.5rem" />

            <div class="flex space-x-4">
                <Skeleton v-for="i in 4" :key="i" width="5rem" height="3.5rem"></Skeleton>
            </div>
        </div>
    </div>
</template>