<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { useBudgetStore } from '@/stores/app.ts'
  enum Display {
    NONE = 'none',
    CELL = 'table-cell',
  }
  const store = useBudgetStore()
  const displayDeleteIncome: Ref<Display> = ref(Display.NONE)
  const displayDeleteExpense: Ref<Display> = ref(Display.NONE)
  const files: Ref<File | undefined> = ref()
  const cardText: Ref<string> = ref('Load the JSON you wish to use')
  function onEditToggleIncome () {
    if (displayDeleteIncome.value === Display.NONE) {
      displayDeleteIncome.value = Display.CELL
      return
    }
    displayDeleteIncome.value = Display.NONE
  }
  function onEditToggleExpense () {
    if (displayDeleteExpense.value === Display.NONE) {
      displayDeleteExpense.value = Display.CELL
      return
    }
    displayDeleteExpense.value = Display.NONE
  }
  async function isValidJSON (file: File): Promise<boolean> {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
        const json = (e.target as FileReader).result as string
        try {
          JSON.parse(json)
          resolve(true)
        } catch {
          resolve(false)
        }
      })
      // eslint-disable-next-line unicorn/prefer-blob-reading-methods
      reader.readAsText(file)
    },
    )
  }

</script>

<template>
  <h2>Budget for {{ store.personName }} of {{ store.budgetMonth }} {{ store.budgetYear }}</h2>
  <v-card
    flat
    title="Income Table"
  >
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Amount
          </th>
          <th class="text-left" :style="{display: displayDeleteIncome}">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in store.incomeItems"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.amount }}</td>
          <td :style="{display: displayDeleteIncome}"><v-btn @click="() => store.deleteIncomeItem(item.name)">Delete</v-btn></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td>{{ store.getIncomeSum }}</td>
        </tr>
      </tfoot>
    </v-table>
    <v-row>
      <v-col> <v-btn @click="onEditToggleIncome">Edit</v-btn> </v-col>
      <v-col> <v-btn @click="store.incomeItems = []">Delete entire table</v-btn> </v-col>
      <v-col><v-btn @click="() => store.saveIncomeItems()">Save</v-btn></v-col>
      <v-dialog max-width="500">
        <template #activator="{ props: activatorProps }">
          <v-col><v-btn v-bind="activatorProps" @click="() => cardText = 'Load the JSON you wish to use'">Load</v-btn></v-col>
        </template>

        <template #default="{ isActive }">
          <v-card title="Dialog">
            <v-card-text>
              {{ cardText }}
            </v-card-text>

            <v-card-actions>
              <v-file-input v-model="files" accept="application/json" label="File input" />
              <v-btn
                text="Load"
                @click="async() => {
                  if(files) {
                    if (await isValidJSON(files)) {
                      await store.loadIncomeItems(files as File)
                      isActive.value = false
                      return
                    }
                    cardText = 'Invalid JSON'
                    return
                  }
                  cardText = 'Please select a JSON file first'
                }"
              />
              <v-spacer />
              <v-btn
                text="Cancel"
                @click="isActive.value = false"
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-row>
  </v-card>
  <v-card
    flat
    title="Expense Table"
  >
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Amount
          </th>
          <th class="text-left" :style="{display: displayDeleteExpense}">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in store.expenseItems"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.amount }}</td>
          <td :style="{display: displayDeleteExpense}"><v-btn @click="() => store.deleteExpenseItem(item.name)">Delete</v-btn></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td>{{ store.getExpenseSum }}</td>
        </tr>
      </tfoot>
    </v-table>
    <v-row>
      <v-col><v-btn @click="onEditToggleExpense">Edit</v-btn></v-col>
      <v-col> <v-btn @click="store.expenseItems = []">Delete entire table</v-btn> </v-col>
      <v-col><v-btn @click="store.saveExpenseItems">Save</v-btn></v-col>
      <v-dialog max-width="500">
        <template #activator="{ props: activatorProps }">
          <v-col><v-btn v-bind="activatorProps" @click="() => cardText = 'Load the JSON you wish to use'">Load</v-btn></v-col>
        </template>

        <template #default="{ isActive }">
          <v-card title="Dialog">
            <v-card-text>
              {{ cardText }}
            </v-card-text>

            <v-card-actions>
              <v-file-input v-model="files" accept="application/json" label="File input" />
              <v-btn
                text="Load"
                @click="async() => {
                  if(files) {
                    if (await isValidJSON(files)) {
                      await store.loadExpenseItems(files as File)
                      isActive.value = false
                      return
                    }
                    cardText = 'Invalid JSON'
                    return
                  }
                  cardText = 'Please select a JSON file first'
                }"
              />
              <v-spacer />
              <v-btn
                text="Cancel"
                @click="isActive.value = false"
              />
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-row>
  </v-card>
</template>
<style scoped>
  h2 {
    text-align: center;

  }
</style>
