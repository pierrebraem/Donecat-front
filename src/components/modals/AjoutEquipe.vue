<script setup>
import { Dialog, Button, InputText} from 'primevue'
import { ref } from 'vue'

defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})

defineEmits(['update:visible'])

const nom = ref("")

async function ajouterEquipe(){
    const body = {
        nom: nom.value
    }

    await fetch("http://localhost:3000/equipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
}

function resetInputs() {
    nom.value = ""
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="$emit('update:visible', false)" @after-hide="resetInputs" modal header="Création d'une équipe" class="w-1/2">
        <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
                <label>Nom de l'équipe :</label>
                <InputText v-model="nom" />
            </div>
            <div class="flex justify-end gap-2">
                <Button label="Annuler" severity="secondary" @click="resetInputs(); $emit('update:visible', false)" />
                <Button label="Ajouter" @click="ajouterEquipe(); resetInputs(); $emit('update:visible', false)" />
            </div>
        </div>
    </Dialog>
</template>