<template>
  <div class="department-card" ref="cardRef" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <h4>{{ department.Name }}</h4>
    <p class="subtext gelir">{{ t('Income') }}: {{ formatCurrency(department.Income || 0) }}</p>
    <p class="subtext gider">{{ t('Expense') }}: {{ formatCurrency(department.Expense || 0) }}</p>
    <p class="subtext">{{ t('Company') }}: {{ department.Company || 'Bilinmiyor' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Department } from '~/types/department'
import { useI18n } from 'vue-i18n';

const { department } = defineProps<{ department: Department }>()

function formatCurrency(value: number) {
  return value.toLocaleString('tr-TR') + ' ₺'
}

const cardRef = ref<HTMLElement | null>(null)

function handleMouseMove(event: MouseEvent) {
  const card = cardRef.value
  if (!card) return

  // konum
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  //merkez
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // kartı döndürme
  const scale = 10
  const rotateX = ((y - centerY) / centerY) * scale
  const rotateY = ((x - centerX) / centerX) * scale

  card.style.transform = `
    perspective(1000px)
    rotateX(${-rotateX}deg)
    rotateY(${rotateY}deg)
  `
}

function handleMouseLeave() {
  const card = cardRef.value
  if (card) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate(0,0)'
  }
}

const { t } = useI18n()
</script>

<style scoped>
.department-card {
  background: #ffffff;
  padding: 1.3rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.07);
  transition: transform 0.1s ease, box-shadow 0.3s ease;
  cursor: default;
  will-change: transform;
}

.department-card:hover {
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.department-card h4 {
  margin: 0 0 0.7rem;
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.2rem;
  user-select: none;
  border-bottom: 2px solid #2c3e50;
  padding-bottom: 6px;
}

.department-card .subtext {
  margin: 0.25rem 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: black;
}
.department-card .gelir {
  color: #1f673d;
}
.department-card .gider {
  color: #f46565;
}
</style>
