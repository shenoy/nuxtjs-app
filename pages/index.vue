<script>
export default {
  async setup() {
    // Fetch cakes from the API
    const cakes = await $fetch('/api/cakes');
    return cakes ;
  },
  data() {
    return {
      editingCake: null, // Track the cake being edited
      form: {
        name: '',
        comment: '',
        imageUrl: '',
        yumFactor: 1,
      },
    };
  },
  methods: {
    async deleteCake(cakeId) {
      if (confirm('Are you sure you want to delete this cake?')) {
        try {
          const response = await $fetch(`/api/${cakeId}`, {
            method: 'DELETE',
          });
          alert(response.message);
          this.cakes = await $fetch('/api/cakes');
        } catch (error) {
          console.error('Error deleting cake:', error);
          alert('Failed to delete cake');
        }
      }
    },
    editCake(cake) {
      // Set the form data to the cake being edited
      this.editingCake = cake;
      this.form = {
        name: cake.name,
        comment: cake.comment,
        imageUrl: cake.imageUrl,
        yumFactor: cake.yumFactor,
      };
    },
    async updateCake() {
      try {
        // Send a PUT request to update the cake
        const response = await $fetch(`/api/${this.editingCake.id}`, {
          method: 'PUT',
          body: this.form,
        });

        // Show a success message
        alert(response.message);

        // Refresh the list of cakes
        this.cakes = await $fetch('/api/cakes');

        // Reset the form and editing state
        this.editingCake = null;
        this.form = {
          name: '',
          comment: '',
          imageUrl: '',
          yumFactor: 1,
        };
      } catch (error) {
        console.error('Error updating cake:', error);
        alert('Failed to update cake');
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="flex justify-center items-center">
      <div class="mt-16">
        <ul>
          <!-- Add a v-if check to ensure cakes is defined -->
          <li v-for="cake in cakes" :key="cake.id">
            <div class="mt-10">
              <!-- Add a router-link to navigate to the cake details page -->
              <router-link :to="`/cakes/${cake.id}`" class="text-blue-600 hover:text-blue-800">
                {{ cake.name }}
              </router-link>
              <br>
              <!-- Add a router-link to the image as well -->
              <router-link :to="`/cakes/${cake.id}`">
                <img :src="cake.imageUrl" alt="Cake image" class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl cursor-pointer">
              </router-link>
              <!-- Add an update button -->
              <button
                @click="editCake(cake)"
                class="mt-2 bg-yellow-600 text-white py-1 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Update
              </button>
              <!-- Add a delete button -->
              <button
                @click="deleteCake(cake.id)"
                class="ml-2 mt-2 bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Update Form -->
    <div v-if="editingCake" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-8 text-gray-800">Update Cake</h2>
        <form @submit.prevent="updateCake">
          <!-- Name Field -->
          <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-700">Cake Name:</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Comment Field -->
          <div class="mb-6">
            <label for="comment" class="block text-sm font-medium text-gray-700">Comment:</label>
            <textarea
              id="comment"
              v-model="form.comment"
              required
              minlength="5"
              maxlength="200"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <!-- Image URL Field -->
          <div class="mb-6">
            <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL:</label>
            <input
              type="url"
              id="imageUrl"
              v-model="form.imageUrl"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Yum Factor Field -->
          <div class="mb-6">
            <label for="yumFactor" class="block text-sm font-medium text-gray-700">Yum Factor (1-5):</label>
            <input
              type="number"
              id="yumFactor"
              v-model="form.yumFactor"
              min="1"
              max="5"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Cake
          </button>
        </form>
      </div>
    </div>
  </div>
</template>