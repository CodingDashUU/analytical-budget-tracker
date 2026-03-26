<script setup lang="ts">

  import type { BudgetItem } from '@/stores/app.ts'
  import type { ApexOptions } from 'apexcharts'
  import { type Ref, ref } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'

  const props = defineProps<{
    itemArray: Array<BudgetItem>
  }>()
  const series = ref(props.itemArray.map(i => i.amount))
  const chartOptions: Ref<ApexOptions> = ref({
    labels: props.itemArray.map(i => i.name),
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
    <VueApexCharts :options="chartOptions" :series="series" type="donut"/>
  </v-card>
</template>

<style scoped>
</style>
