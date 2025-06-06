<script setup>
import { Card, ConfirmDialog } from 'primevue'
import { useConfirm } from 'primevue/useconfirm'
import AjoutEquipe from '@/components/modals/AjoutEquipe.vue'
import AjoutProjet from '@/components/modals/AjoutProjet.vue'
import ModifierEquipe from '@/components/modals/ModifierEquipe.vue'
import ModifierProjet from '@/components/modals/ModifierProjet.vue'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import Equipe from '@/components/cartes/Equipe.vue'
import Projet from '@/components/cartes/Projet.vue'
import Bouton from '@/components/Bouton.vue'
import { getTaches } from '@/utils/requetes/tache'
import { getProjets, deleteProjet } from '@/utils/requetes/projet'
import { getEquipes, deleteEquipe } from '@/utils/requetes/equipe'
import { getUtilisateurs } from '@/utils/requetes/utilisateur'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()

const confirm = useConfirm()

const cookie = ref({})

const visibleAjoutEquipe = ref(false)
const visibleAjoutProjet = ref(false)
const visibleModifierEquipe = ref(false)
const visibleModifierProjet = ref(false)

const chargement = ref(true)

const equipes = ref([])
const utilisateurs = ref([])
const projets = ref([])
const taches = ref([])

const equipeActuelPourModification = ref({})
const projetActuelPourModification = ref({})

function compterTaches(id, type){
    return taches.value.filter((item) => item.categorie == type && item.projet_id == id).length;
}

function montrerEquipesEtProjetsEnFonctionDeLutilisateur(){
    if(cookie.value.status != "Administrateur"){
        equipes.value = equipes.value.filter((item) => item.membres.find((item2) => item2 == cookie.value.id) || item.manager == cookie.value.id)
        const newProjets = []

        for (const item of equipes.value){
            newProjets.push(projets.value.filter((projet) => projet.equipe_id == item.id))
        }
        projets.value = newProjets.flat();
    }
}

function trouverNomEquipe(id){
    return equipes.value.find((item) => item.id == id).nom
}

function supprimerEquipe(id, nom){
    confirm.require({
        message: 'Vous êtes sur le point de supprimer l\'équipe ' + nom + '. Etes-vous sur de vouloir le supprimer définitivement?',
        header: 'Suppression de l\'équipe ' + nom,
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary'
        },
        acceptProps: {
            label: 'Supprimer',
            severity: 'danger'
        },
        accept: async () => {
            await deleteEquipe(id)
        }
    })
}

function supprimerProjet(id, nom){
    confirm.require({
        message: 'Vous êtes sur le point de supprimer le projet ' + nom + '. Etes-vous sur de vouloir le supprimer définitivement?',
        header: 'Suppresion du projet ' + nom,
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary'
        },
        acceptProps: {
            label: 'Supprimer',
            severity: 'danger'
        },
        accept: async () => {
            await deleteProjet(id)
        }
    })
}

onMounted(async () => {
    if(Cookies.get('utilisateur') == undefined){
        router.push('/connexion')
        return
    }

    cookie.value = JSON.parse(Cookies.get('utilisateur'))
    equipes.value = await getEquipes()
    utilisateurs.value = await getUtilisateurs()
    projets.value = await getProjets()
    taches.value = await getTaches()
    montrerEquipesEtProjetsEnFonctionDeLutilisateur()

    chargement.value = false
})
</script>

<template>
    <template v-if="chargement">
        <div class="flex justify-center">
            <span class="pi pi-spon pi-spinner" style="font-size: 3rem;"/>
        </div>
    </template>
    <template v-else>
        <div class="pt-4 flex flex-col space-y-6">
            <div class="flex justify-between w-full">
                <div>
                    <p>Bienvenue {{ cookie.nom }}</p>
                </div>
                <div class="flex pr-4">
                    <template v-if="cookie.status == 'Manager'">
                        <Bouton label="Créer un projet" @callback="visibleAjoutProjet = true" />
                    </template>
                    <template v-if="cookie.status == 'Administrateur'">
                        <Bouton label="Créer une équipe" severity="info" @callback="visibleAjoutEquipe = true"/>
                    </template>
                </div>
            </div>

            <div class="flex justify-center">
                <Card class="w-full overflow-x-auto">
                    <template #content>
                        <div class="flex space-x-2">
                            <template v-if="equipes.length == 0">
                                <p>Aucune équipe enregistrée</p>
                            </template>
                            <template v-else>
                                <template v-for="equipe in equipes">
                                    <Equipe 
                                        :equipe="equipe"
                                        :utilisateurs="utilisateurs"
                                        :cookie="cookie"
                                        @modifier="equipeActuelPourModification = equipe; visibleModifierEquipe = true"
                                        @supprimer="supprimerEquipe(equipe.id, equipe.nom)"
                                    />
                                </template>
                            </template>
                        </div>
                    </template>
                </Card>
            </div>

            
            <div class="flex flex-col space-y-2">
                <template v-for="projet in projets">
                    <Card class="w-full">
                        <template #title>
                            <div class="flex justify-between">
                                <div>
                                    <p class="text-xl font-bold">{{ projet.nom }}</p>
                                </div>
                                <div class="flex space-x-4">
                                    <span class="pi pi-pencil" style="font-size: 1.3rem;" @click="projetActuelPourModification = projet; visibleModifierProjet = true" />
                                    <span class="pi pi-trash" style="font-size: 1.3rem;" @click="supprimerProjet(projet.id, projet.nom)" />
                                </div>
                            </div>
                        </template>
                        <template #content>
                            <p>Equipe auquelle le projet est associé : {{ trouverNomEquipe(projet.equipe_id) }}</p>
                            <div class="w-1/2">
                                <DoughnutChart 
                                    :nom-graphe="projet.nom" 
                                    :backlogs="compterTaches(projet.id, 'backlogs')"
                                    :todo="compterTaches(projet.id, 'todo')"
                                    :inprogress="compterTaches(projet.id, 'inprogress')"
                                    :inreview="compterTaches(projet.id, 'inreview')"
                                    :done="compterTaches(projet.id, 'done')"
                                />
                            </div>
                        </template>
                    </Card>
                </template>
            </div>
        </div>

        <AjoutEquipe v-model:visible="visibleAjoutEquipe" :utilisateurs="utilisateurs" />
        <AjoutProjet v-model:visible="visibleAjoutProjet" :equipes="equipes" />
        <ModifierEquipe v-model:visible="visibleModifierEquipe" :utilisateurs="utilisateurs" :equipe="equipeActuelPourModification" />
        <ModifierProjet v-model:visible="visibleModifierProjet" :equipes="equipes" :projet="projetActuelPourModification" />
        <ConfirmDialog />
    </template>
</template>