<script setup>
import { Dialog, Button, InputText, Select, DatePicker } from 'primevue'
import { ref } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    utilisateurs: {
        type: Array,
        required: true
    },
    projets: {
        type: Array,
        required: true
    }
})

defineEmits(['update:visible'])

const status = ref([
    { label: "Backlogs", value: "backlogs" },
    { label: "To do", value: "todo" },
    { label: "In Progress", value: "inprogress" },
    { label: "In Review", value: "inreview" },
    { label: "Done", value: "done" }
])

const utilisateurs = ref([])
const projets = ref([])

const nomTache = ref("")
const selectedDev = ref({})
const selectedStatus = ref({})
const selectedProjet = ref({})
const dateFin = ref({})

async function ajouterTache(){
    const body = {
        nom: nomTache.value,
        description: nomTache.value,
        projet_id: selectedProjet.value,
        categorie: selectedStatus.value,
        developpeur_id: selectedDev.value,
        datefin: dateFin.value.getDate() + "/" + (dateFin.value.getMonth() + 1) + "/" + dateFin.value.getFullYear()
    }

    await fetch("http://localhost:3000/taches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
}

function resetInputs() {
    nomTache.value = ""
    selectedDev.value = {}
    selectedStatus.value = {}
    selectedProjet.value = {}
    dateFin.value = {}
}

function affecterValeurs(){
    utilisateurs.value = props.utilisateurs
    projets.value = props.projets

    for(const utilisateur of utilisateurs.value){
        utilisateur.label = utilisateur.nom + " " + utilisateur.prenom
    }
}
</script>

<template>
    <Dialog :visible="visible" @show="affecterValeurs" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Création d'une tâche" class="w-1/2">
        <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
                <label>Nom de la tâche :</label>
                <InputText v-model="nomTache" />
            </div>
            <div class="flex flex-col">
                <label>Nom du développeur :</label>
                <Select v-model="selectedDev" :options="utilisateurs" option-label="label" option-value="id" />
            </div>
            <div class="flex flex-col">
                <label>Projet affecté :</label>
                <Select v-model="selectedProjet" :options="projets" option-label="nom" option-value="id" />
            </div>
            <div class="flex flex-col">
                <label>Status :</label>
                <Select v-model="selectedStatus" :options="status" option-label="label" option-value="value" />
            </div>
            <div class="flex flex-col">
                <label>Date de fin :</label>
                <DatePicker v-model="dateFin" date-format="dd/mm/yy" />
            </div>
            <div class="flex justify-end gap-2">
                <Button label="Annuler" severity="secondary" @click="resetInputs(); $emit('update:visible', false)" />
                <Button label="Ajouter" @click="ajouterTache(); resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>