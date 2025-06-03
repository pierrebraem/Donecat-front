<script setup>
import { Dialog, Button, InputText, Select, Password } from 'primevue';
import { ref } from 'vue'

defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})

defineEmits(['update:visible'])

const status = ref([
    { label: "Manager", value: "manager" },
    { label: "Developpeur", value: "dev" }
]);

const nom = ref("")
const prenom = ref("")
const email = ref("")
const pseudo = ref("")
const motdepasse = ref("")
const selectedStatus = ref({})

function resetInputs() {
    nom.value = ""
    prenom.value = ""
    email.value = ""
    pseudo.value = ""
    motdepasse.value = ""
    selectedStatus.value = {}
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', false)"  @after-hide="resetInputs" modal header="Ajouter un utilisateur" class="w-1/2">
        <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
                <label>Nom :</label>
                <InputText v-model="nom" />
            </div>
            <div class="flex flex-col">
                <label>Prénom :</label>
                <InputText v-model="prenom" />
            </div>
            <div class="flex flex-col">
                <label>Adresse mail :</label>
                <InputText v-model="email" />
            </div>
            <div class="flex flex-col">
                <label>Pseudo :</label>
                <InputText v-model="pseudo" />
            </div>
            <div class="flex flex-col">
                <label>Mot de passe :</label>
                <Password v-model="motdepasse" :feedback="false" toggle-mask :style="{ width: '100%' }" :input-style="{ width: '100%' }" />
            </div>
            <div class="flex flex-col">
                <label>Status:</label>
                <Select v-model="selectedStatus" :options="status" option-label="label" option-value="value" />
            </div>
            <div class="flex justify-end gap-2">
                <Button label="Annuler" severity="secondary" @click="resetInputs(); $emit('update:visible', false)" />
                <Button label="Ajouter" @click="resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>