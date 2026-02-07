<script setup>
import { DatePicker, Dialog, InputText, Select } from "primevue";
import {
  inferieurXCarac,
  utilisateurAssocieeAuProjet,
  verifieChampVide,
} from "@/utils/gestionErreurs";
import AfficherErreurs from "../AfficherErreurs.vue";
import Bouton from "@/components/Bouton.vue";
import { formatageDate } from "@/utils/formatageDate";
import { postTache } from "@/utils/requetes/tache";
import { ref } from "vue";
import { statusTache } from "@/utils/statusTache";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  utilisateurs: {
    type: Array,
    required: true,
  },
  projets: {
    type: Array,
    required: true,
  },
  equipes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const status = ref(statusTache);
const nomTache = ref("");
const selectedDev = ref("");
const selectedStatus = ref("");
const selectedProjet = ref("");
const dateFin = ref("");

const messagesErreur = ref([]);

function verifieErrChampsVides() {
  const erreurNomVide = verifieChampVide(nomTache.value, "Nom de la tâche");
  if (erreurNomVide) messagesErreur.value.push(erreurNomVide);

  const erreurDevVide = verifieChampVide(
    selectedDev.value,
    "Nom du développeur",
  );
  if (erreurDevVide) messagesErreur.value.push(erreurDevVide);

  const erreurProjetVide = verifieChampVide(
    selectedProjet.value,
    "Projet affecté",
  );
  if (erreurProjetVide) messagesErreur.value.push(erreurProjetVide);

  const erreurStatusVide = verifieChampVide(selectedStatus.value, "Status");
  if (erreurStatusVide) messagesErreur.value.push(erreurStatusVide);

  const erreurDateVide = verifieChampVide(dateFin.value, "Date de fin");
  if (erreurDateVide) messagesErreur.value.push(erreurDateVide);
}

async function ajouterTache() {
  messagesErreur.value = [];

  verifieErrChampsVides();

  const erreurNomTaille = inferieurXCarac(
    nomTache.value,
    100,
    "Nom de la tâche",
  );
  if (erreurNomTaille) messagesErreur.value.push(erreurNomTaille);

  const erreurAssocieeUtilProjet = utilisateurAssocieeAuProjet(
    selectedProjet.value,
    selectedDev.value,
    props.equipes,
    props.projets,
  );
  if (erreurAssocieeUtilProjet)
    messagesErreur.value.push(erreurAssocieeUtilProjet);

  if (messagesErreur.value.length != 0) return;

  /* eslint-disable camelcase */
  const body = {
    nom: nomTache.value,
    description: nomTache.value,
    projet_id: selectedProjet.value,
    categorie: selectedStatus.value,
    developpeur_id: selectedDev.value,
    datefin: formatageDate(dateFin.value),
  };
  /* eslint-enable camelcase */

  await postTache(body);

  emit("update:visible", false);
}

function resetInputs() {
  nomTache.value = "";
  selectedDev.value = "";
  selectedStatus.value = "";
  selectedProjet.value = "";
  dateFin.value = "";

  messagesErreur.value = [];
}

function affecterValeurs() {
  for (const utilisateur of props.utilisateurs) {
    utilisateur.label = utilisateur.nom + " " + utilisateur.prenom;
  }
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    header="Création d'une tâche"
    class="w-1/2"
    @show="affecterValeurs"
    @update:visible="$emit('update:visible', false)"
    @after-hide="resetInputs"
  >
    <div class="flex flex-col space-y-6">
      <div class="flex flex-col">
        <label>Nom de la tâche :</label>
        <InputText v-model="nomTache" />
      </div>
      <div class="flex flex-col">
        <label>Nom du développeur :</label>
        <Select
          v-model="selectedDev"
          :options="utilisateurs"
          option-label="label"
          option-value="id"
        />
      </div>
      <div class="flex flex-col">
        <label>Projet affecté :</label>
        <Select
          v-model="selectedProjet"
          :options="projets"
          option-label="nom"
          option-value="id"
        />
      </div>
      <div class="flex flex-col">
        <label>Status :</label>
        <Select
          v-model="selectedStatus"
          :options="status"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="flex flex-col">
        <label>Date de fin :</label>
        <DatePicker
          v-model="dateFin"
          date-format="dd/mm/yy"
          fluid
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
          @callback="ajouterTache()"
        />
      </div>
      <AfficherErreurs :messages-erreur="messagesErreur" />
    </div>
  </Dialog>
</template>
