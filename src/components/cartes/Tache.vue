<script setup>
import { Card } from "primevue";

const props = defineProps({
  tache: {
    type: Object,
    required: true,
  },
  utilisateurs: {
    type: Array,
    required: true,
  },
});

function formatageUtilisateur(developpeurId) {
  const utilisateur = props.utilisateurs.find(
    (item) => item.id == developpeurId,
  );
  return utilisateur.nom + " " + utilisateur.prenom;
}
</script>

<template>
  <Card class="carte">
    <template #content>
      <div class="flex flex-col space-y-2">
        <p class="font-bold">
          {{ tache.nom }}
        </p>
        <p>{{ formatageUtilisateur(tache.developpeur_id) }}</p>
        <p>Date de fin : {{ tache.datefin }}</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.carte {
  color: white;
  background-color: #1a202c;
}

.carte:hover {
  background-color: #2d3748;
}
</style>
