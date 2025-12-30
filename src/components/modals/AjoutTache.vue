<script setup>
import { Dialog, InputText, Select, DatePicker } from "primevue";
import { formatageDate } from "@/utils/formatageDate";
import Bouton from "@/components/Bouton.vue";
import { postTache } from "@/utils/requetes/tache";
import { statusTache } from "@/utils/statusTache";
import { inferieurXCarac, verifieChampVide } from "@/utils/gestionErreurs";
import { ref } from "vue";

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
});

const emit = defineEmits(["update:visible"]);

const status = ref(statusTache);

const utilisateurs = ref([]);
const projets = ref([]);

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

  if (messagesErreur.value.length != 0) return;

  const body = {
    nom: nomTache.value,
    description: nomTache.value,
    projet_id: selectedProjet.value,
    categorie: selectedStatus.value,
    developpeur_id: selectedDev.value,
    datefin: formatageDate(dateFin.value),
  };

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
  utilisateurs.value = props.utilisateurs;
  projets.value = props.projets;

  for (const utilisateur of utilisateurs.value) {
    utilisateur.label = utilisateur.nom + " " + utilisateur.prenom;
  }
}
</script>

<template>
  <Dialog
    :visible="visible"
    @show="affecterValeurs"
    @update:visible="$emit('update:visible', false)"
    @after-hide="resetInputs"
    modal
    header="Création d'une tâche"
    class="w-1/2"
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
        <DatePicker v-model="dateFin" date-format="dd/mm/yy" fluid />
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
        <Bouton label="Ajouter" @callback="ajouterTache()" />
      </div>
      <template v-if="messagesErreur.length != 0">
        <div class="text-red-500">
          <ul>
            <li v-for="messageErreur in messagesErreur">{{ messageErreur }}</li>
          </ul>
        </div>
      </template>
    </div>
  </Dialog>
</template>
