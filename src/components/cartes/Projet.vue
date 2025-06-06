<script setup>
import { Card } from 'primevue'

defineProps({
    projet: {
        type: Object,
        required: true
    },
    compterTaches: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <Card class="carte h-70">
        <template #title>{{ projet.nom }}</template>
        <template #content>
            <ul>
                <li>Tâches non commencées : {{ compterTaches(projet.id, 'backlogs') }}</li>
                <li>Tâches en cours : {{ compterTaches(projet.id, 'todo') }}</li>
                <li>Tâches terminées : {{ compterTaches(projet.id, 'done') }}</li>
            </ul>
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