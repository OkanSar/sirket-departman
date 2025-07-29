<template>
  <v-card class="add-card" elevation="4" outlined shaped>
    <v-card-title class="add-title">Yeni Kullanıcı Ekle</v-card-title>
    <v-form @submit.prevent="handleAdd" ref="addForm" class="add-form">
      <v-text-field 
        v-model="formAdd.NameSurname" 
        label="Ad Soyad" 
        dense 
        outlined 
        class="mb-4" 
        required 
      />
      <v-autocomplete
        v-model="formAdd.DepartmentId"
        :items="props.departments"
        item-title="Name"
        item-value="Id"
        label="Departman Seç"
        dense
        outlined
        clearable
        class="mb-4"
        required
      />

      <v-btn type="submit" color="success" block rounded elevation="3" height="42">
        Ekle
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialForm: {
    NameSurname: string
    DepartmentId: number | null
  },
  departments: { id: number; name:string }[] 
}>()

const emit = defineEmits<{
  (e: 'handleAdd', form: { NameSurname: string; DepartmentId: number | null }): void
}>()

const formAdd = ref({ ...props.initialForm })

const handleAdd = () => {
  emit('handleAdd', formAdd.value)
  formAdd.value = { NameSurname: '', DepartmentId: null }
}

</script>

<style scoped>
.add-card {
  background-color: #ffff;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  border: 1.8px solid #27ae60;
  box-sizing: border-box;
  height: 100%;
}

.add-title {
  color: #27ae60;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  text-align: center;
  border-bottom: 1.5px solid #27ae60;
  padding-bottom: 0.4rem;
}

.add-form .v-text-field {
  margin-bottom: 0.9rem;
}

.add-form .v-text-field:last-child {
  margin-bottom: 1.2rem;
}

.btn-success {
  background-color: #27ae60 !important;
  color: white !important;
}

.btn-success:hover {
  background-color: #219150 !important;
}
</style>
