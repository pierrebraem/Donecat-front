<script setup>
import { Button, Card, ConfirmDialog } from 'primevue'
import { useConfirm } from 'primevue/useconfirm'
import AjoutUtilisateur from '@/components/modals/AjoutUtilisateur.vue'
import { ref } from 'vue'

const confirm = useConfirm()

const visibleAjoutUtilisateur = ref(false)

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

function supprimerUtilisateur(nom, prenom){
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
        }
    })
}
</script>

<template>
    <div class="pt-4 flex flex-col space-y-6">
        <div class="flex justify-end pr-4">
            <Button label="Créer un utilisateur" severity="info" @click="visibleAjoutUtilisateur = true" />
        </div>
        <div class="flex justify-center">
            <Card class="w-11/12">
                <template #content>
                    <div class="flex flex-col space-y-2">
                        <template v-for="utilisateur in utilisateurs">
                            <Card style="background-color: aqua;" v-if="utilisateur.status != 'administrateur'">
                                <template #content>
                                    <div class="flex flex-col space-y-2">
                                        <p class="font-bold">{{ utilisateur.nom.toUpperCase() }} {{ utilisateur.prenom }}</p>
                                        <p>{{ utilisateur.email }}</p>
                                        <p>{{ utilisateur.status }}</p>
                                    </div>
                                    <div class="flex justify-end gap-2">
                                        <Button label="Modifier" severity="warn" />
                                        <Button label="Supprimer" severity="danger" @click="supprimerUtilisateur(utilisateur.nom.toUpperCase(), utilisateur.prenom)" />
                                    </div>
                                </template>
                            </Card>
                        </template>
                    </div>
                </template>
            </Card>
        </div>
    </div>

    <AjoutUtilisateur v-model:visible="visibleAjoutUtilisateur" />
    <ConfirmDialog />
</template>