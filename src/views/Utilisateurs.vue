<script setup>
import { Card, ConfirmDialog } from "primevue";
import { useConfirm } from "primevue/useconfirm";
import { useUtilisateurStore } from "@/stores/utilisateur";
import AjoutUtilisateur from "@/components/modals/AjoutUtilisateur.vue";
import modifierUtilisateur from "@/components/modals/ModifierUtilisateur.vue";
import Bouton from "@/components/Bouton.vue";
import Utilisateur from "@/components/cartes/Utilisateur.vue";
import Chargement from "@/components/Chargement.vue";
import {
  getUtilisateursSansAdmin,
  deleteUtilisateur,
} from "@/utils/requetes/utilisateur";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();

const confirm = useConfirm();

const utilisateurStore = useUtilisateurStore();

const visibleAjoutUtilisateur = ref(false);
const visibleModifierUtilisateur = ref(false);

const chargement = ref(true);

const utilisateurs = ref([]);
const utilisateurActuelPourModification = ref({});

const cookie = ref({});

function supprimerUtilisateur(id, nom, prenom) {
  confirm.require({
    message:
      "Vous êtes sur le point de supprimer l'utilisateur " +
      nom +
      " " +
      prenom +
      ". Etes-vous sur de vouloir le supprimer définitivement?",
    header: "Suppression de l'utilisateur " + nom + " " + prenom,
    rejectProps: {
      label: "Annuler",
      severity: "secondary",
    },
    acceptProps: {
      label: "Supprimer",
      severity: "danger",
    },
    accept: async () => {
      await deleteUtilisateur(id);
    },
  });
}

onMounted(async () => {
  if (Cookies.get("utilisateur") == undefined) {
    router.push("/connexion");
    return;
  }

  cookie.value = JSON.parse(Cookies.get("utilisateur"));
  if (cookie.value.status != "Administrateur") {
    router.push("/gestion");
    return;
  }

  const mdpChange = utilisateurStore.checkIfPasswordChanged();
  if (!mdpChange) router.push("/changementMDP");

  utilisateurs.value = await getUtilisateursSansAdmin();
  chargement.value = false;
});
</script>

<template>
  <template v-if="chargement">
    <Chargement />
  </template>
  <template v-else>
    <div class="pt-4 flex flex-col space-y-6">
      <div class="flex justify-end pr-4">
        <Bouton
          label="Créer un utilisateur"
          severity="info"
          @callback="visibleAjoutUtilisateur = true"
        />
      </div>
      <div class="flex justify-center">
        <Card class="w-11/12">
          <template #content>
            <template v-if="utilisateurs.length == 0">
              <p class="text-center">Aucun utilisateur enregistré</p>
            </template>
            <template v-else>
              <div class="flex flex-col space-y-2">
                <template v-for="utilisateur in utilisateurs">
                  <Utilisateur
                    :utilisateur="utilisateur"
                    @modifier="
                      utilisateurActuelPourModification = utilisateur;
                      visibleModifierUtilisateur = true;
                    "
                    @supprimer="
                      supprimerUtilisateur(
                        utilisateur.id,
                        utilisateur.nom.toUpperCase(),
                        utilisateur.prenom,
                      )
                    "
                  />
                </template>
              </div>
            </template>
          </template>
        </Card>
      </div>
    </div>

    <AjoutUtilisateur v-model:visible="visibleAjoutUtilisateur" />
    <modifierUtilisateur
      v-model:visible="visibleModifierUtilisateur"
      :utilisateur="utilisateurActuelPourModification"
    />
    <ConfirmDialog />
  </template>
</template>
