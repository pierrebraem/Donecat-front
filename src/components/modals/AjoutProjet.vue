<script setup>
import { Dialog, InputText, Select } from 'primevue'
import Bouton from '@/components/Bouton.vue'
import { ref } from 'vue'

defineProps({
    visible: Boolean
})

defineEmits(['update:visible'])

const equipes = ref([
    { id: 1, nom: "Equipe 1"},
    { id: 2, nom: "Equipe 2"},
    { id: 3, nom: "Equipe 3"}
])

const nom = ref("")
const selectedEquipes = ref([{}])

function ajouterEquipe() {
    selectedEquipes.value.push({})
}

function resetInputs() {
    selectedEquipes.value = [{}]
    nom.value = ""
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Création d'un projet" class="w-1/2">
        <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
                <label>Nom du projet :</label>
                <InputText v-model="nom" />
            </div>
            <div class="flex flex-col space-y-6">
                <div class="flex flex-col" v-for="(item, index) in selectedEquipes">
                    <label>Equipe {{ index + 1 }}</label>
                    <Select v-model="selectedEquipes[index]" :options="equipes" option-label="nom" option-value="id" />
                </div>
            </div>
            <div class="flex justify-end">
                <Bouton label="Ajouter une équipe" severity="warn" @click="ajouterEquipe" />
            </div>
            <div class="flex justify-end gap-2">
                <Bouton label="Annuler" severity="secondary" @callback="resetInputs(); $emit('update:visible', false)" />
                <Bouton label="Ajouter" @callback="resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>