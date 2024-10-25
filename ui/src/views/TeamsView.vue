<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import type { Team } from '@/types/team';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import TeamsTable from '@/components/teams/TeamsTable.vue';
import Message from 'primevue/message';
import TeamsChart from '@/components/teams/TeamsChart.vue';

const teams = ref<Team[] | null>()
const { get, error, loading } = useApi<Team[]>()

onMounted(async () => {
  teams.value = await get('/teams')
})
</script>

<template>
  <main class="container mx-auto my-8">
    <h1 class="text-2xl mb-4">Teams</h1>

    <Tabs value="0">
      <TabList>
          <Tab value="0">Table</Tab>
          <Tab value="1">Chart</Tab>
          <Tab value="2">Info</Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="0">
          <ProgressSpinner v-if="loading" />
          <div v-if="error">{{ error }}</div>
          <TeamsTable v-if="teams" :teams="teams" />
        </TabPanel>

        <TabPanel value="1">
          <TeamsChart v-if="teams" :teams="teams" />
        </TabPanel>

        <TabPanel value="2">
          <Message severity="info">Will be soon...</Message>
        </TabPanel>
      </TabPanels>
    </Tabs>
    
  </main>
</template>
