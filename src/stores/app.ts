import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export class BudgetItem {
  constructor (public name: string, public amount: number) {}
}

export const Months: Array<string> = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    personName: ref('You'),
    budgetMonth: ref(Months[new Date().getMonth()]),
    budgetYear: ref(new Date().getFullYear()),
    incomeItems: ref([]) as Ref<Array<BudgetItem>>,
    expenseItems: ref([]) as Ref<Array<BudgetItem>>,
  }),
  getters: {
    getIncomeSum (state): number {
      return state.incomeItems.map(item => item.amount).reduce((a, b) => a + b, 0)
    },
    getExpenseSum (state): number {
      return state.expenseItems.map(item => item.amount).reduce((a, b) => a + b, 0)
    },
    getIncomeAverage (state): number {
      if (state.incomeItems.length === 0) {
        return 0
      }
      return state.incomeItems.map(item => item.amount).reduce((a, b) => a + b, 0) / state.incomeItems.length
    },
    getExpenseAverage (state): number {
      if (state.expenseItems.length === 0) {
        return 0
      }
      return state.expenseItems.map(item => item.amount).reduce((a, b) => a + b, 0) / state.incomeItems.length
    },
    getIncomeMin (state): number {
      if (state.incomeItems.length === 0) {
        return 0
      }
      return Math.min(...state.incomeItems.map(i => i.amount))
    },
    getExpenseMin (state): number {
      if (state.expenseItems.length === 0) {
        return 0
      }
      return Math.min(...state.expenseItems.map(i => i.amount))
    },
    getIncomeMax (state): number {
      if (state.incomeItems.length === 0) {
        return 0
      }
      return Math.max(...state.incomeItems.map(i => i.amount))
    },
    getExpenseMax (state): number {
      if (state.expenseItems.length === 0) {
        return 0
      }
      return Math.max(...state.expenseItems.map(i => i.amount))
    },
    getVerdict (state): { value: number, text: string, color: string } {
      const amount: number = state.incomeItems.map(item => item.amount).reduce((a, b) => a + b, 0)
        - state.expenseItems.map(item => item.amount).reduce((a, b) => a + b, 0)
      return {
        value: amount,
        text: amount === 0 ? 'BREAKTHROUGH' : (amount > 0 ? 'SURPLUS' : 'DEFICIT'),
        color: amount === 0 ? 'orange' : (amount > 0 ? 'green' : 'red'),
      }
    },
  },
  actions: {
    addIncomeItem (itemName: string, itemAmount: number) {
      this.incomeItems.push(new BudgetItem(itemName, itemAmount))
    },
    addExpenseItem (itemName: string, itemAmount: number) {
      this.expenseItems.push(new BudgetItem(itemName, itemAmount))
    },
    deleteIncomeItem (itemName: string) {
      this.incomeItems = this.incomeItems.filter(i => i.name !== itemName)
    },
    deleteExpenseItem (itemName: string) {
      this.expenseItems = this.expenseItems.filter(i => i.name !== itemName)
    },
    saveIncomeItems () {
      const incomeItemsJSON = JSON.stringify(this.incomeItems)
      const blob = new Blob([incomeItemsJSON], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'income.json'
      link.click()
      URL.revokeObjectURL(url)
    },
    saveExpenseItems () {
      const expenseItemsJSON = JSON.stringify(this.expenseItems)
      const blob = new Blob([expenseItemsJSON], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'expenses.json'
      link.click()
      URL.revokeObjectURL(url)
    },
    async loadIncomeItems (file: File) {
      const reader = new FileReader()
      reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
        const json = (e.target as FileReader).result as string
        this.incomeItems = JSON.parse(json) as Array<BudgetItem>
      })
      // eslint-disable-next-line unicorn/prefer-blob-reading-methods
      reader.readAsText(file)
    },
    async loadExpenseItems (file: File) {
      const reader = new FileReader()
      reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
        const json = (e.target as FileReader).result as string
        this.expenseItems = JSON.parse(json) as Array<BudgetItem>
      })
      // eslint-disable-next-line unicorn/prefer-blob-reading-methods
      reader.readAsText(file)
    },
  },
})
