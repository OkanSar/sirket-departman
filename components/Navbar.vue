<template>
  <nav class="navbar">
    <div class="container">
      <NuxtLink to="/" class="brand">Gelir Yönetim</NuxtLink>

      <button
        class="toggle-btn"
        @click="toggleMenu"
        :aria-expanded="menuOpen.toString()"
        aria-label="Toggle navigation"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <ul :class="['nav-links', { open: menuOpen }]">
        <li><NuxtLink to="/map" class="nav-link" @click="closeMenu">Harita</NuxtLink></li>
        <li><NuxtLink to="/grafics" class="nav-link" @click="closeMenu">Grafikler</NuxtLink></li>
        <li><NuxtLink to="/users" class="nav-link" @click="closeMenu">Çalışanlar</NuxtLink></li>
        <li><NuxtLink to="/crud" class="nav-link" @click="closeMenu">Departman İşlem</NuxtLink></li>
        <li><NuxtLink to="/about" class="nav-link" @click="closeMenu">Hakkında</NuxtLink></li>

        <!-- Dil Seçimi Dropdown -->
        <li>
          <select @change="changeLocale($event)" :value="currentLocale" aria-label="Dil seçimi">
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

// i18n composable
const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

function changeLocale(event) {
  locale.value = event.target.value
  closeMenu()
}
</script>

<style scoped>
/* Aynı CSS */
.navbar {
  background: white;
  border-bottom: 1px solid #ddd;
  padding: 1rem 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-weight: 700;
  font-size: 1.25rem;
  color: #198754;
  text-decoration: none;
}

.toggle-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.toggle-btn:focus {
  outline: 2px solid #198754;
  outline-offset: 2px;
}

.bar {
  width: 100%;
  height: 3px;
  background-color: #198754;
  border-radius: 2px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #198754;
  font-weight: 500;
}

.nav-link:hover,
.nav-link:focus {
  text-decoration: underline;
}

select {
  border: 1px solid #198754;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  background: white;
  color: #198754;
  font-weight: 600;
  cursor: pointer;
}
</style>
