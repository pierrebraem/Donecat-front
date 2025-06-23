<script setup>
import { Dialog, Select, InputText, DatePicker } from "primevue";
import { getUtilisateur } from "@/utils/requetes/utilisateur";
import { getProjet } from "@/utils/requetes/projet";
import { putTache } from "@/utils/requetes/tache";
import Bouton from "@/components/Bouton.vue";
import { ref } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  tache: {
    type: Object,
    required: true,
  },
  projets: {
    type: Array,
    required: true,
  },
  utilisateurs: {
    type: Array,
    required: true,
  },
  cookie: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const status = ref([
  { label: "Backlogs", value: "backlogs" },
  { label: "To do", value: "todo" },
  { label: "In Progress", value: "inprogress" },
  { label: "In Review", value: "inreview" },
  { label: "Done", value: "done" },
]);

const utilisateurs = ref([]);
const role = ref({});

const projet = ref({});
const utilisateur = ref({});
const tache = ref({});

const changeStatus = ref(false);
const changeNom = ref(false);
const changeDescription = ref(false);
const changeDatefin = ref(false);
const changeProjet = ref(false);
const changeDeveloppeur = ref(false);

async function getData() {
  projet.value = await getProjet(props.tache.projet_id);
  utilisateur.value = await getUtilisateur(props.tache.developpeur_id);

  tache.value = props.tache;

  role.value = props.cookie.status;

  for (const utilisateur of props.utilisateurs) {
    utilisateurs.value.push({
      id: utilisateur.id,
      label: utilisateur.nom + " " + utilisateur.prenom,
    });
  }
}

async function changerTache() {
  const body = {
    id: tache.value.id,
    nom: tache.value.nom,
    description: tache.value.description,
    projet_id: tache.value.projet_id,
    categorie: tache.value.categorie,
    developpeur_id: tache.value.developpeur_id,
    datefin: tache.value.datefin,
  };

  await putTache(props.tache.id, body);

  changeNom.value = false;
  changeDescription.value = false;
  changeStatus.value = false;
  changeDatefin.value = false;
  changeProjet.value = false;
  changeDeveloppeur.value = false;
}

function reset() {
  changeStatus.value = false;
  changeNom.value = false;
  changeDescription.value = false;
  changeDatefin.value = false;
  changeProjet.value = false;
  changeDeveloppeur.value = false;
}
</script>

<template>
  <Dialog
    :visible="visible"
    @show="getData"
    @update:visible="$emit('update:visible', false)"
    @after-hide="reset"
    modal
    :header="'Visualisation de la tâche : ' + tache.nom"
    class="w-1/2"
  >
    <div class="flex flex-col space-y-4">
      <div
        @click="role == 'Manager' ? (changeNom = true) : ''"
        :class="{
          'flex items-center space-x-2': changeNom,
          'hover:text-stone-500': role == 'Manager' && !changeNom,
        }"
      >
        <template v-if="changeNom">
          <p>Nom :</p>
          <InputText v-model="tache.nom" />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Nom : {{ tache.nom }}</p>
        </template>
      </div>
      <div
        @click="role == 'Manager' ? (changeDescription = true) : ''"
        :class="{
          'flex items-center space-x-2': changeDescription,
          'hover:text-stone-500': role == 'Manager' && !changeDescription,
        }"
      >
        <template v-if="changeDescription">
          <p>Description :</p>
          <InputText v-model="tache.description" />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Description : {{ tache.description }}</p>
        </template>
      </div>
      <div
        @click="role == 'Manager' ? (changeProjet = true) : ''"
        :class="{
          'flex items-center space-x-2': changeProjet,
          'hover:text-stone-500': role == 'Manager' && !changeProjet,
        }"
      >
        <template v-if="changeProjet">
          <p>Projet :</p>
          <Select
            v-model="tache.projet_id"
            :options="projets"
            option-label="nom"
            option-value="id"
          />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Projet : {{ projet.nom }}</p>
        </template>
      </div>
      <div
        @click="
          role == 'Manager' || cookie.id == tache.developpeur_id
            ? (changeStatus = true)
            : ''
        "
        :class="{
          'flex items-center space-x-2': changeStatus,
          'hover:text-stone-500':
            (role == 'Manager' || cookie.id == tache.developpeur_id) &&
            !changeStatus,
        }"
      >
        <template v-if="changeStatus">
          <p>Status :</p>
          <Select
            v-model="tache.categorie"
            :options="status"
            option-label="label"
            option-value="value"
          />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Status : {{ tache.categorie }}</p>
        </template>
      </div>
      <div
        @click="changeDeveloppeur = true"
        :class="{
          'flex items-center space-x-2': changeDeveloppeur,
          'hover:text-stone-500': role == 'Manager' && !changeDeveloppeur,
        }"
      >
        <template v-if="changeDeveloppeur">
          <p>Développeur :</p>
          <Select
            v-model="tache.developpeur_id"
            :options="utilisateurs"
            option-label="label"
            option-value="id"
          />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Développeur : {{ utilisateur.nom + " " + utilisateur.prenom }}</p>
        </template>
      </div>
      <div
        @click="role == 'Manager' ? (changeDatefin = true) : ''"
        :class="{
          'flex items-center space-x-2': changeDatefin,
          'hover:text-stone-500': role == 'Manager' && !changeDatefin,
        }"
      >
        <template v-if="changeDatefin">
          <p>Date de fin estimé :</p>
          <DatePicker v-model="tache.datefin" date-format="dd/mm/yy" />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Date de fin estimé : {{ tache.datefin }}</p>
        </template>
      </div>
      <div class="flex justify-end gap-1">
        <Bouton
          label="Fermer"
          severity="secondary"
          @callback="$emit('update:visible', false)"
        />
      </div>
    </div>
  </Dialog>
</template>
