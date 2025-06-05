<script setup>
import { Button, Card, ConfirmDialog } from 'primevue'
import { useConfirm } from 'primevue/useconfirm'
import AjoutUtilisateur from '@/components/modals/AjoutUtilisateur.vue'
import modifierUtilisateur from '@/components/modals/ModifierUtilisateur.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()

const confirm = useConfirm()

const visibleAjoutUtilisateur = ref(false)
const visibleModifierUtilisateur = ref(false)

const chargement = ref(true)

const utilisateurs = ref([])
const utilisateurActuelPourModification = ref({})

const cookie = ref({})

async function getUtilisateurs(){
    const response = await fetch("http://localhost:3000/utilisateurs")
    const data = await response.json();
    utilisateurs.value = data
}

function supprimerUtilisateur(id, nom, prenom){
    confirm.require({
        message: 'Vous êtes sur le point de supprimer l\'utilisateur ' + nom + ' ' + prenom + '. Etes-vous sur de vouloir le supprimer définitivement?',
        header: 'Suppression de l\'utilisateur ' + nom + ' ' + prenom,
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary'
        },
        acceptProps: {
            label: 'Supprimer',
            severity: 'danger'
        },
        accept: async () => {
            await fetch("http://localhost:3000/utilisateurs/" + id, {
                method: "DELETE"
            })
        }
    })
}

onMounted(async () => {
    if(Cookies.get('utilisateur') == undefined){
        router.push('/connexion')
        return
    }

    cookie.value = JSON.parse(Cookies.get('utilisateur'))
    if(cookie.value.status != "Administrateur") {
        router.push('/gestion')
        return
    }

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
                <Button label="Créer un utilisateur" severity="info" @click="visibleAjoutUtilisateur = true" />
            </div>
            <div class="flex justify-center">
                <Card class="w-11/12">
                    <template #content>
                        <template v-if="utilisateurs.length == 0">
                            <p class="text-center">Aucun utilisateur enregistré</p>
                        </template>
                        <template v-else>
                            <div class="flex flex-col space-y-2">
                                <template v-for="utilisateur in utilisateurs">
                                    <Card style="background-color: aqua;" v-if="utilisateur.status != 'Administrateur'">
                                        <template #content>
                                            <div class="flex flex-col space-y-2">
                                                <p class="font-bold">{{ utilisateur.nom.toUpperCase() }} {{ utilisateur.prenom }}</p>
                                                <p>{{ utilisateur.email }}</p>
                                                <p>{{ utilisateur.status }}</p>
                                            </div>
                                            <div class="flex justify-end gap-2">
                                                <Button label="Modifier" severity="warn" @click="utilisateurActuelPourModification = utilisateur; visibleModifierUtilisateur = true"/>
                                                <Button label="Supprimer" severity="danger" @click="supprimerUtilisateur(utilisateur.id, utilisateur.nom.toUpperCase(), utilisateur.prenom)" />
                                            </div>
                                        </template>
                                    </Card>
                                </template>
                            </div>
                        </template>
                    </template>
                </Card>
            </div>
        </div>

        <AjoutUtilisateur v-model:visible="visibleAjoutUtilisateur" />
        <modifierUtilisateur v-model:visible="visibleModifierUtilisateur" :utilisateur="utilisateurActuelPourModification" />
        <ConfirmDialog />
    </template>
</template>