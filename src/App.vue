<script setup>
import { Menubar } from "primevue"
import { ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
    {
        label: 'Accueil',
        command: () => {
            router.push('/')
        }
    },
    {
        label: 'Administration',
        command: () => {
            router.push('/gestion')
        }
    },
    {
        label: 'Liste des tâches',
        command: () => {
            router.push('/taches')
        }
    },
    {
        label: 'Gestion des utilisateurs',
        command: () => {
            router.push('/utilisateurs')
        }
    },
    {
        label: 'Profil',
        command: () => {
            router.push('/profil')
        }
    },
    {
        label: 'Connexion',
        command: () => {
            router.push('/connexion')
        }
    }
])
</script>

<template>
    <Menubar :model="items">
        <template #item="{ item, props }">
            <a v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                <span>{{ item.label }}</span>
            </a>
        </template>
    </Menubar>
    <router-view></router-view>
</template>
