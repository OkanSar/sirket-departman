<template>
  <v-container class="crud-container" fluid>
    <div class="header">
      <h2>{{ t('Department Operations') }}</h2>
    </div>

    <v-row no-gutters>
      <DepartmentLeftPanel :departments="departments" :editMode="editMode" 
      :form="form" :searchTerm="searchTerm" @editDepartment="editDepartment" 
      @deleteDepartment="deleteDepartment" @handleUpdate="handleUpdate" @cancelEdit="cancelEdit" 
      @update:searchTerm="val => searchTerm = val"/>
      <v-col cols="12" md="4" class="right-panel">
      <DepartmentRightPanel :initialForm="formAdd" @handleAdd="handleAdd"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DepartmentLeftPanel from '~/components/CRUD/LeftPanel/DepartmentLeftPanel.vue'
import DepartmentRightPanel from '~/components/CRUD/RightPanel/DepartmentRightPanel.vue'
import type { Department } from '~/types/department'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const searchTerm = ref('')

const config = useRuntimeConfig()

const { data: departments, error, refresh } = await useFetch<Department[]>('/api/Departments', {
  baseURL: config.public.apiBase
})

if (error.value) {
  console.error('API Hatası:', error.value)
}

const form = ref({
  Id: null as number | null,
  Name: '',
  Income: 0,
  Expense: 0,
  Company: '',
  CityCode: ''
})
const editMode = ref(false)

const formAdd = ref({
  Name: '',
  Income: 0,
  Expense: 0,
  Company: '',
  CityCode: ''
})

// Düzenleme işlemini başlatır, form verilerini doldurur
const editDepartment = (dep: Department) => {
  form.value = { ...dep }
  editMode.value = true
}

// Düzenleme modu iptal form temizleme
const cancelEdit = () => {
  editMode.value = false
  form.value = {
    Id: null,
    Name: '',
    Income: 0,
    Expense: 0,
    Company: '',
    CityCode: ''
  }
}

// Güncelleme API refresh edit mod iptali
const handleUpdate = async () => {
  if (form.value.Id === null) return
  await fetch(`${config.public.apiBase}/api/Departments/${form.value.Id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      income: form.value.Income,
      expense: form.value.Expense,
      company: form.value.Company,
      cityCode: form.value.CityCode
    })
  })
  await refresh()
  cancelEdit()
}

// Yeni departman ekleme
const handleAdd = async (formData: { Name: string, Income: number, Expense: number, Company: string, CityCode:string }) => {
  await fetch(`${config.public.apiBase}/api/Departments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  await refresh()
  formAdd.value = {
    Name: '',
    Income: 0,
    Expense: 0,
    Company: '',
    CityCode: ''
  }
}

const deleteDepartment = async (id: number) => {
  if (!confirm('Departmanı silmek istediğine emin misin?')) return
  await fetch(`${config.public.apiBase}/api/Departments/${id}`, {
    method: 'DELETE'
  })
  await refresh()
}
</script>


<style scoped>
.crud-container {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 1rem 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9fafd;
  color: #ecf0f1;
  border-radius: 12px;
}

.header h2 {
  font-weight: 800;
  font-size: 1.9rem;
  color: #27ae60;
  margin-bottom: 1.5rem;
  user-select: none;
  border-left: 7px solid #27ae60;
  padding-left: 8px;
}

.fixed-edit {
  max-height: 500px;
  margin-bottom: 1rem;
}

.edit-panel,
.list-card,
.add-card {
  background-color: #ffff;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  border: 1.8px solid #27ae60;
  box-sizing: border-box;
  height: 100%;
}

.edit-title,
.list-title,
.add-title {
  color: #27ae60;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
  border-bottom: 1.5px solid #27ae60;
  padding-bottom: 0.4rem;
}

.list-item {
  border-radius: 8px !important;
  margin-bottom: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.07);
  transition: transform 0.1s ease, box-shadow 0.3s ease;
  transition: background-color 0.25s ease;
  cursor: default;
  margin: 1rem 1rem 1rem 1rem;
}

.list-item:hover {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.list-item-title {
  font-weight: 600;
  color: #ecf0f1;
}

.list-item-subtitle {
  color: #bdc3c7;
  font-size: 0.9rem;
}

.list-item .v-list-item-action > button {
  text-transform: none !important;
  font-weight: 600 !important;
  min-width: 72px;
  border-radius: 6px !important;
  box-shadow: none !important;
  transition: background-color 0.3s ease !important;
}

.list-item .v-list-item-action > button:hover {
  box-shadow: 0 0 6px 1px #27ae60 !important;
}

.edit-form .v-text-field,
.add-form .v-text-field {
  margin-bottom: 0.9rem;
}

.add-form .v-text-field:last-child {
  margin-bottom: 1.2rem;
}

.btn-primary,
.btn-success {
  background-color: #27ae60 !important;
  color: white !important;
}

.btn-primary:hover,
.btn-success:hover {
  background-color: #219150 !important;
}

.list-card,
.add-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100%;
}

.list-card {
  max-height: 520px;
  overflow-y: auto;
}
.v-row {
  gap: 2.5rem;
}
.v-row {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.v-col {
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important;
}
.btn-edit, .btn-delete{
    margin-top: 10px;
}
.income{
    color: #219150;
    font-weight: 600;
}
.expense{
    color: #f46565;
    font-weight: 600;
}
</style>
