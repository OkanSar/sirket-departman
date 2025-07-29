<template>
  <div class="company-card">
    <v-skeleton-loader type="heading" width="220px" height="100px" style="margin-top: 15px;" />
    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px; margin-left: 100px;">
      <v-skeleton-loader type="text" width="180px" height="30px" />
      <v-skeleton-loader type="text" width="180px" height="30px" />
    </div>
  </div>
</template>
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
</style>