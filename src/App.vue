<template>
        <v-layout>
      <v-navigation-drawer
               v-model="drawer"
        temporary
      >
        <v-list>
          <v-list-item
            v-model:title="store.personName"
            prepend-avatar="@/assets/user-icon.png"
          />
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-pencil" title="Budget Input" to="/" value="input" />
          <v-list-item prepend-icon="mdi-table" title="Budget Tables" to="/budget-tables" value="tables" />
          <v-list-item prepend-icon="mdi-chart-arc" title="Budget Analytics" to="/analytics" value="analytics" />
        </v-list>
      </v-navigation-drawer>
           <v-app>
      <v-main>
        <router-view />
        <v-fab icon="mdi-menu" app location="top left" @click.stop="drawer = !drawer"></v-fab>
      </v-main>
        </v-app>
    </v-layout>
</template>

<script lang="ts" setup>
  import { useBudgetStore } from '@/stores/app.ts'
import { ref } from 'vue';
  const store = useBudgetStore()
  const drawer = ref()
</script>

<style scoped>
  #main {
    height: 100%;
  }
</style>
