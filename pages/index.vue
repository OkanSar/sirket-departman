<template>
  <div class="dashboard">
    <TopCards :pending="pending" :companies="companies" 
    :totalIncome="totalIncome" :totalExpense="totalExpense"
    :selectedCompany="selectedCompany"
    @selectCompany="handleSelectCompany"/>
    <Departments :selectedCompany="selectedCompany" :pending="pending" :departments="departments || []" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Department } from '~/types/department'
import TopCards from '~/components/Dashboard/TopCards/TopCards.vue'
import Departments from '~/components/Dashboard/Departments/Departments.vue'

const config = useRuntimeConfig()
const { data: departmentsResponse, error } = await useFetch<any>('/api/Departments', {
  baseURL: config.public.apiBase
})

watch(error, (e) => {
  if (e) console.error('API error:', e)
})

if (error.value) {
  console.error('API Hatası:', error.value)
}

const pending = ref(true)
setTimeout(() => {
  pending.value = false
}, 3000)

const departments = computed<Department[]>(() => {
  const raw = departmentsResponse.value
  if (Array.isArray(raw)) return raw
  if (raw && Array.isArray(raw.$values)) return raw.$values
  return []
})

const companies = computed(() => {
  const set = new Set<string>()
  departments.value.forEach((d) => {
    if (d.Company) set.add(d.Company)
  })
  return Array.from(set)
})

function totalIncome(company: string) {
  return departments.value
    .filter(d => d.Company === company)
    .reduce((sum, d) => sum + (d.Income ?? 0), 0)
}

function totalExpense(company: string) {
  return departments.value
    .filter(d => d.Company === company)
    .reduce((sum, d) => sum + (d.Expense ?? 0), 0)
}

const selectedCompany = ref<string | null>(null)
function handleSelectCompany(company: string) {
  selectedCompany.value = selectedCompany.value === company ? null : company
}
</script>


<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 3rem auto;
  padding: 0 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9fafd;
  color: #2c3e50;
}
</style>
