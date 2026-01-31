<script setup>
import { Card, InputText, Password } from "primevue";
import { onMounted, ref } from "vue";
import Bouton from "@/components/Bouton.vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { useUtilisateurStore } from "@/stores/utilisateur";

const router = useRouter();

const utilisateurStore = useUtilisateurStore();

const email = ref("");
const password = ref("");
const isEmailPasswordInvalid = ref(false);

async function login() {
  const success = await utilisateurStore.login(email.value, password.value);

  if (!success) {
    isEmailPasswordInvalid.value = true;
  } else {
    const mdpChange = utilisateurStore.checkIfPasswordChanged();
    if (!mdpChange) {
      router.push("/changementMDP");
    } else {
      router.push("/gestion");
    }
  }
}

onMounted(() => {
  if (Cookies.get("utilisateur") != undefined) {
    router.push("/");
    return;
  }
});
</script>

<template>
  <div class="flex justify-center">
    <Card class="w-11/12">
      <template #title>
        <h1 class="text-3xl font-bold text-center">Connexion</h1>
      </template>
      <template #content>
        <div class="flex flex-col justify-center items-center pt-12 space-y-6">
          <div class="flex flex-col w-60">
            <label>Adresse mail :</label>
            <InputText v-model="email" />
          </div>

          <div class="flex flex-col">
            <label>Mot de passe :</label>
            <Password
              v-model="password"
              :feedback="false"
              toggle-mask
              :style="{ width: '100%' }"
              :input-style="{ width: '100%' }"
            />
          </div>

          <div class="pt-8">
            <Bouton label="Connexion" @callback="login" />
          </div>

          <div v-if="isEmailPasswordInvalid" class="pt-6">
            <p class="text-red-500">Adresse mail ou mot de passe incorrect</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
