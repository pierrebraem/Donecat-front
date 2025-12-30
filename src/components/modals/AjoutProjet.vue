<script setup>
import { Dialog, InputText, Select } from "primevue";
import Bouton from "@/components/Bouton.vue";
import { postProjet } from "@/utils/requetes/projet";
import { verifieChampVide, inferieurXCarac } from "@/utils/gestionErreurs";
import { ref } from "vue";

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  equipes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const nom = ref("");
const selectedEquipe = ref("");

const messagesErreur = ref([]);

function verifieErrChampsVides() {
  const erreurNomVide = verifieChampVide(nom.value, "Nom du projet");
  if (erreurNomVide) messagesErreur.value.push(erreurNomVide);

  const erreurSelectEquipeVide = verifieChampVide(
    selectedEquipe.value,
    "Equipe à affecter au projet",
  );
  if (erreurSelectEquipeVide) messagesErreur.value.push(erreurSelectEquipeVide);
}

async function ajouterProjet() {
  messagesErreur.value = [];

  verifieErrChampsVides();

  const erreurNomTaille = inferieurXCarac(nom.value, 100, "Nom du projet");
  if (erreurNomTaille) messagesErreur.value.push(erreurNomTaille);

  if (messagesErreur.value.length != 0) return;

  const body = {
    nom: nom.value,
    equipe_id: selectedEquipe.value,
  };

  await postProjet(body);

  emit("update:visible", false);
}

function resetInputs() {
  nom.value = "";
  selectedEquipe.value = "";

  messagesErreur.value = [];
}
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="$emit('update:visible', false)"
    @after-hide="resetInputs"
    modal
    header="Création d'un projet"
    class="w-1/2"
  >
    <div class="flex flex-col space-y-6">
      <div class="flex flex-col">
        <label>Nom du projet :</label>
        <InputText v-model="nom" />
      </div>
      <div class="flex flex-col">
        <label>Equipe à affecter au projet :</label>
        <Select
          v-model="selectedEquipe"
          :options="equipes"
          option-label="nom"
          option-value="id"
          empty-message="Vous n'êtes affectés à aucune équipe en tant que manager"
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
        <Bouton label="Ajouter" @callback="ajouterProjet()" />
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
