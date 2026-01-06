<script setup>
import { Card, ConfirmDialog } from "primevue";
import { useConfirm } from "primevue/useconfirm";
import { useUtilisateurStore } from "@/stores/utilisateur";
import AjoutModifEquipe from "@/components/modals/AjoutModifEquipe.vue";
import AjoutModifProjet from "@/components/modals/AjoutModifProjet.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import Equipe from "@/components/cartes/Equipe.vue";
import Bouton from "@/components/Bouton.vue";
import Chargement from "@/components/Chargement.vue";
import { getTaches } from "@/utils/requetes/tache";
import { getProjets, deleteProjet } from "@/utils/requetes/projet";
import { getEquipes, deleteEquipe } from "@/utils/requetes/equipe";
import { getUtilisateurs } from "@/utils/requetes/utilisateur";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();

const utilisateurStore = useUtilisateurStore();

const confirm = useConfirm();

const cookie = ref({});

const visibleEquipe = ref(false);
const visibleProjet = ref(false);

const chargement = ref(true);

const equipes = ref([]);
const utilisateurs = ref([]);
const projets = ref([]);
const taches = ref([]);

const equipeActuelPourModification = ref(undefined);
const projetActuelPourModification = ref(undefined);

function compterTaches(id, type) {
  return taches.value.filter(
    (item) => item.categorie == type && item.projet_id == id,
  ).length;
}

function totalTaches(id) {
  return taches.value.filter((item) => item.projet_id == id).length;
}

function montrerEquipesEtProjetsEnFonctionDeLutilisateur() {
  if (cookie.value.status != "Administrateur") {
    equipes.value = equipes.value.filter(
      (item) =>
        item.membres.find((item2) => item2 == cookie.value.id) ||
        item.manager == cookie.value.id,
    );
    const newProjets = [];

    for (const item of equipes.value) {
      newProjets.push(
        projets.value.filter((projet) => projet.equipe_id == item.id),
      );
    }
    projets.value = newProjets.flat();
  }
}

function trouverNomEquipe(id) {
  return equipes.value.find((item) => item.id == id).nom;
}

function supprimerEquipe(id, nom) {
  confirm.require({
    message:
      "Vous êtes sur le point de supprimer l'équipe " +
      nom +
      ". Etes-vous sur de vouloir le supprimer définitivement?",
    header: "Suppression de l'équipe " + nom,
    rejectProps: {
      label: "Annuler",
      severity: "secondary",
    },
    acceptProps: {
      label: "Supprimer",
      severity: "danger",
    },
    accept: async () => {
      await deleteEquipe(id);
    },
  });
}

function supprimerProjet(id, nom) {
  confirm.require({
    message:
      "Vous êtes sur le point de supprimer le projet " +
      nom +
      ". Etes-vous sur de vouloir le supprimer définitivement?",
    header: "Suppresion du projet " + nom,
    rejectProps: {
      label: "Annuler",
      severity: "secondary",
    },
    acceptProps: {
      label: "Supprimer",
      severity: "danger",
    },
    accept: async () => {
      await deleteProjet(id);
    },
  });
}

onMounted(async () => {
  if (Cookies.get("utilisateur") == undefined) {
    router.push("/connexion");
    return;
  }

  const mdpChange = utilisateurStore.checkIfPasswordChanged();
  if (!mdpChange) router.push("/changementMDP");

  cookie.value = JSON.parse(Cookies.get("utilisateur"));
  equipes.value = await getEquipes();
  utilisateurs.value = await getUtilisateurs();
  projets.value = await getProjets();
  taches.value = await getTaches();
  montrerEquipesEtProjetsEnFonctionDeLutilisateur();

  chargement.value = false;
});
</script>

<template>
  <template v-if="chargement">
    <Chargement />
  </template>
  <template v-else>
    <div class="pt-4 flex flex-col space-y-6">
      <div class="flex justify-between w-full">
        <div>
          <p>Bienvenue {{ cookie.nom }}</p>
        </div>
        <div class="flex pr-4">
          <template v-if="cookie.status == 'Manager'">
            <Bouton label="Créer un projet" @callback="visibleProjet = true" />
          </template>
          <template v-if="cookie.status == 'Administrateur'">
            <Bouton
              label="Créer une équipe"
              severity="info"
              @callback="visibleEquipe = true"
            />
          </template>
        </div>
      </div>

      <div class="flex justify-center">
        <Card class="w-full overflow-x-auto">
          <template #content>
            <div class="flex space-x-2">
              <template v-if="equipes.length == 0">
                <p>Aucune équipe enregistrée</p>
              </template>
              <template v-else>
                <template v-for="equipe in equipes">
                  <Equipe
                    :equipe="equipe"
                    :utilisateurs="utilisateurs"
                    :cookie="cookie"
                    @modifier="
                      equipeActuelPourModification = equipe;
                      visibleEquipe = true;
                    "
                    @supprimer="supprimerEquipe(equipe.id, equipe.nom)"
                  />
                </template>
              </template>
            </div>
          </template>
        </Card>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div v-for="projet in projets">
          <Card class="w-full h-full">
            <template #title>
              <div class="flex justify-between">
                <div>
                  <p class="text-xl font-bold">{{ projet.nom }}</p>
                </div>
                <div class="flex space-x-4" v-if="cookie.status == 'Manager'">
                  <span
                    class="pi pi-pencil"
                    style="font-size: 1.3rem"
                    @click="
                      projetActuelPourModification = projet;
                      visibleProjet = true;
                    "
                  />
                  <span
                    class="pi pi-trash"
                    style="font-size: 1.3rem"
                    @click="supprimerProjet(projet.id, projet.nom)"
                  />
                </div>
              </div>
            </template>
            <template #content>
              <p>
                Equipe auquelle le projet est associé :
                {{ trouverNomEquipe(projet.equipe_id) }}
              </p>
              <div class="w-3/4">
                <template v-if="totalTaches(projet.id) != 0">
                  <DoughnutChart
                    :nom-graphe="projet.nom"
                    :backlogs="compterTaches(projet.id, 'backlogs')"
                    :todo="compterTaches(projet.id, 'todo')"
                    :inprogress="compterTaches(projet.id, 'inprogress')"
                    :inreview="compterTaches(projet.id, 'inreview')"
                    :done="compterTaches(projet.id, 'done')"
                  />
                </template>
                <template v-else>
                  <p class="text-center p-4">
                    Il n'existe aucune tâche pour ce projet.
                  </p>
                </template>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <AjoutModifEquipe
      v-model:visible="visibleEquipe"
      :utilisateurs="utilisateurs"
      :equipe="equipeActuelPourModification"
      @reset-modif-equipe="equipeActuelPourModification = undefined"
    />

    <AjoutModifProjet
      v-model:visible="visibleProjet"
      :equipes="equipes"
      :projet="projetActuelPourModification"
      @reset-modif-projet="projetActuelPourModification = undefined"
    />

    <ConfirmDialog />
  </template>
</template>
