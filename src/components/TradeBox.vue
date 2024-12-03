<template>
  <div>
    <h2>Connected Wallet:</h2>
    <h3>{{ ca }}</h3>

    <button @click="handleDisconnect" style="font-weight: bold;"><h2>[ Disconnect ]</h2></button>

    <br><br>



    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: wheat;">
      <h3>Apologies 😟</h3>
      <h4>Server Seems Busy Please wait a few seconds then reload the page</h4>
      <h4>In the meantime all you're Wallet Information is safe</h4>
    </div>

    <br>
    <h1>Your Wallet's Coins on DexScreener</h1>
    <br>
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
    
    console.log(JSON.stringify(items.value, null, 2)); 
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
@import '@/styles/TradeBox.css';  
</style>
