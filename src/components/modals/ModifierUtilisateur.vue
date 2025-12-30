<script setup>
import { Dialog, InputText, Select } from "primevue";
import AfficherErreurs from "../AfficherErreurs.vue";
import { putUtilisateur } from "@/utils/requetes/utilisateur";
import { statusUtilisateur } from "@/utils/statusUtilisateur";
import {
  inferieurXCarac,
  verifieChampVide,
  verifieValiditeEmail,
} from "@/utils/gestionErreurs";
import Bouton from "@/components/Bouton.vue";
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

const status = ref(statusUtilisateur);

const nom = ref("");
const prenom = ref("");
const email = ref("");
const pseudo = ref("");
const selectedStatus = ref("");

const messagesErreur = ref([]);

function chargerDonnees() {
  nom.value = props.utilisateur.nom;
  prenom.value = props.utilisateur.prenom;
  email.value = props.utilisateur.email;
  pseudo.value = props.utilisateur.pseudo;
  selectedStatus.value = props.utilisateur.status;
}

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

async function modifierUtilisateur() {
  messagesErreur.value = [];

  verifieErrChampsVides();
  verifieErrTailleChamps();

  const erreurFormatEmail = verifieValiditeEmail(email.value);
  if (erreurFormatEmail) messagesErreur.value.push(erreurFormatEmail);

  if (messagesErreur.value.length != 0) return;

  const body = {
    id: props.utilisateur.id,
    nom: nom.value,
    prenom: prenom.value,
    email: email.value,
    pseudo: pseudo.value,
    motdepasse: props.utilisateur.motdepasse,
    status: selectedStatus.value,
  };

  await putUtilisateur(props.utilisateur.id, body);

  emit("update:visible", false);
}

function resetInputs() {
  nom.value = "";
  prenom.value = "";
  email.value = "";
  pseudo.value = "";
  selectedStatus.value = "";

  messagesErreur.value = [];
}
</script>

<template>
  <Dialog
    :visible="visible"
    @show="chargerDonnees"
    @update:visible="$emit('update:visible', false)"
    @after-hide="resetInputs"
    modal
    :header="
      'Modification de l\'utilisateur : ' +
      utilisateur.nom +
      ' ' +
      utilisateur.prenom
    "
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
        <Bouton label="Modifier" @callback="modifierUtilisateur()" />
      </div>
      <AfficherErreurs :messages-erreur="messagesErreur" />
    </div>
  </Dialog>
</template>
