<script setup>
import { Dialog, InputText, Select, Password } from "primevue";
import Bouton from "@/components/Bouton.vue";
import { postUtilisateur } from "@/utils/requetes/utilisateur";
import bcrypt from "bcryptjs";
import { ref } from "vue";

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const status = ref([
  { label: "Manager", value: "Manager" },
  { label: "Developpeur", value: "Dev" },
]);

const nom = ref("");
const prenom = ref("");
const email = ref("");
const pseudo = ref("");
const motdepasse = ref("");
const confirmerMotdepasse = ref("");
const selectedStatus = ref({});

const confirmationMotdepassIncorrect = ref(false);

async function ajouterUtilisateur() {
  confirmationMotdepassIncorrect.value = false;

  if (motdepasse.value != confirmerMotdepasse.value) {
    confirmationMotdepassIncorrect.value = true;
    return;
  }

  const hash = bcrypt.hashSync(motdepasse.value, 10);

  const body = {
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    pseudo: pseudo.value,
    motdepasse: hash,
    status: selectedStatus.value,
  };

  await postUtilisateur(body);

  emit("update:visible", false);
}

function resetInputs() {
  nom.value = "";
  prenom.value = "";
  email.value = "";
  pseudo.value = "";
  motdepasse.value = "";
  confirmerMotdepasse.value = "";
  selectedStatus.value = {};
}
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', false)"
    @after-hide="resetInputs"
    modal
    header="Ajouter un utilisateur"
    class="w-1/2"
  >
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
        <Password
          v-model="motdepasse"
          :feedback="false"
          toggle-mask
          :style="{ width: '100%' }"
          :input-style="{ width: '100%' }"
        />
      </div>
      <div class="flex flex-col">
        <label>Confirmer mot de passe :</label>
        <Password
          v-model="confirmerMotdepasse"
          :feedback="false"
          toggle-mask
          :style="{ width: '100%' }"
          :input-style="{ width: '100%' }"
        />
      </div>
      <div class="flex flex-col">
        <label>Status:</label>
        <Select
          v-model="selectedStatus"
          :options="status"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Bouton
          label="Annuler"
          severity="secondary"
          @callback="
            resetInputs();
            $emit('update:visible', false);
          "
        />
        <Bouton
          label="Ajouter"
          @callback="
            ajouterUtilisateur();
            resetInputs();
          "
        />
      </div>
      <template v-if="confirmationMotdepassIncorrect">
        <p class="text-red-500">
          Le champ "Mot de passe" et "Confirmer mot de passe" ne sont pas les
          mêmes
        </p>
      </template>
    </div>
  </Dialog>
</template>
