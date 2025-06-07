<script setup>
import { Dialog, InputText, Select } from 'primevue'
import Bouton from '@/components/Bouton.vue'
import { postEquipe } from '@/utils/requetes/equipe'
import { ref } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    utilisateurs: {
        type: Array,
        required: true
    }
})

defineEmits(['update:visible'])

const nom = ref("")
const selectedManager = ref({})
const selectedDevs = ref([{}])

const dataManagers = ref([])
const dataDevs = ref([])

async function ajouterEquipe(){
    const body = {
        nom: nom.value,
        membres: selectedDevs.value,
        manager: selectedManager.value
    }

    await postEquipe(body)
}

function resetInputs() {
    nom.value = ""
    selectedManager.value = {}
    selectedDevs.value = [{}]
}

function ajouterDevDansLeSelect(){
    selectedDevs.value.push({})
}

function supprimerDevDansLeSelect(index){
    selectedDevs.value.splice(index, 1)
}

function affecterValeurs(){
    dataManagers.value = []
    dataDevs.value = []

    for(const utilisateur of props.utilisateurs){
        const objet = {
            id: utilisateur.id,
            label: utilisateur.nom + ' ' + utilisateur.prenom
        }

        if(utilisateur.status == 'Manager'){
            dataManagers.value.push(objet)
            continue
        }

        if(utilisateur.status == 'Dev'){
            dataDevs.value.push(objet)
        }
    }
}
</script>

<template>
    <Dialog :visible="visible" @show="affecterValeurs" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Création d'une équipe" class="w-1/2">
        <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
                <label>Nom de l'équipe :</label>
                <InputText v-model="nom" />
            </div>
            <div class="flex flex-col">
                <label>Manager de l'équipe :</label>
                <Select v-model="selectedManager" :options="dataManagers" option-label="label" option-value="id" empty-message="Aucun manager n'existe dans la base de données" />
            </div>
            <div class="flex-col space-y-6">
                <div class="flex flex-col" v-for="(item, index) in selectedDevs">
                    <label>Développeur n°{{ index + 1 }} :</label>
                    <div class="flex justify-between items-center space-x-2">
                        <Select v-model="selectedDevs[index]" :options="dataDevs" option-label="label" option-value="id" class="w-full"/>
                        <span class="pi pi-trash" style="font-size: 1.3rem;" @click="supprimerDevDansLeSelect(index)"/>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <Bouton label="Ajouter un développeur" severity="warn" @callback="ajouterDevDansLeSelect"/>
            </div>
            <div class="flex justify-end gap-2">
                <Bouton label="Annuler" severity="secondary" @callback="resetInputs(); $emit('update:visible', false)" />
                <Bouton label="Ajouter" @callback="ajouterEquipe(); resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>