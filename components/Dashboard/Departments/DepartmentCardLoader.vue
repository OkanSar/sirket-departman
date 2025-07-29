<template>
  <div class="department-card skeleton">
    <v-skeleton-loader type="heading" width="120px" height="28px" style="margin-bottom: 12px;" />
    <v-skeleton-loader type="text" width="160px" height="20px" style="margin-bottom: 12px;" />
    <v-skeleton-loader type="text" width="160px" height="20px" style="margin-bottom: 12px;" />
    <v-skeleton-loader type="text" width="160px" height="20px" style="margin-bottom: 12px;" />
  </div>
</template>
<style scoped>
.department-card {
  background: #ffffff;
  padding: 1.3rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.07);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  cursor: default;
}
</style>