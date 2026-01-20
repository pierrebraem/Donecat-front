<script setup>
const props = defineProps({
  messagesErreur: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <template v-if="messagesErreur.length != 0">
    <div class="text-red-500">
      <ul>
        <li v-for="messageErreur in messagesErreur">
          {{ messageErreur }}
        </li>
      </ul>
    </div>
  </template>
</template>
