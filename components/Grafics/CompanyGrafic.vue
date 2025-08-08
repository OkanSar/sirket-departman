<script setup lang="ts">
import { ref, watch, onMounted, defineProps, computed } from 'vue'
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
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps<{
  departments: Department[]
}>()

// Şirketleri hesaplayan computed
const companies = computed(() => {
  const set = new Set<string>()
  props.departments.forEach(d => {
    if (d.Company) set.add(d.Company)
  })
  return Array.from(set)
})

// Gelir ve gider hesaplayan fonksiyonlar
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

// Chart Data ve Options'u reactive ref() ile tanımlıyoruz
const chartData = ref({
  labels: [] as string[],
  datasets: [] as any[]
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: '' }
  }
})

// Chart verisini güncelleyen fonksiyon
function updateChart() {
  chartData.value = {
    labels: companies.value,
    datasets: [
      {
        label: t('Total Income'),
        backgroundColor: '#27ae60',
        data: companies.value.map(c => totalIncome(c))
      },
      {
        label: t('Total Expense'),
        backgroundColor: '#ae2727',
        data: companies.value.map(c => totalExpense(c))
      }
    ]
  }

  chartOptions.value.plugins.title.text = t('Company Income and Expense Chart')
}

onMounted(updateChart)
watch([locale, companies, () => props.departments], updateChart)
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
