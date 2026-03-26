<script setup lang="ts">

  import { ref, type Ref } from 'vue'
  import { useBudgetStore } from '@/stores/app.ts'

  const { regexPattern } = defineProps<{
    regexPattern: RegExp
  }>()
  const incomeItemNameRules = ref([
    (v: string) => !!v || 'This item name is required',
    (v: string) => (v && v.length <= 25) || 'This item name must be 25 characters or less',
    (v: string) => (v.match(regexPattern) !== null || 'This item cannot contain any numbers or special symbols'),
    (v: string) => !store.incomeItems.map(i => i.name).includes(v) || 'This item already exists as an income or expense',
  ])
  const expenseItemNameRules = ref([
    (v: string) => !!v || 'This item name is required',
    (v: string) => (v && v.length <= 25) || 'This item name must be 25 characters or less',
    (v: string) => (v.match(regexPattern) !== null || 'This item cannot contain any numbers or special symbols'),
    (v: string) => !store.expenseItems.map(i => i.name).includes(v) || 'This item already exists as an income or expense',
  ])

  const incomeName: Ref<string> = ref('')
  const incomeAmount: Ref<number> = ref(1)
  const expenseName: Ref<string> = ref('')
  const expenseAmount: Ref<number> = ref(1)
  const incomeFormStatus: Ref<boolean | null> = ref(null)
  const expenseFormStatus: Ref<boolean | null> = ref(null)
  const snackbarOpened: Ref<boolean> = ref(false)
  const snackbarText: Ref<string> = ref('')
  const store = useBudgetStore()
  function onIncomeFormSubmit () {
    if (incomeFormStatus.value) {
      store.addIncomeItem(incomeName.value, incomeAmount.value)
      snackbarText.value = `Income Item ${incomeName.value} added successfully.`
      snackbarOpened.value = true
    }
  }
  function onExpenseFormSubmit () {
    if (expenseFormStatus.value) {
      store.addExpenseItem(expenseName.value, expenseAmount.value)
      snackbarText.value = `Expense Item ${expenseName.value} added successfully.`
      snackbarOpened.value = true
    }
  }
</script>

<template>
  <h3>Add Income</h3>
  <v-form ref="form" v-model="incomeFormStatus" @submit.prevent="onIncomeFormSubmit">
    <v-row>
      <v-col>
        <v-text-field
          v-model="incomeName"
          :counter="25"
          label="Income Name"
          required
          :rules="incomeItemNameRules"
          variant="outlined"
        />
      </v-col>
      <v-col>
        <v-number-input
          v-model="incomeAmount"
          control-variant="stacked"
          :hide-input="false"
          :inset="false"
          label="Income Amount"
          :max="1000000"
          :min="1"
          :precision="2"
          :reverse="false"
          :step="100"
          variant="outlined"
        />
      </v-col>
    </v-row>
    <v-btn
      block
      type="submit"
    >Add Income Item</v-btn>
  </v-form>
  <h3>Add Expenses</h3>
  <v-form ref="form" v-model="expenseFormStatus" @submit.prevent="onExpenseFormSubmit">
    <v-row>
      <v-col>
        <v-text-field
          v-model="expenseName"
          :counter="25"
          label="Expense Name"
          required
          :rules="expenseItemNameRules"
          variant="outlined"
        />
      </v-col>
      <v-col>
        <v-number-input
          v-model="expenseAmount"
          control-variant="stacked"
          :hide-input="false"
          :inset="false"
          label="Expense Amount"
          :max="1000000"
          :min="1"
          :precision="2"
          :reverse="false"
          :step="100"
          variant="outlined"
        />
      </v-col>
    </v-row>
    <v-btn
      block
      type="submit"
    >Add Expense Item</v-btn>
  </v-form>
  <v-snackbar
    v-model="snackbarOpened"
    color="green"
    prepend-icon="mdi-check"
    variant="outlined"
  >
    {{ snackbarText }}

    <template #actions>
      <v-btn
        color="grey"
        variant="text"
        @click="snackbarOpened = false"
      >
        <v-icon icon="mdi-close" />

      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
  h3 {
    font-size: 30px;
  }
</style>
