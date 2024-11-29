<template>
  <v-btn variant="tonal" class="wallet-btn" @click="connectWallet" :disabled="loading">
    <img v-if="!loading" src="@/assets/p.png" alt="Logo" class="wallet-icon" />
    <v-progress-circular v-if="loading" indeterminate color="deep-orange-lighten-2" size="24" class="wallet-icon" />
    <span v-if="!loading">Connect Wallet</span>
    <span v-if="loading">Connecting...</span>
  </v-btn>
  <p v-if="errorMessage" style="color: rgb(255, 77, 77);">{{ errorMessage }}</p>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

// Emit event for login success
const emit = defineEmits(['login-success']);

// Reactive variables
const loading = ref(false);
const errorMessage = ref('');

// Determine device type
const device = ref(window.innerWidth <= 768 ? 'mobile' : 'desktop');

// Detect Phantom Wallet provider (desktop)
const getProvider = () => {
  return window.phantom?.solana?.isPhantom ? window.phantom.solana : null;
};

// Redirect to Phantom's website for installation or mobile deep link
const openPhantomWebsite = () => {
  window.open('https://phantom.app/', '_blank');
};

// Redirect to Phantom mobile app for authentication
const connectMobileWallet = () => {
  const appUrl = encodeURIComponent(window.location.origin); // Your app's URL
  const redirectBackUrl = encodeURIComponent(window.location.href); // Current page
  const mobileLink = `https://phantom.app/ul/v1/connect?app_url=${appUrl}&redirect_link=${redirectBackUrl}`;
  window.location.href = mobileLink; // Redirect to Phantom app
};

// Handle wallet connection
const connectWallet = async () => {
  if (device.value === 'mobile') {
    // Handle mobile connection
    connectMobileWallet();
    return;
  }

  // Desktop logic
  const provider = getProvider();
  if (!provider) {
    console.error('Phantom Wallet not found.');

    // Set a detailed error message based on the device type
    errorMessage.value = `Phantom Wallet not found. Please install it on your ${device.value} device.`;

    if (device.value === 'desktop') openPhantomWebsite();
    return;
  }

  // Attempt to connect to the wallet
  try {
    loading.value = true; // Show loading spinner
    const response = await provider.connect();
    const key = response.publicKey.toString();
    console.log(`Public Key: ${key}`);

    // Store the wallet address and emit the login-success event
    localStorage.setItem('ca', key);
    emit('login-success', key);
  } catch (err) {
    // Display error message if connection fails
    errorMessage.value = `Connection failed: ${err.message}`;
  } finally {
    loading.value = false; // Hide loading spinner
  }
};

// Check for public key in the URL (for mobile users)
const checkRedirectForMobileWallet = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const publicKey = urlParams.get('public_key');
  if (publicKey) {
    localStorage.setItem('ca', publicKey);
    emit('login-success', publicKey);
    console.log(`Mobile wallet connected: ${publicKey}`);
  }
};

// Run on page load
checkRedirectForMobileWallet();
</script>

<style scoped>
.wallet-btn {
  color: white;
}
.wallet-icon {
  height: 24px;
  margin-right: 8px;
}
</style>
