<script setup>
import { Button, Card } from 'primevue'
import AjoutEquipe from '@/components/modals/AjoutEquipe.vue'
import AjoutProjet from '@/components/modals/AjoutProjet.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import { ref, onMounted } from 'vue'

const visibleAjoutEquipe = ref(false)
const visibleAjoutProjet = ref(false)
const chargement = ref(true)
const equipes = ref([])
const utilisateurs = ref([])
const projets = ref([])
const taches = ref([])

async function getEquipes(){
    const response = await fetch("http://localhost:3000/equipes")
    const data = await response.json()
    equipes.value = data
}

async function getUtilisateurs(){
    const response = await fetch("http://localhost:3000/utilisateurs")
    const data = await response.json()
    utilisateurs.value = data
}

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

function compterTaches(id, type){
    if(type != "backlogs" && type != "todo" && type != "done"){
        return "N/A";
    }

    return taches.value.filter((item) => item.categorie == type && item.projet_id == id).length;
}

onMounted(async () => {
    await getEquipes()
    await getUtilisateurs()
    await getProjets()
    await getTaches()
    chargement.value = false
})
</script>

<template>
    <template v-if="chargement">
        <p class="text-center">Chargement des données...</p>
    </template>
    <template v-else>
        <div class="pt-4 flex flex-col space-y-6">
            <div class="flex justify-between w-full">
                <div>
                    <p>Bienvenue Dev1</p>
                </div>
                <div class="flex space-x-2">
                    <Button label="Créer un projet" @click="visibleAjoutProjet = true" />
                    <Button label="Créer une équipe" severity="info" @click="visibleAjoutEquipe = true"/>
                    <Button label="Gestion des utilisateurs" severity="info" />
                </div>
            </div>

            <div class="flex justify-center gap-2">
                <Card class="w-full overflow-x-auto">
                    <template #content>
                        <div class="flex space-x-2">
                            <template v-if="equipes.length == 0">
                                <p class="text-center">Aucune équipe enregistrée</p>
                            </template>
                            <template v-else>
                                <Card style="background-color: aqua;" class="w-70 h-70" v-for="equipe in equipes">
                                    <template #title>{{ equipe.nom }}</template>
                                    <template #content>
                                        <ul>
                                            <template v-for="utilisateur in utilisateurs">
                                                <li v-if="utilisateur.equipe_id == equipe.id">{{ utilisateur.nom }} {{ utilisateur.prenom }} {{ utilisateur.status == "manager" ? "(Manager)" : "" }}</li>
                                            </template>
                                        </ul>
                                    </template>
                                </Card>
                            </template>
                        </div>
                    </template>
                </Card>
                <Card class="w-full overflow-x-auto">
                    <template #content>
                        <div class="flex space-x-2">
                            <template v-if="projets.length == 0">
                                <p class="text-center">Aucun projet enregistré</p>
                            </template>
                            <template v-else>
                                <Card style="background-color: aqua;" class="w-70 h-70" v-for="projet in projets">
                                    <template #title>{{ projet.nom }}</template>
                                    <template #content>
                                        <ul>
                                            <li>Tâches non commencées : {{ compterTaches(projet.id, 'backlogs') }}</li>
                                            <li>Tâches en cours : {{ compterTaches(projet.id, 'todo') }}</li>
                                            <li>Tâches terminées : {{ compterTaches(projet.id, 'done') }}</li>
                                        </ul>
                                    </template>
                                </Card>
                            </template>
                        </div>
                    </template>
                </Card>
            </div>

            <div class="flex justify-center">
                <Card class="w-full overflow-x-auto">
                    <template #content>
                        <div class="flex space-x-2">
                            <Card v-for="projet in projets">
                                <template #content>
                                    <DoughnutChart 
                                        :nom-graphe="projet.nom" 
                                        :backlogs="compterTaches(projet.id, 'backlogs')"
                                        :todo="compterTaches(projet.id, 'todo')"
                                        :done="compterTaches(projet.id, 'done')"
                                    />
                                </template>
                            </Card>
                        </div>
                    </template>
                </Card>
            </div>
        </div>

        <AjoutEquipe v-model:visible="visibleAjoutEquipe"/>
        <AjoutProjet v-model:visible="visibleAjoutProjet"/>
    </template>
</template>