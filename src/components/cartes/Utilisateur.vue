<script setup>
import Bouton from "@/components/Bouton.vue";
import { Card } from "primevue";

defineEmits("modifier", "supprimer");

defineProps({
  utilisateur: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <Card class="carte">
    <template #content>
      <div class="flex flex-col space-y-2">
        <p class="font-bold">
          {{ utilisateur.nom.toUpperCase() }} {{ utilisateur.prenom }}
        </p>
        <p>{{ utilisateur.email }}</p>
        <p>{{ utilisateur.status }}</p>
      </div>
      <div class="flex justify-end gap-2">
        <Bouton
          label="Modifier"
          severity="warn"
          @callback="$emit('modifier')"
        />
        <Bouton
          label="Supprimer"
          severity="danger"
          @callback="$emit('supprimer')"
        />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.carte {
  color: white;
  background-color: #1a202c;
}
</style>
