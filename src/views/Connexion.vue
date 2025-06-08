<script setup>
import { Card, InputText, Password } from 'primevue'
import { getUtilisateurs } from '@/utils/requetes/utilisateur'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Bouton from '@/components/Bouton.vue'
import bcrypt from 'bcryptjs'
import Cookies from 'js-cookie'

const router = useRouter()

const email = ref("")
const password = ref("")
const is_email_or_password_invalid = ref(false)

async function login(){
    const utilisateurs = await getUtilisateurs()

    const res = utilisateurs.find((item) => item.email == email.value)
    if(res == undefined){
        is_email_or_password_invalid.value = true;
        return;
    }

    if(!bcrypt.compareSync(password.value, res.motdepasse)){
        is_email_or_password_invalid.value = true;
        return;
    }

    Cookies.set('utilisateur', JSON.stringify({id: res.id, status: res.status, nom: res.prenom + ' ' + res.nom}), { expires: 1 })
    router.push('/gestion')
}

onMounted(() => {
    if(Cookies.get('utilisateur') != undefined){
        router.push('/')
        return
    }
})
</script>

<template>
    <div class="flex justify-center">
        <Card class="w-11/12">
            <template #title><h1 class="text-3xl font-bold text-center">Connexion</h1></template>
            <template #content>
                <div class="flex flex-col justify-center items-center pt-12 space-y-6">
                    <div class="flex flex-col w-60">
                        <label>Adresse mail :</label>
                        <InputText v-model="email" />
                    </div>

                    <div class="flex flex-col">
                        <label>Mot de passe :</label>
                        <Password v-model="password" :feedback="false" toggle-mask :style="{ width: '100%' }" :input-style="{ width: '100%'}" />
                    </div>

                    <div class="pt-8">
                        <Bouton label="Connexion" @callback="login" />
                    </div>

                    <div class="pt-6" v-if="is_email_or_password_invalid">
                        <p class="text-red-500">Adresse mail ou mot de passe incorrect</p>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>