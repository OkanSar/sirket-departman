<template>
  <v-card class="list-card" outlined shaped elevation="3">
    <v-card-title class="list-title">{{ t('User List') }}</v-card-title>
    <v-card-text style="padding-bottom: 0;">
      <v-text-field
        :model-value="searchTerm"
        @update:modelValue="val => emit('update:searchTerm', val)"
        :label="t('Search')+'...'" dense outlined clearable
      />
    </v-card-text>
    <v-list two-line>
      <v-list-item v-for="user in filteredUsers" :key="user.Id" class="list-item">
        <v-list-item-content>
          <v-list-item-title>{{ user.NameSurname }}</v-list-item-title>
          <v-list-item-subtitle>{{ t('Department') }}: {{ getDepartmentName(user.DepartmentId)}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ t('User') }} ID: {{ user.Id ?? 'Belirtilmemiş' }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn :departments="departments" small color="success" text @click="emit('editUser', user)" class="btn-edit">{{ t('Edit') }}</v-btn>
          <v-btn small color="error" text @click="emit('deleteUser', user.Id)" class="btn-delete">{{ t('Delete') }}</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { User } from '~/types/user'
import { computed } from 'vue'
import type { Department } from '~/types/department';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const props = defineProps<{
  users: User[] | null
  departments: Department[] | null
  searchTerm: string
  form: {Id:number | null; NameSurname: string; DepartmentId: number | null}
}>()


const getDepartmentName = (id: number | null) => {
  if (!id) return 'Belirtilmemiş'
  const dep = props.departments?.find(d => {
    return (d.Id ?? d.Id) === id
  })

  console.log('bulunan dep:', dep)
  return dep ? (dep.Name ?? dep.Name) : 'Belirtilmemiş'
}

const emit = defineEmits<{
  (e: 'editUser', user: User): void
  (e: 'deleteUser', id: number): void
  (e: 'update:searchTerm', value: string): void
}>()

const filteredUsers = computed(() => {
  if (!props.users) return []
  const term = props.searchTerm.trim().toLowerCase()
  if (!term) return [...props.users].sort((a, b) => a.Id - b.Id)
  if (/^\d+$/.test(term)) {
    return props.users.filter(user => user.Id.toString() === term).sort((a, b) => a.Id - b.Id)
  } else {
    return props.users.filter(user =>
      user.NameSurname.toLowerCase().includes(term)
    ).sort((a, b) => a.Id - b.Id)
  }
})
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
</style>
