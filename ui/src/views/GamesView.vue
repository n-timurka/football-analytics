<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import type { Game } from '@/types/game';
import { onMounted, reactive, ref } from 'vue';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Select from 'primevue/select';

const { get, error, loading } = useApi<Game[]>([])
const games = ref<Game[]>()

const filters = reactive({
    teamId: null,
})

onMounted(async () => {
    games.value = await get('/games') || []
})
</script>

<template>
    <main class="container mx-auto my-8">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl mb-4">Games</h1>

            <div>
                <Select v-model="filters.teamId" placeholder="Team..." :options="['Arsenal']" size="small" />
            </div>
        </div>

        <DataTable :value="games" stripedRows>
            <template #empty>
                Games wasn't found...
            </template>
            <Column field="datetime" header="Date" />
            <Column header="Host">
                <template #body="{ data }">
                    <RouterLink
                        :to="{ name: 'team', params: { slug: data.h.slug }}"
                        :class="{ 'font-semibold': data.aStats?.goals < data.hStats?.goals }">
                        {{ data.h.title }}
                    </RouterLink>
                </template>
            </Column>
            <Column header="Guest">
                <template #body="{ data }">
                    <RouterLink
                        :to="{ name: 'team', params: { slug: data.a.slug }}"
                        :class="{ 'font-semibold': data.aStats?.goals > data.hStats?.goals }">
                        {{ data.a.title }}
                    </RouterLink>
                </template>
            </Column>
            <Column field="result" header="Result" />
            <Column class="w-16">
                <template #body="{ data }">
                    <RouterLink :to="{ name: 'game', params: { id: data.id } }">
                        Report
                    </RouterLink>
                </template>
            </Column>
        </DataTable>
    </main>
</template>
