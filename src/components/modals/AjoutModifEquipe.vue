<script setup>
import { Dialog, InputText, Select, PickList } from "primevue";
import { inferieurXCarac, verifieChampVide } from "@/utils/gestionErreurs";
import { postEquipe, putEquipe } from "@/utils/requetes/equipe";
import AfficherErreurs from "../AfficherErreurs.vue";
import Bouton from "@/components/Bouton.vue";
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
    default() {
      return undefined;
    },
  },
});

const emit = defineEmits(["update:visible", "resetModifEquipe"]);

const nom = ref("");
const selectedManager = ref("");
const selectedDevs = ref([]);

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
}

async function saveEquipe() {
  const membres = dataDevs.value[1].map((dev) => dev.id);
  messagesErreur.value = [];

  verifieErrChampsVides();

  const erreurNomTaille = inferieurXCarac(nom.value, 100, "Nom de l'équipe");
  if (erreurNomTaille) messagesErreur.value.push(erreurNomTaille);

  if (messagesErreur.value.length != 0) return;

  const body = {
    nom: nom.value,
    membres: membres,
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
  selectedDevs.value = [];

  messagesErreur.value = [];
}

function affecterValeurs() {
  const devsDejaEnregistres = [];
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
      const selectedDev = selectedDevs.value.find((id) => utilisateur.id == id);

      if (selectedDev) devsDejaEnregistres.push(objet);
      else dataDevs.value.push(objet);
    }
  }

  dataDevs.value = [dataDevs.value, devsDejaEnregistres];
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
        <PickList
          v-model="dataDevs"
          data-key="id"
          :show-source-controls="false"
          :show-target-controls="false"
        >
          <template #option="{ option }">
            {{ option.label }}
          </template>
        </PickList>
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
