<script setup>
import { Card } from 'primevue'
import Bouton from '@/components/Bouton.vue'

const props = defineProps({
    equipe: {
        type: Object,
        required: true
    },
    utilisateurs: {
        type: Array,
        required: true
    },
    cookie: {
        type: Object,
        required: true
    }
})

function trouverUtilisateur(id, manager){    
    const resultat = props.utilisateurs.find((item) => item.id == id)
    
    return resultat.nom + ' ' + resultat.prenom + (manager ? ' (Manager)' : '')
}
</script>

<template>
    <Card class="carte h-70">
        <template #title>{{ equipe.nom }}</template>
        <template #content>
            <ul>
                <li>{{ trouverUtilisateur(equipe.manager, true) }}</li>
                <template v-for="membre in equipe.membres">
                    <li>{{ trouverUtilisateur(membre, false)}}</li>
                </template>
            </ul>
        </template>
        <template #footer>
            <div class="mt-auto flex justify-center gap-3">
                <template v-if="cookie.status == 'Administrateur'">
                    <span class="pi pi-pencil" style="font-size: 1.3rem;" @click="$emit('modifier')"/>
                    <span class="pi pi-trash" style="font-size: 1.3rem;" @click="$emit('supprimer')"/>
                </template>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.carte {
    color: white;
    background-color: #1A202C;
}

li {
    list-style-type: circle;
}
</style>