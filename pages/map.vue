<template>
  <div class="harita">
    <div class="infoPanel">
      <h2 style="color: #198754; margin-bottom: 20px;" :title="selectedRegion">
        <template v-if="pending || isLoading">
          <v-skeleton-loader type="heading" width="300px" />
        </template>
        <template v-else>
          {{ selectedRegion }}
        </template>
      </h2>
      <template v-if="pending || isLoading">
        <v-skeleton-loader
          v-for="n in 4"
          :key="n"
          type="card"
          class="mb-5"
          max-width="100%"
          height="100px"
        />
      </template>
      <template v-else-if="departments.length">
        <div v-for="(dep, i) in departments" :key="i" class="card">
          <h3>{{ dep.Name }}</h3>
          <p class="gelir"><strong>{{ t('Income') }}:</strong> {{ dep.Income.toLocaleString() }} ₺</p>
          <p class="gider"><strong>{{ t('Expense') }}:</strong> {{ dep.Expense.toLocaleString() }} ₺</p>
          <p><strong>{{ t('Company') }}:</strong> {{ dep.Company }}</p>
        </div>
      </template>
      <template v-else>
        <template v-if="selectedRegion">
          <p>Bu ile ait kayıtlı departman yok.</p>
        </template>
        <template v-else>
          <h2 style="color: #198754;">Lütfen Bir İl Seçiniz</h2>
        </template>
      </template>
    </div>
    <div class="turkey_map" id="vmap"></div>
  </div>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const selectedRegion = ref('')
const departments = ref([])
const isLoading = ref(false)
const pending = ref(true)
setTimeout(() => {
  pending.value = false
}, 3000)
const config = useRuntimeConfig()

const { error } = await useFetch('/api/Departments', {
  baseURL: config.public.apiBase
})

watch(error, (e) => {
  if (e) console.error('API error:', e)
})

if (error.value) {
  console.error('API Hatası:', error.value)
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  if (!window.jQuery) {
    await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js')
  }

  if (!document.querySelector('link[href="/jqvmap/jqvmap.min.css"]')) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/jqvmap/jqvmap.min.css'
    document.head.appendChild(link)
  }

  await loadScript('/jqvmap/jquery.vmap.min.js')
  await loadScript('/jqvmap/maps/jquery.vmap.turkey.js')

  window.jQuery('#vmap').vectorMap({
    map: 'turkey_tr',
    backgroundColor: '#ebebeb',
    borderColor: '#198754',
    borderOpacity: 1,
    borderWidth: 1,
    color: '#fcdede',
    enableZoom: true,
    hoverColor: '#fc8888',
    values: {},
    scaleColors: ['#FFFFFF', '#FF0000'],
    normalizeFunction: 'polynomial',
    selectedColor: '#fcaaa4',
    showTooltip: true,

    onRegionClick: async function (event, code, region) {
      try {
        selectedRegion.value = region
        isLoading.value = true

        const { data, error } = await useFetch(`/api/Departments/bycity/${code}`, {
          baseURL: config.public.apiBase
        })

        if (error.value) {
          console.error("API Hatası:", error.value)
          departments.value = []
        } else {
          departments.value = data.value
        }

      } catch (err) {
        console.error("API hatası:", err)
        departments.value = []
      } finally {
        isLoading.value = false
      }
    }
  })
})
</script>


<style scoped>
.harita {
  display: flex;
  justify-content: space-between;
}

.infoPanel {
  float: left;
  width: 40%;
  height: 91.7vh;
  border: 1px solid #198754;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: #f9f9f9;
}

/* Şık kart stili */
.card {
  background: #ffffff;
  border: 1px solid #ddd;
  border-left: 4px solid #198754;
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.card h3 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #198754;
}

.card p {
  margin: 4px 0;
  font-size: 14px;
  color: #333;
}

.turkey_map {
  width: 60%;
  height: 91.7vh;
}

.infoPanel .card .gelir {
  color: #1f673d;
  font-weight: 600;
}
.infoPanel .card .gider {
  color: #f46565;
  font-weight: 600;
}
</style>
