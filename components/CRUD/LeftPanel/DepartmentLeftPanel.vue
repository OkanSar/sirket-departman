<template>
  <v-col cols="12" md="7" class="left-panel">
    <DepartmentEditPanel :editMode="editMode" :form="form" @handleUpdate="emit('handleUpdate')" 
    @cancelEdit="emit('cancelEdit')"/>
    <DepartmentListPanel :departments="departments" :searchTerm="searchTerm"
      @editDepartment="dep => emit('editDepartment', dep)"
      @deleteDepartment="id => emit('deleteDepartment', id)" 
      @update:searchTerm="val => emit('update:searchTerm', val)"/>
  </v-col>
</template>

<script setup lang="ts">
import DepartmentEditPanel from './DepartmentEditPanel.vue'
import DepartmentListPanel from './DepartmentListPanel.vue'
import type { Department } from '~/types/department'

const props = defineProps<{
  departments: Department[] | null
  editMode: boolean
  form: { Id: number | null, Name: string, Income: number, Expense: number, Company: string , CityCode:string }
  searchTerm: string
}>()

const emit = defineEmits<{
  (e: 'editDepartment', dep: Department): void
  (e: 'deleteDepartment', id: number): void
  (e: 'handleUpdate'): void
  (e: 'cancelEdit'): void
  (e: 'update:searchTerm', value: string): void
}>()
</script>
<style scoped>
.left-panel,
.right-panel {
  padding: 0.4rem; 
}
</style>
