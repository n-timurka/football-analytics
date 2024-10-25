<script setup lang="ts">
import Card from 'primevue/card';
</script>

<template>
  <main class="container mx-auto my-8">
    <h1>Main Page</h1>
    <Card>
      <template #title>Simple Card</template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
        </p>
      </template>
    </Card>
  </main>
</template>
