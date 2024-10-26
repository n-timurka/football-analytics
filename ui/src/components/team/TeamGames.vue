<script setup lang="ts">
import DataTable from 'primevue/datatable'
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import Column from 'primevue/column'
import type { Game } from '@/types/game';
import { computed, ref } from 'vue';

const props = defineProps<{
    games: Game[],
    teamId: number,
}>()

const displayAll = ref(true)
const value = ref('All');
const options = ref(['All', 'Home', 'Away']);

const gamesData = computed(() => {
    let data = props.games.map(game => {
        const isHome = game.h?.id === props.teamId
        const result = game.hGoals === game.aGoals ? 'd'
         : isHome && game.hGoals > game.aGoals ? 'w'
          : 'l' 

        return {
            ...game,
            isHome,
            result,
        }
    })

    if (!displayAll.value) {
        data = data.filter(game => game.hGoals !== null && game.aGoals !== null)
    }
    if (value.value === 'Home') {
        data = data.filter(game => game.isHome)
    } else if (value.value === 'Away') {
        data = data.filter(game => !game.isHome)
    }

    data.sort((a, b) => a.datetime.localeCompare(b.datetime))

    return data
})
</script>

<template>
    <DataTable :value="gamesData" stripedRows>
        <template #header>
            <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xl">Results / Schedule</span>
                <div class="flex space-x-4 items-center">
                    <label class="flex items-center space-x-2">
                        <span>Show Future</span>
                        <ToggleSwitch v-model="displayAll" id="all" />
                    </label>

                    <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
                </div>
            </div>
        </template>

        <Column field="datetime" header="Date" class="w-32" />
        <Column header="Time" class="w-24">
            <template #body>15:00</template>
        </Column>
        <Column header="Opposition">
            <template #body="{ data }">
                <RouterLink :to="{ name: 'team', params: { slug: 'arsenal' } }">Arsenal</RouterLink>
            </template>
        </Column>
        <Column class="w-8">
            <template #body="{ data }">{{ data.isHome ? 'H' : 'A' }}</template>
        </Column>
        <Column header="Result" class="w-24">
            <template #body="{ data }">
                <div class="flex items-center space-x-2">
                    <div
                    class="rounded-full w-4 h-4"
                    :class="{ 'bg-green-400': data.result === 'w', 'bg-red-400': data.result === 'l', 'bg-yellow-400': data.result === 'd' }" />
            
                    <strong>{{ data.hGoals }}:{{ data.aGoals }}</strong>
                </div>
            </template>
        </Column>
        <Column header="xG" class="w-24">
            <template #body="{ data }">
                <span v-if="data.hxG">
                    {{ parseFloat(data.hxG).toFixed(2) }}
                </span>
                <span v-else>&ndash;</span>
            </template>
        </Column>
        <Column header="Opp. xG">
            <template #body="{ data }">
                <span v-if="data.axG">
                    {{ parseFloat(data.axG).toFixed(2) }}
                </span>
                <span v-else>&ndash;</span>
            </template>
        </Column>
        <Column class="w-16">
            <template #body>-></template>
        </Column>
    </DataTable>
</template>
