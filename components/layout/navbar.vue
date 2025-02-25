<script setup lang="ts">
// No need to import ref, it's automatically available in Nuxt 3
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="navbar relative dark:bg-black bg-white shadow-md">
    <div class="container mx-auto px-4 py-2 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-xl font-bold text-gray-800 dark:text-white">
        Cake App
      </div>

      <!-- Navigation Links -->
      <nav class="sticky hidden md:flex space-x-6">
        <a href="/" class="text-gray-800 dark:text-white hover:text-gray-600">Home</a>
        <a href="/submit" class="text-gray-800 dark:text-white hover:text-gray-600">Submit a cake</a>
      </nav>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden text-gray-800 dark:text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white dark:bg-black shadow-md">
      <a href="/" class="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200">Home</a>
      <a href="/submit" class="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200">Submit a cake</a>
    </div>
  </div>
</template>

