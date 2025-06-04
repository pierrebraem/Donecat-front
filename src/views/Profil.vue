<script setup>
import { Card, Button } from 'primevue'
import ModifierProfil from '@/components/modals/ModifierProfil.vue'
import ModifierMotdepasse from '@/components/modals/ModifierMotdepasse.vue'
import { ref } from 'vue'

const visibleModifierProfil = ref(false)
const visibleModifierMotdepasse = ref(false)

const utilisateur = ref({
    id: 1,
    nom: "Braem",
    prenom: "Pierre",
    email: "pierre.braem@test.com",
    pseudo: "MonsieurBraem",
    status: "administrateur",
    equipe_id: 1
})
</script>

<template>
    <h1 class="text-5xl font-bold text-center">Profil</h1>

    <div class="flex justify-center">
        <Card class="w-11/12 text-xl">
            <template #content>
                <div class="flex">
                    <p class="font-bold">Nom :</p>
                    <p>{{ utilisateur.nom }}</p>
                </div>
                <div class="flex">
                    <p class="font-bold">Prénom :</p>
                    <p>{{ utilisateur.prenom }}</p>
                </div>
                <div class="flex">
                    <p class="font-bold">Email :</p>
                    <p>{{ utilisateur.email }}</p>
                </div>
                <div class="flex">
                    <p class="font-bold">Pseudo :</p>
                    <p>{{ utilisateur.pseudo }}</p>
                </div>
                <div class="flex">
                    <p class="font-bold">Status :</p>
                    <p>{{ utilisateur.status }}</p>
                </div>
                <div class="flex justify-center space-x-6 pt-4">
                    <Button label="Modifier le profil" severity="warn" @click="visibleModifierProfil = true" />
                    <Button label="Modifier le mot de passe" severity="warn" @click="visibleModifierMotdepasse = true" />
                </div>
            </template>
        </Card>
    </div>

    <ModifierProfil v-model:visible="visibleModifierProfil" />
    <ModifierMotdepasse v-model:visible="visibleModifierMotdepasse" />
</template>