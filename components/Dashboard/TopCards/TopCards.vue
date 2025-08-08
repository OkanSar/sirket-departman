<template>
  <div class="top-cards">
    <template v-if="pending">
        <CompanyCardLoading v-for="n in companies" :key="n" />
    </template>
    <template v-else>
        <CompanyCard v-for="company in companies" :key="company" 
        :company="company" :totalIncome="totalIncome" :totalExpense="totalExpense"
        :isSelected="selectedCompany === company" @select="selectCompany" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import CompanyCard from '~/components/Dashboard/TopCards/CompanyCard.vue'
import CompanyCardLoading from '~/components/Dashboard/TopCards/TopCardsLoading.vue'

const props = defineProps<{
  pending: boolean
  companies: string[]
  totalIncome: (company: string) => number
  totalExpense: (company: string) => number
  selectedCompany: string | null
}>()

const emit = defineEmits<{ (e: 'selectCompany', company: string): void }>()

function selectCompany(company: string) {
  emit('selectCompany', company)
}
</script>
<style scoped>
.top-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}
</style>
