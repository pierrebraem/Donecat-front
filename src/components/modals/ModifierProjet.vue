<script setup>
import { Dialog, InputText, Select } from 'primevue'
import Bouton from '@/components/Bouton.vue'
import { putProjet } from '@/utils/requetes/projet'
import { ref } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    equipes: {
        type: Array,
        required: true
    },
    projet: {
        type: Object,
        required: true
    }
})

defineEmits(['update:visible'])

const nom = ref("")
const selectedEquipe = ref({})

function chargerDonnees(){
    nom.value = props.projet.nom,
    selectedEquipe.value = props.projet.equipe_id
}

async function modifierProjet() {
    const body = {
        id: props.projet.id,
        nom: nom.value,
        equipe_id: selectedEquipe.value
    }

    await putProjet(props.projet.id, body)

    emit('update:visible', false)
}

function resetInputs() {
    nom.value = ""
    selectedEquipe.value = {}
}
</script>

<template>
    <Dialog :visible="visible" @show="chargerDonnees" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Modification d'un projet" class="w-1/2">
        <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
                <label>Nom du projet :</label>
                <InputText v-model="nom" />
            </div>
            <div class="flex flex-col">
                <label>Equipe à affecter au projet :</label>
                <Select v-model="selectedEquipe" :options="equipes" option-label="nom" option-value="id" empty-message="Vous n'êtes affectés à aucune équipe en tant que manager" />
            </div>
            <div class="flex justify-end gap-2">
                <Bouton label="Annuler" severity="secondary" @callback="resetInputs(); $emit('update:visible', false)" />
                <Bouton label="Modifier" @callback="modifierProjet(); resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>