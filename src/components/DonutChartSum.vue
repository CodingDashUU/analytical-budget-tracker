<script setup lang="ts">
  import type { BudgetItem } from '@/stores/app.ts'
  import type { ApexOptions } from 'apexcharts'
  import { type Ref, ref } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'
  import { useBudgetStore } from '@/stores/app.ts'
  const store = useBudgetStore()
  const series = ref([store.getIncomeSum, store.getExpenseSum])
  const chartOptions: Ref<ApexOptions> = ref({
    labels: ['Income', 'Expenses'],
    chart: {
      type: 'donut',
    },
    legend: {
      labels: {
        colors: '#ffffff',
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
      },
    },
  })
</script>

<template>
  <v-card class="chart-container">
    <VueApexCharts :options="chartOptions" :series="series" type="donut" />
  </v-card>
</template>
<style scoped>

</style>
