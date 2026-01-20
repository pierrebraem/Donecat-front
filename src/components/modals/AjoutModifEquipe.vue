<script setup>
import { Dialog, InputText, Select } from "primevue";
import Bouton from "@/components/Bouton.vue";
import AfficherErreurs from "../AfficherErreurs.vue";
import { postEquipe, putEquipe } from "@/utils/requetes/equipe";
import { inferieurXCarac, verifieChampVide } from "@/utils/gestionErreurs";
import { ref } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  utilisateurs: {
    type: Object,
    required: true,
  },
  equipe: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["update:visible", "resetModifEquipe"]);

const nom = ref("");
const selectedManager = ref("");
const selectedDevs = ref([""]);

const dataManagers = ref([]);
const dataDevs = ref([]);

const messagesErreur = ref([]);

function chargerDonnees() {
  if (!props.equipe) return;
  ((nom.value = props.equipe.nom),
    (selectedManager.value = props.equipe.manager));
  selectedDevs.value = props.equipe.membres;
}

function verifieErrChampsVides() {
  const erreurNomVide = verifieChampVide(nom.value, "Nom de l'équipe");
  if (erreurNomVide) messagesErreur.value.push(erreurNomVide);

  const erreurManagerVide = verifieChampVide(
    selectedManager.value,
    "Manager de l'équipe",
  );
  if (erreurManagerVide) messagesErreur.value.push(erreurManagerVide);

  for (const [index, dev] of selectedDevs.value.entries()) {
    const erreurDevVide = verifieChampVide(dev, "Développeur n°" + (index + 1));
    if (erreurDevVide) messagesErreur.value.push(erreurDevVide);
  }
}

async function saveEquipe() {
  messagesErreur.value = [];

  verifieErrChampsVides();

  const erreurNomTaille = inferieurXCarac(nom.value, 100, "Nom de l'équipe");
  if (erreurNomTaille) messagesErreur.value.push(erreurNomTaille);

  if (messagesErreur.value.length != 0) return;

  const body = {
    nom: nom.value,
    membres: selectedDevs.value,
    manager: selectedManager.value,
  };

  if (!props.equipe) {
    await postEquipe(body);
  } else {
    body.id = props.equipe.id;
    await putEquipe(props.equipe.id, body);
  }

  emit("update:visible", false);
}

function resetInputs() {
  nom.value = "";
  selectedManager.value = "";
  selectedDevs.value = [""];

  messagesErreur.value = [];
}

function ajouterDevDansLeSelect() {
  selectedDevs.value.push("");
}

function supprimerDevDansLeSelect(index) {
  selectedDevs.value.splice(index, 1);
}

function affecterValeurs() {
  dataManagers.value = [];
  dataDevs.value = [];

  for (const utilisateur of props.utilisateurs) {
    const objet = {
      id: utilisateur.id,
      label: utilisateur.nom + " " + utilisateur.prenom,
    };

    if (utilisateur.status == "Manager") {
      dataManagers.value.push(objet);
      continue;
    }

    if (utilisateur.status == "Dev") {
      dataDevs.value.push(objet);
    }
  }
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :header="
      !equipe
        ? 'Création d\'une équipe'
        : 'Modification de l\'équipe : ' + equipe.nom
    "
    class="w-1/2"
    @show="
      chargerDonnees();
      affecterValeurs();
    "
    @update:visible="
      $emit('update:visible', false);
      $emit('resetModifEquipe');
    "
    @after-hide="resetInputs"
  >
    <div class="flex flex-col space-y-6">
      <div class="flex flex-col">
        <label>Nom de l'équipe :</label>
        <InputText v-model="nom" />
      </div>
      <div class="flex flex-col">
        <label>Manager de l'équipe :</label>
        <Select
          v-model="selectedManager"
          :options="dataManagers"
          option-label="label"
          option-value="id"
          empty-message="Aucun manager n'existe dans la base de données"
        />
      </div>
      <div class="flex-col space-y-6">
        <div v-for="(item, index) in selectedDevs" class="flex flex-col">
          <label>Développeur n°{{ index + 1 }} :</label>
          <div class="flex justify-between items-center space-x-2">
            <Select
              v-model="selectedDevs[index]"
              :options="dataDevs"
              option-label="label"
              option-value="id"
              class="w-full"
            />
            <span
              class="pi pi-trash"
              style="font-size: 1.3rem"
              @click="supprimerDevDansLeSelect(index)"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <Bouton
          label="Ajouter un développeur"
          severity="warn"
          @callback="ajouterDevDansLeSelect"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Bouton
          label="Annuler"
          severity="secondary"
          @callback="
            resetInputs();
            $emit('update:visible', false);
            $emit('resetModifEquipe');
          "
        />
        <Bouton
          :label="!equipe ? 'Ajouter' : 'Modifier'"
          @callback="saveEquipe()"
        />
      </div>
      <AfficherErreurs :messages-erreur="messagesErreur" />
    </div>
  </Dialog>
</template>
