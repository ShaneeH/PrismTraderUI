<template>
  <br />
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <div class="tabs-container">
      <n-tabs type="segment" animated>
        <!-- Coins Tab -->
        <n-tab-pane name="Coins" tab="Coins 🪙">
          <div>
            <div v-for="coin in coins" :key="coin.id" class="coin">
              <img :src="coin.image" :alt="coin.name" class="coin-image" />
              <div class="coin-details">
                <h3>{{ coin.name }}</h3>
                <p>{{ coin.symbol }}</p>
              </div>
            </div>
          </div>
        </n-tab-pane>

        <!-- Active Trades Tab -->
        <n-tab-pane name="Active Trades" tab="Active Trades ⌛">
          <div>
            <div v-if="activeOrders.length > 0">
              <div v-for="order in activeOrders" :key="order.id" class="order">
                <p><strong>Coin:</strong> {{ order.coin }}</p>
                <p><strong>Amount:</strong> {{ order.amount }}</p>
                <p><strong>Status:</strong> {{ order.status }}</p>
              </div>
            </div>
            <p v-else>No active trades found.</p>
          </div>
        </n-tab-pane>

        <!-- History Tab -->
        <n-tab-pane name="History" tab="History 🕰️">
          <div>
            <div v-if="orderHistory.length > 0">
              <div v-for="history in orderHistory" :key="history.id" class="history">
                <p><strong>Coin:</strong> {{ history.coin }}</p>
                <p><strong>Amount:</strong> {{ history.amount }}</p>
                <p><strong>Status:</strong> {{ history.status }}</p>
                <p><strong>Date:</strong> {{ history.date }}</p>
              </div>
            </div>
            <p v-else>No history available.</p>
          </div>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref } from 'vue';
import { darkTheme } from 'naive-ui';

// Dummy data
const coins = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', image: 'https://pump.mypinata.cloud/ipfs/QmSptKUKxpJ62pQWPFDUAaNS8wbpWoZrmCv916B6BptZ29?img-width=256&img-dpr=2&img-onerror=redirect' },
  { id: 2, name: 'Ethereum', symbol: 'ETH', image: 'https://pump.mypinata.cloud/ipfs/QmSptKUKxpJ62pQWPFDUAaNS8wbpWoZrmCv916B6BptZ29?img-width=256&img-dpr=2&img-onerror=redirect' },
  { id: 3, name: 'Cardano', symbol: 'ADA', image: 'https://pump.mypinata.cloud/ipfs/QmSptKUKxpJ62pQWPFDUAaNS8wbpWoZrmCv916B6BptZ29?img-width=256&img-dpr=2&img-onerror=redirect' },
  { id: 4, name: 'Solana', symbol: 'SOL', image: 'https://pump.mypinata.cloud/ipfs/QmSptKUKxpJ62pQWPFDUAaNS8wbpWoZrmCv916B6BptZ29?img-width=256&img-dpr=2&img-onerror=redirect' },
  { id: 5, name: 'PepeCoin', symbol: 'PEPE', image: 'https://pump.mypinata.cloud/ipfs/QmSptKUKxpJ62pQWPFDUAaNS8wbpWoZrmCv916B6BptZ29?img-width=256&img-dpr=2&img-onerror=redirect' }
];

const activeOrders = [
  { id: 1, coin: 'Bitcoin', amount: 2, status: 'Pending' },
  { id: 2, coin: 'Ethereum', amount: 10, status: 'Processing' }
];

const orderHistory = [
  { id: 1, coin: 'Cardano', amount: 50, status: 'Completed', date: '2024-11-20' },
  { id: 2, coin: 'Solana', amount: 200, status: 'Completed', date: '2024-11-18' },
  { id: 3, coin: 'PepeCoin', amount: 1000, status: 'Canceled', date: '2024-11-15' }
];
</script>

<style scoped>
/* Container for the tabs */
.tabs-container {
  max-width: 1000px; /* Adjust this value to control the width */
  margin: 0 auto; /* Centers the container */
  padding: 10px;
}

/* Media query for smaller screens */
@media (max-width: 1040px) {
  .tabs-container {
    max-width: 100%; /* Full width on smaller screens */
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margin */
  }
}

/* Coin styling */
.coin {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.coin-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}
.coin-details {
  display: flex;
  flex-direction: column;
}

/* Order and history styling */
.order, .history {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
