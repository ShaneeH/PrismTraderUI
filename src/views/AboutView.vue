<template>
  <v-card class="custom-card">
    <v-tabs
      v-model="tab"
      bg-color="deep-purple-darken-4"
      center-active
    >
      <v-tab>Coins</v-tab>
      <v-tab>Active Order</v-tab>
      <v-tab>Order History</v-tab>
    </v-tabs>

    <!-- Coins Tab -->
    <v-tab-item v-if="tab === 0">
      <v-list class="coin-list">
        <v-list-item v-for="coin in coins" :key="coin.id">
          <v-list-item-avatar>
            <v-img :src="coin.image" alt="coin image" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ coin.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ coin.symbol }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-tab-item>

    <!-- Active Order Tab -->
    <v-tab-item v-if="tab === 1">
      <v-list class="order-list">
        <v-list-item v-for="order in activeOrders" :key="order.id">
          <v-list-item-content>
            <v-list-item-title>{{ order.coin }} - {{ order.amount }} units</v-list-item-title>
            <v-list-item-subtitle>Status: {{ order.status }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-tab-item>

    <!-- Order History Tab -->
    <v-tab-item v-if="tab === 2">
      <v-list class="order-history-list">
        <v-list-item v-for="order in orderHistory" :key="order.id">
          <v-list-item-content>
            <v-list-item-title>{{ order.coin }} - {{ order.amount }} units</v-list-item-title>
            <v-list-item-subtitle>Status: {{ order.status }} | Date: {{ order.date }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-tab-item>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

const tab = ref(0); // Set initial tab to "Coins"

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
.custom-card {
  background-color: #1a1a1a; /* Dark background for card */
  color: #c3cdd8; /* Light text color */
}

.coin-list,
.order-list,
.order-history-list {
  text-align: left; /* Align items to the left */
  margin-left: 20px;
}

.v-list-item-avatar {
  margin-right: 10px;
}

.v-img {
  width: 40px; /* Adjust image size */
  height: 40px; /* Adjust image size */
  object-fit: cover; /* Ensures the image covers the area */
}
</style>
