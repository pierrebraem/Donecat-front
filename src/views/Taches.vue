<script setup>
import { Card, Tabs, TabList, Tab, TabPanels, Divider, TabPanel } from 'primevue'
import AjoutTache from '@/components/modals/AjoutTache.vue'
import VisualisationTache from '@/components/modals/VisualisationTache.vue'
import Bouton from '@/components/Bouton.vue'
import Chargement from '@/components/Chargement.vue'
import Tache from '@/components/cartes/Tache.vue'
import { getTaches } from '@/utils/requetes/tache'
import { getProjets } from '@/utils/requetes/projet'
import { getUtilisateurs } from '@/utils/requetes/utilisateur'
import { getEquipes } from '@/utils/requetes/equipe'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()

const visibleAjoutTache = ref(false)
const visibleVisualisationTache = ref(false)

const chargement = ref(true)

const equipes = ref([])
const utilisateurs = ref([])
const projets = ref([])
const taches = ref([])

const tacheActuelPourVisionnage = ref({})

const cookie = ref({})

function montrerProjetsEtTachesEnFonctionDeLutilisateur(){
    if(cookie.value.status != "Administrateur"){
        equipes.value = equipes.value.filter((item) => item.membres.find((item2) => item2 == cookie.value.id) || item.manager == cookie.value.id)
        const newProjets = []

        for (const item of equipes.value){
            newProjets.push(projets.value.filter((projet) => projet.equipe_id == item.id))
        }
        projets.value = newProjets.flat();
    }
}

const status = ref([
    { label: "Backlogs", value: "backlogs" },
    { label: "To do", value: "todo" },
    { label: "In Progress", value: "inprogress" },
    { label: "In Review", value: "inreview" },
    { label: "Done", value: "done" }
])

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
    montrerProjetsEtTachesEnFonctionDeLutilisateur()

    chargement.value = false
})
</script>

<template>
    <template v-if="chargement">
        <Chargement />
    </template>
    <template v-else>
        <div class="pt-4 flex flex-col space-y-6">
            <div class="flex justify-end pr-4" v-if="cookie.status == 'Manager'">
                <Bouton label="Créer une tâche" @callback="visibleAjoutTache = true" />
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
                                    <div class="flex justify-between">
                                        <template v-for="item in status">
                                            <div class="flex-1 px-4">
                                                <h1 class="3xl font-bold text-center">{{ item.label }}</h1>
                                                <template v-for="tache in taches">
                                                    <template v-if="tache.projet_id == projet.id && tache.categorie == item.value">
                                                        <div class="flex flex-col space-y-2 pt-4" @click="tacheActuelPourVisionnage = tache; visibleVisualisationTache = true">
                                                            <Tache :tache="tache" :utilisateurs="utilisateurs" />
                                                        </div>
                                                    </template>
                                                </template>
                                            </div>
                                            <div class="w-px h-100 bg-gray-300"></div>
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
        <VisualisationTache v-model:visible="visibleVisualisationTache" :tache="tacheActuelPourVisionnage" :projets="projets" :utilisateurs="utilisateurs" :role="cookie.status" />
    </template>
</template>