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

const utilisateurs = ref([])

const nom = ref("")
const selectedManager = ref({})

async function ajouterEquipe(){
    const body = {
        nom: nom.value,
        membres: [],
        manager: selectedManager.value
    }

    await postEquipe(body)
}

function resetInputs() {
    nom.value = ""
    selectedManager.value = ""
}

function affecterValeurs(){
    utilisateurs.value = [];
    for(const utilisateur of props.utilisateurs){
        if(utilisateur.status != 'Manager'){
            continue;
        }
        
        utilisateurs.value.push (
            {
                id: utilisateur.id,
                label: utilisateur.nom + " " + utilisateur.prenom
            }
        )
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
                <Select v-model="selectedManager" :options="utilisateurs" option-label="label" option-value="id" empty-message="Aucun manager n'existe dans la base de données" />
            </div>
            <div class="flex justify-end gap-2">
                <Bouton label="Annuler" severity="secondary" @callback="resetInputs(); $emit('update:visible', false)" />
                <Bouton label="Ajouter" @callback="ajouterEquipe(); resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>