<script setup>
import { Dialog, InputText, Select } from "primevue";
import {
  inferieurXCarac,
  verifieChampVide,
  verifieExistanceEmail,
  verifieValiditeEmail,
} from "@/utils/gestionErreurs";
import AfficherErreurs from "../AfficherErreurs.vue";
import Bouton from "@/components/Bouton.vue";
import { putUtilisateur } from "@/utils/requetes/utilisateur";
import { ref } from "vue";
import { statusUtilisateur } from "@/utils/statusUtilisateur";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  utilisateur: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:visible", "callback"]);

const status = ref(statusUtilisateur);

const nom = ref("");
const prenom = ref("");
const email = ref("");
const emailOrigine = ref("");
const pseudo = ref("");
const selectedStatus = ref("");
const lastLoginTime = ref(undefined);

const messagesErreur = ref([]);

function chargerDonnees() {
  nom.value = props.utilisateur.nom;
  prenom.value = props.utilisateur.prenom;
  email.value = props.utilisateur.email;
  emailOrigine.value = props.utilisateur.email;
  pseudo.value = props.utilisateur.pseudo;
  selectedStatus.value = props.utilisateur.status;
  lastLoginTime.value = props.utilisateur.lastLoginTime;
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

  if (props.type == "Administrateur") {
    const erreurStatusVide = verifieChampVide(selectedStatus.value, "Status");
    if (erreurStatusVide) messagesErreur.value.push(erreurStatusVide);
  }
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

  if (email.value != emailOrigine.value) {
    const erreurExistEmail = await verifieExistanceEmail(email.value);
    if (erreurExistEmail) messagesErreur.value.push(erreurExistEmail);
  }

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

  if (lastLoginTime.value) body.lastLoginTime = lastLoginTime.value;

  await putUtilisateur(props.utilisateur.id, body);

  emit("callback");
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
    modal
    :header="
      type == 'Administrateur'
        ? 'Modification de l\'utilisateur : ' +
          utilisateur.nom +
          ' ' +
          utilisateur.prenom
        : 'Modification du profil'
    "
    class="w-1/2"
    @show="chargerDonnees"
    @update:visible="$emit('update:visible', false)"
    @after-hide="resetInputs"
  >
    <div class="flex flex-col space-y-6">
      <div class="flex flex-col">
        <label>Nom :</label>
        <InputText
          v-model="nom"
          name="nom"
        />
      </div>
      <div class="flex flex-col">
        <label>Prénom :</label>
        <InputText
          v-model="prenom"
          name="prenom"
        />
      </div>
      <div class="flex flex-col">
        <label>Adresse mail :</label>
        <InputText
          v-model="email"
          name="email"
        />
      </div>
      <div class="flex flex-col">
        <label>Pseudo :</label>
        <InputText
          v-model="pseudo"
          name="pseudo"
        />
      </div>
      <div
        v-if="type == 'Administrateur'"
        class="flex flex-col"
      >
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
          id="modifier-utilisateur-annuler"
          label="Annuler"
          severity="secondary"
          @callback="
            resetInputs();
            $emit('update:visible', false);
          "
        />
        <Bouton
          id="modifier-utilisateur-valider"
          label="Modifier"
          @callback="modifierUtilisateur()"
        />
      </div>
      <AfficherErreurs
        id="modifier-utilisateur-erreurs"
        :messages-erreur="messagesErreur"
      />
    </div>
  </Dialog>
</template>
