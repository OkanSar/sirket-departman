<template>
  <div class="search-container">
    <template v-if="pending">
      <v-skeleton-loader type="text" width="860px" height="34px" class="search-loader" />
    </template>
    <template v-else>
      <input
        :value="modelValue"
        @input="updateValue"
        :disabled="pending"
        type="text"
        placeholder="Departman adı ara..."
        class="search-input"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  pending: boolean,
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
<style scoped>
.search-container {
  margin-bottom: 1rem;
  max-width: 860px;
}

.search-loader {
  position: static !important;
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 34px;
  border-radius: 8px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 1rem;
  border: 2px solid #27ae60;
  border-radius: 8px;
  outline-offset: 2px;
}
.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #27ae60;
}

.search-loader {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 860px;
  height: 34px;
  border-radius: 8px;
  padding-top: 0.1px;
}
</style>
