<script setup>
import { onMounted, ref } from "vue";
import Bouton from "@/components/Bouton.vue";
import ModifierUtilisateur from "@/components/modals/ModifierUtilisateur.vue";
import ModifierMotdepasse from "@/components/modals/ModifierMotdepasse.vue";
import VisualisationAPropos from "@/components/modals/VisualisationAPropos.vue";
import { getUtilisateur } from "@/utils/requetes/utilisateur";
import { useUtilisateurStore } from "@/stores/utilisateur";
import Cookies from "js-cookie";
import { Card } from "primevue";
import { useRouter } from "vue-router";

const router = useRouter();

const utilisateurStore = useUtilisateurStore();

const visibleModifierProfil = ref(false);
const visibleModifierMotdepasse = ref(false);
const visibleModifierAPropos = ref(false);

const cookie = ref({});

const utilisateur = ref({});

async function getUserInfo() {
  utilisateur.value = await getUtilisateur(cookie.value.id);
}

onMounted(() => {
  if (Cookies.get("utilisateur") == undefined) {
    router.push("/connexion");
    return;
  }

  const mdpChange = utilisateurStore.checkIfPasswordChanged();
  if (!mdpChange) router.push("/changementMDP");

  cookie.value = JSON.parse(Cookies.get("utilisateur"));
  getUserInfo();
});
</script>

<template>
  <h1 class="text-5xl font-bold text-center">
    Profil
  </h1>

  <div class="flex justify-center">
    <Card class="w-11/12 text-xl">
      <template #content>
        <div
          id="profil-nom"
          class="flex"
        >
          <p class="font-bold">
            Nom :
          </p>
          <p>{{ utilisateur.nom }}</p>
        </div>
        <div
          id="profil-prenom"
          class="flex"
        >
          <p class="font-bold">
            Prénom :
          </p>
          <p>{{ utilisateur.prenom }}</p>
        </div>
        <div
          id="profil-email"
          class="flex"
        >
          <p class="font-bold">
            Email :
          </p>
          <p>{{ utilisateur.email }}</p>
        </div>
        <div
          id="profil-pseudo"
          class="flex"
        >
          <p class="font-bold">
            Pseudo :
          </p>
          <p>{{ utilisateur.pseudo }}</p>
        </div>
        <div
          id="profil-status"
          class="flex"
        >
          <p class="font-bold">
            Status :
          </p>
          <p>{{ utilisateur.status }}</p>
        </div>
        <div class="flex justify-center space-x-6 pt-4">
          <Bouton
            label="Modifier le profil"
            severity="warn"
            @callback="visibleModifierProfil = true"
          />
          <Bouton
            label="Modifier le mot de passe"
            severity="warn"
            @callback="visibleModifierMotdepasse = true"
          />
          <Bouton
            label="A propos de l'outil"
            severity="success"
            @callback="visibleModifierAPropos = true"
          />
        </div>
      </template>
    </Card>
  </div>

  <ModifierUtilisateur
    v-model:visible="visibleModifierProfil"
    :utilisateur="utilisateur"
    type="Utilisateur"
    @callback="getUserInfo"
  />
  <ModifierMotdepasse
    v-model:visible="visibleModifierMotdepasse"
    :utilisateur="utilisateur"
  />
  <VisualisationAPropos v-model:visible="visibleModifierAPropos" />
</template>
