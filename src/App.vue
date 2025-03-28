<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-screen h-screen flex flex-row antialiased leading-none text-gray-700 bg-blue-50">
    <div class="px-6 grow flex flex-col">
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>
