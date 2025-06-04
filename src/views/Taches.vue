<script setup>
import { Button, Card, Tabs, TabList, Tab, TabPanels, Divider, TabPanel } from 'primevue'
import AjoutTache from '@/components/modals/AjoutTache.vue'
import { ref, onMounted } from 'vue'

const visibleAjoutTache = ref(false)
const chargement = ref(true)
const projets = ref([])
const taches = ref([])
const utilisateurs = ref([])

async function getProjets(){
    const response = await fetch("http://localhost:3000/projets")
    const data = await response.json()
    projets.value = data
}

async function getTaches(){
    const response = await fetch("http://localhost:3000/taches")
    const data = await response.json()
    taches.value = data
}

async function getUtilisateurs(){
    const response = await fetch("http://localhost:3000/utilisateurs")
    const data = await response.json()
    utilisateurs.value = data
}

function formatageUtilisateur(developpeur_id){
    const utilisateur = utilisateurs.value.find((item) => item.id == developpeur_id)
    return utilisateur.nom + ' ' + utilisateur.prenom
}

const status = ref([
    { label: "Backlogs", value: "backlogs" },
    { label: "To do", value: "todo" },
    { label: "In Progress", value: "inprogress" },
    { label: "In Review", value: "inreview" },
    { label: "Done", value: "done" }
])

onMounted(async () => {
    await getProjets()
    await getTaches()
    await getUtilisateurs()
    chargement.value = false
})
</script>

<template>
    <template v-if="chargement">
        <p class="text-center">Chargement des données...</p>
    </template>
    <template v-else>
        <div class="pt-4 flex flex-col space-y-6">
            <div class="flex justify-end pr-4">
                <Button label="Créer une tâche" @click="visibleAjoutTache = true" />
            </div>
            <div class="flex justify-center">
                <Card class="w-11/12">
                    <template #content>
                        <Tabs :value="projets[0].id">
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
                                                                        <p class="font-bold">{{ tache.nom }}</p>
                                                                        <p>{{ formatageUtilisateur(tache.developpeur_id) }}</p>
                                                                        <p>Date de fin : {{ tache.datefin }}</p>
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

        <AjoutTache v-model:visible="visibleAjoutTache" :utilisateurs="utilisateurs" :projets="projets" />
    </template>
</template>