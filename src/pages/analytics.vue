<script setup lang="ts">
  import type { BudgetItem } from '@/stores/app.ts'
  import DonutChart from '@/components/DonutChart.vue'
  import DonutChartSum from '@/components/DonutChartSum.vue'
  import { useBudgetStore } from '@/stores/app.ts'
  const store = useBudgetStore()

  const chartMapping: Array<{ itemArr: Array<BudgetItem>, title: string }> = [
    { itemArr: store.incomeItems, title: 'Income Distribution' },
    { itemArr: store.expenseItems, title: 'Expense Distribution' },
  ]
  console.log(store.getVerdict)
  const cardMapping: Array<{ value: number, title: string }> = [
    { value: store.getIncomeAverage, title: 'Average Income Amount' },
    { value: store.getIncomeMin, title: 'Lowest Income Amount' },
    { value: store.getIncomeMax, title: 'Highest Income Amount' },
    { value: store.getExpenseAverage, title: 'Average Expense Cost' },
    { value: store.getExpenseMin, title: 'Lowest Expense Cost' },
    { value: store.getExpenseMax, title: 'Highest Expense Cost' },
  ]

</script>

<template>
  <v-row gap="16">
    <v-col
      cols="12"
      sm="3"
    >
      <v-card class="card2" variant="elevated">
        <template #title>
          <h4>{{ chartMapping[0].title }}</h4>
        </template>
        <DonutChart :item-array="chartMapping[0].itemArr" />
      </v-card>
      <v-card class="card2" variant="elevated">
        <template #title>
          <h4>Income + Expense Distribution</h4>
        </template>
        <DonutChartSum />
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="3"
    >
      <v-card class="card" variant="elevated">
        <template #title>
          <h4>{{ cardMapping[0].title }}</h4>
        </template>
        <h1> {{ cardMapping[0].value.toFixed(2) }} </h1>
      </v-card>
      <v-card class="card" variant="elevated">
        <template #title>
          <h4>{{ cardMapping[1].title }}</h4>
        </template>
        <h1> {{ cardMapping[1].value.toFixed(2) }} </h1>
      </v-card>
      <v-card class="card" variant="elevated">
        <template #title>
          <h4>{{ cardMapping[2].title }}</h4>
        </template>
        <h1> {{ cardMapping[2].value.toFixed(2) }} </h1>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      sm="3"
    >
      <v-card class="card2" variant="elevated">
        <template #title>
          <h4>{{ chartMapping[1].title }}</h4>
        </template>
        <DonutChart :item-array="chartMapping[1].itemArr" />
      </v-card>
      <v-card class="card2" variant="elevated">
        <template #title>
          <h4>VERDICT</h4>
        </template>
        <h3 id="income-total"> Income: {{ store.getIncomeSum }} </h3>
        <h3 id="expense-total"> Expenses: {{ store.getExpenseSum }} </h3>
        <h2 :style="{ color: store.getVerdict.color, fontSize: '40px', textAlign: 'center' }"> Take Home: {{ store.getVerdict.value }} </h2>
        <h2 :style="{ color: store.getVerdict.color, fontSize: '40px', textAlign: 'center' }"> {{ store.getVerdict.text }} </h2>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="card" variant="elevated">
        <template #title>
          <h4>{{ cardMapping[3].title }}</h4>
        </template>
        <h1> {{ cardMapping[3].value.toFixed(2) }} </h1>
      </v-card>
      <v-card class="card" variant="elevated">
        <template #title>
          <h4>{{ cardMapping[4].title }}</h4>
        </template>
        <h1> {{ cardMapping[4].value.toFixed(2) }} </h1>
      </v-card>
      <v-card class="card" variant="elevated">
        <template #title>
          <h4>{{ cardMapping[5].title }}</h4>
        </template>
        <h1> {{ cardMapping[5].value.toFixed(2) }} </h1>
      </v-card>
    </v-col>

  </v-row>
</template>

<style scoped>
  h1 {
    font-size: 60px;
    text-align: center;
  }
  h3 {
    font-size: 30px;
    text-align: center;
  }
  h4 {
    text-align: center;
    font-size: 20px
  }
  .card {
    height: 33.33vh
  }
  .card2 {
    height: 50.01vh
  }
  #income-total {
    color: green
  }
  #expense-total {
    color: red
  }

</style>
