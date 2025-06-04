<script setup>
import { Dialog, Password, Button } from 'primevue'
import { ref } from 'vue'

defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})

defineEmits(['update:visible'])

const ancienMotdepasse = ref("")
const nouveauMotdepasse = ref("")
const confirmerMotdepasse = ref("")
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
                <Button label="Annuler" severity="secondary" @click="resetInputs(); $emit('update:visible', false)" />
                <Button label="Modifier" @click="resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>