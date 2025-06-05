<script setup>
import { Dialog, Button, Select } from 'primevue'
import { getTache, getProjet, getUtilisateur } from '@/utils/fonctionsRequete'
import { ref } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    tache: {
        type: Object,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:visible'])

const status = ref([
    { label: "Backlogs", value: "backlogs" },
    { label: "To do", value: "todo" },
    { label: "In Progress", value: "inprogress" },
    { label: "In Review", value: "inreview" },
    { label: "Done", value: "done" }
])

const projet = ref({})
const utilisateur = ref({})

const changeStatus = ref(false)
const selectedStatus = ref({})

async function getData(){
    projet.value = await getProjet(props.tache.projet_id)
    utilisateur.value = await getUtilisateur(props.tache.developpeur_id)
    selectedStatus.value = props.tache.categorie
}

async function changerStatus(){
    const body = {
        id: props.tache.id,
        nom: props.tache.nom,
        description: props.tache.description,
        projet_id: props.tache.projet_id,
        categorie: selectedStatus.value,
        developpeur_id: props.tache.developpeur_id,
        datefin: props.tache.datefin
    }

    await fetch('http://localhost:3000/taches/' + props.tache.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application-json' },
        body: JSON.stringify(body)
    })

    changeStatus.value = false;
}

function reset(){
    changeStatus.value = false;
    selectedStatus.value = {};
}
</script>

<template>
    <Dialog :visible="visible" @show="getData" @update:visible="$emit('update:visible', false)" @after-hide="reset" modal header="Visualisation de la tâche" class="w-1/2">
        <div class="flex flex-col space-y-4">
            <div>
                <p class="font-bold text-xl">{{ role == 'Manager' ? 'Pour changer une information de la tâche, cliquez sur le texte auquel vous voulez modifier' : 'Pour changer de status, cliquez sur le texte du status' }}</p>
            </div>
            <div>
                <p>Nom : {{ tache.nom }}</p>
            </div>
            <div>
                <p>Description : {{ tache.description }}</p>
            </div>
            <div>
                <p>Projet : {{ projet.nom }}</p>
            </div>
            <div @click="changeStatus = true" :class="{ 'flex items-center space-x-2': changeStatus}">
                <template v-if="changeStatus">
                    <p>Status :</p>
                    <Select v-model="selectedStatus" :options="status" option-label="label" option-value="value" />
                    <Button label="Valider" @click="changerStatus"/>
                </template>
                <template v-else>
                    <p>Status : {{ tache.categorie }}</p>
                </template>
            </div>
            <div>
                <p>Développeur : {{ utilisateur.nom + ' ' + utilisateur.prenom }}</p>
            </div>
            <div>
                <p>Date de fin estimé : {{ tache.datefin }}</p>
            </div>
            <div class="flex justify-end gap-1">
                <Button label="Fermer" severity="secondary" @click="$emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>