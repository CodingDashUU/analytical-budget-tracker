<script lang="ts" setup>
  import BudgetInfoForm from '@/components/BudgetInfoForm.vue'
  import BudgetItemInputForm from '@/components/BudgetItemInputForm.vue'
  const regexPattern = new RegExp('^[a-zA-Z ]+$')
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>Budget Tracker</h1>
    </header>
    <BudgetInfoForm :regex-pattern="regexPattern" />
    <BudgetItemInputForm :regex-pattern="regexPattern" />
  </div>
</template>

<style scoped>
  h1 {
    font-size: 60px;
  }
</style>
