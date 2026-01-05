<script setup>
import { Card, Password, Message } from "primevue";
import { useUtilisateurStore } from "@/stores/utilisateur";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Bouton from "@/components/Bouton.vue";
import AfficherErreurs from "@/components/AfficherErreurs.vue";
import { getUtilisateur, putUtilisateur } from "@/utils/requetes/utilisateur";
import { mdpIdentiques, verifieValiditeMdp } from "@/utils/gestionErreurs";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";

const router = useRouter();

const utilisateurStore = useUtilisateurStore();

const nouveauMDP = ref("");
const confirmerMDP = ref("");

const messagesErreur = ref([]);

const cookie = ref({});

const utilisateur = ref({});

async function changerMDP() {
  messagesErreur.value = [];

  const erreurConfirmerMDP = mdpIdentiques(
    nouveauMDP.value,
    confirmerMDP.value,
  );
  if (erreurConfirmerMDP) messagesErreur.value.push(erreurConfirmerMDP);

  const erreurMDPCritere = verifieValiditeMdp(nouveauMDP.value);
  if (erreurMDPCritere) messagesErreur.value.push(erreurMDPCritere);

  if (messagesErreur.value.length != 0) return;

  const hash = bcrypt.hashSync(nouveauMDP.value);

  const date = new Date();

  const body = {
    id: utilisateur.value.id,
    nom: utilisateur.value.nom,
    prenom: utilisateur.value.prenom,
    email: utilisateur.value.email,
    pseudo: utilisateur.value.pseudo,
    motdepasse: hash,
    status: utilisateur.value.status,
    lastLoginTime: date,
  };

  utilisateurStore.utilisateur.lastLoginTime = date;
  Cookies.set("utilisateur", JSON.stringify(utilisateurStore.utilisateur), {
    expires: 1,
  });

  await putUtilisateur(utilisateur.value.id, body);

  //router.push("/gestion");
}

onMounted(async () => {
  if (Cookies.get("utilisateur") == undefined) {
    router.push("/connexion");
    return;
  }

  const mdpChange = utilisateurStore.checkIfPasswordChanged();
  if (mdpChange) router.push("/gestion");

  cookie.value = JSON.parse(Cookies.get("utilisateur"));
  utilisateur.value = await getUtilisateur(cookie.value.id);
});
</script>

<template>
  <div class="flex justify-center">
    <Card class="w-11/12">
      <template #title>
        <h1 class="text-3xl font-bold text-center">Changer de mot de passe</h1>
      </template>
      <template #content>
        <p class="text-center">
          Il semble que c'est la première fois que vous vous connecter sur
          l'application.
        </p>
        <p class="text-center">
          Pour des raisons de sécurité, nous vous invitons à changer de mot de
          passe.
        </p>

        <div class="flex flex-col justify-center items-center pt-12 space-y-6">
          <div class="flex flex-col w-3/4">
            <label>Nouveau mot de passe :</label>
            <Password
              v-model="nouveauMDP"
              :feedback="false"
              toggle-mask
              :style="{ width: '100%' }"
              :input-style="{ width: '100%' }"
            />
            <Message size="small" severity="secondary" variant="simple"
              >Le mot de passe doit contenir au minimun 8 caractères, une
              majuscule, une minuscule, un nombre et un caractère spécial (@, !,
              #, ^, <, >, ?, $)</Message
            >
          </div>
          <div class="flex flex-col w-3/4">
            <label>Confirmer nouveau mot de passe :</label>
            <Password
              v-model="confirmerMDP"
              :feedback="false"
              toggle-mask
              :style="{ width: '100%' }"
              :input-style="{ width: '100%' }"
            />
          </div>

          <div class="pt-6">
            <Bouton label="Confirmer" @callback="changerMDP" />
          </div>
        </div>

        <AfficherErreurs :messages-erreur="messagesErreur" />
      </template>
    </Card>
  </div>
</template>
