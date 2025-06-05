<script setup>
import { Dialog, Button } from 'primevue'
import { getTache, getProjet, getUtilisateur } from '@/utils/fonctionsRequete'
import { ref } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    tacheId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:visible'])

const tache = ref({})
const projet = ref({})
const utilisateur = ref({})

async function getData(){
    tache.value = await getTache(props.tacheId)
    projet.value = await getProjet(tache.value.projet_id)
    utilisateur.value = await getUtilisateur(tache.value.developpeur_id)
}
</script>

<template>
    <Dialog :visible="visible" @show="getData" @update:visible="$emit('update:visible', false)" modal header="Visualisation de la tâche" class="w-1/2">
        <div class="flex flex-col space-y-4">
            <div>
                <p>Nom : {{ tache.nom }}</p>
            </div>
            <div>
                <p>Description : {{ tache.description }}</p>
            </div>
            <div>
                <p>Projet : {{ projet.nom }}</p>
            </div>
            <div>
                <p>Status : {{ tache.categorie }}</p>
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