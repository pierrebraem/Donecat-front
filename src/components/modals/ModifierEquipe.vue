<script setup>
import { Dialog, InputText, Select } from 'primevue'
import Bouton from '@/components/Bouton.vue'
import { ref } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    utilisateurs: {
        type: Object,
        required: true
    },
    equipe: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:visible'])

const utilisateurs = ref([])

const nom = ref("")
const selectedManager = ref({})

function chargerDonnees(){
    nom.value = props.equipe.nom,
    selectedManager.value = props.equipe.manager
}

async function modifierEquipe() {
    const body = {
        id: props.equipe.id,
        nom: nom.value,
        membres: props.equipe.membres,
        manager: selectedManager.value
    }

    await fetch("http://localhost:3000/equipes/" + props.equipe.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    emit('update:visible', false)
}

function resetInputs() {
    nom.value = ""
    selectedManager.value = ""
}

function affecterValeurs(){
    utilisateurs.value = []
    for(const utilisateur of props.utilisateurs){
        if(utilisateur.status != 'Manager'){
            continue;
        }

        utilisateurs.value.push(
            {
                id: utilisateur.id,
                label: utilisateur.nom + " " + utilisateur.prenom
            }
        )
    }
}
</script>

<template>
    <Dialog :visible="visible" @show="chargerDonnees(); affecterValeurs()" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Modification d'une équipe" class="w-1/2">
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
                <Bouton label="Modifier" @callback="modifierEquipe(); resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>