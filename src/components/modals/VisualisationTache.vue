<script setup>
import { Dialog, Button, Select, InputText, DatePicker } from 'primevue'
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
    projets: {
        type: Array,
        required: true
    },
    utilisateurs: {
        type: Array,
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

const utilisateurs = ref([])

const projet = ref({})
const utilisateur = ref({})
const tache = ref({})

const changeStatus = ref(false)
const changeNom = ref(false)
const changeDescription = ref(false)
const changeDatefin = ref(false)
const changeProjet = ref(false)
const changeDeveloppeur = ref(false)

async function getData(){
    projet.value = await getProjet(props.tache.projet_id)
    utilisateur.value = await getUtilisateur(props.tache.developpeur_id)
    
    tache.value = props.tache

    for(const utilisateur of props.utilisateurs){
        utilisateurs.value.push({
            id: utilisateur.id,
            label: utilisateur.nom + " " + utilisateur.prenom
        })
    }
}

async function changerTache(){
    const body = {
        id: tache.value.id,
        nom: tache.value.nom,
        description: tache.value.description,
        projet_id: tache.value.projet_id,
        categorie: tache.value.categorie,
        developpeur_id: tache.value.developpeur_id,
        datefin: tache.value.datefin
    }

    await fetch('http://localhost:3000/taches/' + tache.value.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application-json' },
        body: JSON.stringify(body)
    })

    changeNom.value = false;
    changeDescription.value = false;
    changeStatus.value = false;
    changeDatefin.value = false;
    changeProjet.value = false;
    changeDeveloppeur.value = false;
}

function reset(){
    changeStatus.value = false;
    changeNom.value = false;
    changeDescription.value = false;
    changeDatefin.value = false;
    changeProjet.value = false;
    changeDeveloppeur.value = false;
}
</script>

<template>
    <Dialog :visible="visible" @show="getData" @update:visible="$emit('update:visible', false)" @after-hide="reset" modal header="Visualisation de la tâche" class="w-1/2">
        <div class="flex flex-col space-y-4">
            <div>
                <p class="font-bold text-xl">{{ role == 'Manager' ? 'Pour changer une information de la tâche, cliquez sur le texte auquel vous voulez modifier' : 'Pour changer de status, cliquez sur le texte du status' }}</p>
            </div>
            <div @click="role == 'Manager' ? changeNom = true : ''" :class="{ 'flex items-center space-x-2': changeNom }">
                <template v-if="changeNom">
                    <p>Nom :</p>
                    <InputText v-model="tache.nom" />
                    <Button label="Valider" @click="changerTache"/>
                </template>
                <template v-else>
                    <p>Nom : {{ tache.nom }}</p>
                </template>
            </div>
            <div @click="role == 'Manager' ? changeDescription = true : ''" :class="{ 'flex items-center space-x-2': changeDescription }">
                <template v-if="changeDescription">
                    <p>Description :</p>
                    <InputText v-model="tache.description" />
                    <Button label="Valider" @click="changerTache" />
                </template>
                <template v-else>
                    <p>Description : {{ tache.description }}</p>
                </template>
            </div>
            <div @click="role == 'Manager' ? changeProjet = true : ''" :class="{ 'flex items-center space-x-2': changeProjet }">
                <template v-if="changeProjet">
                    <p>Projet :</p>
                    <Select v-model="tache.projet_id" :options="projets" option-label="nom" option-value="id" />
                    <Button label="Valider" @click="changerTache" />
                </template>
                <template v-else>
                    <p>Projet : {{ projet.nom }}</p>
                </template>
            </div>
            <div @click="changeStatus = true" :class="{ 'flex items-center space-x-2': changeStatus }">
                <template v-if="changeStatus">
                    <p>Status :</p>
                    <Select v-model="tache.categorie" :options="status" option-label="label" option-value="value" />
                    <Button label="Valider" @click="changerTache"/>
                </template>
                <template v-else>
                    <p>Status : {{ tache.categorie }}</p>
                </template>
            </div>
            <div @click="changeDeveloppeur = true" :class="{ 'flex items-center space-x-2': changeDeveloppeur }">
                <template v-if="changeDeveloppeur">
                    <p>Développeur :</p>
                    <Select v-model="tache.developpeur_id" :options="utilisateurs" option-label="label" option-value="id" />
                    <Button label="Valider" @click="changerTache"/>
                </template>
                <template v-else>
                    <p>Développeur : {{ utilisateur.nom + ' ' + utilisateur.prenom }}</p>
                </template>
            </div>
            <div @click="role == 'Manager' ? changeDatefin = true : ''" :class="{ 'flex items-center space-x-2': changeDatefin }">
                <template v-if="changeDatefin">
                    <p>Date de fin estimé :</p>
                    <DatePicker v-model="tache.datefin" date-format="dd/mm/yy" />
                    <Button label="Valider" @click="changerTache" />
                </template>
                <template v-else>
                    <p>Date de fin estimé : {{ tache.datefin }}</p>
                </template>
            </div>
            <div class="flex justify-end gap-1">
                <Button label="Fermer" severity="secondary" @click="$emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>