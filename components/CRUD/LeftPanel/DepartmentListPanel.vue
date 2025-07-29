<template>
  <v-card class="list-card" outlined shaped elevation="3">
    <v-card-title class="list-title">Departman Listesi</v-card-title>
    <v-card-text style="padding-bottom: 0;">
      <v-text-field
        :model-value="searchTerm"
        @update:modelValue="val => emit('update:searchTerm', val)"
        label="Ara..." dense outlined clearable
      />
    </v-card-text>
    <v-list two-line>
      <v-list-item v-for="dep in filteredDepartments" :key="dep.Id" class="list-item">
        <v-list-item-content>
          <v-list-item-title>{{ dep.Name }} - {{ dep.Company }} - {{ getCityNameWithCityCode(dep.CityCode) }}</v-list-item-title>
          <v-list-item-subtitle>
            <span class="income">Gelir: {{ dep.Income }}</span>&nbsp;|&nbsp;
            <span class="expense">Gider: {{ dep.Expense }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn small color="success" text @click="emit('editDepartment', dep)" class="btn-edit">Düzenle</v-btn>
          <v-btn small color="error" text @click="emit('deleteDepartment', dep.Id)" class="btn-delete">Sil</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { Department } from '~/types/department'
import { computed } from 'vue'

const props = defineProps<{
  departments: Department[] | null
  searchTerm: string
}>()

const emit = defineEmits<{
  (e: 'editDepartment', dep: Department): void
  (e: 'deleteDepartment', id: number): void
  (e: 'update:searchTerm', value: string): void
}>()

const filteredDepartments = computed(() => {
  if (!props.departments) return []
  const term = props.searchTerm.trim().toLowerCase()
  if (!term) return [...props.departments].sort((a,b)=>a.Id-b.Id)
  if (/^\d+$/.test(term)) {
    return props.departments.filter(dep => dep.Id.toString()===term).sort((a,b)=>a.Id-b.Id)
  } else {
    return props.departments.filter(dep =>
      dep.Name.toLowerCase().includes(term) || dep.Company.toLowerCase().includes(term)
    ).sort((a,b)=>a.Id-b.Id)
  }
})

const cityOptions = [
  { name: 'Adana', code: '01' },{ name: 'Adıyaman', code: '02' },
  { name: 'Afyonkarahisar', code: '03' },{ name: 'Ağrı', code: '04' },{ name: 'Amasya', code: '05' },
  { name: 'Ankara', code: '06' },{ name: 'Antalya', code: '07' },{ name: 'Artvin', code: '08' },
  { name: 'Aydın', code: '09' },{ name: 'Balıkesir', code: '10' },{ name: 'Bilecik', code: '11' },
  { name: 'Bingöl', code: '12' },{ name: 'Bitlis', code: '13' },{ name: 'Bolu', code: '14' },
  { name: 'Burdur', code: '15' },
  { name: 'Bursa', code: '16' },{ name: 'Çanakkale', code: '17' },{ name: 'Çankırı', code: '18' },
  { name: 'Çorum', code: '19' },{ name: 'Denizli', code: '20' },{ name: 'Diyarbakır', code: '21' },
  { name: 'Edirne', code: '22' },{ name: 'Elazığ', code: '23' },{ name: 'Erzincan', code: '24' },
  { name: 'Erzurum', code: '25' },{ name: 'Eskişehir', code: '26' },{ name: 'Gaziantep', code: '27' },
  { name: 'Giresun', code: '28' },{ name: 'Gümüşhane', code: '29' },{ name: 'Hakkâri', code: '30' },
  { name: 'Hatay', code: '31' },{ name: 'Isparta', code: '32' },{ name: 'Mersin', code: '33' },
  { name: 'İstanbul', code: '34' },{ name: 'İzmir', code: '35' },{ name: 'Kars', code: '36' },
  { name: 'Kastamonu', code: '37' },{ name: 'Kayseri', code: '38' },{ name: 'Kırklareli', code: '39' },
  { name: 'Kırşehir', code: '40' },{ name: 'Kocaeli', code: '41' },{ name: 'Konya', code: '42' },
  { name: 'Kütahya', code: '43' },{ name: 'Malatya', code: '44' },{ name: 'Manisa', code: '45' },
  { name: 'Kahramanmaraş', code: '46' },{ name: 'Mardin', code: '47' },{ name: 'Muğla', code: '48' },
  { name: 'Muş', code: '49' },{ name: 'Nevşehir', code: '50' },{ name: 'Niğde', code: '51' },
  { name: 'Ordu', code: '52' },{ name: 'Rize', code: '53' },{ name: 'Sakarya', code: '54' },
  { name: 'Samsun', code: '55' },{ name: 'Siirt', code: '56' },{ name: 'Sinop', code: '57' },
  { name: 'Sivas', code: '58' },{ name: 'Tekirdağ', code: '59' },{ name: 'Tokat', code: '60' },
  { name: 'Trabzon', code: '61' },{ name: 'Tunceli', code: '62' },{ name: 'Şanlıurfa', code: '63' },
  { name: 'Uşak', code: '64' },{ name: 'Van', code: '65' },{ name: 'Yozgat', code: '66' },
  { name: 'Zonguldak', code: '67' },{ name: 'Aksaray', code: '68' },{ name: 'Bayburt', code: '69' },
  { name: 'Karaman', code: '70' },{ name: 'Kırıkkale', code: '71' },{ name: 'Batman', code: '72' },
  { name: 'Şırnak', code: '73' },{ name: 'Bartın', code: '74' },{ name: 'Ardahan', code: '75' },
  { name: 'Iğdır', code: '76' },{ name: 'Yalova', code: '77' },{ name: 'Karabük', code: '78' },
  { name: 'Kilis', code: '79' },{ name: 'Osmaniye', code: '80' },{ name: 'Düzce', code: '81' }
]

const getCityNameWithCityCode = (code: string) => {
  const city = cityOptions.find(x=>x.code === code)
  return city ? city.name : code 
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