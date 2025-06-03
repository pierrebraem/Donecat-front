<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import { Doughnut } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
    nomGraphe: {
        type: String,
        required: true
    },
    backlogs: {
        type: Number,
        required: true
    },
    todo: {
        type: Number,
        required: true
    },
    done: {
        type: Number,
        required: true
    }
})

const chartData = {
    labels: ['Tâches non commencées', 'Tâches en cours', 'Tâches terminées'],
    datasets: [
        {
            label: 'Progression des tâches',
            data: [props.backlogs, props.todo, props.done],
            backgroundColor: ['#FF0000', '#FFA500', '#008000']
        }
    ]
}

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Répartition des tâches pour le projet : ' + props.nomGraphe
        }
    }
}
</script>

<template>
    <Doughnut :data="chartData" :options="chartOptions" />
</template>