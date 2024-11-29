<template>
  <div>
    <h5>Connected Wallet:</h5>
    <h6>{{ ca }}</h6>

    <button @click="handleDisconnect" style="font-weight: bold;">[ Disconnect ]</button>

    <br><br>



    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: red;">Error: {{ error }}</div>

    <br>
    <h3>Your Wallet's Coins on DexScreener</h3>
    <br><br>
    <v-list v-if="items.length > 0" class="custom-list">
    <div class="list-container">
      <v-list-item v-for="(item, index) in items" :key="index" class="list-item">
        <v-list-item-avatar>
          <!-- Make the image smaller by setting a max width and height -->
          <img :src="item.img" alt="Token Image" class="item-image" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>${{ item.price }}</v-list-item-subtitle>
          <v-list-item-subtitle>MC : ${{ item.mc }}</v-list-item-subtitle>
          <v-list-item-subtitle>Qty: {{ item.qty }}</v-list-item-subtitle>
          <button >[add sell order]</button>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-list>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCoins } from '@/services/getCoins';// Import your service

// Props
const props = defineProps(['ca']);
const ca = props.ca;

// Emit event to trigger disconnection in the parent component
const emit = defineEmits();

// Reactive state for items, loading, and error
const items = ref([]);
const loading = ref(false);
const error = ref(null);

// Disconnect function
const handleDisconnect = () => {
  // Simulate disconnecting by removing the wallet address from localStorage
  localStorage.removeItem('ca'); // Remove stored wallet address
  emit('login-success', false);
  location.reload();
};

// Fetch tokens using the service function
const fetchTokens = async () => {
  loading.value = true;
  error.value = null; // Clear any previous errors

  try {
    items.value = await getCoins(ca); // Use the service function
    console.log(items.value);
  } catch (err) {
    error.value = err.message; // Store error message in the state
    console.error('Error:', err);
  } finally {
    loading.value = false; // Set loading to false after request completes
  }
};

fetchTokens();
</script>

<style scoped>
.custom-list {
  padding: 0;
  background-color: inherit; /* Matches the rest of the template's background */
}

.list-container {
  display: flex; /* Flex layout for horizontal alignment */
  flex-wrap: wrap; /* Allows wrapping to the next line if necessary */
  gap: 16px; /* Add space between items */
  margin-left: 40px;
  margin-right: 40px;

}

.list-item {
  flex: 1 1 calc(25% - 16px); /* Adjust width dynamically (25% width, minus gap space) */
  max-width: 250px; /* Optional: Limit the maximum width for each item */
  background-color: rgb(27, 29, 41); /* Light background for contrast */
  border-radius: 50px; /* Rounded corners */
  border: 0.8px solid white; /* White border around each item */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for each card */
  padding: 16px;
  color :rgba(255, 255, 255, 0.773)
}

.item-image {
  width: 40px; /* Smaller image size */
  height: 40px; /* Smaller image size */
  object-fit: cover; /* Ensures the image scales well */
}
</style>