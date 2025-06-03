<script setup>
import { Button, Card } from 'primevue'
import AjoutEquipe from '@/components/modals/AjoutEquipe.vue'
import AjoutProjet from '@/components/modals/AjoutProjet.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import { ref } from 'vue'

const visibleAjoutEquipe = ref(false)
const visibleAjoutProjet = ref(false)

const utilisateurs = ref([
    {
        id: 1,
        nom: "Braem",
        prenom: "Pierre",
        email: "pierre.braem@test.com",
        pseudo: "MonsieurBraem",
        motdepasse: "motdepasse",
        status: "administrateur",
        equipe_id: 1
    },
    {
        id: 2,
        nom: "Dupont",
        prenom: "Martin",
        email: "martin.dupont@test.com",
        pseudo: "xXDarkDu59Xx",
        motdepasse: "motdepasse",
        status: "manager",
        equipe_id: 2
    },
    {
        id: 3,
        nom: "Rain",
        prenom: "Jean",
        email: "jean.rain@test.com",
        pseudo: "MonsieurRain",
        motdepasse: "motdepasse",
        status: "dev",
        equipe_id: 1
    }
])

const equipes = ref([
    {
        id: 1,
        nom: "Equipe 1"
    },
    {
        id: 2,
        nom: "Equipe 2"
    }
])

const projets = ref([
    {
        id: 1,
        nom: "Projet 1",
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
        projet_id: 3,
        categorie: "done",
        developpeur_id: 1,
        datefin: "2025-06-07"
    },
])

function compterTaches(id, type){
    if(type != "backlogs" && type != "todo" && type != "done"){
        return "N/A";
    }

    return taches.value.filter((item) => item.categorie == type && item.projet_id == id).length;
}
</script>

<template>
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
                    </div>
                </template>
            </Card>
            <Card class="w-full overflow-x-auto">
                <template #content>
                    <div class="flex space-x-2">
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