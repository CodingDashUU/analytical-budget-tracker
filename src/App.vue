<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        permanent
        rail
      >
        <v-list>
          <v-list-item
            v-model:title="store.personName"
            prepend-avatar="@/assets/user-icon.png"
          />
        </v-list>

        <v-divider />

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-pencil" title="Budget Input" to="/" value="input" />
          <v-list-item prepend-icon="mdi-table" title="Budget Tables" to="/budget-tables" value="tables" />
          <v-list-item prepend-icon="mdi-chart-arc" title="Budget Analytics" to="/analytics" value="analytics" />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
  import { useBudgetStore } from '@/stores/app.ts'
  const store = useBudgetStore()
</script>

<style scoped>
  #main {
    height: 100%;
  }
</style>
