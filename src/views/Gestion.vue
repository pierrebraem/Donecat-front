<script setup>
import { Button, Card } from 'primevue'
import AjoutEquipe from '@/components/modals/AjoutEquipe.vue'
import AjoutProjet from '@/components/modals/AjoutProjet.vue'
import { ref } from 'vue'

const visibleAjoutEquipe = ref(false)
const visibleAjoutProjet = ref(false)
</script>

<template>
    <div class="pt-4">
        <div class="flex justify-between w-full">
            <div>
                <p>Bienvenue Dev1</p>
            </div>
            <div class="flex space-x-2">
                <Button label="Créer un projet" @click="visibleAjoutProjet = true" />
                <Button label="Créer une équipe" severity="info" @click="visibleAjoutEquipe = true"/>
                <Button label="Gestion des utilisateurs" severity="info" />
            </div>
        </div>
    </div>

    <AjoutEquipe v-model:visible="visibleAjoutEquipe"/>
    <AjoutProjet v-model:visible="visibleAjoutProjet"/>
</template>