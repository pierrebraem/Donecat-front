import { createRouter, createWebHistory } from "vue-router";

import Accueil from "@/views/Accueil.vue";
import Connexion from "@/views/Connexion.vue";
import ChangementMDP from "@/views/ChangementMDP.vue";
import Gestion from "@/views/Gestion.vue";
import Profil from "@/views/Profil.vue";
import Taches from "@/views/Taches.vue";
import Utilisateurs from "@/views/Utilisateurs.vue";

const route = [
  { path: "/", name: "Accueil", component: Accueil },
  { path: "/connexion", name: "Connexion", component: Connexion },
  { path: "/changementMDP", name: "ChangementMDP", component: ChangementMDP },
  { path: "/gestion", name: "Gestion", component: Gestion },
  { path: "/profil", name: "Profil", component: Profil },
  { path: "/taches", name: "Taches", component: Taches },
  { path: "/utilisateurs", name: "Utilisateurs", component: Utilisateurs },
];

const router = createRouter({
  history: createWebHistory(),
  routes: route,
});

export default router;
