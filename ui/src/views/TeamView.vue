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
import Message from 'primevue/message';
import TeamGames from '@/components/team/TeamGames.vue';
import TeamLoading from '@/components/team/TeamLoading.vue';
import TeamOverview from '@/components/team/Overview.vue';
import TeamStats from '@/components/team/Stats.vue';

const route = useRoute()

const team = ref<Team | null>()
const { get, error, loading } = useApi<Team>()

watch(
    () => route.params.slug,
    async (value) => {
        team.value = await get(`/teams/${value}`)
    },
    { immediate: true },
)
</script>

<template>
    <main class="container mx-auto my-4">
        <TeamLoading v-if="loading" />
        <Message v-else-if="error" severity="error">Team data loading was failed...</Message>
        <Tabs v-else-if="team" value="overview">
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
                    <TeamOverview :team-id="team.id" />
                </TabPanel>
                <TabPanel value="squad">
                    <TeamSquad :team-id="team.id" />
                </TabPanel>
                <TabPanel value="games">
                    <TeamGames :team-id="team.id" />
                </TabPanel>
                <TabPanel value="stats">
                    <TeamStats :team-id="team.id" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </main>
</template>
