<script>
export default {
  async setup() {
    // Get the cake ID from the route parameters
    const route = useRoute();
    const cakeId = route.params.id;

    // Fetch the cake details from the API
    const cake = await $fetch(`/api/${cakeId}`);

    return { cake };
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold mb-8 text-gray-800">{{ cake.name }}</h1>
      <img :src="cake.imageUrl" alt="Cake image" class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-8">
      <p class="text-gray-700 mb-4">{{ cake.comment }}</p>
      <p class="text-gray-700">Yum Factor: {{ cake.yumFactor }}/5</p>
    </div>
  </div>
</template>