<template>
  <v-col cols="12" md="7" class="left-panel">
    <EditUserPanel 
      :editMode="editMode" 
      :form="form" 
      @handleUpdate="emit('handleUpdate')" 
      @cancelEdit="emit('cancelEdit')" 
    />
    <UserListPanel 
  :users="users" 
  :searchTerm="searchTerm"
  :departments="departments"
  :form="form"
  @editUser="user => emit('editUser', user)"
  @deleteUser="id => emit('deleteUser', id)"
  @update:searchTerm="val => emit('update:searchTerm', val)"
/>

  </v-col>
</template>

<script setup lang="ts">
import type { Department } from '@prisma/client';
import EditUserPanel from './UserEditPanel.vue'
import UserListPanel from './UserListPanel.vue'
import type { User } from '~/types/user'

const props = defineProps<{
  users: User[] | null
  departments: Department[] | null
  editMode: boolean
  form: { Id: number | null; NameSurname: string; DepartmentId: number | null }
  searchTerm: string
}>()

const emit = defineEmits<{
  (e: 'editUser', user: User): void
  (e: 'deleteUser', id: number): void
  (e: 'handleUpdate'): void
  (e: 'cancelEdit'): void
  (e: 'update:searchTerm', value: string): void
}>()
</script>

<style scoped>
.left-panel,
.right-panel {
  padding: 0.5rem; 
}
</style>
