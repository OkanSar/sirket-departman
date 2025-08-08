<template>
  <v-container class="crud-container" fluid>
    <div class="header">
      <h2>{{ t('User Operations') }}</h2>
    </div>

    <v-row no-gutters>
      <UserLeftPanel 
        :users="users" 
        :departments="departments"
        :editMode="editMode"
        :form="editForm"
        :searchTerm="searchTerm"
        @editUser="editUser"
        @deleteUser="deleteUser"
        @handleUpdate="handleUpdate"
        @cancelEdit="cancelEdit"
        @update:searchTerm="(val: string) => searchTerm = val"
      />

      
      <v-col cols="12" md="4" class="right-panel">
        <UserRightPanel 
          :initialForm="addForm"
          :departments="departments ?? []"
          @handleAdd="handleAdd"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '../types/user.ts'
import UserLeftPanel from '~/components/Users/LeftPanel/UserLeftPanel.vue'
import UserRightPanel from '~/components/Users/RightPanel/UsersRightPanel.vue'
import type { Department } from '@prisma/client'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const searchTerm = ref('')

// Ortak config
const config = useRuntimeConfig()

// Kullanıcı verilerini çek
const { data: users, error, refresh } = await useFetch<User[]>('/api/Users', {
  baseURL: config.public.apiBase
})

const { data: departments } = await useFetch<Department[]>('/api/Departments', { 
  baseURL: config.public.apiBase 
})

if (error.value) {
  console.error('API Hatası:', error.value)
}

// Düzenleme formu
const editForm = ref<{
  Id: number | null
  NameSurname: string
  DepartmentId: number | null
}>({
  Id: null,
  NameSurname: '',
  DepartmentId: null
})

const addForm = ref<{
  NameSurname: string
  DepartmentId: number | null
}>({
  NameSurname: '',
  DepartmentId: null
})

const editMode = ref(false)

// Düzenleme modunu aç
const editUser = (user: User) => {
  editForm.value = {
    Id: user.Id,
    NameSurname: user.NameSurname,
    DepartmentId: user.DepartmentId
  }
  editMode.value = true
}

// Düzenleme modunu iptal et
const cancelEdit = () => {
  editForm.value = {
    Id: null,
    NameSurname: '',
    DepartmentId: null
  }
  editMode.value = false
}

const handleUpdate = async () => {
  if (!editForm.value.Id) return

  await fetch(`${config.public.apiBase}/api/Users/${editForm.value.Id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nameSurname: editForm.value.NameSurname,
      departmentId: editForm.value.DepartmentId
    })
  })

  await refresh()
  cancelEdit()
}

// Yeni kullanıcı ekleme
const handleAdd = async (formData: { NameSurname: string; DepartmentId: number | null }) => {
  await fetch(`${config.public.apiBase}/api/Users`, {
    method: 'POST', // Backend PUT bekliyorsa, değilse POST yapabilirsin
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  await refresh()
  addForm.value = {
    NameSurname: '',
    DepartmentId: null
  }
}

const deleteUser = async (id: number) => {
  if (!confirm('Kullanıcıyı silmek istediğine emin misin?')) return
  await fetch(`${config.public.apiBase}/api/Users/${id}`, {
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

.v-row {
  gap: 2.5rem;
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}

.v-col {
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important;
}
</style>
