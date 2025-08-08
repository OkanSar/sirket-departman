<template>
  <div class="departments-section">
    <h3>{{ t('Departments') }}</h3>
    <SearchInput v-model="searchTerm" :pending="props.pending" />
    <div class="departments-grid">
      <template v-if="props.pending">
        <DepartmentCardLoader v-for="n in 6" :key="n" />
      </template>
      <template v-else>
        <DepartmentCard v-for="dep in filteredDepartments" :key="dep.Id" :department="dep"/>
        <p v-if="filteredDepartments.length === 0" class="no-result">Departman bulunamadı.</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Department } from '~/types/department'
import SearchInput from './SearchInput.vue'
import DepartmentCardLoader from './DepartmentCardLoader.vue'
import DepartmentCard from './DepartmentCard.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  pending: boolean,
  departments: Department[] | DepartmentsResponse,
  selectedCompany: string | null
}>()
interface DepartmentsResponse {
  $id: string,
  $values: Department[]
}
const searchTerm = ref('')
const filteredDepartments = computed(() => {
  const departmentsArray = Array.isArray(props.departments)
    ? props.departments
    : (props.departments?.$values ?? [])

  let filtered = departmentsArray

  if (props.selectedCompany) {
    filtered = filtered.filter((dep: Department) => dep.Company === props.selectedCompany)
  }
  if (searchTerm.value.trim()) {
    filtered = filtered.filter((dep: Department) =>
      dep.Name.toLowerCase().includes(searchTerm.value.trim().toLowerCase())
    )
  }
  return [...filtered].sort((a, b) => Number(a.Id) - Number(b.Id))
})

const { t } = useI18n()
</script>

<style scoped>
.departments-section {
  max-width: 900px;
  margin: 3rem auto 0;
  padding: 0 1rem;
}
.departments-section h3 {
  color: #27ae60;
  margin-bottom: 0.8rem;
  font-weight: 800;
  font-size: 1.7rem;
  border-left: 6px solid #27ae60;
  padding-left: 10px;
  user-select: none;
}
.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.25rem;
}
.no-result {
  grid-column: 1 / -1;
  text-align: center;
  font-weight: 600;
  color: #999;
  padding: 1rem 0;
}
</style>