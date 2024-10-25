<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import type { Team } from '@/types/team';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import TeamSquad from '@/components/team/TeamSquad.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const { slug } = useRoute().params

const team = ref<Team | null>()
const { get, error, loading } = useApi<Team>()

watch(
    () => slug,
    async () => {
        team.value = await get(`/teams/${slug}`)
    },
    { immediate: true },
)
</script>

<template>
    <main v-if="team" class="container mx-auto my-4">
        <Tabs value="0">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-2xl font-semibold">{{ team.title }}</h1>

                <TabList>
                    <Tab value="0">Squad</Tab>
                    <Tab value="1">Games</Tab>
                    <Tab value="2">Statistics</Tab>
                </TabList>
            </div>

            <TabPanels>
                <TabPanel value="0">
                    <TeamSquad :players="team.players" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </main>
</template>
