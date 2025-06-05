<script setup>
import { Dialog, Button, InputText, Select, Password } from 'primevue'
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

const emit = defineEmits(['update:visible'])

const status = ref([
    { label: "Manager", value: "Manager" },
    { label: "Developpeur", value: "Dev" }
])

const nom = ref("")
const prenom = ref("")
const email = ref("")
const pseudo = ref("")
const selectedStatus = ref({})

function chargerDonnees(){
    nom.value = props.utilisateur.nom
    prenom.value = props.utilisateur.prenom
    email.value = props.utilisateur.email
    pseudo.value = props.utilisateur.pseudo
    selectedStatus.value = props.utilisateur.status
}

async function modifierUtilisateur() {
    const body = {
        id: props.utilisateur.id,
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        pseudo: pseudo.value,
        motdepasse: props.utilisateur.motdepasse,
        status: selectedStatus.value
    }

    await fetch("http://localhost:3000/utilisateurs/" + props.utilisateur.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    emit('update:visible', false)
}

function resetInputs() {
    nom.value = ""
    prenom.value = ""
    email.value = ""
    pseudo.value = ""
    selectedStatus.value = {}
}
</script>

<template>
    <Dialog :visible="visible" @show="chargerDonnees" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Modification d'un utilisateur" class="w-1/2">
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
            <div class="flex flex-col">
                <label>Status:</label>
                <Select v-model="selectedStatus" :options="status" option-label="label" option-value="value" />
            </div>
            <div class="flex justify-end gap-2">
                <Button label="Annuler" severity="secondary" @click="resetInputs(); $emit('update:visible', false)" />
                <Button label="Modifier" @click="modifierUtilisateur(); resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>