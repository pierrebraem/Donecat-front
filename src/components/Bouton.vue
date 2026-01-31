<script setup>
import { Button } from "primevue";

defineEmits("callback");

defineProps({
  label: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    default: undefined,
  },
});
</script>

<template>
  <Button
    :label="label"
    :severity="severity != undefined ? severity : 'success'"
    @click="$emit('callback')"
  />
</template>
