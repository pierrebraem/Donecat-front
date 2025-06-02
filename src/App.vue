<script setup>
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import { ref } from "vue";

const text = ref("")
</script>

<template>
    <h1 class="text-3xl font-bold underline">Hello World!</h1>
    <div class="flex flex-col space-y-2">
      <InputText v-model="text" class="w-30" />
      <Button label="Verify" severity="info" class="w-16" />
    </div>
    <p>{{ text }}</p>
</template>
