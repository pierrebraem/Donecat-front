<script setup>
import { Card } from 'primevue'

const props = defineProps({
    tache: {
        type: Object,
        required: true
    },
    utilisateurs: {
        type: Array,
        required: true
    }
})

function formatageUtilisateur(developpeur_id){
    const utilisateur = props.utilisateurs.find((item) => item.id == developpeur_id)
    return utilisateur.nom + ' ' + utilisateur.prenom
}
</script>

<template>
    <Card style="background-color: aqua;">
        <template #content>
            <div class="flex flex-col space-y-2">
                <p class="font-bold">{{ tache.nom }}</p>
                <p>{{ formatageUtilisateur(tache.developpeur_id) }}</p>
                <p>Date de fin : {{ tache.datefin }}</p>
            </div>
        </template>
    </Card>
</template>