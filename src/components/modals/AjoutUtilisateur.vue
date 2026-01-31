<script setup>
import { Dialog, InputText, Message, Password, Select } from "primevue";
import {
  inferieurXCarac,
  mdpIdentiques,
  verifieChampVide,
  verifieExistanceEmail,
  verifieValiditeEmail,
  verifieValiditeMdp,
} from "@/utils/gestionErreurs";
import AfficherErreurs from "../AfficherErreurs.vue";
import Bouton from "@/components/Bouton.vue";
import bcrypt from "bcryptjs";
import { postUtilisateur } from "@/utils/requetes/utilisateur";
import { ref } from "vue";
import { statusUtilisateur } from "@/utils/statusUtilisateur";

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const status = ref(statusUtilisateur);

const nom = ref("");
const prenom = ref("");
const email = ref("");
const pseudo = ref("");
const motdepasse = ref("");
const confirmerMDP = ref("");
const selectedStatus = ref("");

const messagesErreur = ref([]);

function verifieErrChampsVides() {
  const erreurNomVide = verifieChampVide(nom.value, "Nom");
  if (erreurNomVide) messagesErreur.value.push(erreurNomVide);

  const erreurPrenomVide = verifieChampVide(prenom.value, "Prenom");
  if (erreurPrenomVide) messagesErreur.value.push(erreurPrenomVide);

  const erreurEmailVide = verifieChampVide(email.value, "Adresse mail");
  if (erreurEmailVide) messagesErreur.value.push(erreurEmailVide);

  const erreurPseudoVide = verifieChampVide(pseudo.value, "Pseudo");
  if (erreurPseudoVide) messagesErreur.value.push(erreurPseudoVide);

  const erreurStatusVide = verifieChampVide(selectedStatus.value, "Status");
  if (erreurStatusVide) messagesErreur.value.push(erreurStatusVide);
}

function verifieErrTailleChamps() {
  const erreurNomTaille = inferieurXCarac(nom.value, 100, "Nom");
  if (erreurNomTaille) messagesErreur.value.push(erreurNomTaille);

  const erreurPrenomTaille = inferieurXCarac(prenom.value, 100, "Prénom");
  if (erreurPrenomTaille) messagesErreur.value.push(erreurPrenomTaille);

  const erreurEmailTaille = inferieurXCarac(email.value, 255, "Adresse mail");
  if (erreurEmailTaille) messagesErreur.value.push(erreurEmailTaille);

  const erreurPseudoTaille = inferieurXCarac(pseudo.value, 100, "Pseudo");
  if (erreurPseudoTaille) messagesErreur.value.push(erreurPseudoTaille);
}

async function ajouterUtilisateur() {
  messagesErreur.value = [];

  verifieErrChampsVides();
  verifieErrTailleChamps();

  const erreurExistEmail = await verifieExistanceEmail(email.value);
  if (erreurExistEmail) messagesErreur.value.push(erreurExistEmail);

  const erreurFormatEmail = verifieValiditeEmail(email.value);
  if (erreurFormatEmail) messagesErreur.value.push(erreurFormatEmail);

  const erreurMDPCritere = verifieValiditeMdp(motdepasse.value);
  if (erreurMDPCritere) messagesErreur.value.push(erreurMDPCritere);

  const erreurConfirmerMDP = mdpIdentiques(
    motdepasse.value,
    confirmerMDP.value,
  );
  if (erreurConfirmerMDP) messagesErreur.value.push(erreurConfirmerMDP);

  if (messagesErreur.value.length != 0) return;

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
  confirmerMDP.value = "";
  selectedStatus.value = "";

  messagesErreur.value = [];
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    header="Ajouter un utilisateur"
    class="w-1/2"
    @update:visible="$emit('update:visible', false)"
    @after-hide="resetInputs"
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
        <Message size="small" severity="secondary" variant="simple">
          Le mot de passe doit contenir au minimun 8 caractères, une majuscule,
          une minuscule, un nombre et un caractère spécial (@, !, #, ^, <, >, ?,
          $)
        </Message>
      </div>
      <div class="flex flex-col">
        <label>Confirmer mot de passe :</label>
        <Password
          v-model="confirmerMDP"
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
        <Bouton label="Ajouter" @callback="ajouterUtilisateur()" />
      </div>
      <AfficherErreurs :messages-erreur="messagesErreur" />
    </div>
  </Dialog>
</template>
