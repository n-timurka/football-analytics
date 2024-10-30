<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import type { Team } from '@/types/team';
import { ref, watch } from 'vue';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const props = defineProps<{
    teamId: number
}>()

const teams = ref<Team[]>([])
const { get, error, loading } = useApi<Team[]>()

watch(
    () => props.teamId,
    async () => {
        teams.value = await get('/teams') || []
    },
    { immediate: true },
)
</script>

<template>
    <div class="flex justify-between space-x-8">
        <div class="flex-1 space-y-4">
            <Card>
                <template #content>About team</template>
            </Card>

            <div class="flex space-x-8">
                <Card class="flex-1">
                    <template #content>Previous game</template>
                </Card>

                <Card class="flex-1">
                    <template #content>Next Game</template>
                </Card>
            </div>

            <div class="flex space-x-8">
                <Card class="flex-1">
                    <template #content>Best scorer</template>
                </Card>

                <Card class="flex-1">
                    <template #content>Best asistent</template>
                </Card>

                <Card class="flex-1">
                    <template #content>Most cards</template>
                </Card>
            </div>
        </div>

        <div class="basis-1/4">
            <Card>
                <template #content>
                    <DataTable :value="teams" stripedRows size="small">
                        <Column header="#">
                            <template #body="{ index }">{{ index + 1 }}</template>
                        </Column>
                        <Column header="Team">
                            <template #body="{ data }">
                                <strong v-if="data.id === teamId">{{ data.title }}</strong>
                                <RouterLink v-else :to="{ name: 'team', params: { slug: data.slug} }">
                                    {{ data.title }}
                                </RouterLink>
                            </template>
                        </Column>
                        <Column header="G" />
                        <Column header="S" />
                        <Column header="P" />
                    </DataTable>
                </template>
            </Card>
        </div>
    </div>
</template>
