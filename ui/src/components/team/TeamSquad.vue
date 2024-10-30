<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup  from 'primevue/columngroup'
import Row from 'primevue/row'
import type { Player } from '@/types/player'
import { computed, ref, watch } from 'vue'
import { useApi } from '@/composables/useApi'

const props = defineProps<{
    teamId: number
}>()

const players = ref<Player[] | null>()
const { get, error, loading } = useApi<Player[]>()

watch(
    () => props.teamId,
    async () => {
        players.value = await get(`/players?team_id=${props.teamId}`)
    },
    { immediate: true },
)

const positions = ['GK', 'DF', 'MD', 'FW']
const totals = computed(() => {
    if (!players.value || players.value.length < 2) return

    const totals = {
        goals: 0,
        xG: 0.00,
        assists: 0,
        xA: 0.00,
        shots: 0,
        keyPasses: 0,
        yellowCards: 0,
        redCards: 0,
    }

    players.value.forEach(player => {
        Object.keys(totals).forEach(key => {
            totals[key] += player[key as keyof Player]
        })
    });

    return totals
})
</script>

<template>
    <section>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error!</div>
        <DataTable v-else :value="players" stripedRows size="small">
            <template #empty>
                No players found for the team...
            </template>
            <Column field="number" header="#">
                <template #body="{ data }">
                    {{ data.number || '&ndash;' }}
                </template>
            </Column>
            <Column field="name" header="Player">
                <template #body="{ data }">
                    <RouterLink :to="{ name: 'player', params: { id: data.id } }">
                        {{ data.name }}
                    </RouterLink>
                </template>
            </Column>
            <Column field="position" header="Position">
                <template #body="{ data }">
                    {{ positions[data.position] }}
                </template>
            </Column>
            <Column field="games" header="Games" sortable />
            <Column field="time" header="Minutes" sortable />
            <Column field="goals" header="Goals" sortable />
            <Column field="xG" header="xG" sortable>
                <template #body="{ data }">
                    <span :class="[data.xG === data.goals ? 'text-slate-600' : (data.xG > data.goals) ? 'text-red-400' : 'text-green-600']">
                        {{ parseFloat(data.xG).toFixed(2) }}
                    </span>
                </template>
            </Column>
            <Column field="assists" header="Assists" sortable />
            <Column field="xA" header="xA" sortable>
                <template #body="{ data }">
                    <span :class="[data.xA > data.assists ? 'text-red-400' : 'text-green-600']">
                        {{ parseFloat(data.xA).toFixed(2) }}
                    </span>
                </template>
            </Column>
            <Column field="shots" header="Shots" sortable />
            <Column field="keyPasses" header="Key Passes" sortable />
            <Column field="yellowCards" sortable>
                <template #header>
                    <div class="bg-yellow-400 w-3 h-4" />
                </template>
            </Column>
            <Column field="redCards" sortable>
                <template #header>
                    <div class="bg-red-400 w-3 h-4" />
                </template>
            </Column>

            <ColumnGroup v-if="totals" type="footer">
                <Row>
                    <Column footer="Totals:" :colspan="5" />
                    <Column :footer="`${totals.goals}`" />
                    <Column>
                        <template #footer>
                            <strong :class="[totals.xG > totals.goals ? 'text-red-400' : 'text-green-600']">
                                {{ parseFloat(`${totals.xG}`).toFixed(2) }}
                            </strong> 
                        </template>
                    </Column>
                    <Column :footer="`${totals.assists}`" />
                    <Column>
                        <template #footer>
                            <strong :class="[totals.xA > totals.assists ? 'text-red-400' : 'text-green-600']">
                                {{ parseFloat(`${totals.xA}`).toFixed(2) }}
                            </strong> 
                        </template>
                    </Column>
                    <Column :footer="`${totals.shots}`" />
                    <Column :footer="`${totals.keyPasses}`" />
                    <Column :footer="`${totals.yellowCards}`" />
                    <Column :footer="`${totals.redCards}`" />
                </Row>
            </ColumnGroup>
        </DataTable>
    </section>
</template>
