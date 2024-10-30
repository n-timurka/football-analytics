<script setup lang="ts">
import DataTable from 'primevue/datatable'
import SelectButton from 'primevue/selectbutton';
import Column from 'primevue/column'
import type { Game } from '@/types/game';
import { computed, ref, watch } from 'vue';
import { useApi } from '@/composables/useApi';

const props = defineProps<{
    teamId: number
}>()

const { get, error, loading } = useApi<Game[]>()
const games = ref<Game[]>([])

watch(
    () => props.teamId,
    async () => {
        games.value = await get(`/games?teamId=${props.teamId}`) || []
    },
    { immediate: true },
)

const timeFilterValue = ref('All');
const timeFilterOptions = ref(['All', 'Results', 'Schedule']);
const typeFilterValue = ref('All');
const typeFilterOptions = ref(['All', 'Home', 'Away']);

const gamesData = computed(() => {
    if (!games.value) return []

    return games.value.filter(game => {
        const timeFilter = timeFilterValue.value === 'Results' ? !!game.result
            : typeFilterValue.value === 'Schedule' ? !game.result : true
        const typeFilter = typeFilterValue.value === 'Home' ? game.hId === props.teamId
            : typeFilterValue.value === 'Away' ? game.aId === props.teamId : true

        return timeFilter && typeFilter
    }).map(game => {
        const date = new Date(game.datetime)

        return {
            ...game,
            isHome: game.hId === props.teamId,
            oppponent: game.hId === props.teamId ? game.a : game.h,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
        }
    })
})
</script>

<template>
    <section>
        <div class="flex space-x-4 items-center">
            <SelectButton v-model="timeFilterValue" :options="timeFilterOptions" aria-labelledby="basic" />

            <SelectButton v-model="typeFilterValue" :options="typeFilterOptions" aria-labelledby="basic" />
        </div>

        <DataTable :value="gamesData" stripedRows>
            <template #empty>
                Games wasn't found...
            </template>
            <Column field="date" header="Date" class="w-32" />
            <Column field="time" header="Time" class="w-32" />
            <Column header="Opposition">
                <template #body="{ data }">
                    <RouterLink :to="{ name: 'team', params: { slug: data.oppponent.slug } }">
                        {{ data.oppponent.title }}
                    </RouterLink>
                </template>
            </Column>
            <Column class="w-8">
                <template #body="{ data }">{{ data.isHome ? 'H' : 'A' }}</template>
            </Column>
            <Column class="w-8">
                <template #body="{ data }">
                    <div v-if="data.result" class="rounded-full w-4 h-4 bg-green-400" />
                </template>
            </Column>
            <Column header="Result" class="w-24">
                <template #body="{ data }">
                    <strong v-if="data.result">{{ data.result }}</strong>
                    <span v-else>&ndash;</span>
                </template>
            </Column>
            <Column header="xG" class="w-24">
                <template #body="{ data }">
                    <span v-if="data.hStats?.xg">
                        {{ parseFloat(data.hStats.xg).toFixed(2) }}
                    </span>
                    <span v-else>&ndash;</span>
                </template>
            </Column>
            <Column header="Opp. xG">
                <template #body="{ data }">
                    <span v-if="data.aStats?.xg">
                        {{ parseFloat(data.aStats.xg).toFixed(2) }}
                    </span>
                    <span v-else>&ndash;</span>
                </template>
            </Column>
            <Column class="w-16">
                <template #body="{ data }">
                    <RouterLink :to="{ name: 'game', params: { id: data.id } }">
                        Report
                    </RouterLink>
                </template>
            </Column>
        </DataTable>
    </section>
</template>
