<script setup>
import { Dialog, Password } from 'primevue'
import Bouton from '@/components/Bouton.vue'
import { ref } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    utilisateur: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:visible'])

const ancienMotdepasseIncorrect = ref(false)
const confirmationMotdepasseIncorrect = ref(false)

const ancienMotdepasse = ref("")
const nouveauMotdepasse = ref("")
const confirmerMotdepasse = ref("")

async function changerMotdepasse(){
    ancienMotdepasseIncorrect.value = false
    confirmationMotdepasseIncorrect.value = false

    if(ancienMotdepasse.value != props.utilisateur.motdepasse){
        ancienMotdepasseIncorrect.value = true
        return
    }

    if(nouveauMotdepasse.value != confirmerMotdepasse.value){
        confirmationMotdepasseIncorrect.value = true
        return
    }

    const body = {
        id: props.utilisateur.id,
        nom: props.utilisateur.nom,
        prenom: props.utilisateur.prenom,
        email: props.utilisateur.email,
        pseudo: props.utilisateur.pseudo,
        motdepasse: nouveauMotdepasse.value,
        status: props.utilisateur.status
    }

    await fetch("http://localhost:3000/utilisateurs/" + props.utilisateur.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })

    emit('update:visible', false)
}

function resetInputs(){
    ancienMotdepasse.value = ""
    nouveauMotdepasse.value = ""
    confirmerMotdepasse.value = ""
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Modification mot de passe" class="w-1/2">
        <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
                <label>Ancien mot de passe :</label>
                <Password v-model="ancienMotdepasse" :feedback="false" toggle-mask :style="{ width: '100%'}" :input-style="{ width: '100%'}" />
            </div>
            <div class="flex flex-col">
                <label>Nouveau mot de passe :</label>
                <Password v-model="nouveauMotdepasse" :feedback="false" toggle-mask :style="{ width: '100%'}" :input-style="{ width: '100%'}" />
            </div>
            <div class="flex flex-col">
                <label>Confirmer nouveau mot de passe :</label>
                <Password v-model="confirmerMotdepasse" :feedback="false" toggle-mask :style="{ width: '100%'}" :input-style="{ width: '100%'}" />
            </div>
            <div class="flex justify-end gap-2">
                <Bouton label="Annuler" severity="secondary" @callback="resetInputs(); $emit('update:visible', false)" />
                <Bouton label="Modifier" @callback="changerMotdepasse(); resetInputs()" />
            </div>
            <template v-if="ancienMotdepasseIncorrect">
                <p class="text-red-500">Votre saisie de votre ancien mot de passe ne correspond pas à votre mot de passe actuelle</p>
            </template>
            <template v-if="confirmationMotdepasseIncorrect">
                <p class="text-red-500">Le champ "nouveau de passe" et "confirmer nouveau de passe" ne sont pas les mêmes</p>
            </template>
        </div>
    </Dialog>
</template>