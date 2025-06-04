<script setup>
import { Dialog, Button, InputText, Select, DatePicker } from 'primevue'
import { ref } from 'vue'

defineProps({
    visible: {
        type: Boolean,
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

const utilisateurs = ref([
    {
        id: 1,
        label: "Braem Pierre",
        equipe_id: 1
    },
    {
        id: 2,
        label: "Dupont Martin",
        equipe_id: 2
    },
    {
        id: 3,
        label: "Rain Jean",
        equipe_id: 1
    }
])

const projets = ref([
    {
        id: 1,
        nom: "Projet 1"
    },
    {
        id: 2,
        nom: "Projet 2"
    }
])

const nomTache = ref("")
const selectedDev = ({})
const selectedStatus = ({})
const selectedProjet = ({})
const dateFin = ({})

function resetInputs() {
    nomTache.value = ""
    selectedDev.value = {}
    selectedStatus.value = {}
    selectedProjet.value = {}
    dateFin.value = {}
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Création d'une tâche" class="w-1/2">
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
                <DatePicker v-model="dateFin" />
            </div>
            <div class="flex justify-end gap-2">
                <Button label="Annuler" severity="secondary" @click="resetInputs(); $emit('update:visible', false)" />
                <Button label="Ajouter" @click="resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>