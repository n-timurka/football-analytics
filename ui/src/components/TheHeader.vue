<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="py-4 bg-sky-800 text-sky-100">
        <div class="container mx-auto flex justify-between items-center">
            <RouterLink to="/" class="text-lg">
                Football<strong>Analytics</strong>
            </RouterLink>

            <nav>
                <RouterLink
                 :to="{ name: 'teams' }"
                  class="block rounded py-1 px-3 hover:bg-white/10" 
                  active-class="bg-sky-700">
                  Teams
                </RouterLink>
            </nav>
        </div>
    </header>
</template>
