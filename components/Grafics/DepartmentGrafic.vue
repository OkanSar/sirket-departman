<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Bar } from 'vue-chartjs'
import type { Department } from '~/types/department'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const props = defineProps<{
  departments: Department[]
}>()

const chartData = computed(() => ({
  labels: props.departments.map(d => d.Name),
  datasets: [
    {
      label: t('Income'),
      backgroundColor: '#2980b9',
      data: props.departments.map(d => d.Income || 0)
    },
    {
      label: t('Expense'),
      backgroundColor: '#c0392b',
      data: props.departments.map(d => d.Expense || 0)
    }
  ]
}))

const chartOptions = computed(() =>({
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: t('Company Income and Expense Chart')}
  }
}))
</script>

<template>
    <Bar :data="chartData" :options="chartOptions" />
</template>