<script setup>
import { Card } from "primevue";

defineProps({
  projet: {
    type: Object,
    required: true,
  },
  equipe: {
    type: Object,
    required: true,
  },
  compterTaches: {
    type: Function,
    required: true,
  },
  cookie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <Card class="carte h-70">
    <template #title>{{ projet.nom }}</template>
    <template #content>
      <ul>
        <li>
          Tâches non commencées : {{ compterTaches(projet.id, "backlogs") }}
        </li>
        <li>Tâches en cours : {{ compterTaches(projet.id, "todo") }}</li>
        <li>Tâches terminées : {{ compterTaches(projet.id, "done") }}</li>
      </ul>
    </template>
    <template #footer>
      <div class="mt-auto flex justify-center gap-3">
        <template v-if="cookie.id == equipe.manager">
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
        </template>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.carte {
  color: white;
  background-color: #1a202c;
}

li {
  list-style-type: circle;
}
</style>
