<template>
  <nav class="navbar">
    <div class="container">
      <!-- URL prefix otomatik uygulanır -->
      <NuxtLink :to="localePath('/')" class="brand">
        {{ t('Income / Expense') }}
      </NuxtLink>

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
        <li>
          <NuxtLink :to="localePath('/map')" class="nav-link" @click="closeMenu">
            {{ t('Map') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/grafics')" class="nav-link" @click="closeMenu">
            {{ t('Graphics') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/users')" class="nav-link" @click="closeMenu">
            {{ t('Users') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/crud')" class="nav-link" @click="closeMenu">
            {{ t('Crud') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localePath('/about')" class="nav-link" @click="closeMenu">
            {{ t('About') }}
          </NuxtLink>
        </li>

        <!-- Dil Seçici -->
        <li class="locale-switcher">
          <a
            href="#"
            v-for="loc in locales"
            :key="loc.code"
            @click.prevent="changeLocale(loc.code)"
            :class="{ active: currentLocale === loc.code }"
          >
            {{ loc.code === 'tr' ? 'Türkçe' : 'English' }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath, useSwitchLocalePath } from '#i18n'
import { useRouter } from 'vue-router'
const { t, locale, locales } = useI18n()
const router = useRouter()

const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const menuOpen = ref(false)
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
function closeMenu() {
  menuOpen.value = false
}

const currentLocale = computed(() => locale.value)  

function changeLocale(code) {
  const path = switchLocalePath(code)
  if (path) {
    router.push(path)
  }
}
</script>

<style scoped>
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
.locale-switcher a {
  padding: 4px 8px;
  text-decoration: none;
  color: #198754;
  font-weight: 500;
}
.locale-switcher a.active {
  background: #198754;
  color: white;
  border-radius: 4px;
}
</style>
