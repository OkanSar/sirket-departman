<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import type { Department } from '~/types/department'

const props = defineProps<{
  departments: Department[]
}>()

const companies = computed(() => {
  const set = new Set<string>()
  props.departments.forEach(d => {
    if (d.Company) set.add(d.Company)
  })
  return Array.from(set)
})

function totalIncome(company: string) {
  return props.departments
    .filter(d => d.Company === company)
    .reduce((sum, d) => sum + (d.Income || 0), 0)
}

function totalExpense(company: string) {
  return props.departments
    .filter(d => d.Company === company)
    .reduce((sum, d) => sum + (d.Expense || 0), 0)
}

const chartData = computed(() => ({
  labels: companies.value,
  datasets: [
    {
      label: 'Toplam Gelir',
      backgroundColor: '#27ae60',
      data: companies.value.map(c => totalIncome(c))
    },
    {
      label: 'Toplam Gider',
      backgroundColor: '#ae2727',
      data: companies.value.map(c => totalExpense(c))
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: 'Şirket Gelir ve Gider Grafiği' }
  }
}
</script>

<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>

