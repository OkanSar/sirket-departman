<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Bar } from 'vue-chartjs'
import type { Department } from '~/types/department'

const props = defineProps<{
  departments: Department[]
}>()

const chartData = computed(() => ({
  labels: props.departments.map(d => d.Name),
  datasets: [
    {
      label: 'Gelir',
      backgroundColor: '#2980b9',
      data: props.departments.map(d => d.Income || 0)
    },
    {
      label: 'Gider',
      backgroundColor: '#c0392b',
      data: props.departments.map(d => d.Expense || 0)
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Departman Gelir ve Gider Grafiği' }
  }
}
</script>

<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>