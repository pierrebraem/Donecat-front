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
    inprogress: {
        type: Number,
        required: true
    },
    inreview: {
        type: Number,
        required: true
    },
    done: {
        type: Number,
        required: true
    }
})

const chartData = {
    labels: ['Tâches non commencées', 'Tâches à faire', 'Tâches en cours', 'Tâches en revue', 'Tâches terminées'],
    datasets: [
        {
            label: 'Progression des tâches',
            data: [props.backlogs, props.todo, props.inprogress, props.inreview, props.done],
            backgroundColor: ['#FF0000', '#0000FF', '#FFA500', '#EEC4C9', '#008000']
        }
    ]
}

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        }
    }
}
</script>

<template>
    <Doughnut :data="chartData" :options="chartOptions" />
</template>