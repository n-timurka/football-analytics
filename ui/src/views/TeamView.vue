<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import type { Team } from '@/types/team';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
import TeamSquad from '@/components/team/TeamSquad.vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import TeamGames from '@/components/team/TeamGames.vue';

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

const games = computed(() => {
    if (!team.value) return

    return [
        ...team.value.hGames,
        ...team.value.aGames,
    ]
})
</script>

<template>
    <main v-if="team" class="container mx-auto my-4">
        <Tabs value="overview">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-2xl font-semibold">{{ team.title }}</h1>

                <TabList>
                    <Tab value="overview">Overview</Tab>
                    <Tab value="squad">Squad</Tab>
                    <Tab value="games">Games</Tab>
                    <Tab value="stats">Statistics</Tab>
                </TabList>
            </div>

            <TabPanels>
                <TabPanel value="overview">
                    Overview
                </TabPanel>
                <TabPanel value="squad">
                    <TeamSquad :players="team.players" />
                </TabPanel>
                <TabPanel value="games">
                    <TeamGames v-if="games" :games="games" :team-id="team.id" />
                </TabPanel>
                <TabPanel value="stats">
                    Statistics
                </TabPanel>
            </TabPanels>
        </Tabs>
    </main>
</template>
