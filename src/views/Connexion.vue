<script setup>
import { Card, InputText, Password, Button } from 'primevue'
import { ref } from 'vue'

const email = ref("")
const password = ref("")
const is_email_or_password_invalid = ref(false)

function login(){
    is_email_or_password_invalid.value = true;
}
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
                        <Button label="Connexion" @click="login" />
                    </div>

                    <div class="pt-6" v-if="is_email_or_password_invalid">
                        <p class="text-red-500">Adresse mail ou mot de passe incorrect</p>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>