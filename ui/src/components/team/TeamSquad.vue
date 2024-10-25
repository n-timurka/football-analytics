<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/column'
import type { Player } from '@/types/player';

defineProps<{
    players: Player[]
}>()
</script>

<template>
    <DataTable :value="players" stripedRows size="small">
        <Column header="#">
            <template #body="{ index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="playerName" header="Player" />
        <Column field="position" header="Position" />
        <Column field="games" header="Games" sortable />
        <Column field="time" header="Minutes" sortable />
        <Column field="goals" header="Goals" sortable />
        <Column field="assists" header="Assists" sortable />
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
        <Column field="xG" header="xG" sortable>
            <template #body="{ data }">
                {{ parseFloat(data.xG).toFixed(2) }}
            </template>
        </Column>
        <Column field="xA" header="xA" sortable>
            <template #body="{ data }">
                {{ parseFloat(data.xA).toFixed(2) }}
            </template>
        </Column>
    </DataTable>
</template>
