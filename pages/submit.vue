<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Add a New Cake</h1>
    <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <!-- Name Field -->
      <div class="mb-6">
        <label for="name" class="block text-sm font-medium text-gray-700">Cake Name:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name }}</p>
      </div>

      <!-- Comment Field -->
      <div class="mb-6">
        <label for="comment" class="block text-sm font-medium text-gray-700">Comment:</label>
        <textarea
          id="comment"
          v-model="comment"
          required
          minlength="5"
          maxlength="200"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <p v-if="errors.comment" class="text-sm text-red-500 mt-1">{{ errors.comment }}</p>
      </div>

      <!-- Image URL Field -->
      <div class="mb-6">
        <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL:</label>
        <input
          type="url"
          id="imageUrl"
          v-model="imageUrl"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.imageUrl" class="text-sm text-red-500 mt-1">{{ errors.imageUrl }}</p>
      </div>

      <!-- Yum Factor Field -->
      <div class="mb-6">
        <label for="yumFactor" class="block text-sm font-medium text-gray-700">Yum Factor (1-5):</label>
        <input
          type="number"
          id="yumFactor"
          v-model="yumFactor"
          min="1"
          max="5"
          required
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p v-if="errors.yumFactor" class="text-sm text-red-500 mt-1">{{ errors.yumFactor }}</p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Cake
      </button>
    </form>

    <!-- Success/Error Messages -->
    <p v-if="message" class="mt-4 text-sm text-gray-600">{{ message }}</p>
    <p v-if="newCakeId" class="mt-4 text-sm text-gray-600">Cake added with ID: {{ newCakeId }}</p>
  </div>
</template>

<script>
export default {
  setup() {
    const name = ref('');
    const comment = ref('');
    const imageUrl = ref('');
    const yumFactor = ref(1); // Default value
    const message = ref('');
    const newCakeId = ref(null);
    const errors = ref({}); // Object to store validation errors

    const router = useRouter(); // Initialize the router

    const validateForm = () => {
      errors.value = {}; // Reset errors

      // Validate Name
      if (!name.value) {
        errors.value.name = 'Name is required';
      }

      // Validate Comment
      if (!comment.value) {
        errors.value.comment = 'Comment is required';
      } else if (comment.value.length < 5 || comment.value.length > 200) {
        errors.value.comment = 'Comment must be between 5 and 200 characters';
      }

      // Validate Image URL
      if (!imageUrl.value) {
        errors.value.imageUrl = 'Image URL is required';
      }

      // Validate Yum Factor
      if (!yumFactor.value || yumFactor.value < 1 || yumFactor.value > 5) {
        errors.value.yumFactor = 'Yum Factor must be between 1 and 5';
      }

      // Return true if there are no errors
      return Object.keys(errors.value).length === 0;
    };

    const submitForm = async () => {
      if (!validateForm()) {
        return; // Stop if validation fails
      }

      try {
        const response = await $fetch('/api/addCake', {
          method: 'POST',
          body: {
            name: name.value,
            comment: comment.value,
            imageUrl: imageUrl.value,
            yumFactor: yumFactor.value,
          },
        });
        message.value = response.message;
        newCakeId.value = response.id; // Display the new cake ID
        name.value = '';
        comment.value = '';
        imageUrl.value = '';
        yumFactor.value = 1; // Reset to default
        router.push('/'); // Redirect to the index page
      } catch (error) {
        console.error('Error submitting form:', error); // Log the error for debugging
        message.value = error.data?.statusMessage || 'Failed to add cake';
        newCakeId.value = null;
      }
    };

    return {
      name,
      comment,
      imageUrl,
      yumFactor,
      message,
      newCakeId,
      errors,
      submitForm,
    };
  },
};
</script>