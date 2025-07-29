<template>
  <v-expand-transition>
    <v-card v-if="editMode" class="edit-panel fixed-edit" elevation="5" outlined shaped>
      <v-card-title class="edit-title">Kullanıcı Düzenle</v-card-title>
      <v-form @submit.prevent="emit('handleUpdate')" class="edit-form">
        <v-text-field
          v-model="form.NameSurname"
          label="Ad Soyad"
          dense
          outlined
          class="mb-3"
          required
        />
       <v-autocomplete
          v-model="form.DepartmentId"
          :items="departments ?? []"
          item-title="Name"
          item-value="Id"
          label="Departman"
          dense
          outlined
          class="mb-3"
          required
        />

        <v-row dense>
          <v-col cols="6">
            <v-btn type="submit" color="success" block rounded elevation="2">Güncelle</v-btn>
          </v-col>
          <v-col cols="5">
            <v-btn color="grey darken-1" block rounded elevation="2" @click="emit('cancelEdit')">İptal</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-expand-transition>
</template>

<script setup lang="ts">
import type { Department } from '~/types/department';

const config = useRuntimeConfig()

const { data: departments } = await useFetch<Department[]>('/api/Departments', { 
  baseURL: config.public.apiBase 
})
// Kullanıcı düzenleme form tipi
interface UserEditForm {
  Id: number | null
  NameSurname: string
  DepartmentId: number | null
}

const props = defineProps<{
  editMode: boolean
  form: UserEditForm
  departments: { Id: number; Name: string }[] | null
}>()

const emit = defineEmits<{
  (e: 'handleUpdate'): void
  (e: 'cancelEdit'): void
}>()
</script>

<style scoped>
.edit-panel {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  border: 1.8px solid #27ae60;
  box-sizing: border-box;
  height: auto;
}

.edit-title {
  color: #27ae60;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
  border-bottom: 1.5px solid #27ae60;
  padding-bottom: 0.4rem;
}

.edit-form .v-text-field {
  margin-bottom: 0.9rem;
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
