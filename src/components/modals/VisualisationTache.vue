<script setup>
import { ConfirmDialog, DatePicker, Dialog, InputText, Select } from "primevue";
import { deleteTache, putTache } from "@/utils/requetes/tache";
import { statusTache, traduireValeurParLabel } from "@/utils/statusTache";
import Bouton from "@/components/Bouton.vue";
import { formatageDate } from "@/utils/formatageDate";
import { getUtilisateur } from "@/utils/requetes/utilisateur";
import { getProjet } from "@/utils/requetes/projet";
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

defineEmits(["update:visible"]);

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

const status = ref(statusTache);

const listeUtilisateurs = ref([]);
const role = ref({});

const projet = ref({});
const utilisateur = ref({});
const infoTache = ref({});

const changeStatus = ref(false);
const changeNom = ref(false);
const changeDescription = ref(false);
const changeDatefin = ref(false);
const changeProjet = ref(false);
const changeDeveloppeur = ref(false);

async function getData() {
  projet.value = await getProjet(props.tache.projet_id);
  utilisateur.value = await getUtilisateur(props.tache.developpeur_id);

  infoTache.value = JSON.parse(JSON.stringify(props.tache));

  role.value = props.cookie.status;

  for (const utilisateur of props.utilisateurs) {
    listeUtilisateurs.value.push({
      id: utilisateur.id,
      label: utilisateur.nom + " " + utilisateur.prenom,
    });
  }
}

async function changerTache() {
  const body = {
    id: infoTache.value.id,
    nom: infoTache.value.nom,
    description: infoTache.value.description,
    projet_id: infoTache.value.projet_id /* eslint-disable-line camelcase */,
    categorie: infoTache.value.categorie,
    developpeur_id:
      infoTache.value.developpeur_id /* eslint-disable-line camelcase */,
    datefin: formatageDate(infoTache.value.datefin),
  };

  await putTache(props.tache.id, body);

  reset();
}

function supprimerTache(id, nom) {
  confirm.require({
    message:
      "Vous êtes sur le point de supprimer la tâche " +
      nom +
      ". Etes-vous sur de vouloir le supprier définitivement?",
    header: "Suppression de la tâche " + nom,
    rejectProps: {
      label: "Annuler",
      severity: "secondary",
    },
    acceptProps: {
      label: "Supprimer",
      severity: "danger",
    },
    accept: async () => {
      await deleteTache(id);
    },
  });
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
    modal
    :header="'Visualisation de la tâche : ' + infoTache.nom"
    class="w-1/2"
    @show="getData"
    @update:visible="$emit('update:visible', false)"
    @after-hide="reset"
  >
    <div class="flex flex-col space-y-4">
      <div
        :class="{
          'flex items-center space-x-2': changeNom,
          'hover:text-stone-500': role == 'Manager' && !changeNom,
        }"
        @click="role == 'Manager' ? (changeNom = true) : ''"
      >
        <template v-if="changeNom">
          <p>Nom :</p>
          <InputText v-model="infoTache.nom" />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Nom : {{ infoTache.nom }}</p>
        </template>
      </div>
      <div
        :class="{
          'flex items-center space-x-2': changeDescription,
          'hover:text-stone-500': role == 'Manager' && !changeDescription,
        }"
        @click="role == 'Manager' ? (changeDescription = true) : ''"
      >
        <template v-if="changeDescription">
          <p>Description :</p>
          <InputText v-model="infoTache.description" />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Description : {{ infoTache.description }}</p>
        </template>
      </div>
      <div
        :class="{
          'flex items-center space-x-2': changeProjet,
          'hover:text-stone-500': role == 'Manager' && !changeProjet,
        }"
        @click="role == 'Manager' ? (changeProjet = true) : ''"
      >
        <template v-if="changeProjet">
          <p>Projet :</p>
          <Select
            v-model="infoTache.projet_id"
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
        :class="{
          'flex items-center space-x-2': changeStatus,
          'hover:text-stone-500':
            (role == 'Manager' || cookie.id == infoTache.developpeur_id) &&
            !changeStatus,
        }"
        @click="
          role == 'Manager' || cookie.id == infoTache.developpeur_id
            ? (changeStatus = true)
            : ''
        "
      >
        <template v-if="changeStatus">
          <p>Status :</p>
          <Select
            v-model="infoTache.categorie"
            :options="status"
            option-label="label"
            option-value="value"
          />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Status : {{ traduireValeurParLabel(infoTache.categorie) }}</p>
        </template>
      </div>
      <div
        :class="{
          'flex items-center space-x-2': changeDeveloppeur,
          'hover:text-stone-500': role == 'Manager' && !changeDeveloppeur,
        }"
        @click="role == 'Manager' ? (changeDeveloppeur = true) : ''"
      >
        <template v-if="changeDeveloppeur">
          <p>Développeur :</p>
          <Select
            v-model="infoTache.developpeur_id"
            :options="listeUtilisateurs"
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
        :class="{
          'flex items-center space-x-2': changeDatefin,
          'hover:text-stone-500': role == 'Manager' && !changeDatefin,
        }"
        @click="role == 'Manager' ? (changeDatefin = true) : ''"
      >
        <template v-if="changeDatefin">
          <p>Date de fin estimé :</p>
          <DatePicker v-model="infoTache.datefin" date-format="dd/mm/yy" />
          <Bouton label="Valider" @callback="changerTache" />
        </template>
        <template v-else>
          <p>Date de fin estimé : {{ infoTache.datefin }}</p>
        </template>
      </div>
      <div class="flex justify-end gap-2">
        <Bouton
          label="Fermer"
          severity="secondary"
          @callback="$emit('update:visible', false)"
        />
        <template v-if="role == 'Manager'">
          <Bouton
            label="Supprimer"
            severity="danger"
            @callback="supprimerTache(infoTache.id, infoTache.nom)"
          />
        </template>
      </div>
    </div>
  </Dialog>
  <ConfirmDialog />
</template>
