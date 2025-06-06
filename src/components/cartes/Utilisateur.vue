<script setup>
import { Card, Button } from 'primevue'

defineProps({
    utilisateur: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <Card style="background-color: aqua;" v-if="utilisateur.status != 'Administrateur'">
        <template #content>
            <div class="flex flex-col space-y-2">
                <p class="font-bold">{{ utilisateur.nom.toUpperCase() }} {{ utilisateur.prenom }}</p>
                <p>{{ utilisateur.email }}</p>
                <p>{{ utilisateur.status }}</p>
            </div>
            <div class="flex justify-end gap-2">
                <Button label="Modifier" severity="warn" @click="$emit('modifier')"/>
                <Button label="Supprimer" severity="danger" @click="$emit('supprimer')" />
            </div>
        </template>
    </Card>
</template>