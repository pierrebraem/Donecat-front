<script setup>
import { Button } from 'primevue'

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    severity: {
        type: String
    }
})
</script>

<template>
    <Button :label="label" :severity="severity != undefined ? severity : 'success'" @click="$emit('callback')"/>
</template>