<script setup>
import { Dialog, Password } from "primevue";
import Bouton from "@/components/Bouton.vue";
import AfficherErreurs from "../AfficherErreurs.vue";
import { putUtilisateur } from "@/utils/requetes/utilisateur";
import { mdpIdentiques, compareMdp } from "@/utils/gestionErreurs";
import bcrypt from "bcryptjs";
import { ref } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  utilisateur: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const messagesErreur = ref([]);

const ancienMDP = ref("");
const nouveauMDP = ref("");
const confirmerMDP = ref("");

async function changerMotdepasse() {
  messagesErreur.value = [];

  const erreurAncienMDP = compareMdp(
    ancienMDP.value,
    props.utilisateur.motdepasse,
  );
  if (erreurAncienMDP) messagesErreur.value.push(erreurAncienMDP);

  const erreurConfirmerMDP = mdpIdentiques(
    nouveauMDP.value,
    confirmerMDP.value,
  );
  if (erreurConfirmerMDP) messagesErreur.value.push(erreurConfirmerMDP);

  if (messagesErreur.value.length != 0) return;

  const hash = bcrypt.hashSync(nouveauMDP.value);

  const body = {
    id: props.utilisateur.id,
    nom: props.utilisateur.nom,
    prenom: props.utilisateur.prenom,
    email: props.utilisateur.email,
    pseudo: props.utilisateur.pseudo,
    motdepasse: hash,
    status: props.utilisateur.status,
  };

  await putUtilisateur(props.utilisateur.id, body);

  emit("update:visible", false);
}

function resetInputs() {
  ancienMDP.value = "";
  nouveauMDP.value = "";
  confirmerMDP.value = "";
}
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', false)"
    @after-hide="resetInputs"
    modal
    header="Modification mot de passe"
    class="w-1/2"
  >
    <div class="flex flex-col space-y-6">
      <div class="flex flex-col">
        <label>Ancien mot de passe :</label>
        <Password
          v-model="ancienMDP"
          :feedback="false"
          toggle-mask
          :style="{ width: '100%' }"
          :input-style="{ width: '100%' }"
        />
      </div>
      <div class="flex flex-col">
        <label>Nouveau mot de passe :</label>
        <Password
          v-model="nouveauMDP"
          :feedback="false"
          toggle-mask
          :style="{ width: '100%' }"
          :input-style="{ width: '100%' }"
        />
      </div>
      <div class="flex flex-col">
        <label>Confirmer nouveau mot de passe :</label>
        <Password
          v-model="confirmerMDP"
          :feedback="false"
          toggle-mask
          :style="{ width: '100%' }"
          :input-style="{ width: '100%' }"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Bouton
          label="Annuler"
          severity="secondary"
          @callback="
            resetInputs();
            messagesErreur = [];
            $emit('update:visible', false);
          "
        />
        <Bouton
          label="Modifier"
          @callback="
            changerMotdepasse();
            resetInputs();
          "
        />
      </div>
      <AfficherErreurs :messages-erreur="messagesErreur" />
    </div>
  </Dialog>
</template>
