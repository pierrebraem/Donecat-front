<script setup>
import { Card } from 'primevue'
import ModifierProfil from '@/components/modals/ModifierProfil.vue'
import ModifierMotdepasse from '@/components/modals/ModifierMotdepasse.vue'
import Bouton from '@/components/Bouton.vue'
import { getUtilisateur } from '@/utils/fonctionsRequete'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()

const visibleModifierProfil = ref(false)
const visibleModifierMotdepasse = ref(false)

const cookie = ref({})

const utilisateur = ref({})

onMounted(async () => {
    if(Cookies.get('utilisateur') == undefined){
        router.push('/connexion')
        return
    }

    cookie.value = JSON.parse(Cookies.get('utilisateur'))
    utilisateur.value =  await getUtilisateur(cookie.value.id)
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
                    <Bouton label="Modifier le profil" severity="warn" @callback="visibleModifierProfil = true" />
                    <Bouton label="Modifier le mot de passe" severity="warn" @callback="visibleModifierMotdepasse = true" />
                </div>
            </template>
        </Card>
    </div>

    <ModifierProfil v-model:visible="visibleModifierProfil" />
    <ModifierMotdepasse v-model:visible="visibleModifierMotdepasse" :utilisateur="utilisateur" />
</template>