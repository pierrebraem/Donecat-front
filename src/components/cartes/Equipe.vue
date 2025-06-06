<script setup>
import { Card, Button } from 'primevue'

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
    <Card style="background-color: aqua;" class="w-70 h-70">
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
            <div class="flex justify-center gap-3">
                <template v-if="cookie.status == 'Administrateur'">
                    <Button label="Modifier" severity="warn" @click="$emit('modifier')"/>
                    <Button label="Supprimer" severity="danger" @click="$emit('supprimer')"/>
                </template>
            </div>
        </template>
    </Card>
</template>