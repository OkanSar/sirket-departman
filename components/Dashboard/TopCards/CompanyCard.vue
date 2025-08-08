<template>
  <div class="company-card">
    <div class="header">
      <small class="label">{{ t('Company') }}</small>
      <h2 class="company-name">{{ company }}</h2>
      <button type="button" class="show-departments-btn" @click="emit('select', company)">
        <i class="fa-solid fa-folder-tree"></i>
      </button>
    </div>
    <div class="stats">
      <div class="stat">
        <span class="title">{{ t('Total Income') }}: </span>
        <span class="value gelir">{{ formattedIncome }} ₺</span>
      </div>
      <div class="stat">
        <span class="title">{{ t('Total Expense') }}: </span>
        <span class="value gider">{{ formattedExpense }} ₺</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  company: string
  totalIncome: (company: string) => number
  totalExpense: (company: string) => number
  isSelected: boolean
}>()

const emit = defineEmits<{ (e: 'select', company: string): void }>()

const formattedIncome = computed(() =>
  props.totalIncome(props.company).toLocaleString('tr-TR')
)

const formattedExpense = computed(() =>
  props.totalExpense(props.company).toLocaleString('tr-TR')
)

const { t } = useI18n()
</script>


<style scoped>
.company-card {
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
}

.company-card:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.label {
  font-size: 0.8rem;
  color: #4caf50;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-decoration: underline;
}

.company-name {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
  user-select: none;
}

.stats {
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 0.6rem;
}

.stat {
  font-weight: 600;
  font-size: 1rem;
  color: #555;
}

.title {
  font-size: 0.85rem;
  color: #999;
  display: block;
}

.value {
  font-size: 1.3rem;
  font-weight: 700;
  min-width: 120px;
}
.gelir{
  color: #1f673d;
}
.gider{
  color: #f46565;
}
.show-departments-btn {
  align-items: center;
  background: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s ease;
  max-width: 30px;
}

.show-departments-btn:hover {
  background: #1a252f;
}
</style>
