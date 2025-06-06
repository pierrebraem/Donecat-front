<script setup>
import { Dialog, InputText } from 'primevue'
import Bouton from '@/components/Bouton.vue'
import { putUtilisateur } from '@/utils/requetes/utilisateur'
import { ref } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    utilisateur: {
        type: Object,
        required: true
    }
})

defineEmits(['update:visible'])

const nom = ref("")
const prenom = ref("")
const email = ref("")
const pseudo = ref("")

function chargerDonnees(){
    nom.value = props.utilisateur.nom
    prenom.value = props.utilisateur.prenom
    email.value = props.utilisateur.email
    pseudo.value = props.utilisateur.pseudo
}

async function modifierProfil(){
    const body = {
        id: props.utilisateur.id,
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        pseudo: pseudo.value,
        motdepasse: props.utilisateur.motdepasse,
        status: props.utilisateur.status
    }

    await putUtilisateur(props.utilisateur.id, body)

    emit('update:visible', false)
}

function resetInputs() {
    nom.value = ""
    prenom.value = ""
    email.value = ""
    pseudo.value = ""
}
</script>

<template>
    <Dialog :visible="visible" @show="chargerDonnees" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Modification du profil" class="w-1/2">
        <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
                <label>Nom :</label>
                <InputText v-model="nom" />
            </div>
            <div class="flex flex-col">
                <label>Prénom :</label>
                <InputText v-model="prenom" />
            </div>
            <div class="flex flex-col">
                <label>Adresse mail :</label>
                <InputText v-model="email" />
            </div>
            <div class="flex flex-col">
                <label>Pseudo :</label>
                <InputText v-model="pseudo" />
            </div>
            <div class="flex justify-end gap-2">
                <Bouton label="Annuler" severity="secondary" @callback="resetInputs(); $emit('update:visible', false)" />
                <Bouton label="Modifier" @callback="modifierProfil(); resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>