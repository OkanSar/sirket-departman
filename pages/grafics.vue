<template>
  <div style="max-width: 900px; margin: 2rem auto;">
    <h1>{{ t('Graphics') }}</h1>
    <div v-if="pending">
      <CompanyGraficLoading />
      <DepartmentGraficLoading />
    </div>
    <div v-else>
      <CompanyGrafic :departments="departments || []" />
      <DepartmentGrafic :departments="departments || []" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Department } from '~/types/department'
import CompanyGrafic from '~/components/Grafics/CompanyGrafic.vue'
import CompanyGraficLoading from '~/components/Grafics/CompanyGraficLoading.vue'
import DepartmentGrafic from '~/components/Grafics/DepartmentGrafic.vue'
import DepartmentGraficLoading from '~/components/Grafics/DepartmentGraficLoading.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const config = useRuntimeConfig()
const { data: departments, error } = await useFetch<Department[]>('/api/Departments', {
  baseURL: config.public.apiBase
})
if (error.value) {
  console.error('API Hatası:', error.value)
}
const pending = ref(true)
setTimeout(() => { pending.value = false }, 3000)
</script>

<style scoped>
h1 {
  color: #27ae60;
  margin-bottom: 1.2rem;
  font-weight: 800;
  font-size: 1.7rem;
  border-left: 6px solid #27ae60;
  padding-left: 10px;
}
</style>