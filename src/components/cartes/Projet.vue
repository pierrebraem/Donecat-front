<script setup>
import { Card } from "primevue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";

const props = defineProps({
  projet: {
    type: Object,
    required: true,
  },
  equipes: {
    type: Array,
    required: true,
  },
  taches: {
    type: Array,
    required: true,
  },
  cookie: {
    type: Object,
    required: true,
  },
});

function trouverNomEquipe(id) {
  return props.equipes.find((item) => item.id == id).nom;
}

function compterTaches(id, type) {
  return props.taches.filter(
    (item) => item.categorie == type && item.projet_id == id,
  ).length;
}

function totalTaches(id) {
  return props.taches.filter((item) => item.projet_id == id).length;
}
</script>

<template>
  <Card class="w-full h-full">
    <template #title>
      <div class="flex justify-between">
        <div>
          <p class="text-xl font-bold">
            {{ projet.nom }}
          </p>
        </div>
        <div v-if="cookie.status == 'Manager'" class="flex space-x-4">
          <span
            class="pi pi-pencil"
            style="font-size: 1.3rem"
            @click="$emit('modifier')"
          />
          <span
            class="pi pi-trash"
            style="font-size: 1.3rem"
            @click="$emit('supprimer')"
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
</template>

<style scoped>
li {
  list-style-type: circle;
}
</style>
