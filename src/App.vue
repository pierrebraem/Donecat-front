<script setup>
import { Menubar } from "primevue";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();
const items = ref([]);

const utilisateur = ref(Cookies.get("utilisateur"));

function navbar() {
  items.value = [
    {
      label: "Accueil",
      command: () => {
        router.push("/");
      },
    },
  ];
  if (utilisateur.value == undefined) {
    items.value.push({
      label: "Connexion",
      command: () => {
        router.push("/connexion");
      },
    });
  } else {
    const cookie = JSON.parse(Cookies.get("utilisateur"));
    if (cookie.status == "Administrateur") {
      items.value.push({
        label: "Gestion des utilisateurs",
        command: () => {
          router.push("/utilisateurs");
        },
      });
    }
    items.value.push(
      {
        label: "Tableau de bord",
        command: () => {
          router.push("/gestion");
        },
      },
      {
        label: "Liste des tâches",
        command: () => {
          router.push("/taches");
        },
      },
      {
        label: "Profil",
        command: () => {
          router.push("/profil");
        },
      },
      {
        label: "Deconnexion",
        command: () => {
          Cookies.remove("utilisateur");
          utilisateur.value = undefined;
          router.push("/connexion");
        },
      },
    );
  }
}

onMounted(() => {
  navbar();
});

watch(utilisateur, () => {
  navbar();
});
</script>

<template>
  <Menubar :model="items">
    <template #item="{ item, props }">
      <a v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span>{{ item.label }}</span>
      </a>
    </template>
  </Menubar>
  <router-view></router-view>
</template>
