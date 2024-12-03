<template>
  <!-- Dynamically bind the banner image using Vue's v-bind:src -->
  <img :src="banner" alt="Logo" style="height: 125px;" />
  <br />
  
  <!-- Show the PhantomWallet button if not logged in -->
  <div v-if="!loggedIn">
    <PhantomWallet @login-success="handleLoginSuccess" />
  </div>
  
  <!-- Show the TradeBox component when logged in -->
  <div v-if="loggedIn">
    <TradeBox :ca="ca" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PhantomWallet from '@/components/PhantomWallet.vue';
import TradeBox from '@/components/TradeBox.vue';

const loggedIn = ref(false);
const ca = ref('');
const banner = ref('');

// Check localStorage on component mount
onMounted(() => {
  const storedCa = localStorage.getItem('ca');
  if (storedCa) {
    loggedIn.value = true;
    console.log(loggedIn.value);
    ca.value = storedCa;
  }

  // Check device type and set the banner image accordingly
  const device = localStorage.getItem('device');
  if (device !== 'mobile') {
    banner.value = require('@/assets/banner_desktop.png');  // Use require() for dynamic imports
  } else if (device === 'mobile') {
    banner.value = require('@/assets/banner_mobile.png');  // Path to mobile banner
  }
});

// Handle successful login from PhantomWallet
const handleLoginSuccess = (publicKey) => {
  loggedIn.value = true;
  ca.value = publicKey;
};

</script>
