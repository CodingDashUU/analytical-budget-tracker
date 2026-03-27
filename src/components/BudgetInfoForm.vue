<script setup lang="ts">
  import { type Ref, ref } from 'vue'
  import { Months, useBudgetStore } from '@/stores/app.ts'
  const { regexPattern } = defineProps<{
    regexPattern: RegExp
  }>()
  const nameRules = ref([
    (v: string) => !!v || 'Your name is required',
    (v: string) => (v && v.length <= 20 && v.length >= 3) || 'Your name must be 3 - 20 characters',
    (v: string) => (v.match(regexPattern) !== null || 'Your name cannot contain any numbers or special symbols'),
  ])
  const Years: Array<string> = []
  for (let i = 2000; i < 2051; i++) Years.push(i.toString())
  const store = useBudgetStore()
  const personName: Ref<string> = ref('')
  const formStatus: Ref<boolean | null> = ref(null)
  const comboBoxDateMapping: Array<{ varref: string, items: Array<string>, label: string }> = [
    { varref: store.budgetMonth, items: Months, label: "Budget Month"},
    { varref: store.budgetYear.toString(),  items: Years, label: "Budget Year"},
  ]

  function submitName () {
    if (formStatus.value) {
      store.personName = personName.value.length >= 3 ? personName.value : 'You'
    }
  }
</script>

<template>
  <v-form ref="form" v-model="formStatus" @submit.prevent="submitName">
    <v-text-field
      v-model="personName"
      :counter="20"
      label="Your Full Name"
      required
      :rules="nameRules"
      variant="outlined"
    />
    <v-btn
      block
      type="submit"
    >Set Name</v-btn>
  </v-form>
  <h2>Date of Budget</h2>
  <v-row>
    <v-col v-for="n in 2" :key="n" cols="12" md="6" xs="12">
      <v-combobox
        v-model="comboBoxDateMapping[n-1].varref"
        :items="comboBoxDateMapping[n-1].items"
        :label="comboBoxDateMapping[n-1].label"
        variant="outlined"
      />
    </v-col>
  </v-row>
</template>

<style scoped>
h2 {
  font-size: 20px;
}
</style>
