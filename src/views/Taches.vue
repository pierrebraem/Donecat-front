<script setup>
import { Button, Card, Tabs, TabList, Tab, TabPanels, Divider, TabPanel } from 'primevue'
import AjoutTache from '@/components/modals/AjoutTache.vue'
import { ref } from 'vue'

const visibleAjoutTache = ref(false)

const projets = ref([
    {
        id: 1,
        nom: "Projet 1"
    },
    {
        id: 2,
        nom: "Projet 2"
    },
    {
        id: 3,
        nom: "Projet 3"
    }
])

const taches = ref([
    {
        id: 1,
        nom: "Tâche 1",
        description: "Tâche 1",
        projet_id: 1,
        categorie: "backlogs",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
    {
        id: 2,
        nom: "Tâche 2",
        description: "Tâche 2",
        projet_id: 1,
        categorie: "backlogs",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
    {
        id: 3,
        nom: "Tâche 3",
        description: "Tâche 3",
        projet_id: 1,
        categorie: "todo",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
    {
        id: 4,
        nom: "Tâche 4",
        description: "Tâche 4",
        projet_id: 1,
        categorie: "done",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
    {
        id: 5,
        nom: "Tâche 5",
        description: "Tâche 5",
        projet_id: 2,
        categorie: "backlogs",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
    {
        id: 6,
        nom: "Tâche 6",
        description: "Tâche 6",
        projet_id: 3,
        categorie: "todo",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
    {
        id: 7,
        nom: "Tâche 7",
        description: "Tâche 7",
        projet_id: 3,
        categorie: "todo",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
    {
        id: 8,
        nom: "Tâche 8",
        description: "Tâche 8",
        projet_id: 2,
        categorie: "inreview",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
])

const status = ref([
    { label: "Backlogs", value: "backlogs" },
    { label: "To do", value: "todo" },
    { label: "In Progress", value: "inprogress" },
    { label: "In Review", value: "inreview" },
    { label: "Done", value: "done" }
])
</script>

<template>
    <div class="pt-4 flex flex-col space-y-6">
        <div class="flex justify-end pr-4">
            <Button label="Créer une tâche" @click="visibleAjoutTache = true" />
        </div>
        <div class="flex justify-center">
            <Card class="w-11/12">
                <template #content>
                    <Tabs :value="1">
                        <TabList>
                            <Tab v-for="projet in projets" :key="projet.nom" :value="projet.id">{{ projet.nom }}</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel v-for="projet in projets" :key="projet.nom" :value="projet.id">
                                <div class="flex justify-between overflow-x-auto">
                                    <template v-for="item in status">
                                        <div class="flex flex-col">
                                            <h1 class="3xl font-bold">{{ item.label }}</h1>
                                            <template v-for="tache in taches">
                                                <template v-if="tache.projet_id == projet.id && tache.categorie == item.value">
                                                    <div class="flex flex-col space-y-2 pt-4">
                                                        <Card style="background-color: aqua;" class="w-80">
                                                            <template #content>
                                                                <div class="flex flex-col space-y-2">
                                                                    <p class="font-bold">Coucou</p>
                                                                    <p>Salut</p>
                                                                    <p>Au revoir</p>
                                                                </div>
                                                            </template>
                                                        </Card>
                                                    </div>
                                                </template>
                                            </template>
                                        </div>
                                        <Divider layout="vertical" />
                                    </template>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </template>
            </Card>
        </div>
    </div>

    <AjoutTache v-model:visible="visibleAjoutTache" />
</template>