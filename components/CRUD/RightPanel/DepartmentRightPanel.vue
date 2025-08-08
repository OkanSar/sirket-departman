<template>
  <v-card class="add-card" elevation="4" outlined shaped>
    <v-card-title class="add-title">{{ t('Add New Department') }}</v-card-title>
    <v-form @submit.prevent="handleAdd" ref="addForm" class="add-form">
      <v-text-field v-model="formAdd.Name" :label="t('Department')" dense outlined class="mb-4" required/>
      <v-text-field v-model.number="formAdd.Income" :label="t('Income')" type="number" dense outlined class="mb-4" required/>
      <v-text-field v-model.number="formAdd.Expense" :label="t('Expense')" type="number" dense outlined class="mb-4" required/>
      <v-autocomplete v-model="formAdd.Company" :items="['Emay','TeknoCo']" :label="t('Company')" dense outlined class="mb-6" required/>
      <v-autocomplete v-model="formAdd.CityCode" :items="cityOptions" item-title="name" item-value="code" :label="t('City')" dense outlined class="mb-6" required/>
      <v-btn type="submit" color="success" block rounded elevation="3" height="42">
        {{ t('Add') }}
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const props = defineProps<{
  initialForm: {
    Name: string
    Income: number
    Expense: number
    Company: string
    CityCode: string
  }
}>()

const emit = defineEmits<{
  (e: 'handleAdd', form: { Name: string; Income: number; Expense: number; Company: string, CityCode:string }): void
}>()

const formAdd = ref({ ...props.initialForm })

const handleAdd = () => {
  emit('handleAdd', formAdd.value)
  formAdd.value = { Name: '', Income: 0, Expense: 0, Company: '',CityCode:''}
}

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
