<template>
  <div class="connected-wallet">
    <h3> {{ ca_short }} </h3>
    <img src="@/assets/dog.png" alt="Dog" class="wallet-icon">

  </div>
  <button @click="handleDisconnect" style="font-weight: bold;">
    <h4>[ Disconnect ]</h4>
  </button>

  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <div class="tabs-container">
      <n-tabs type="segment" animated>
        <n-tab-pane name="Coins" tab="COINS">
          <div class="coin-list">
            <div v-for="(item, index) in items" :key="index" class="coin">
              <img :src="item.img" :alt="item.name" class="coin-image" />
              <div class="coin-details">
                <h3 class="coin-name">{{ item.name }}</h3>
                <p><strong>Price:</strong> ${{ item.price }}</p>
                <p><strong>Market Cap:</strong> ${{ item.mc }}</p>
                <p><strong>Quantity:</strong> {{ item.qty }}</p>
              </div>
            </div>
          </div>
        </n-tab-pane>

        <n-tab-pane name="Active Trades" tab="Active Trade Orders">
          <div></div>
        </n-tab-pane>

        <n-tab-pane name="History" tab="History">
          <div></div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-config-provider>

  <br><br>
  <div v-if="loading">
    <n-spin size="medium" />
    <h4>Fetching Wallet Info</h4>
  </div>

  <div v-if="error" style="color: wheat;">
    <h3>Apologies </h3>
    <h4>Server Seems Busy Please wait a few seconds then reload the page</h4>
    <h4>In the meantime all you're Wallet Information is safe</h4>
  </div>

  <br>
  <h1>Your Wallet's Coins on DexScreener</h1>
  <br>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCoins } from '@/services/getCoins';// Import your service
import { darkTheme } from 'naive-ui';

// Props
const props = defineProps(['ca']);
const ca = props.ca;
const ca_short = ca.slice(0, 10);

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

onMounted(() => {
  fetchTokens();
});
</script>

<style scoped>
/* Container for the tabs */
.tabs-container {
  max-width: 1000px;
  /* Adjust this value to control the width */
  margin: 0 auto;
  /* Centers the container */
  padding: 10px;
}

/* Media query for smaller screens */
@media (max-width: 1040px) {
  .tabs-container {
    max-width: 100%;
    /* Full width on smaller screens */
    padding: 0;
    /* Remove padding */
    margin: 0;
    /* Remove margin */
  }
}

.coin-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.coin {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
  color: white;
}

.coin:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.coin-image {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.coin-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.coin-name {
  color: rgb(220, 211, 34);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.coin-details p {
  margin: 2px 0;
}

/* Order and history styling */
.order,
.history {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.connected-wallet {
 
  align-items: center;
  margin-bottom: 15px;
  /* Adds some space below for better spacing */
}

.connected-wallet h3 {
  margin-right: 10px;
  /* Space between the address and the icon */
}

.connected-wallet img {
  width: 30px;
  height: 30px;
}


.connected-wallet h2 {
  margin: 0 5px;
}
</style>
