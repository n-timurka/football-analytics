<script setup lang="ts">
import { ref, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag';
import type { Team } from '@/types/team'

const props = defineProps<{
    teams: Team[]
}>()

type TeamTableData = {
    title: string
    games: number
    wins: number
    draws: number
    loses: number
    goals: number
    goalsA: number
    points: number
    xG: number
    xGA: number
    xPTS: number
}

const tableData = ref<TeamTableData[]>([])

const calculateTableData = () => {
    if (!props.teams) return [];

    const data: TeamTableData[] = []

    props.teams.forEach((team) => {
        const teamData = {
            title: team.title,
            slug: team.slug,
            games: 0,
            wins: 0,
            draws: 0,
            loses: 0,
            goals: 0,
            goalsA: 0,
            points: 0,
            xG: 0.00,
            xGA: 0.00,
            xPTS: 0.00,
        }

        team.histories.forEach(history => {
            teamData.games++
            if (history.result === 'w') {
                teamData.wins++
                teamData.points+=3
            } else if (history.result === 'd') {
                teamData.draws++
                teamData.points++
            } else {
                teamData.loses++
            }
            teamData.goals += history.scored
            teamData.goalsA += history.missed
            teamData.xG += history.xG
            teamData.xGA += history.xGA
            teamData.xPTS += history.xpts
        })

        data.push(teamData)
    })

    data.sort((a, b) => b.points - a.points)
    tableData.value = data
}

watch(
    () => props.teams,
    () => calculateTableData(),
    { immediate: true },
)
</script>

<template>
    <DataTable :value="tableData" stripedRows size="small">
        <Column header="Position">
            <template #body="{ index }">
                {{ index + 1 }}
            </template>
        </Column>
        <Column field="title" header="Club">
            <template #body="{ data }">
                <RouterLink :to="{ name: 'team', params: { slug: data.slug }}">
                    {{ data.title }}
                </RouterLink>
            </template>
        </Column>
        <Column field="games" header="Played" />
        <Column field="wins" header="Won" />
        <Column field="draws" header="Drawn" />
        <Column field="loses" header="Lost" />
        <Column field="goals" header="GF" />
        <Column field="goalsA" header="GA" />
        <Column field="points" header="Points">
            <template #body="{ data }">
                <strong>{{ data.points }}</strong>
            </template>
        </Column>
        <Column field="xG" header="xG">
            <template #body="{ data }">
                <Tag :severity="data.xG < data.goals ? 'success' : 'danger'">
                    {{ parseFloat(data.xG).toFixed(2) }}
                    <small>({{ parseFloat(data.goals - data.xG).toFixed(2) }})</small>
                </Tag>
            </template>
        </Column>
        <Column field="xGA" header="xGA">
            <template #body="{ data }">
                {{ parseFloat(data.xGA).toFixed(2) }}
            </template>
        </Column>
        <Column field="xPTS" header="xPTS">
            <template #body="{ data }">
                {{ parseFloat(data.xPTS).toFixed(2) }}
            </template>
        </Column>
    </DataTable>
</template>
