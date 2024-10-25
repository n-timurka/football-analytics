<script setup lang="ts">
import type { Team, TeamHistory } from '@/types/team';
import Chart from 'primevue/chart';
import { computed } from 'vue';

const props = defineProps<{ teams: Team[] }>()

const chartData = computed(() => {
    const generateData = (histories: TeamHistory[], param = 'pts') => {
        let sum = 0

        return histories.map(item => {
            sum += Number(item[param as keyof TeamHistory])
            return sum
        })
    }

    return {
        labels: props.teams[0].histories.map((_, index) => `${index + 1}`),
        datasets: props.teams.map(team => {
            return {
                label: team.title,
                data: generateData(team.histories),
                fill: false,
            }
        }),
    }
})

const chartOptions = computed(() => {
    return {
        plugins: {
            legend: {
                position: 'right',
                align: 'start',
            }
        }
    }
})
</script>

<template>
    <Chart type="line" :data="chartData" :options="chartOptions" :width="1000" :height="400" />
</template>
